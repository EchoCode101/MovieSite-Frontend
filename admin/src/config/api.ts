import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios'

import { env } from '@/env'
import { logger } from '@/lib/logger'
import type { ApiResponse } from '@/types'

// Create axios instance
export const apiClient = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor - add auth token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('adminToken')
    if (token && config.headers) {
      // Trim token to remove any whitespace and ensure it's valid
      const trimmedToken = token.trim()
      // Validate token format (encrypted tokens should have ":" separator)
      if (trimmedToken?.includes(':')) {
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = `Bearer ${trimmedToken}`
      } else if (trimmedToken) {
        // Token exists but doesn't have expected format - log warning
        logger.warn('Token format may be invalid - missing ":" separator', {
          tokenLength: trimmedToken.length,
          tokenPrefix: trimmedToken.substring(0, 20),
        })
        // Still send it - let backend handle validation
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = `Bearer ${trimmedToken}`
      }
    }
    return config
  },
  (error) => {
    logger.error('Request interceptor error:', error)
    return Promise.reject(error)
  },
)

// Response interceptor - handle errors and unwrap data
apiClient.interceptors.response.use(
  (response) => {
    return response.data
  },
  async (error: AxiosError<ApiResponse<unknown>>) => {
    if (error.response?.status === 401) {
      logger.warn('Unauthorized - clearing token and redirecting to login')
      localStorage.removeItem('adminToken')

      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
    }

    const errorMessage =
      // @ts-expect-error – optional nested error shape from backend
      error.response?.data?.error?.message ||
      error.response?.data?.message ||
      error.message ||
      'An unknown error occurred'

    logger.error('API Error:', errorMessage, error)

    return Promise.reject(new Error(errorMessage))
  },
)


