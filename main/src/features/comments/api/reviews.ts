import { apiClient } from '@/config/api'
import type { ApiResponse } from '@/lib/api-response'
import type { Review, CreateReviewData, UpdateReviewData } from '../types'

/**
 * Fetch reviews for a video
 * 
 * @param videoId - Video ID
 * @returns Promise resolving to reviews array
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string,
 *   data: Review[]
 * }
 */
export const fetchReviewsByVideo = async (videoId: string): Promise<Review[]> => {
  try {
    // Interceptor returns response.data directly, so 'response' is already the ApiResponse
    const response = await apiClient.get<ApiResponse<Review[]>>(`/reviews/video/${videoId}`) as unknown as ApiResponse<Review[]>

    if (!response || typeof response !== 'object') {
      throw new Error('Invalid response: response is not an object')
    }

    if (!response.success) {
      throw new Error(response.message || 'Failed to fetch reviews')
    }
    // Validate shape
    if (!response.data) {
      throw new Error('Invalid response: missing data field')
    }
    if (!Array.isArray(response.data)) {
      throw new Error('Invalid response: data is not an array')
    }
    return response.data
  } catch (err) {
    throw err instanceof Error ? err : new Error('Unknown error')
  }
}

/**
 * Fetch reviews by target type and ID
 * 
 * @param targetType - Target type (video, movie, tvshow, episode)
 * @param targetId - Target ID
 * @returns Promise resolving to reviews array
 */
export const fetchReviewsByTarget = async (targetType: string, targetId: string): Promise<Review[]> => {
  try {
    const response = await apiClient.get<ApiResponse<Review[]>>(`/reviews/target/${targetType}/${targetId}`) as unknown as ApiResponse<Review[]>

    if (!response || typeof response !== 'object') {
      throw new Error('Invalid response: response is not an object')
    }

    if (!response.success) {
      throw new Error(response.message || 'Failed to fetch reviews')
    }
    if (!response.data) {
      throw new Error('Invalid response: missing data field')
    }
    if (!Array.isArray(response.data)) {
      throw new Error('Invalid response: data is not an array')
    }
    return response.data
  } catch (err) {
    throw err instanceof Error ? err : new Error('Unknown error')
  }
}

/**
 * Create a new review
 * 
 * @param data - Review data
 * @returns Promise resolving to created review
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string,
 *   data: Review
 * }
 */
export const createReview = async (data: CreateReviewData): Promise<Review> => {
  try {
    // Interceptor returns response.data, so 'response' is already the ApiResponse
    const response = await apiClient.post<ApiResponse<Review>>('/reviews', data) as unknown as ApiResponse<Review>
    if (!response) {
      throw new Error('Invalid response: response is undefined')
    }
    if (!response.success) {
      throw new Error(response.message || 'Failed to create review')
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
 * Update a review
 * 
 * @param reviewId - Review ID
 * @param data - Update data
 * @returns Promise resolving to updated review
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string,
 *   data: Review
 * }
 */
export const updateReview = async (reviewId: string, data: UpdateReviewData): Promise<Review> => {
  try {
    // Interceptor returns response.data, so 'response' is already the ApiResponse
    const response = await apiClient.put<ApiResponse<Review>>(`/reviews/${reviewId}`, data) as unknown as ApiResponse<Review>
    if (!response) {
      throw new Error('Invalid response: response is undefined')
    }
    if (!response.success) {
      throw new Error(response.message || 'Failed to update review')
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
 * Delete a review
 * 
 * @param reviewId - Review ID
 * @returns Promise resolving when deletion is complete
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string
 * }
 */
export const deleteReview = async (reviewId: string): Promise<void> => {
  try {
    // Interceptor returns response.data directly, so 'response' is already the ApiResponse
    const response = await apiClient.delete<ApiResponse<null>>(`/reviews/${reviewId}`) as unknown as ApiResponse<null>

    if (!response || typeof response !== 'object') {
      throw new Error('Invalid response: response is not an object')
    }

    if (!response.success) {
      throw new Error(response.message || 'Failed to delete review')
    }
  } catch (err) {
    throw err instanceof Error ? err : new Error('Unknown error')
  }
}
