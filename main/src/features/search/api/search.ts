import { apiClient } from '@/config/api'
import type { ApiResponse } from '@/lib/api-response'
import { logger } from '@/lib/logger'
import { API_ERRORS } from '@/lib/api-errors'

export type SearchResult = {
  id: string
  title: string
  type: 'video' | 'user' | 'movie' | 'tv-show' | 'episode'
  image?: string
  description?: string
}

interface SearchResponseData {
  query: string
  type: 'all' | 'video' | 'user' | 'movie' | 'tv-show' | 'episode'
  page: number
  limit: number
  totalResults: number
  results: SearchResult[] | {
    videos: SearchResult[]
    videoCount: number
    users: SearchResult[]
    userCount: number
  }
}

/**
 * Global search across videos, users, movies, TV shows, and episodes
 * 
 * @param query - Search query string
 * @param type - Search type filter (default: "all")
 * @param page - Page number (default: 1)
 * @param limit - Items per page (default: 10)
 * @returns Promise resolving to search results
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string,
 *   data: SearchResponseData
 * }
 */
export const searchContent = async (
  query: string,
  type: 'all' | 'video' | 'user' | 'movie' | 'tv-show' | 'episode' = 'all',
  page = 1,
  limit = 10
): Promise<SearchResult[]> => {
  try {
    if (!query) {
      return []
    }

    // Interceptor returns response.data directly, so 'response' is already the ApiResponse
    const response = await apiClient.get<ApiResponse<SearchResponseData>>('/search', {
      params: { q: query, type, page, limit },
    })

    if (!response || typeof response !== 'object') {
      throw new Error(API_ERRORS.INVALID_RESPONSE_FORMAT)
    }

    if (!response.success) {
      throw new Error(response.message || API_ERRORS.FETCH_FAILED('search results'))
    }

    // Validate shape
    if (!response.data) {
      throw new Error(API_ERRORS.MISSING_DATA_FIELD)
    }

    // Handle different response shapes based on type
    if (type === 'all') {
      const results = response.data.results as { videos: SearchResult[]; videoCount: number; users: SearchResult[]; userCount: number }
      if (!results.videos || !results.users) {
        throw new Error(API_ERRORS.MISSING_REQUIRED_FIELDS('videos or users in results'))
      }
      // Combine videos and users for "all" type
      return [...results.videos, ...results.users]
    } else {
      const results = response.data.results as SearchResult[]
      if (!Array.isArray(results)) {
        throw new Error(API_ERRORS.NOT_ARRAY('results'))
      }
      return results
    }
  } catch (err) {
    logger.error('Error performing search', err instanceof Error ? err : new Error('Unknown error'))
    throw err instanceof Error ? err : new Error(API_ERRORS.UNKNOWN_ERROR)
  }
}
