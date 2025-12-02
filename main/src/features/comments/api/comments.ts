import { apiClient } from '@/config/api'
import type { ApiResponse } from '@/lib/api-response'
import { logger } from '@/lib/logger'
import { API_ERRORS } from '@/lib/api-errors'
import type { Comment, CreateCommentData, UpdateCommentData, Reply, CreateReplyData, UpdateReplyData } from '../types'

/**
 * Fetch comments for a video
 * 
 * @param videoId - Video ID
 * @returns Promise resolving to comments array
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string,
 *   data: Comment[]
 * }
 */
export const fetchCommentsByVideo = async (videoId: string): Promise<Comment[]> => {
  try {
    // Interceptor returns response.data directly, so 'response' is already the ApiResponse
    const response = await apiClient.get<ApiResponse<Comment[]>>(`/comments/video/${videoId}`) as unknown as ApiResponse<Comment[]>

    if (!response || typeof response !== 'object') {
      throw new Error(API_ERRORS.INVALID_RESPONSE_FORMAT)
    }

    if (!response.success) {
      throw new Error(response.message || API_ERRORS.FETCH_FAILED('comments'))
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
    logger.error('Error in comments operation', err instanceof Error ? err : new Error('Unknown error'))
    throw err instanceof Error ? err : new Error(API_ERRORS.UNKNOWN_ERROR)
  }
}

/**
 * Fetch comments by target type and ID
 * 
 * @param targetType - Target type (video, movie, tvshow, episode)
 * @param targetId - Target ID
 * @returns Promise resolving to comments array
 */
export const fetchCommentsByTarget = async (targetType: string, targetId: string): Promise<Comment[]> => {
  try {
    const response = await apiClient.get<ApiResponse<Comment[]>>(`/comments/target/${targetType}/${targetId}`) as unknown as ApiResponse<Comment[]>

    if (!response || typeof response !== 'object') {
      throw new Error(API_ERRORS.INVALID_RESPONSE_FORMAT)
    }

    if (!response.success) {
      throw new Error(response.message || API_ERRORS.FETCH_FAILED('comments'))
    }
    if (!response.data) {
      throw new Error(API_ERRORS.MISSING_DATA_FIELD)
    }
    if (!Array.isArray(response.data)) {
      throw new Error(API_ERRORS.NOT_ARRAY('data'))
    }
    return response.data
  } catch (err) {
    logger.error('Error in comments operation', err instanceof Error ? err : new Error('Unknown error'))
    throw err instanceof Error ? err : new Error(API_ERRORS.UNKNOWN_ERROR)
  }
}

/**
 * Create a new comment
 * 
 * @param data - Comment data
 * @returns Promise resolving to created comment
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string,
 *   data: Comment
 * }
 */
export const createComment = async (data: CreateCommentData): Promise<Comment> => {
  try {
    // Interceptor returns response.data, so 'response' is already the ApiResponse
    const response = await apiClient.post<ApiResponse<Comment>>('/comments', data) as unknown as ApiResponse<Comment>
    if (!response) {
      throw new Error(API_ERRORS.RESPONSE_DATA_UNDEFINED)
    }
    if (!response.success) {
      throw new Error(response.message || API_ERRORS.CREATE_FAILED('comment'))
    }
    // Validate shape
    if (!response.data) {
      throw new Error(API_ERRORS.MISSING_DATA_FIELD)
    }
    return response.data
  } catch (err) {
    logger.error('Error in comments operation', err instanceof Error ? err : new Error('Unknown error'))
    throw err instanceof Error ? err : new Error(API_ERRORS.UNKNOWN_ERROR)
  }
}

/**
 * Update a comment
 * 
 * @param commentId - Comment ID
 * @param data - Update data
 * @returns Promise resolving to updated comment
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string,
 *   data: Comment
 * }
 */
export const updateComment = async (commentId: string, data: UpdateCommentData): Promise<Comment> => {
  try {
    // Interceptor returns response.data, so 'response' is already the ApiResponse
    const response = await apiClient.put<ApiResponse<Comment>>(`/comments/${commentId}`, data) as unknown as ApiResponse<Comment>
    if (!response) {
      throw new Error(API_ERRORS.RESPONSE_DATA_UNDEFINED)
    }
    if (!response.success) {
      throw new Error(response.message || API_ERRORS.UPDATE_FAILED('comment'))
    }
    // Validate shape
    if (!response.data) {
      throw new Error(API_ERRORS.MISSING_DATA_FIELD)
    }
    return response.data
  } catch (err) {
    logger.error('Error in comments operation', err instanceof Error ? err : new Error('Unknown error'))
    throw err instanceof Error ? err : new Error(API_ERRORS.UNKNOWN_ERROR)
  }
}

/**
 * Delete a comment
 * 
 * @param commentId - Comment ID
 * @returns Promise resolving when deletion is complete
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string
 * }
 */
export const deleteComment = async (commentId: string): Promise<void> => {
  try {
    // Interceptor returns response.data directly, so 'response' is already the ApiResponse
    const response = await apiClient.delete<ApiResponse<null>>(`/comments/${commentId}`)

    if (!response || typeof response !== 'object') {
      throw new Error(API_ERRORS.INVALID_RESPONSE_FORMAT)
    }

    if (!response.success) {
      throw new Error(response.message || API_ERRORS.DELETE_FAILED('comment'))
    }
  } catch (err) {
    logger.error('Error in comments operation', err instanceof Error ? err : new Error('Unknown error'))
    throw err instanceof Error ? err : new Error(API_ERRORS.UNKNOWN_ERROR)
  }
}

/**
 * Fetch replies for a comment
 * 
 * @param commentId - Comment ID
 * @returns Promise resolving to replies array
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string,
 *   data: Reply[]
 * }
 */
export const fetchReplies = async (commentId: string): Promise<Reply[]> => {
  try {
    // Interceptor returns response.data directly, so 'response' is already the ApiResponse
    const response = await apiClient.get<ApiResponse<Reply[]>>(`/replies/${commentId}`) as unknown as ApiResponse<Reply[]>

    if (!response || typeof response !== 'object') {
      throw new Error(API_ERRORS.INVALID_RESPONSE_FORMAT)
    }

    if (!response.success) {
      throw new Error(response.message || API_ERRORS.FETCH_FAILED('replies'))
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
    logger.error('Error in comments operation', err instanceof Error ? err : new Error('Unknown error'))
    throw err instanceof Error ? err : new Error(API_ERRORS.UNKNOWN_ERROR)
  }
}

/**
 * Create a reply
 * 
 * @param data - Reply data
 * @returns Promise resolving to created reply
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string,
 *   data: Reply
 * }
 */
export const createReply = async (data: CreateReplyData): Promise<Reply> => {
  try {
    // Interceptor returns response.data, so 'response' is already the ApiResponse
    const response = await apiClient.post<ApiResponse<Reply>>('/replies', data) as unknown as ApiResponse<Reply>
    if (!response) {
      throw new Error(API_ERRORS.RESPONSE_DATA_UNDEFINED)
    }
    if (!response.success) {
      throw new Error(response.message || API_ERRORS.CREATE_FAILED('reply'))
    }
    // Validate shape
    if (!response.data) {
      throw new Error(API_ERRORS.MISSING_DATA_FIELD)
    }
    return response.data
  } catch (err) {
    logger.error('Error in comments operation', err instanceof Error ? err : new Error('Unknown error'))
    throw err instanceof Error ? err : new Error(API_ERRORS.UNKNOWN_ERROR)
  }
}

/**
 * Update a reply
 * 
 * @param replyId - Reply ID
 * @param data - Update data
 * @returns Promise resolving to updated reply
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string,
 *   data: Reply
 * }
 */
export const updateReply = async (replyId: string, data: UpdateReplyData): Promise<Reply> => {
  try {
    // Interceptor returns response.data, so 'response' is already the ApiResponse
    const response = await apiClient.put<ApiResponse<Reply>>(`/replies/${replyId}`, data) as unknown as ApiResponse<Reply>
    if (!response) {
      throw new Error(API_ERRORS.RESPONSE_DATA_UNDEFINED)
    }
    if (!response.success) {
      throw new Error(response.message || API_ERRORS.UPDATE_FAILED('reply'))
    }
    // Validate shape
    if (!response.data) {
      throw new Error(API_ERRORS.MISSING_DATA_FIELD)
    }
    return response.data
  } catch (err) {
    logger.error('Error in comments operation', err instanceof Error ? err : new Error('Unknown error'))
    throw err instanceof Error ? err : new Error(API_ERRORS.UNKNOWN_ERROR)
  }
}

/**
 * Delete a reply
 * 
 * @param replyId - Reply ID
 * @returns Promise resolving when deletion is complete
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string
 * }
 */
export const deleteReply = async (replyId: string): Promise<void> => {
  try {
    // Interceptor returns response.data directly, so 'response' is already the ApiResponse
    const response = await apiClient.delete<ApiResponse<null>>(`/replies/${replyId}`)

    if (!response || typeof response !== 'object') {
      throw new Error(API_ERRORS.INVALID_RESPONSE_FORMAT)
    }

    if (!response.success) {
      throw new Error(response.message || API_ERRORS.DELETE_FAILED('reply'))
    }
  } catch (err) {
    logger.error('Error in comments operation', err instanceof Error ? err : new Error('Unknown error'))
    throw err instanceof Error ? err : new Error(API_ERRORS.UNKNOWN_ERROR)
  }
}

/**
 * Get paginated comments
 * 
 * Note: Backend endpoint requires admin authentication.
 * For user profile, consider fetching user's comments via other endpoints and filtering client-side,
 * or implement a user-specific endpoint on the backend.
 * 
 * @param params - Pagination parameters
 * @returns Promise resolving to paginated comments response
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string,
 *   data: {
 *     comments: Comment[],
 *     currentPage: number,
 *     totalPages: number,
 *     totalItems: number
 *   }
 * }
 */
export const getPaginatedComments = async (params?: {
  page?: number
  limit?: number
  sort?: string
  order?: 'ASC' | 'DESC'
  target_type?: 'video' | 'movie' | 'tvshow' | 'episode'
  target_id?: string
}): Promise<{
  comments: Comment[]
  currentPage: number
  totalPages: number
  totalItems: number
}> => {
  try {
    const response = await apiClient.get<ApiResponse<{
      comments: Comment[]
      currentPage: number
      totalPages: number
      totalItems: number
    }>>('/comments/paginated', {
      params,
    }) as unknown as ApiResponse<{
      comments: Comment[]
      currentPage: number
      totalPages: number
      totalItems: number
    }>

    if (!response || typeof response !== 'object') {
      throw new Error(API_ERRORS.INVALID_RESPONSE_FORMAT)
    }

    if (!response.success) {
      throw new Error(response.message || API_ERRORS.FETCH_FAILED('comments'))
    }

    if (!response.data) {
      throw new Error(API_ERRORS.MISSING_DATA_FIELD)
    }

    return response.data
  } catch (err) {
    logger.error('Error fetching paginated comments', err instanceof Error ? err : new Error('Unknown error'))
    throw err instanceof Error ? err : new Error(API_ERRORS.UNKNOWN_ERROR)
  }
}

/**
 * Bulk delete comments
 * 
 * Note: Users can only delete their own comments. Admins can delete any comments.
 * 
 * @param commentIds - Array of comment IDs to delete
 * @returns Promise resolving when deletion is complete
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string
 * }
 */
export const bulkDeleteComments = async (commentIds: string[]): Promise<void> => {
  try {
    const response = await apiClient.delete<ApiResponse<null>>('/comments/bulk', {
      data: { ids: commentIds },
    }) as unknown as ApiResponse<null>

    if (!response || typeof response !== 'object') {
      throw new Error(API_ERRORS.INVALID_RESPONSE_FORMAT)
    }

    if (!response.success) {
      throw new Error(response.message || API_ERRORS.DELETE_FAILED('comments'))
    }
  } catch (err) {
    logger.error('Error bulk deleting comments', err instanceof Error ? err : new Error('Unknown error'))
    throw err instanceof Error ? err : new Error(API_ERRORS.UNKNOWN_ERROR)
  }
}

/**
 * Get user's own comments with pagination
 * 
 * @param params - Pagination parameters
 * @returns Promise resolving to paginated comments response
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string,
 *   data: {
 *     comments: Comment[],
 *     currentPage: number,
 *     totalPages: number,
 *     totalItems: number
 *   }
 * }
 */
export const getMyComments = async (params?: {
  page?: number
  limit?: number
  sort?: string
  order?: 'ASC' | 'DESC'
  target_type?: 'video' | 'movie' | 'tvshow' | 'episode'
  target_id?: string
}): Promise<{
  comments: Comment[]
  currentPage: number
  totalPages: number
  totalItems: number
}> => {
  try {
    const response = await apiClient.get<ApiResponse<{
      comments: Comment[]
      currentPage: number
      totalPages: number
      totalItems: number
    }>>('/comments/my', {
      params,
    }) as unknown as ApiResponse<{
      comments: Comment[]
      currentPage: number
      totalPages: number
      totalItems: number
    }>

    if (!response || typeof response !== 'object') {
      throw new Error(API_ERRORS.INVALID_RESPONSE_FORMAT)
    }

    if (!response.success) {
      throw new Error(response.message || API_ERRORS.FETCH_FAILED('comments'))
    }

    if (!response.data) {
      throw new Error(API_ERRORS.MISSING_DATA_FIELD)
    }

    return response.data
  } catch (err) {
    logger.error('Error fetching user comments', err instanceof Error ? err : new Error('Unknown error'))
    throw err instanceof Error ? err : new Error(API_ERRORS.UNKNOWN_ERROR)
  }
}
