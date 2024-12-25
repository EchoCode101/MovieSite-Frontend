import config from "../src/utils/js/config.js";
import axios from "axios";
import { showErrorToast } from "../src/utils/js/toastUtils.js";

let isRefreshing = false;
let failedQueue = [];
const apiUrl = config.apiUrl;
const API = axios.create({
  baseURL: apiUrl, // Base API URL
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
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return API(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;
      const encryptedRefreshToken = localStorage.getItem("refreshToken");
      if (encryptedRefreshToken) {
        try {
          const { data } = await axios.post(
            `${apiUrl}/token/refresh`,
            {},
            {
              headers: { authorization: `Bearer ${encryptedRefreshToken}` },
            }
          );
          const newToken = data.token;
          localStorage.setItem("token", newToken);
          processQueue(null, newToken);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return API(originalRequest);
        } catch (refreshError) {
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
      } else {
        showErrorToast("No valid refresh token found. Logging out.");
        console.error("Refresh token missing. Logging out.");
        localStorage.clear(); // Clear tokens
        setTimeout(() => {
          window.location.href = "/signin"; // Redirect to sign-in page
        }, 2000);
      }
    }
    return Promise.reject(error);
  }
);
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  const tokenPattern = /^[a-f0-9]+:[a-f0-9]+$/i;
  if (
    token &&
    tokenPattern.test(token) &&
    token.length >= 830 &&
    token.length <= 835
  ) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.warn(
      "No valid token found in localStorage. Redirecting to sign-in..."
    );
    showErrorToast(
      "No valid token found in localStorage. Redirecting to sign-in..."
    );

    localStorage.clear(); // Clear tokens
    setTimeout(() => {
      window.location.href = "/signin";
    }, 2000);
  }
  return config;
});

export default API;
