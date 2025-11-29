import { apiClient } from '@/config/api'
import type { ApiResponse } from '@/lib/api-response'
import type { Episode } from '../types'

export interface PaginatedEpisodesParams {
  page?: number
  limit?: number
  sort?: string
  order?: 'ASC' | 'DESC'
  genre?: string | string[]
  year?: number | number[]
  access_type?: 'free' | 'subscription' | 'pay_per_view'
  search?: string
  tv_show_id?: string
  season_id?: string
}

export interface PaginatedEpisodesResponse {
  currentPage: number
  totalPages: number
  totalItems: number
  episodes: Episode[]
}

export const getEpisodesBySeason = async (seasonId: string): Promise<Episode[]> => {
  try {
    // Interceptor returns response.data directly, so 'response' is already the ApiResponse
    const response = await apiClient.get<ApiResponse<Episode[]>>(`/episodes/season/${seasonId}`) as unknown as ApiResponse<Episode[]>
    
    if (!response || typeof response !== 'object') {
      throw new Error('Invalid response: response is not an object')
    }
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to fetch episodes')
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

export const getEpisodeById = async (id: string): Promise<Episode> => {
  try {
    // Interceptor returns response.data directly, so 'response' is already the ApiResponse
    const response = await apiClient.get<ApiResponse<Episode>>(`/episodes/${id}`) as unknown as ApiResponse<Episode>
    
    if (!response || typeof response !== 'object') {
      throw new Error('Invalid response: response is not an object')
    }
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to fetch episode')
    }
    if (!response.data) {
      throw new Error('Invalid response: missing data field')
    }
    return response.data
  } catch (err) {
    throw err instanceof Error ? err : new Error('Unknown error')
  }
}

export const getPaginatedEpisodes = async (params: PaginatedEpisodesParams): Promise<PaginatedEpisodesResponse> => {
  try {
    const queryParams = new URLSearchParams()
    if (params.page) queryParams.append('page', params.page.toString())
    if (params.limit) queryParams.append('limit', params.limit.toString())
    if (params.sort) queryParams.append('sort', params.sort)
    if (params.order) queryParams.append('order', params.order)
    
    // Handle genre - backend currently only supports single value
    // For now, send only first value if array (backend needs update for multi-select)
    if (params.genre) {
      if (Array.isArray(params.genre)) {
        // Backend doesn't support multiple genres yet, send first one
        if (params.genre.length > 0 && params.genre[0] !== 'All') {
          queryParams.append('genre', params.genre[0])
        }
      } else if (params.genre !== 'All') {
        queryParams.append('genre', params.genre)
      }
    }
    
    // Handle year - backend currently only supports single value
    // For now, send only first value if array (backend needs update for multi-select)
    if (params.year) {
      if (Array.isArray(params.year)) {
        // Backend doesn't support multiple years yet, send first one
        if (params.year.length > 0) {
          queryParams.append('year', params.year[0].toString())
        }
      } else {
        queryParams.append('year', params.year.toString())
      }
    }
    
    if (params.access_type) queryParams.append('access_type', params.access_type)
    if (params.search) queryParams.append('search', params.search)
    if (params.tv_show_id) queryParams.append('tv_show_id', params.tv_show_id)
    if (params.season_id) queryParams.append('season_id', params.season_id)

    const response = await apiClient.get<ApiResponse<PaginatedEpisodesResponse>>(
      `/episodes/paginated?${queryParams.toString()}`
    ) as unknown as ApiResponse<PaginatedEpisodesResponse>
    
    if (!response || typeof response !== 'object') {
      throw new Error('Invalid response: response is not an object')
    }
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to fetch episodes')
    }
    if (!response.data) {
      throw new Error('Invalid response: missing data field')
    }
    return response.data
  } catch (err) {
    throw err instanceof Error ? err : new Error('Unknown error')
  }
}

