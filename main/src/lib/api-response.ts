/**
 * API Response utility functions
 * 
 * Provides type-safe utilities for handling backend API responses.
 * Backend returns: { success: boolean, message?: string, data?: T }
 */

export interface ApiResponse<T> {
  success: boolean
  message?: string
  data?: T
  token?: string
  refreshToken?: string
}

/**
 * Auth-specific API response that includes token fields
 * Used for authentication endpoints (login, register, etc.)
 */
export interface AuthApiResponse<T> extends ApiResponse<T> {
  token: string
  refreshToken?: string
}

/**
 * Extract data from API response, throwing error if unsuccessful
 * 
 * @param response - API response object
 * @returns Extracted data
 * @throws Error if response is unsuccessful or data is missing
 */
export function extractData<T>(response: ApiResponse<T>): T {
  if (!response.success) {
    throw new Error(response.message || 'API request failed')
  }
  if (response.data === undefined) {
    throw new Error(response.message || 'Invalid response: missing data field')
  }
  return response.data
}

/**
 * Extract data from API response, returning null if unsuccessful
 * 
 * @param response - API response object
 * @returns Extracted data or null
 */
export function extractDataOrNull<T>(response: ApiResponse<T>): T | null {
  if (!response.success || response.data === undefined) {
    return null
  }
  return response.data
}

