/**
 * Error handling utility functions
 */

import { logger } from '@/lib/logger'

/**
 * Extract error message from various error formats
 * @param error - Error object from API or catch block
 * @returns User-friendly error message
 */
export const extractErrorMessage = (error: unknown): string => {
  if (!error) return 'An unexpected error occurred'

  // Handle axios error response
  if (typeof error === 'object' && error !== null) {
    const err = error as { response?: { data?: { error?: { message?: string }; message?: string } }; message?: string }
    if (err.response?.data?.error?.message) {
      return err.response.data.error.message
    }
    if (err.response?.data?.message) {
      return err.response.data.message
    }

    // Handle Error object
    if (err.message) {
      return err.message
    }
  }

  // Handle string errors
  if (typeof error === 'string') {
    return error
  }

  return 'An unexpected error occurred'
}

/**
 * Handle API errors consistently
 * @param error - Error object
 * @param showToast - Toast function to show error (optional)
 * @param defaultMessage - Default error message if extraction fails
 * @returns Error message
 */
export const handleApiError = (
  error: unknown,
  showToast?: (message: string) => void,
  defaultMessage = 'Operation failed'
): string => {
  const message = extractErrorMessage(error) || defaultMessage
  if (showToast) {
    showToast(message)
  }
  logger.error('API Error', error instanceof Error ? error : new Error('Unknown error'))
  return message
}

/**
 * Check if error is a network error
 * @param error - Error object
 * @returns True if network error
 */
export const isNetworkError = (error: unknown): boolean => {
  if (typeof error === 'object' && error !== null) {
    const err = error as { response?: unknown; message?: string; code?: string }
    return (
      !err.response &&
      (err.message?.includes('Network Error') ||
        err.message?.includes('timeout') ||
        err.code === 'ECONNABORTED')
    )
  }
  return false
}

/**
 * Check if error is an authentication error
 * @param error - Error object
 * @returns True if authentication error
 */
export const isAuthError = (error: unknown): boolean => {
  if (typeof error === 'object' && error !== null) {
    const err = error as { response?: { status?: number } }
    return err.response?.status === 401 || err.response?.status === 403
  }
  return false
}

