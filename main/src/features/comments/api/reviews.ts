import { apiClient } from '@/config/api'
import type { ApiResponse } from '@/lib/api-response'
import { logger } from '@/lib/logger'
import { API_ERRORS } from '@/lib/api-errors'
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
      throw new Error(API_ERRORS.INVALID_RESPONSE_FORMAT)
    }

    if (!response.success) {
      throw new Error(response.message || API_ERRORS.FETCH_FAILED('reviews'))
    }
    // Validate shape
    if (!response.data) {
      throw new Error(API_ERRORS.MISSING_DATA_FIELD)
    }
    if (!Array.isArray(response.data)) {
      throw new Error(API_ERRORS.NOT_ARRAY('data'))
    }
    return response.data
  } catch (err) {
    logger.error('Error in reviews operation', err instanceof Error ? err : new Error('Unknown error'))
    throw err instanceof Error ? err : new Error(API_ERRORS.UNKNOWN_ERROR)
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
      throw new Error(API_ERRORS.INVALID_RESPONSE_FORMAT)
    }

    if (!response.success) {
      throw new Error(response.message || API_ERRORS.FETCH_FAILED('reviews'))
    }
    if (!response.data) {
      throw new Error(API_ERRORS.MISSING_DATA_FIELD)
    }
    if (!Array.isArray(response.data)) {
      throw new Error(API_ERRORS.NOT_ARRAY('data'))
    }
    return response.data
  } catch (err) {
    logger.error('Error in reviews operation', err instanceof Error ? err : new Error('Unknown error'))
    throw err instanceof Error ? err : new Error(API_ERRORS.UNKNOWN_ERROR)
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
      throw new Error(API_ERRORS.RESPONSE_DATA_UNDEFINED)
    }
    if (!response.success) {
      throw new Error(response.message || API_ERRORS.CREATE_FAILED('review'))
    }
    // Validate shape
    if (!response.data) {
      throw new Error(API_ERRORS.MISSING_DATA_FIELD)
    }
    return response.data
  } catch (err) {
    logger.error('Error in reviews operation', err instanceof Error ? err : new Error('Unknown error'))
    throw err instanceof Error ? err : new Error(API_ERRORS.UNKNOWN_ERROR)
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
      throw new Error(API_ERRORS.RESPONSE_DATA_UNDEFINED)
    }
    if (!response.success) {
      throw new Error(response.message || API_ERRORS.UPDATE_FAILED('review'))
    }
    // Validate shape
    if (!response.data) {
      throw new Error(API_ERRORS.MISSING_DATA_FIELD)
    }
    return response.data
  } catch (err) {
    logger.error('Error in reviews operation', err instanceof Error ? err : new Error('Unknown error'))
    throw err instanceof Error ? err : new Error(API_ERRORS.UNKNOWN_ERROR)
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
      throw new Error(API_ERRORS.INVALID_RESPONSE_FORMAT)
    }

    if (!response.success) {
      throw new Error(response.message || API_ERRORS.DELETE_FAILED('review'))
    }
  } catch (err) {
    logger.error('Error in reviews operation', err instanceof Error ? err : new Error('Unknown error'))
    throw err instanceof Error ? err : new Error(API_ERRORS.UNKNOWN_ERROR)
  }
}

/**
 * Paginated reviews response type
 */
export interface PaginatedReviewsData {
  currentPage: number
  totalPages: number
  totalItems: number
  reviews: Review[]
}

/**
 * Get paginated reviews
 *
 * @param params - Pagination and filter parameters
 * @returns Promise resolving to paginated reviews response
 *
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string,
 *   data: {
 *     currentPage: number,
 *     totalPages: number,
 *     totalItems: number,
 *     reviews: ReviewWithStats[]
 *   }
 * }
 */
export const getPaginatedReviews = async (params?: {
  page?: number
  limit?: number
  sort?: string
  order?: 'ASC' | 'DESC'
  target_type?: string
  target_id?: string
}): Promise<PaginatedReviewsData> => {
  try {
    const queryParams = new URLSearchParams()
    if (params?.page) queryParams.append('page', params.page.toString())
    if (params?.limit) queryParams.append('limit', params.limit.toString())
    if (params?.sort) queryParams.append('sort', params.sort)
    if (params?.order) queryParams.append('order', params.order)
    if (params?.target_type) queryParams.append('target_type', params.target_type)
    if (params?.target_id) queryParams.append('target_id', params.target_id)

    const response = await apiClient.get<ApiResponse<PaginatedReviewsData>>(
      `/reviews/paginated?${queryParams.toString()}`
    ) as unknown as ApiResponse<PaginatedReviewsData>

    if (!response || typeof response !== 'object') {
      throw new Error(API_ERRORS.INVALID_RESPONSE_FORMAT)
    }

    if (!response.success) {
      throw new Error(response.message || API_ERRORS.FETCH_FAILED('paginated reviews'))
    }

    if (!response.data) {
      throw new Error(API_ERRORS.MISSING_DATA_FIELD)
    }

    if (!Array.isArray(response.data.reviews)) {
      throw new Error(API_ERRORS.NOT_ARRAY('reviews'))
    }

    // Transform backend response to match frontend Review type
    // Backend returns 'member' but frontend expects 'member_id'
    const transformedReviews: Review[] = response.data.reviews.map((review: any) => ({
      _id: review._id,
      video_id: review.target?._id || review.video_id || '',
      member_id: review.member
        ? {
          _id: review.member._id,
          username: review.member.username || '',
          first_name: review.member.first_name,
          last_name: review.member.last_name,
          profile_pic: review.member.profile_pic,
        }
        : review.member_id || {
          _id: '',
          username: '',
        },
      review_content: review.review_content || review.content || '',
      rating: review.rating,
      likesCount: review.likesCount,
      dislikesCount: review.dislikesCount,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
    }))

    return {
      currentPage: response.data.currentPage,
      totalPages: response.data.totalPages,
      totalItems: response.data.totalItems,
      reviews: transformedReviews,
    }
  } catch (err) {
    logger.error('Error fetching paginated reviews', err instanceof Error ? err : new Error('Unknown error'))
    throw err instanceof Error ? err : new Error(API_ERRORS.UNKNOWN_ERROR)
  }
}

/**
 * Fetch recent reviews
 *
 * @param params - Filter parameters (e.g., startDate, endDate)
 * @returns Promise resolving to recent reviews array
 *
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string,
 *   data: Review[]
 * }
 */
export const getRecentReviews = async (params?: {
  startDate?: string
  endDate?: string
}): Promise<Review[]> => {
  try {
    const queryParams = new URLSearchParams()
    if (params?.startDate) queryParams.append('startDate', params.startDate)
    if (params?.endDate) queryParams.append('endDate', params.endDate)

    const response = await apiClient.get<ApiResponse<Review[]>>(
      `/reviews/recent?${queryParams.toString()}`
    ) as unknown as ApiResponse<Review[]>

    if (!response || typeof response !== 'object') {
      throw new Error(API_ERRORS.INVALID_RESPONSE_FORMAT)
    }

    if (!response.success) {
      throw new Error(response.message || API_ERRORS.FETCH_FAILED('recent reviews'))
    }

    if (!response.data) {
      throw new Error(API_ERRORS.MISSING_DATA_FIELD)
    }

    if (!Array.isArray(response.data)) {
      throw new Error(API_ERRORS.NOT_ARRAY('reviews'))
    }

    return response.data
  } catch (err) {
    logger.error('Error fetching recent reviews', err instanceof Error ? err : new Error('Unknown error'))
    throw err instanceof Error ? err : new Error(API_ERRORS.UNKNOWN_ERROR)
  }
}

/**
 * Get user's own reviews with pagination
 *
 * @param params - Pagination and filter parameters
 * @returns Promise resolving to paginated reviews response
 *
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string,
 *   data: {
 *     currentPage: number,
 *     totalPages: number,
 *     totalItems: number,
 *     reviews: ReviewWithStats[]
 *   }
 * }
 */
export const getMyReviews = async (params?: {
  page?: number
  limit?: number
  sort?: string
  order?: 'ASC' | 'DESC'
  target_type?: string
  target_id?: string
}): Promise<PaginatedReviewsData> => {
  try {
    const queryParams = new URLSearchParams()
    if (params?.page) queryParams.append('page', params.page.toString())
    if (params?.limit) queryParams.append('limit', params.limit.toString())
    if (params?.sort) queryParams.append('sort', params.sort)
    if (params?.order) queryParams.append('order', params.order)
    if (params?.target_type) queryParams.append('target_type', params.target_type)
    if (params?.target_id) queryParams.append('target_id', params.target_id)

    const response = await apiClient.get<ApiResponse<PaginatedReviewsData>>(
      `/reviews/my?${queryParams.toString()}`
    ) as unknown as ApiResponse<PaginatedReviewsData>

    if (!response || typeof response !== 'object') {
      throw new Error(API_ERRORS.INVALID_RESPONSE_FORMAT)
    }

    if (!response.success) {
      throw new Error(response.message || API_ERRORS.FETCH_FAILED('user reviews'))
    }

    if (!response.data) {
      throw new Error(API_ERRORS.MISSING_DATA_FIELD)
    }

    if (!Array.isArray(response.data.reviews)) {
      throw new Error(API_ERRORS.NOT_ARRAY('reviews'))
    }

    // Transform backend response to match frontend Review type
    const transformedReviews: Review[] = response.data.reviews.map((review: any) => ({
      _id: review._id,
      video_id: review.target?._id || review.video_id || '',
      member_id: review.member
        ? {
          _id: review.member._id,
          username: review.member.username || '',
          first_name: review.member.first_name,
          last_name: review.member.last_name,
          profile_pic: review.member.profile_pic,
        }
        : review.member_id || {
          _id: '',
          username: '',
        },
      review_content: review.review_content || review.content || '',
      rating: review.rating,
      likesCount: review.likesCount,
      dislikesCount: review.dislikesCount,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
    }))

    return {
      currentPage: response.data.currentPage,
      totalPages: response.data.totalPages,
      totalItems: response.data.totalItems,
      reviews: transformedReviews,
    }
  } catch (err) {
    logger.error('Error fetching user reviews', err instanceof Error ? err : new Error('Unknown error'))
    throw err instanceof Error ? err : new Error(API_ERRORS.UNKNOWN_ERROR)
  }
}

/**
 * Bulk delete reviews
 * 
 * Note: Users can only delete their own reviews. Admins can delete any reviews.
 * 
 * @param reviewIds - Array of review IDs to delete
 * @returns Promise resolving when deletion is complete
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string
 * }
 */
export const bulkDeleteReviews = async (reviewIds: string[]): Promise<void> => {
  try {
    const response = await apiClient.delete<ApiResponse<null>>('/reviews/bulk', {
      data: { ids: reviewIds },
    }) as unknown as ApiResponse<null>

    if (!response || typeof response !== 'object') {
      throw new Error(API_ERRORS.INVALID_RESPONSE_FORMAT)
    }

    if (!response.success) {
      throw new Error(response.message || API_ERRORS.DELETE_FAILED('reviews'))
    }
  } catch (err) {
    logger.error('Error bulk deleting reviews', err instanceof Error ? err : new Error('Unknown error'))
    throw err instanceof Error ? err : new Error(API_ERRORS.UNKNOWN_ERROR)
  }
}