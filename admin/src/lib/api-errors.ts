/**
 * Standardized error messages for API operations
 */
export const API_ERRORS = {
  // Generic errors
  INVALID_RESPONSE: 'Invalid response from server',
  MISSING_DATA_FIELD: 'Response missing data field',
  UNKNOWN_ERROR: 'An unknown error occurred',

  // Operation-specific errors
  FETCH_FAILED: (resource: string) => `Failed to fetch ${resource}`,
  CREATE_FAILED: (resource: string) => `Failed to create ${resource}`,
  UPDATE_FAILED: (resource: string) => `Failed to update ${resource}`,
  DELETE_FAILED: (resource: string) => `Failed to delete ${resource}`,

  // Auth-specific errors
  LOGIN_FAILED: 'Login failed',
  LOGOUT_FAILED: 'Logout failed',
  REGISTRATION_FAILED: 'Registration failed',
  TOKEN_VALIDATION_FAILED: 'Token validation failed',
  UNAUTHORIZED: 'Unauthorized access',
  FORBIDDEN: 'Access forbidden',

  // Validation errors
  VALIDATION_ERROR: 'Validation error',
  REQUIRED_FIELD: (field: string) => `${field} is required`,
  INVALID_FORMAT: (field: string) => `Invalid ${field} format`,
} as const


