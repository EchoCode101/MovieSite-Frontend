import { apiClient } from '@/config/api'
import { API_ERRORS } from '@/lib/api-errors'
import { extractData } from '@/lib/api-response'
import { logger } from '@/lib/logger'
import type { ApiResponse } from '@/types'

import type {
  ReviewDetail,
  ReviewListParams,
  ReviewListResponse,
} from '../types'

const REVIEWS_BASE_PATH = '/reviews'

/**
 * Get paginated list of reviews (admin)
 */
export async function getReviews(
  params: ReviewListParams,
): Promise<ReviewListResponse> {
  try {
    const response = (await apiClient.get<ApiResponse<ReviewListResponse>>(
      `${REVIEWS_BASE_PATH}/paginated`,
      { params },
    )) as unknown as ApiResponse<ReviewListResponse>

    return extractData(response)
  } catch (error) {
    logger.error('getReviews failed', error)
    throw new Error(API_ERRORS.FETCH_FAILED('reviews'))
  }
}

/**
 * Get review by ID
 */
export async function getReviewById(id: string): Promise<ReviewDetail> {
  try {
    const response = (await apiClient.get<ApiResponse<ReviewDetail>>(
      `${REVIEWS_BASE_PATH}/${id}`,
    )) as unknown as ApiResponse<ReviewDetail>

    return extractData(response)
  } catch (error) {
    logger.error('getReviewById failed', error)
    throw new Error(API_ERRORS.FETCH_FAILED('review'))
  }
}

/**
 * Delete a review (admin)
 */
export async function deleteReview(id: string): Promise<void> {
  try {
    await apiClient.delete<ApiResponse<null>>(`${REVIEWS_BASE_PATH}/${id}`)
  } catch (error) {
    logger.error('deleteReview failed', error)
    throw new Error(API_ERRORS.DELETE_FAILED('review'))
  }
}

/**
 * Bulk delete reviews (admin)
 */
export async function bulkDeleteReviews(ids: string[]): Promise<{ deletedCount: number }> {
  try {
    const response = (await apiClient.delete<ApiResponse<{ deletedCount: number }>>(
      `${REVIEWS_BASE_PATH}/bulk`,
      { data: { ids } },
    )) as unknown as ApiResponse<{ deletedCount: number }>

    return extractData(response)
  } catch (error) {
    logger.error('bulkDeleteReviews failed', error)
    throw new Error(API_ERRORS.DELETE_FAILED('reviews'))
  }
}

