import config from "../src/utils/js/config.js";
import axios from "axios";
import { showErrorToast } from "../src/utils/js/toastUtils.js";
import { TOKEN_STORAGE_KEY } from "../src/constants/storage.js";

let isRefreshing = false;
let failedQueue = [];
const apiUrl = config.apiUrl;
const API = axios.create({
  baseURL: apiUrl, // Base API URL
  withCredentials: true, // Important for cookies (refresh token)
  headers: {
    "Content-Type": "application/json",
  },
});

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // Handle both 401 (Unauthorized) and 403 (Forbidden) for token refresh
    // Skip refresh for token refresh endpoint itself to avoid infinite loop
    // NOTE: Browser console will show initial 401/403 errors - this is expected.
    // The interceptor automatically refreshes the token and retries the request.
    // The errors are informational and don't indicate a problem - the requests succeed after retry.
    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/token/refresh")
    ) {
      originalRequest._retry = true;
      // Mark that this request is being handled by token refresh
      originalRequest._suppressError = true;

      // If already refreshing, queue this request
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            originalRequest._suppressError = true; // Suppress errors for retried request
            return API(originalRequest);
          })
          .catch((err) => {
            // Remove suppress flag if retry also fails
            if (err.config) {
              err.config._suppressError = false;
            }
            return Promise.reject(err);
          });
      }

      isRefreshing = true;
      try {
        // Refresh token is sent via cookie (httpOnly), not in header
        // Use API instance to ensure withCredentials is set
        const { data } = await API.post(
          "/token/refresh",
          {},
          {
            withCredentials: true, // Send cookies
          }
        );
        const newToken = data.token;
        localStorage.setItem(TOKEN_STORAGE_KEY, newToken);

        // Process all queued requests with the new token
        processQueue(null, newToken);

        // Update the original request with new token
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        originalRequest._suppressError = true; // Suppress errors for retried request
        return API(originalRequest);
      } catch (refreshError) {
        // Refresh failed - reject all queued requests
        processQueue(refreshError, null);
        showErrorToast("Session expired. Please log in again.");
        console.error("Token refresh failed:", refreshError.message);
        localStorage.clear(); // Clear tokens
        setTimeout(() => {
          window.location.href = "/signin"; // Redirect to sign-in page
        }, 2000);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    // For other errors or if retry already happened, reject normally
    return Promise.reject(error);
  }
);

API.interceptors.request.use((config) => {
  // Always get the latest token from localStorage (in case it was refreshed)
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);
  // Add token to request if available
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  // Don't block requests without token - let the backend handle authentication
  // Some routes may be public or handle auth differently
  return config;
});

export default API;
