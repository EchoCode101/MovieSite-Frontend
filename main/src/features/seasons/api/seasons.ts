import { apiClient } from '@/config/api'
import type { ApiResponse } from '@/lib/api-response'
import type { Season } from '../types'

export const getSeasonsByTVShow = async (tvShowId: string): Promise<Season[]> => {
  try {
    // Interceptor returns response.data directly, so 'response' is already the ApiResponse
    const response = await apiClient.get<ApiResponse<Season[]>>(`/seasons/tv-show/${tvShowId}`) as unknown as ApiResponse<Season[]>
    
    if (!response || typeof response !== 'object') {
      throw new Error('Invalid response: response is not an object')
    }
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to fetch seasons')
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

export const getSeasonById = async (id: string): Promise<Season> => {
  try {
    // Interceptor returns response.data directly, so 'response' is already the ApiResponse
    const response = await apiClient.get<ApiResponse<Season>>(`/seasons/${id}`) as unknown as ApiResponse<Season>
    
    if (!response || typeof response !== 'object') {
      throw new Error('Invalid response: response is not an object')
    }
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to fetch season')
    }
    if (!response.data) {
      throw new Error('Invalid response: missing data field')
    }
    return response.data
  } catch (err) {
    throw err instanceof Error ? err : new Error('Unknown error')
  }
}

