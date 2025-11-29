import { apiClient } from '@/config/api'
import type { ApiResponse } from '@/lib/api-response'
import type {
  WatchlistItem,
  WatchlistResponse,
  AddToWatchlistData,
  UpdateProgressData,
  RemoveHistoryData,
  ContinueWatchingItem,
  WatchHistoryItem,
} from '../types'

/**
 * Add item to watchlist
 * 
 * @param data - Watchlist item data
 * @returns Promise resolving to created watchlist item
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string,
 *   data: WatchlistItem
 * }
 */
export const addToWatchlist = async (data: AddToWatchlistData): Promise<WatchlistItem> => {
  try {
    // Interceptor returns response.data, so 'response' is already the ApiResponse
    const response = await apiClient.post<ApiResponse<WatchlistItem>>('/watch/watchlist', data) as unknown as ApiResponse<WatchlistItem>
    if (!response) {
      throw new Error('Invalid response: response is undefined')
    }
    if (!response.success) {
      throw new Error(response.message || 'Failed to add to watchlist')
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
 * Remove item from watchlist
 * 
 * @param data - Watchlist item data
 * @returns Promise resolving when removal is complete
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string
 * }
 */
export const removeFromWatchlist = async (data: AddToWatchlistData): Promise<void> => {
  try {
    // Interceptor returns response.data, so 'response' is already the ApiResponse
    const response = await apiClient.delete<ApiResponse<null>>('/watch/watchlist', { data }) as unknown as ApiResponse<null>
    if (!response) {
      throw new Error('Invalid response: response is undefined')
    }
    if (!response.success) {
      throw new Error(response.message || 'Failed to remove from watchlist')
    }
  } catch (err) {
    throw err instanceof Error ? err : new Error('Unknown error')
  }
}

/**
 * Get watchlist
 * 
 * @param params - Query parameters (profile_id, target_type, page, limit)
 * @returns Promise resolving to watchlist response
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string,
 *   data: WatchlistResponse
 * }
 */
export const getWatchlist = async (params?: {
  profile_id?: string
  target_type?: 'movie' | 'tvshow' | 'episode'
  page?: number
  limit?: number
}): Promise<WatchlistResponse> => {
  try {
    // Interceptor returns response.data directly, so 'response' is already the ApiResponse
    const response = await apiClient.get<ApiResponse<WatchlistResponse>>('/watch/watchlist', { params }) as unknown as ApiResponse<WatchlistResponse>

    if (!response || typeof response !== 'object') {
      throw new Error('Invalid response: response is not an object')
    }

    if (!response.success) {
      throw new Error(response.message || 'Failed to fetch watchlist')
    }
    // Validate shape
    if (!response.data) {
      throw new Error('Invalid response: missing data field')
    }
    if (!Array.isArray(response.data.items)) {
      throw new Error('Invalid response: items is not an array')
    }
    return response.data
  } catch (err) {
    throw err instanceof Error ? err : new Error('Unknown error')
  }
}

/**
 * Update watch progress
 * 
 * @param data - Progress update data
 * @returns Promise resolving to updated history item
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string,
 *   data: WatchHistoryItem
 * }
 */
export const updateWatchProgress = async (data: UpdateProgressData): Promise<WatchHistoryItem> => {
  try {
    // Interceptor returns response.data, so 'response' is already the ApiResponse
    const response = await apiClient.post<ApiResponse<WatchHistoryItem>>('/watch/progress', data) as unknown as ApiResponse<WatchHistoryItem>
    if (!response) {
      throw new Error('Invalid response: response is undefined')
    }
    if (!response.success) {
      throw new Error(response.message || 'Failed to update watch progress')
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
 * Get continue watching items
 * 
 * @param profile_id - Profile ID (required)
 * @param limit - Maximum number of items (default: 20)
 * @returns Promise resolving to continue watching items
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string,
 *   data: ContinueWatchingItem[]
 * }
 */
export const getContinueWatching = async (profile_id: string, limit = 20): Promise<ContinueWatchingItem[]> => {
  try {
    // Interceptor returns response.data directly, so 'response' is already the ApiResponse
    const response = await apiClient.get<ApiResponse<ContinueWatchingItem[]>>('/watch/continue-watching', {
      params: { profile_id, limit },
    }) as unknown as ApiResponse<ContinueWatchingItem[]>

    if (!response || typeof response !== 'object') {
      throw new Error('Invalid response: response is not an object')
    }

    if (!response.success) {
      throw new Error(response.message || 'Failed to fetch continue watching')
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
 * Remove watch history item
 * 
 * @param data - History item data
 * @returns Promise resolving when removal is complete
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string
 * }
 */
export const removeWatchHistory = async (data: RemoveHistoryData): Promise<void> => {
  try {
    // Interceptor returns response.data, so 'response' is already the ApiResponse
    const response = await apiClient.delete<ApiResponse<null>>('/watch/history', { data }) as unknown as ApiResponse<null>
    if (!response) {
      throw new Error('Invalid response: response is undefined')
    }
    if (!response.success) {
      throw new Error(response.message || 'Failed to remove watch history')
    }
  } catch (err) {
    throw err instanceof Error ? err : new Error('Unknown error')
  }
}

