import { apiClient } from '@/config/api'
import type { ApiResponse } from '@/lib/api-response'
import { logger } from '@/lib/logger'
import { API_ERRORS } from '@/lib/api-errors'
import type { Movie, PaginatedMoviesData, BackendMovie } from '../types'

/**
 * Transform backend movie object to frontend Movie type
 */
function transformMovie(backendMovie: BackendMovie): Movie {
  return {
    id: backendMovie._id || backendMovie.id,
    title: backendMovie.title,
    slug: backendMovie.slug,
    description: backendMovie.description,
    thumbnail_url: backendMovie.thumbnail_url,
    poster_url: backendMovie.poster_url,
    video_url: backendMovie.streams?.[0]?.url,
    trailer_url: backendMovie.trailer_url,
    duration: backendMovie.duration_minutes,
    release_date: backendMovie.release_date,
    rating: backendMovie.imdb_rating,
    age_rating: backendMovie.content_rating,
    access_type: backendMovie.access_type,
    plan_ids: backendMovie.plan_ids || [],
    genres: backendMovie.genres || [],
    cast: backendMovie.cast || [],
    directors: backendMovie.directors || [],
    is_trending: backendMovie.is_trending,
    is_featured: backendMovie.is_featured,
    is_coming_soon: backendMovie.is_coming_soon,
    createdAt: backendMovie.createdAt,
    updatedAt: backendMovie.updatedAt,
  }
}

/**
 * Get paginated movies
 * 
 * @param params - Query parameters
 * @returns Promise resolving to paginated movies response
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string,
 *   data: PaginatedMoviesData
 * }
 */
export const getMovies = async (params?: {
  page?: number
  limit?: number
  genre?: string | string[]
  year?: number | number[]
  search?: string
  access_type?: 'free' | 'subscription' | 'pay_per_view'
  sort?: string
  order?: string
  is_trending?: boolean
  is_featured?: boolean
  is_coming_soon?: boolean
}): Promise<PaginatedMoviesData> => {
  try {
    // Use URLSearchParams to properly handle arrays (genre=value1&genre=value2)
    const queryParams = new URLSearchParams()
    if (params?.page) queryParams.append('page', params.page.toString())
    if (params?.limit) queryParams.append('limit', params.limit.toString())
    if (params?.search) queryParams.append('search', params.search)
    if (params?.sort) queryParams.append('sort', params.sort)
    if (params?.order) queryParams.append('order', params.order)
    if (params?.access_type) queryParams.append('access_type', params.access_type)
    if (params?.is_trending !== undefined) queryParams.append('is_trending', params.is_trending.toString())
    if (params?.is_featured !== undefined) queryParams.append('is_featured', params.is_featured.toString())
    if (params?.is_coming_soon !== undefined) queryParams.append('is_coming_soon', params.is_coming_soon.toString())
    
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
    
    // Interceptor returns response.data, so 'data' here is already the ApiResponse
    const data = await apiClient.get<ApiResponse<{
      movies: BackendMovie[]
      currentPage: number
      totalPages: number
      totalItems: number
    }>>(`/movies/paginated?${queryParams.toString()}`)

    // Check if data is undefined or null
    if (!data) {
      throw new Error(API_ERRORS.RESPONSE_DATA_UNDEFINED)
    }

    // Check if response is already unwrapped (has movies directly) - shouldn't happen but handle it
    if ('movies' in data && Array.isArray((data as { movies: BackendMovie[]; currentPage: number; totalPages: number; totalItems: number }).movies) && !('success' in data)) {
      // Response is already unwrapped - transform directly
      const unwrapped = data as { movies: BackendMovie[]; currentPage: number; totalPages: number; totalItems: number }
      return {
        movies: unwrapped.movies.map(transformMovie),
        currentPage: unwrapped.currentPage,
        totalPages: unwrapped.totalPages,
        totalItems: unwrapped.totalItems,
      }
    }

    // Expect ApiResponse format: { success, message, data }
    if (!data.success) {
      throw new Error(data.message || API_ERRORS.FETCH_FAILED('movies'))
    }
    // Validate shape
    if (!data.data) {
      throw new Error(API_ERRORS.MISSING_DATA_FIELD)
    }
    if (!Array.isArray(data.data.movies)) {
      throw new Error(API_ERRORS.NOT_ARRAY('movies'))
    }
    // Transform movies to match frontend type
    try {
      return {
        movies: data.data.movies.map((movie: BackendMovie) => {
          try {
            return transformMovie(movie)
          } catch (transformErr) {
            logger.error('Error transforming movie', transformErr instanceof Error ? transformErr : new Error('Unknown error'), { movie })
            throw transformErr
          }
        }),
        currentPage: data.data.currentPage,
        totalPages: data.data.totalPages,
        totalItems: data.data.totalItems,
      }
    } catch (transformErr) {
      logger.error('Error transforming movies array', transformErr instanceof Error ? transformErr : new Error('Unknown error'))
      throw new Error(API_ERRORS.UNKNOWN_ERROR)
    }
  } catch (err) {
    logger.error('Error fetching movies', err instanceof Error ? err : new Error('Unknown error'))
    throw err instanceof Error ? err : new Error(API_ERRORS.UNKNOWN_ERROR)
  }
}

/**
 * Get movie by ID
 * 
 * @param id - Movie ID
 * @returns Promise resolving to movie
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string,
 *   data: Movie
 * }
 */
export const getMovieById = async (id: string): Promise<Movie> => {
  try {
    // Interceptor returns response.data directly, so 'response' is already the ApiResponse
    const response = await apiClient.get<ApiResponse<BackendMovie>>(`/movies/${id}`) as unknown as ApiResponse<BackendMovie>

    if (!response || typeof response !== 'object') {
      throw new Error(API_ERRORS.INVALID_RESPONSE_FORMAT)
    }

    if (!response.success) {
      throw new Error(response.message || API_ERRORS.FETCH_FAILED('movie'))
    }
    // Validate shape
    if (!response.data) {
      throw new Error(API_ERRORS.MISSING_DATA_FIELD)
    }
    return transformMovie(response.data)
  } catch (err) {
    logger.error('Error fetching movie', err instanceof Error ? err : new Error('Unknown error'))
    throw err instanceof Error ? err : new Error(API_ERRORS.UNKNOWN_ERROR)
  }
}

/**
 * Get trending movies
 * 
 * @returns Promise resolving to movies array
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string,
 *   data: Movie[]
 * }
 */
export const getTrendingMovies = async (): Promise<Movie[]> => {
  try {
    // Interceptor returns response.data directly, so 'response' is already the ApiResponse
    const response = await apiClient.get<ApiResponse<BackendMovie[]>>('/movies/trending') as unknown as ApiResponse<BackendMovie[]>

    if (!response || typeof response !== 'object') {
      throw new Error('Invalid response: response is not an object')
    }

    if (!response.success) {
      throw new Error(response.message || 'Failed to fetch trending movies')
    }
    // Validate shape
    if (!response.data) {
      throw new Error('Invalid response: missing data field')
    }
    if (!Array.isArray(response.data)) {
      throw new Error(API_ERRORS.NOT_ARRAY('data'))
    }
    return response.data.map(transformMovie)
  } catch (err) {
    logger.error('Error fetching movie', err instanceof Error ? err : new Error('Unknown error'))
    throw err instanceof Error ? err : new Error(API_ERRORS.UNKNOWN_ERROR)
  }
}

/**
 * Get featured movies
 * 
 * @returns Promise resolving to movies array
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string,
 *   data: Movie[]
 * }
 */
export const getFeaturedMovies = async (): Promise<Movie[]> => {
  try {
    // Interceptor returns response.data directly, so 'response' is already the ApiResponse
    const response = await apiClient.get<ApiResponse<BackendMovie[]>>('/movies/featured') as unknown as ApiResponse<BackendMovie[]>

    if (!response || typeof response !== 'object') {
      throw new Error('Invalid response: response is not an object')
    }

    if (!response.success) {
      throw new Error(response.message || 'Failed to fetch featured movies')
    }
    // Validate shape
    if (!response.data) {
      throw new Error('Invalid response: missing data field')
    }
    if (!Array.isArray(response.data)) {
      throw new Error(API_ERRORS.NOT_ARRAY('data'))
    }
    return response.data.map(transformMovie)
  } catch (err) {
    logger.error('Error fetching movie', err instanceof Error ? err : new Error('Unknown error'))
    throw err instanceof Error ? err : new Error(API_ERRORS.UNKNOWN_ERROR)
  }
}

/**
 * Get coming soon movies
 * 
 * @returns Promise resolving to movies array
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string,
 *   data: Movie[]
 * }
 */
export const getComingSoonMovies = async (): Promise<Movie[]> => {
  try {
    // Interceptor returns response.data directly, so 'response' is already the ApiResponse
    const response = await apiClient.get<ApiResponse<BackendMovie[]>>('/movies/coming-soon') as unknown as ApiResponse<BackendMovie[]>

    if (!response || typeof response !== 'object') {
      throw new Error('Invalid response: response is not an object')
    }

    if (!response.success) {
      throw new Error(response.message || 'Failed to fetch coming soon movies')
    }
    // Validate shape
    if (!response.data) {
      throw new Error('Invalid response: missing data field')
    }
    if (!Array.isArray(response.data)) {
      throw new Error(API_ERRORS.NOT_ARRAY('data'))
    }
    return response.data.map(transformMovie)
  } catch (err) {
    logger.error('Error fetching movie', err instanceof Error ? err : new Error('Unknown error'))
    throw err instanceof Error ? err : new Error(API_ERRORS.UNKNOWN_ERROR)
  }
}

