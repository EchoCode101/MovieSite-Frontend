import { apiClient } from '@/config/api'
import type { ApiResponse } from '@/lib/api-response'
import { logger } from '@/lib/logger'
import type {
  LoginCredentials,
  RegisterCredentials,
  LoginResponse,
  RegisterResponse,
  User,
  TokenValidationResponse,
} from '../types'

/**
 * User login
 * 
 * @param credentials - Login credentials (email, password)
 * @returns Promise resolving to login response with token and user data
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string,
 *   token: string,
 *   refreshToken?: string,
 *   data: { id, email, username }
 * }
 */
export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  try {
    // API client interceptor returns response.data directly, so 'response' is already the API response object
    // TypeScript doesn't know about the interceptor, so we need to assert the type
    const response = await apiClient.post(
      '/users/login',
      credentials
    ) as ApiResponse<LoginResponse['data']> & { token: string; refreshToken?: string }

    // Check if response has the expected structure
    if (!response || typeof response !== 'object') {
      throw new Error('Invalid response format: response is not an object')
    }

    // Debug: Log response structure in development
    logger.debug('Login response', { response })

    if (!response.success) {
      throw new Error(response.message || 'Login failed')
    }

    // Validate shape
    if (!response.token) {
      throw new Error('Invalid response: missing token field')
    }
    if (!response.data) {
      throw new Error('Invalid response: missing data field')
    }

    // Ensure required fields are present
    if (!response.data.id || !response.data.username || !response.data.email) {
      throw new Error(`Invalid response: missing required user fields. Received: ${JSON.stringify(response.data)}`)
    }

    return {
      success: response.success,
      message: response.message,
      token: response.token,
      refreshToken: response.refreshToken,
      data: {
        id: response.data.id,
        email: response.data.email,
        username: response.data.username,
      },
    }
  } catch (err) {
    // Re-throw with better error message if it's an Error instance
    if (err instanceof Error) {
      // Log error for debugging
      logger.error('Login error', err)
      throw err
    }
    // Handle axios errors that might have been transformed
    const errorMessage = typeof err === 'object' && err !== null && 'message' in err
      ? String(err.message)
      : 'Login failed. Please try again.'
    throw new Error(errorMessage)
  }
}

/**
 * User registration
 * 
 * @param credentials - Registration credentials
 * @returns Promise resolving to registration response
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message: string,
 *   data: { id, username, email, subscription_plan }
 * }
 */
export const register = async (credentials: RegisterCredentials): Promise<RegisterResponse> => {
  try {
    // API client interceptor returns response.data directly, so 'response' is already the API response object
    // TypeScript doesn't know about the interceptor, so we need to assert the type
    const response = await apiClient.post('/users/signup', credentials) as ApiResponse<RegisterResponse['user']>

    // Check if response has the expected structure
    if (!response || typeof response !== 'object') {
      throw new Error('Invalid response format: response is not an object')
    }

    // Debug: Log response structure in development
    logger.debug('Register response', { response })

    if (!response.success) {
      throw new Error(response.message || 'Registration failed')
    }

    // Validate shape - response.data should contain the user object
    if (!response.data) {
      throw new Error('Invalid response: missing data field')
    }

    // Ensure required fields are present
    if (!response.data.id || !response.data.username || !response.data.email) {
      throw new Error(`Invalid response: missing required user fields. Received: ${JSON.stringify(response.data)}`)
    }

    return {
      success: response.success,
      message: response.message || 'User registered successfully',
      user: {
        id: response.data.id,
        username: response.data.username,
        email: response.data.email,
        subscription_plan: response.data.subscription_plan || 'Free',
      },
    }
  } catch (err) {
    // Re-throw with better error message if it's an Error instance
    if (err instanceof Error) {
      // Log error for debugging
      logger.error('Registration error', err)
      throw err
    }
    // Handle axios errors that might have been transformed
    const errorMessage = typeof err === 'object' && err !== null && 'message' in err
      ? String(err.message)
      : 'Registration failed. Please try again.'
    throw new Error(errorMessage)
  }
}

/**
 * User logout
 * 
 * @returns Promise resolving to logout response
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message: string
 * }
 */
export const logout = async (): Promise<{ message: string }> => {
  try {
    // Interceptor returns response.data directly, so 'response' is already the ApiResponse
    const response = await apiClient.post<ApiResponse<{ message: string }>>('/users/logout')

    if (!response || typeof response !== 'object') {
      throw new Error('Invalid response: response is not an object')
    }

    if (!response.success) {
      throw new Error(response.message || 'Logout failed')
    }
    // Validate shape
    if (!response.data) {
      throw new Error('Invalid response: missing data field')
    }
    return response.data
  } catch (err) {
    throw err instanceof Error ? err : new Error('Unknown error')
  }
}

/**
 * Get current user profile
 * 
 * @returns Promise resolving to user object
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string,
 *   data: User
 * }
 */
export const getUser = async (): Promise<User> => {
  try {
    // Interceptor returns response.data, so 'response' here is already the ApiResponse
    // TypeScript doesn't know about the interceptor, so we need to assert the type
    const response = await apiClient.get('/users/me') as ApiResponse<User>

    // Check if response is undefined or null
    if (!response) {
      throw new Error('Invalid response: response data is undefined')
    }

    // Expect ApiResponse format: { success, message, data }
    if (!response.success) {
      throw new Error(response.message || 'Failed to fetch user profile')
    }
    // Validate shape
    if (!response.data) {
      throw new Error('Invalid response: missing data field')
    }

    // Map all fields from backend response to User type
    const userData = response.data
    return {
      id: userData.id,
      email: userData.email,
      username: userData.username,
      role: userData.role,
      subscription_plan: userData.subscription_plan,
      profile_pic: userData.profile_pic,
      first_name: userData.first_name,
      last_name: userData.last_name,
      status: userData.status,
    }
  } catch (err) {
    logger.error('Error fetching user profile', err instanceof Error ? err : new Error('Unknown error'))
    throw err instanceof Error ? err : new Error('Unknown error')
  }
}

/**
 * Validate access token
 * 
 * @returns Promise resolving to token validation response
 * 
 * Backend Response Format:
 * {
 *   isValid: boolean,
 *   user: { id, email, username, first_name, last_name, role, status }
 * }
 */
export const validateToken = async (): Promise<TokenValidationResponse> => {
  try {
    // Interceptor returns response.data, and this endpoint returns TokenValidationResponse directly
    // TypeScript doesn't know about the interceptor, so we need to assert the type
    const response = await apiClient.post('/token/validate') as TokenValidationResponse
    // Token validation endpoint returns direct response, not wrapped in ApiResponse
    if (!response.isValid) {
      throw new Error('Token is invalid')
    }
    if (!response.user) {
      throw new Error('Invalid response: missing user field')
    }
    return response
  } catch (err) {
    throw err instanceof Error ? err : new Error('Unknown error')
  }
}
