import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios'
import { env } from './env'

/**
 * Axios instance configured for API requests
 * 
 * Per frontend rules 6.3: API configuration must be at src/config/api.ts
 */
export const apiClient = axios.create({
  baseURL: env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  validateStatus: (status) => {
    // Accept 2xx and 304 (Not Modified) as success
    return (status >= 200 && status < 300) || status === 304
  },
})

// Request interceptor: Add auth token to headers
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor: Handle responses and token refresh
apiClient.interceptors.response.use(
  (response) => {
    // Handle 304 Not Modified - may have empty body, but data should be in cache
    // Return response.data if available, otherwise return response to preserve status
    if (response.status === 304 && !response.data) {
      // For 304 with no data, return a marker object so TanStack Query can use cache
      // This shouldn't happen often as browser should provide cached response
      return response
    }
    // Return response.data (backend format: { success, message, data })
    return response.data || response
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

    // Handle 401 Unauthorized - attempt token refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        // Use a separate axios instance to avoid infinite loops
        const refreshResponse = await axios.post(
          `${apiClient.defaults.baseURL}/token/refresh`,
          {},
          { withCredentials: true }
        )

        const newToken = (refreshResponse.data as { token?: string })?.token
        if (newToken) {
          localStorage.setItem('token', newToken)
          originalRequest.headers.Authorization = `Bearer ${newToken}`
          return apiClient(originalRequest)
        }
      } catch (refreshError) {
        // Refresh failed - clear token and redirect to login
        localStorage.removeItem('token')
        if (window.location.pathname !== '/auth/login') {
          window.location.href = '/auth/login'
        }
        return Promise.reject(refreshError)
      }
    }

    // Extract error message from API response
    // Backend error format: { success: false, error: { message: string } } or { success: false, message: string }
    const errorData = error.response?.data as { error?: { message?: string }; message?: string } | undefined
    const message =
      errorData?.error?.message ||
      errorData?.message ||
      error.message ||
      'An error occurred'

    return Promise.reject(new Error(message))
  }
)

