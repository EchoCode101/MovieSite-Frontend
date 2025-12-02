import { apiClient } from '@/config/api'
import { API_ERRORS } from '@/lib/api-errors'
import { extractData } from '@/lib/api-response'
import { logger } from '@/lib/logger'
import type { ApiResponse } from '@/types'

import type {
  CommentDetail,
  CommentListParams,
  CommentListResponse,
} from '../types'

const COMMENTS_BASE_PATH = '/comments'

/**
 * Get paginated list of comments (admin)
 */
export async function getComments(
  params: CommentListParams,
): Promise<CommentListResponse> {
  try {
    const response = (await apiClient.get<ApiResponse<CommentListResponse>>(
      `${COMMENTS_BASE_PATH}/paginated`,
      { params },
    )) as unknown as ApiResponse<CommentListResponse>

    return extractData(response)
  } catch (error) {
    logger.error('getComments failed', error)
    throw new Error(API_ERRORS.FETCH_FAILED('comments'))
  }
}

/**
 * Get comment by ID
 */
export async function getCommentById(id: string): Promise<CommentDetail> {
  try {
    const response = (await apiClient.get<ApiResponse<CommentDetail>>(
      `${COMMENTS_BASE_PATH}/${id}`,
    )) as unknown as ApiResponse<CommentDetail>

    return extractData(response)
  } catch (error) {
    logger.error('getCommentById failed', error)
    throw new Error(API_ERRORS.FETCH_FAILED('comment'))
  }
}

/**
 * Delete a comment (admin)
 */
export async function deleteComment(id: string): Promise<void> {
  try {
    await apiClient.delete<ApiResponse<null>>(`${COMMENTS_BASE_PATH}/${id}`)
  } catch (error) {
    logger.error('deleteComment failed', error)
    throw new Error(API_ERRORS.DELETE_FAILED('comment'))
  }
}

/**
 * Bulk delete comments (admin)
 */
export async function bulkDeleteComments(ids: string[]): Promise<{ deletedCount: number }> {
  try {
    const response = (await apiClient.delete<ApiResponse<{ deletedCount: number }>>(
      `${COMMENTS_BASE_PATH}/bulk`,
      { data: { ids } },
    )) as unknown as ApiResponse<{ deletedCount: number }>

    return extractData(response)
  } catch (error) {
    logger.error('bulkDeleteComments failed', error)
    throw new Error(API_ERRORS.DELETE_FAILED('comments'))
  }
}

