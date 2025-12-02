import { apiClient } from '@/config/api'
import type { ApiResponse } from '@/lib/api-response'
import { API_ERRORS } from '@/lib/api-errors'
import type { Video } from '@/features/videos/types'

interface UserVideosData {
  currentPage: number
  totalPages: number
  totalItems: number
  videos: Video[]
}

interface VideoUrlData {
  video_url: string
  title: string
}

interface UserProfileData {
  id: string
  username: string
  email: string
  first_name?: string
  last_name?: string
  profile_pic?: string | null
  subscription_plan?: string
}

/**
 * Get user's saved videos
 * 
 * @param params - Pagination parameters
 * @returns Promise resolving to paginated videos response
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string,
 *   data: {
 *     currentPage: number,
 *     totalPages: number,
 *     totalItems: number,
 *     videos: Video[]
 *   }
 * }
 */
export const getUserVideos = async (params?: { page?: number; limit?: number }): Promise<UserVideosData> => {
  try {
    // Interceptor returns response.data directly, so 'response' is already the ApiResponse
    const response = await apiClient.get<ApiResponse<UserVideosData>>('/users/videos', { params }) as unknown as ApiResponse<UserVideosData>

    if (!response || typeof response !== 'object') {
      throw new Error(API_ERRORS.INVALID_RESPONSE_FORMAT)
    }

    if (!response.success) {
      throw new Error(response.message || API_ERRORS.FETCH_FAILED('user videos'))
    }
    // Validate shape
    if (!response.data) {
      throw new Error(API_ERRORS.MISSING_DATA_FIELD)
    }
    if (!Array.isArray(response.data.videos)) {
      throw new Error(API_ERRORS.NOT_ARRAY('videos'))
    }
    return response.data
  } catch (err) {
    throw err instanceof Error ? err : new Error(API_ERRORS.UNKNOWN_ERROR)
  }
}

/**
 * Save video URL
 * 
 * @param data - Video data
 * @returns Promise resolving to saved video
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string,
 *   data: Video
 * }
 */
export const saveVideoUrl = async (data: { video_url: string; title: string }): Promise<Video> => {
  try {
    // Interceptor returns response.data, so 'response' is already the ApiResponse
    const response = await apiClient.post<ApiResponse<Video>>('/users/saveVideoUrl', data) as unknown as ApiResponse<Video>
    if (!response) {
      throw new Error(API_ERRORS.INVALID_RESPONSE)
    }
    if (!response.success) {
      throw new Error(response.message || API_ERRORS.CREATE_FAILED('video'))
    }
    // Validate shape
    if (!response.data) {
      throw new Error(API_ERRORS.MISSING_DATA_FIELD)
    }
    return response.data
  } catch (err) {
    throw err instanceof Error ? err : new Error(API_ERRORS.UNKNOWN_ERROR)
  }
}

/**
 * Fetch video URL
 * 
 * @param videoId - Video ID
 * @returns Promise resolving to video URL data
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string,
 *   data: {
 *     video_url: string,
 *     title: string
 *   }
 * }
 */
export const fetchVideoUrl = async (videoId: string): Promise<VideoUrlData> => {
  try {
    // Interceptor returns response.data directly, so 'response' is already the ApiResponse
    const response = await apiClient.get<ApiResponse<VideoUrlData>>(`/users/fetchVideoUrl/${videoId}`) as unknown as ApiResponse<VideoUrlData>

    if (!response || typeof response !== 'object') {
      throw new Error(API_ERRORS.INVALID_RESPONSE_FORMAT)
    }

    if (!response.success) {
      throw new Error(response.message || API_ERRORS.FETCH_FAILED('video URL'))
    }
    // Validate shape
    if (!response.data) {
      throw new Error(API_ERRORS.MISSING_DATA_FIELD)
    }
    return response.data
  } catch (err) {
    throw err instanceof Error ? err : new Error(API_ERRORS.UNKNOWN_ERROR)
  }
}

/**
 * Update user profile
 * 
 * @param data - Profile update data
 * @returns Promise resolving to updated user profile
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string,
 *   data: UserProfileData
 * }
 */
export const updateUserProfile = async (data: {
  first_name?: string
  last_name?: string
  profile_pic?: string
  username?: string
}): Promise<UserProfileData> => {
  try {
    // Interceptor returns response.data, so 'response' is already the ApiResponse
    const response = await apiClient.put<ApiResponse<UserProfileData>>('/users/me', data) as unknown as ApiResponse<UserProfileData>
    if (!response) {
      throw new Error(API_ERRORS.INVALID_RESPONSE)
    }
    if (!response.success) {
      throw new Error(response.message || API_ERRORS.UPDATE_FAILED('profile'))
    }
    // Validate shape
    if (!response.data) {
      throw new Error(API_ERRORS.MISSING_DATA_FIELD)
    }
    return response.data
  } catch (err) {
    throw err instanceof Error ? err : new Error(API_ERRORS.UNKNOWN_ERROR)
  }
}

/**
 * Update user subscription plan
 * 
 * @param plan - Subscription plan name
 * @returns Promise resolving when update is complete
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string,
 *   data: { subscription_plan: string }
 * }
 */
export const updateUserSubscription = async (plan: string): Promise<{ subscription_plan: string }> => {
  try {
    // Interceptor returns response.data directly, so 'response' is already the ApiResponse
    const response = await apiClient.put<ApiResponse<{ subscription_plan: string }>>('/users/subscription_plan', {
      subscription_plan: plan,
    })

    if (!response || typeof response !== 'object') {
      throw new Error(API_ERRORS.INVALID_RESPONSE_FORMAT)
    }

    if (!response.success) {
      throw new Error(response.message || API_ERRORS.UPDATE_FAILED('subscription plan'))
    }
    // Validate shape
    if (!response.data) {
      throw new Error(API_ERRORS.MISSING_DATA_FIELD)
    }
    return response.data
  } catch (err) {
    throw err instanceof Error ? err : new Error(API_ERRORS.UNKNOWN_ERROR)
  }
}

/**
 * Delete saved video
 * 
 * @param id - Video ID
 * @returns Promise resolving when deletion is complete
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string
 * }
 */
export const deleteSavedVideo = async (id: string): Promise<void> => {
  try {
    // Interceptor returns response.data directly, so 'response' is already the ApiResponse
    const response = await apiClient.delete<ApiResponse<null>>(`/users/videos/${id}`)

    if (!response || typeof response !== 'object') {
      throw new Error(API_ERRORS.INVALID_RESPONSE_FORMAT)
    }

    if (!response.success) {
      throw new Error(response.message || API_ERRORS.DELETE_FAILED('video'))
    }
  } catch (err) {
    throw err instanceof Error ? err : new Error(API_ERRORS.UNKNOWN_ERROR)
  }
}

/**
 * Forgot password
 * 
 * @param email - User email
 * @returns Promise resolving when email is sent
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string
 * }
 */
export const forgotPassword = async (email: string): Promise<void> => {
  try {
    // Interceptor returns response.data, so 'response' is already the ApiResponse
    const response = await apiClient.post<ApiResponse<null>>('/users/forgotPassword', { email }) as unknown as ApiResponse<null>
    if (!response) {
      throw new Error(API_ERRORS.INVALID_RESPONSE)
    }
    if (!response.success) {
      throw new Error(response.message || 'Failed to send password reset email')
    }
  } catch (err) {
    throw err instanceof Error ? err : new Error(API_ERRORS.UNKNOWN_ERROR)
  }
}

/**
 * Reset password
 * 
 * @param token - Password reset token
 * @param password - New password
 * @returns Promise resolving when password is reset
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string
 * }
 */
export const resetPassword = async (token: string, password: string): Promise<void> => {
  try {
    // Interceptor returns response.data, so 'response' is already the ApiResponse
    const response = await apiClient.post<ApiResponse<null>>(`/users/forgotPassword/reset/${token}`, { password }) as unknown as ApiResponse<null>
    if (!response) {
      throw new Error(API_ERRORS.INVALID_RESPONSE)
    }
    if (!response.success) {
      throw new Error(response.message || 'Failed to reset password')
    }
  } catch (err) {
    throw err instanceof Error ? err : new Error(API_ERRORS.UNKNOWN_ERROR)
  }
}
