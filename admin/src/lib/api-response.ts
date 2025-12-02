import type { ApiResponse } from '@/types'
import { API_ERRORS } from './api-errors'

/**
 * Extract data from API response, throwing error if unsuccessful
 */
export function extractData<T>(response: ApiResponse<T>): T {
  if (!response.success) {
    throw new Error(response.message || API_ERRORS.INVALID_RESPONSE)
  }

  if (response.data === undefined || response.data === null) {
    throw new Error(API_ERRORS.MISSING_DATA_FIELD)
  }

  return response.data
}

/**
 * Extract data from API response, returning null if unsuccessful
 */
export function extractDataOrNull<T>(response: ApiResponse<T>): T | null {
  if (!response.success || response.data === undefined || response.data === null) {
    return null
  }

  return response.data
}

/**
 * Check if API response is successful
 */
export function isSuccessResponse<T>(response: ApiResponse<T>): boolean {
  return response.success === true
}


