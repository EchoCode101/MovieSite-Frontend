import { apiClient } from '@/config/api'
import type { ApiResponse } from '@/lib/api-response'
import type { CastCrew } from '../types'

/**
 * Get all cast & crew
 * 
 * @param params - Query parameters (type, search)
 * @returns Promise resolving to cast & crew array
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string,
 *   data: CastCrew[]
 * }
 */
export const getCastCrew = async (params?: {
  type?: 'actor' | 'director' | 'writer' | 'crew'
  search?: string
}): Promise<CastCrew[]> => {
  try {
    // Interceptor returns response.data directly, so 'response' is already the ApiResponse
    const response = await apiClient.get<ApiResponse<CastCrew[]>>('/cast-crew', { params }) as unknown as ApiResponse<CastCrew[]>
    
    if (!response || typeof response !== 'object') {
      throw new Error('Invalid response: response is not an object')
    }
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to fetch cast & crew')
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
 * Get cast & crew by ID
 * 
 * @param id - Cast & crew ID
 * @returns Promise resolving to cast & crew member
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string,
 *   data: CastCrew
 * }
 */
export const getCastCrewById = async (id: string): Promise<CastCrew> => {
  try {
    // Interceptor returns response.data directly, so 'response' is already the ApiResponse
    const response = await apiClient.get<ApiResponse<CastCrew>>(`/cast-crew/${id}`) as unknown as ApiResponse<CastCrew>
    
    if (!response || typeof response !== 'object') {
      throw new Error('Invalid response: response is not an object')
    }
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to fetch cast & crew member')
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

