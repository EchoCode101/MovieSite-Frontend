import { apiClient } from '@/config/api'
import type { ApiResponse } from '@/lib/api-response'
import type { TVShow, PaginatedTVShowsData, BackendTVShow } from '../types'
import type { Season } from '@/features/seasons/types'

/**
 * Transform backend TV show object to frontend TVShow type
 */
function transformTVShow(backendTVShow: BackendTVShow): TVShow {
  return {
    id: backendTVShow._id || backendTVShow.id || '',
    title: backendTVShow.title,
    slug: backendTVShow.slug,
    description: backendTVShow.description,
    thumbnail_url: backendTVShow.thumbnail_url,
    poster_url: backendTVShow.poster_url,
    banner_url: backendTVShow.banner_url,
    trailer_url: backendTVShow.trailer_url,
    release_date: backendTVShow.release_year ? `${backendTVShow.release_year}-01-01` : undefined,
    release_year: backendTVShow.release_year,
    rating: backendTVShow.imdb_rating,
    imdb_rating: backendTVShow.imdb_rating,
    age_rating: backendTVShow.content_rating,
    content_rating: backendTVShow.content_rating,
    language: backendTVShow.language,
    access_type: backendTVShow.access_type,
    plan_ids: backendTVShow.plan_ids || [],
    genres: backendTVShow.genres || [],
    cast: backendTVShow.cast || [],
    directors: backendTVShow.directors || [],
    seo_title: backendTVShow.seo_title,
    seo_description: backendTVShow.seo_description,
    seo_keywords: backendTVShow.seo_keywords,
    status: backendTVShow.status,
    createdAt: backendTVShow.createdAt,
    updatedAt: backendTVShow.updatedAt,
  }
}

/**
 * Get paginated TV shows
 * 
 * @param params - Query parameters
 * @returns Promise resolving to paginated TV shows response
 */
export const getTVShows = async (params?: {
  page?: number
  limit?: number
  genre?: string | string[]
  year?: number | number[]
  search?: string
  access_type?: 'free' | 'subscription' | 'pay_per_view'
  sort?: string
  order?: string
}): Promise<PaginatedTVShowsData> => {
  try {
    // Use URLSearchParams to properly handle arrays (genre=value1&genre=value2)
    const queryParams = new URLSearchParams()
    if (params?.page) queryParams.append('page', params.page.toString())
    if (params?.limit) queryParams.append('limit', params.limit.toString())
    if (params?.search) queryParams.append('search', params.search)
    if (params?.sort) queryParams.append('sort', params.sort)
    if (params?.order) queryParams.append('order', params.order)
    if (params?.access_type) queryParams.append('access_type', params.access_type)
    
    // Handle genre - backend currently only supports single value
    // For now, send only first value if array (backend needs update for multi-select)
    if (params?.genre) {
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
    if (params?.year) {
      if (Array.isArray(params.year)) {
        // Backend doesn't support multiple years yet, send first one
        if (params.year.length > 0) {
          queryParams.append('year', params.year[0].toString())
        }
      } else {
        queryParams.append('year', params.year.toString())
      }
    }
    
    // Interceptor returns response.data directly, so 'response' is already the ApiResponse
    const response = await apiClient.get<ApiResponse<{
      tvShows?: BackendTVShow[]
      tv_shows?: BackendTVShow[]
      currentPage: number
      totalPages: number
      totalItems: number
    }>>(`/tv-shows/paginated?${queryParams.toString()}`) as unknown as ApiResponse<{
      tvShows?: BackendTVShow[]
      tv_shows?: BackendTVShow[]
      currentPage: number
      totalPages: number
      totalItems: number
    }>

    if (!response || typeof response !== 'object') {
      throw new Error('Invalid response: response is not an object')
    }

    if (!response.success) {
      throw new Error(response.message || 'Failed to fetch TV shows')
    }
    if (!response.data) {
      throw new Error('Invalid response: missing data field')
    }

    // Handle both camelCase (tvShows) and snake_case (tv_shows) from backend
    const tvShowsArray = response.data.tvShows || response.data.tv_shows
    if (!Array.isArray(tvShowsArray)) {
      throw new Error('Invalid response: tvShows is not an array')
    }

    // Transform TV shows to match frontend type
    return {
      tv_shows: tvShowsArray.map(transformTVShow),
      currentPage: response.data.currentPage,
      totalPages: response.data.totalPages,
      totalItems: response.data.totalItems,
    }
  } catch (err) {
    throw err instanceof Error ? err : new Error('Unknown error')
  }
}

/**
 * Get TV show by ID
 * 
 * @param id - TV show ID
 * @returns Promise resolving to TV show
 */
export const getTVShowById = async (id: string): Promise<TVShow> => {
  try {
    // Interceptor returns response.data directly, so 'response' is already the ApiResponse
    const response = await apiClient.get<ApiResponse<BackendTVShow>>(`/tv-shows/${id}`) as unknown as ApiResponse<BackendTVShow>

    if (!response || typeof response !== 'object') {
      throw new Error('Invalid response: response is not an object')
    }

    if (!response.success) {
      throw new Error(response.message || 'Failed to fetch TV show')
    }
    if (!response.data) {
      throw new Error('Invalid response: missing data field')
    }
    return transformTVShow(response.data)
  } catch (err) {
    throw err instanceof Error ? err : new Error('Unknown error')
  }
}

/**
 * Get TV show seasons
 * 
 * @param id - TV show ID
 * @returns Promise resolving to seasons array
 */
export const getTVShowSeasons = async (id: string): Promise<Season[]> => {
  try {
    // Interceptor returns response.data directly, so 'response' is already the ApiResponse
    const response = await apiClient.get<ApiResponse<Season[]>>(`/tv-shows/${id}/seasons`) as unknown as ApiResponse<Season[]>

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

