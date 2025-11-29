import { apiClient } from '@/config/api'
import type { ApiResponse } from '@/lib/api-response'
import type { LikeDislikeResponse, LikeDislikeCounts, ToggleLikeDislikeData } from '../types'

/**
 * Toggle like/dislike on a target
 * 
 * @param data - Like/dislike data
 * @returns Promise resolving to like/dislike response
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string,
 *   data: LikeDislikeResponse | { removed: true }
 * }
 */
export const toggleLikeDislike = async (data: ToggleLikeDislikeData): Promise<LikeDislikeResponse> => {
  try {
    // Interceptor returns response.data, so 'response' is already the ApiResponse
    const response = await apiClient.post<ApiResponse<{ likeDislike?: { is_like: boolean }; removed?: boolean }>>(
      '/likes-dislikes',
      data
    ) as unknown as ApiResponse<{ likeDislike?: { is_like: boolean }; removed?: boolean }>
    if (!response) {
      throw new Error('Invalid response: response is undefined')
    }
    if (!response.success) {
      throw new Error(response.message || 'Failed to toggle like/dislike')
    }
    // Validate shape
    if (!response.data) {
      throw new Error('Invalid response: missing data field')
    }
    // Handle removed case
    if ('removed' in response.data && response.data.removed) {
      return { removed: true } as LikeDislikeResponse
    }
    // Extract is_like from likeDislike object
    if (response.data.likeDislike && typeof response.data.likeDislike.is_like === 'boolean') {
      return { is_like: response.data.likeDislike.is_like } as LikeDislikeResponse
    }
    // Fallback (shouldn't happen)
    return { is_like: data.is_like } as LikeDislikeResponse
  } catch (err) {
    throw err instanceof Error ? err : new Error('Unknown error')
  }
}

/**
 * Get like/dislike counts for a target
 * 
 * @param targetType - Target type (video, comment, review, comment_reply)
 * @param targetId - Target ID
 * @returns Promise resolving to counts object
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string,
 *   data: { likes: number, dislikes: number }
 * }
 */
export const getLikeDislikeCounts = async (targetType: string, targetId: string): Promise<LikeDislikeCounts> => {
  try {
    // Interceptor returns response.data directly, so 'response' is already the ApiResponse
    const response = await apiClient.get<ApiResponse<LikeDislikeCounts>>(`/likes-dislikes/${targetType}/${targetId}`) as unknown as ApiResponse<LikeDislikeCounts>

    if (!response || typeof response !== 'object') {
      throw new Error('Invalid response: response is not an object')
    }

    if (!response.success) {
      throw new Error(response.message || 'Failed to fetch like/dislike counts')
    }
    // Validate shape
    if (!response.data) {
      throw new Error('Invalid response: missing data field')
    }
    if (typeof response.data.likes !== 'number' || typeof response.data.dislikes !== 'number') {
      throw new Error('Invalid response: counts must be numbers')
    }
    return response.data
  } catch (err) {
    throw err instanceof Error ? err : new Error('Unknown error')
  }
}

/**
 * Get user's reaction to a target
 * 
 * @param targetType - Target type (video, comment, review, comment_reply)
 * @param targetId - Target ID
 * @returns Promise resolving to user reaction
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string,
 *   data: { hasReacted: boolean, isLike: boolean | null }
 * }
 */
export const getUserReaction = async (
  targetType: string,
  targetId: string
): Promise<{ hasReacted: boolean; isLike: boolean | null }> => {
  try {
    // Interceptor returns response.data directly, so 'response' is already the ApiResponse
    const response = await apiClient.get<ApiResponse<{ hasReacted: boolean; isLike: boolean | null }>>(
      `/likes-dislikes/user/${targetType}/${targetId}`
    ) as unknown as ApiResponse<{ hasReacted: boolean; isLike: boolean | null }>

    if (!response || typeof response !== 'object') {
      throw new Error('Invalid response: response is not an object')
    }

    if (!response.success) {
      throw new Error(response.message || 'Failed to fetch user reaction')
    }
    // Validate shape
    if (!response.data) {
      throw new Error('Invalid response: missing data field')
    }
    if (typeof response.data.hasReacted !== 'boolean') {
      throw new Error('Invalid response: hasReacted must be boolean')
    }
    return response.data
  } catch (err) {
    throw err instanceof Error ? err : new Error('Unknown error')
  }
}
