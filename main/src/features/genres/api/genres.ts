import { apiClient } from '@/config/api'
import type { ApiResponse } from '@/lib/api-response'
import type { Genre } from '../types'

/**
 * Get all genres
 * 
 * @returns Promise resolving to genres array
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string,
 *   data: Genre[]
 * }
 */
export const getGenres = async (): Promise<Genre[]> => {
  try {
    // Interceptor returns response.data directly, so 'response' is already the ApiResponse
    const response = await apiClient.get<ApiResponse<Genre[]>>('/genres') as unknown as ApiResponse<Genre[]>
    
    if (!response || typeof response !== 'object') {
      throw new Error('Invalid response: response is not an object')
    }
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to fetch genres')
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
 * Get genre by ID
 * 
 * @param id - Genre ID
 * @returns Promise resolving to genre
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string,
 *   data: Genre
 * }
 */
export const getGenreById = async (id: string): Promise<Genre> => {
  try {
    // Interceptor returns response.data directly, so 'response' is already the ApiResponse
    const response = await apiClient.get<ApiResponse<Genre>>(`/genres/${id}`) as unknown as ApiResponse<Genre>
    
    if (!response || typeof response !== 'object') {
      throw new Error('Invalid response: response is not an object')
    }
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to fetch genre')
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

