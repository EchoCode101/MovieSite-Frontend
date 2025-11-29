/**
 * Standardized API Error Messages
 * 
 * Provides consistent error messages across all API functions.
 * This ensures uniform error handling and better user experience.
 */

/**
 * Error message templates for common API operations
 */
export const API_ERRORS = {
  // Generic errors
  INVALID_RESPONSE: 'Invalid response: response is undefined',
  INVALID_RESPONSE_FORMAT: 'Invalid response format: response is not an object',
  MISSING_DATA_FIELD: 'Invalid response: missing data field',
  UNKNOWN_ERROR: 'An unexpected error occurred. Please try again.',
  
  // Validation errors
  NOT_ARRAY: (resource: string) => `Invalid response: ${resource} is not an array`,
  MISSING_FIELD: (field: string) => `Invalid response: missing ${field} field`,
  MISSING_REQUIRED_FIELDS: (fields: string) => `Invalid response: missing required fields: ${fields}`,
  
  // Operation-specific errors
  FETCH_FAILED: (resource: string) => `Failed to fetch ${resource}`,
  CREATE_FAILED: (resource: string) => `Failed to create ${resource}`,
  UPDATE_FAILED: (resource: string) => `Failed to update ${resource}`,
  DELETE_FAILED: (resource: string) => `Failed to delete ${resource}`,
  VALIDATE_FAILED: (resource: string) => `Failed to validate ${resource}`,
  PURCHASE_FAILED: (resource: string) => `Failed to purchase ${resource}`,
  
  // Auth-specific errors
  LOGIN_FAILED: 'Login failed. Please check your credentials.',
  REGISTRATION_FAILED: 'Registration failed. Please try again.',
  TOKEN_VALIDATION_FAILED: 'Token validation failed',
  LOGOUT_FAILED: 'Logout failed',
  
  // Response data errors
  RESPONSE_DATA_UNDEFINED: 'Invalid response: response data is undefined',
} as const

/**
 * Helper function to create standardized error messages
 * 
 * @param message - Error message or template key
 * @param fallback - Fallback message if message is not provided
 * @returns Standardized error message
 */
export function createApiError(message?: string, fallback: string = API_ERRORS.UNKNOWN_ERROR): string {
  return message || fallback
}

/**
 * Helper function to throw standardized errors
 * 
 * @param message - Error message
 * @param fallback - Fallback message if message is not provided
 * @throws Error with standardized message
 */
export function throwApiError(message?: string, fallback: string = API_ERRORS.UNKNOWN_ERROR): never {
  throw new Error(createApiError(message, fallback))
}

