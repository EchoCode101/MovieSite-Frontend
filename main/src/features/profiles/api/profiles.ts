import { apiClient } from '@/config/api'
import type { ApiResponse } from '@/lib/api-response'
import { logger } from '@/lib/logger'
import type { Profile, CreateProfileData, UpdateProfileData } from '../types'

/**
 * Get all user profiles
 * 
 * @returns Promise resolving to profiles array
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string,
 *   data: Profile[]
 * }
 */
export const getProfiles = async (): Promise<Profile[]> => {
  try {
    // Interceptor returns response.data, so 'data' here is already the ApiResponse
    const data = await apiClient.get<ApiResponse<Profile[]>>('/profiles')
    
    // Check if data is undefined or null
    if (!data) {
      throw new Error('Invalid response: response data is undefined')
    }
    
    // Check if response is already unwrapped (has profiles directly) - shouldn't happen but handle it
    if (Array.isArray(data) && !('success' in data)) {
      // Response is already unwrapped - return directly
      return data
    }
    
    // Expect ApiResponse format: { success, message, data }
    if (!data.success) {
      throw new Error(data.message || 'Failed to fetch profiles')
    }
    // Validate shape
    if (!data.data) {
      throw new Error('Invalid response: missing data field')
    }
    if (!Array.isArray(data.data)) {
      throw new Error('Invalid response: data is not an array')
    }
    return data.data
  } catch (err) {
    logger.error('Error fetching profiles', err instanceof Error ? err : new Error('Unknown error'))
    throw err instanceof Error ? err : new Error('Unknown error')
  }
}

/**
 * Create a new profile
 * 
 * @param data - Profile creation data
 * @returns Promise resolving to created profile
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string,
 *   data: Profile
 * }
 */
export const createProfile = async (data: CreateProfileData): Promise<Profile> => {
  try {
    // Interceptor returns response.data, so 'response' here is already the ApiResponse
    const response = await apiClient.post<ApiResponse<Profile>>('/profiles', data)
    
    // Check if response is undefined or null
    if (!response) {
      throw new Error('Invalid response: response data is undefined')
    }
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to create profile')
    }
    // Validate shape
    if (!response.data) {
      throw new Error('Invalid response: missing data field')
    }
    return response.data
  } catch (err) {
    logger.error('Error creating profile', err instanceof Error ? err : new Error('Unknown error'))
    throw err instanceof Error ? err : new Error('Unknown error')
  }
}

/**
 * Update a profile
 * 
 * @param id - Profile ID
 * @param data - Profile update data
 * @returns Promise resolving to updated profile
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string,
 *   data: Profile
 * }
 */
export const updateProfile = async (id: string, data: UpdateProfileData): Promise<Profile> => {
  try {
    // Interceptor returns response.data, so 'response' here is already the ApiResponse
    const response = await apiClient.put<ApiResponse<Profile>>(`/profiles/${id}`, data)
    
    // Check if response is undefined or null
    if (!response) {
      throw new Error('Invalid response: response data is undefined')
    }
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to update profile')
    }
    // Validate shape
    if (!response.data) {
      throw new Error('Invalid response: missing data field')
    }
    return response.data
  } catch (err) {
    logger.error('Error updating profile', err instanceof Error ? err : new Error('Unknown error'))
    throw err instanceof Error ? err : new Error('Unknown error')
  }
}

/**
 * Delete a profile
 * 
 * @param id - Profile ID
 * @returns Promise resolving when deletion is complete
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string
 * }
 */
export const deleteProfile = async (id: string): Promise<void> => {
  try {
    // Interceptor returns response.data, so 'data' here is already the ApiResponse
    const data = await apiClient.delete<ApiResponse<null>>(`/profiles/${id}`)
    
    // Check if data is undefined or null
    if (!data) {
      throw new Error('Invalid response: response data is undefined')
    }
    
    // Expect ApiResponse format: { success, message }
    if (!data.success) {
      throw new Error(data.message || 'Failed to delete profile')
    }
    // For delete operations, we don't need to check data.data since it's null
  } catch (err) {
    logger.error('Error deleting profile', err instanceof Error ? err : new Error('Unknown error'))
    throw err instanceof Error ? err : new Error('Unknown error')
  }
}

/**
 * Validate PIN for a profile
 * 
 * @param profileId - Profile ID
 * @param pin - PIN to validate
 * @returns Promise resolving to validation result
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string,
 *   data: { isValid: boolean }
 * }
 */
export const validateProfilePin = async (profileId: string, pin: string): Promise<boolean> => {
  try {
    // Interceptor returns response.data, so 'data' here is already the ApiResponse
    const data = await apiClient.post<ApiResponse<{ isValid: boolean }>>(`/profiles/${profileId}/validate-pin`, { pin })
    
    // Check if data is undefined or null
    if (!data) {
      throw new Error('Invalid response: response data is undefined')
    }
    
    // Expect ApiResponse format: { success, message, data }
    if (!data.success || !data.data) {
      return false
    }
    
    return data.data.isValid
  } catch (err) {
    logger.error('Error validating profile PIN', err instanceof Error ? err : new Error('Unknown error'))
    throw err instanceof Error ? err : new Error('Unknown error')
  }
}

