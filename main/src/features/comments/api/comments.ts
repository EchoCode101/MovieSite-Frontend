import { apiClient } from '@/config/api'
import type { ApiResponse } from '@/lib/api-response'
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
      throw new Error('Invalid response: response is not an object')
    }

    if (!response.success) {
      throw new Error(response.message || 'Failed to fetch comments')
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
      throw new Error('Invalid response: response is not an object')
    }

    if (!response.success) {
      throw new Error(response.message || 'Failed to fetch comments')
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
      throw new Error('Invalid response: response is undefined')
    }
    if (!response.success) {
      throw new Error(response.message || 'Failed to create comment')
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
      throw new Error('Invalid response: response is undefined')
    }
    if (!response.success) {
      throw new Error(response.message || 'Failed to update comment')
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
      throw new Error('Invalid response: response is not an object')
    }

    if (!response.success) {
      throw new Error(response.message || 'Failed to delete comment')
    }
  } catch (err) {
    throw err instanceof Error ? err : new Error('Unknown error')
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
      throw new Error('Invalid response: response is not an object')
    }

    if (!response.success) {
      throw new Error(response.message || 'Failed to fetch replies')
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
      throw new Error('Invalid response: response is undefined')
    }
    if (!response.success) {
      throw new Error(response.message || 'Failed to create reply')
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
      throw new Error('Invalid response: response is undefined')
    }
    if (!response.success) {
      throw new Error(response.message || 'Failed to update reply')
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
      throw new Error('Invalid response: response is not an object')
    }

    if (!response.success) {
      throw new Error(response.message || 'Failed to delete reply')
    }
  } catch (err) {
    throw err instanceof Error ? err : new Error('Unknown error')
  }
}
