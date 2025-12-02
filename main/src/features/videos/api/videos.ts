import { apiClient } from '@/config/api'
import type { ApiResponse } from '@/lib/api-response'
import { API_ERRORS } from '@/lib/api-errors'
import type { Video } from '../types'

interface BackendVideo {
  _id: string
  title: string
  description: string
  video_url: string
  thumbnail_url: string
  category: string
  access_level: string
  metrics?: {
    views_count: number
  }
  createdAt: string
  updatedAt?: string
}

interface PaginatedVideosData {
  currentPage: number
  totalPages: number
  totalItems: number
  videos: BackendVideo[]
}

const transformVideo = (v: BackendVideo): Video => ({
  id: v._id,
  title: v.title,
  description: v.description,
  thumbnailUrl: v.thumbnail_url,
  videoUrl: v.video_url,
  category: v.category,
  accessLevel: v.access_level as Video['accessLevel'],
  isPremium: v.access_level !== 'Free',
  views: v.metrics?.views_count || 0,
  createdAt: v.createdAt,
  updatedAt: v.updatedAt,
})

/**
 * Get paginated list of videos
 * 
 * @param params - Query parameters for pagination and filtering
 * @returns Promise resolving to paginated videos response
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string,
 *   data: {
 *     currentPage: number,
 *     totalPages: number,
 *     totalItems: number,
 *     videos: Video[]
 *   }
 * }
 */
export const getVideos = async (params?: {
  page?: number
  limit?: number
  genre?: string | string[]
  year?: number | number[]
  search?: string
  access_type?: 'free' | 'subscription' | 'pay_per_view'
  sort?: string
  order?: string
}): Promise<{ videos: Video[]; totalPages: number; totalItems: number; currentPage: number }> => {
  try {
    // Use URLSearchParams to properly handle arrays (genre=value1&genre=value2)
    const queryParams = new URLSearchParams()
    if (params?.page) queryParams.append('page', params.page.toString())
    if (params?.limit) queryParams.append('limit', params.limit.toString())
    if (params?.sort) queryParams.append('sort', params.sort)
    if (params?.order) queryParams.append('order', params.order)
    if (params?.access_type) queryParams.append('access_type', params.access_type)
    
    // Note: Backend videos endpoint validator doesn't include search parameter yet
    // Sending it anyway - backend will ignore if not supported
    // Backend needs update: add search to paginatedVideosSchema in videos.validators.ts
    if (params?.search) queryParams.append('search', params.search)
    
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
    const response = await apiClient.get<ApiResponse<PaginatedVideosData>>(
      `/videos/paginated?${queryParams.toString()}`
    ) as unknown as ApiResponse<PaginatedVideosData>

    if (!response || typeof response !== 'object') {
      throw new Error('Invalid response: response is not an object')
    }

    if (!response.success) {
      throw new Error(response.message || API_ERRORS.FETCH_FAILED('videos'))
    }
    // Validate shape
    if (!response.data) {
      throw new Error(API_ERRORS.MISSING_DATA_FIELD)
    }
    if (!Array.isArray(response.data.videos)) {
      throw new Error(API_ERRORS.NOT_ARRAY('videos'))
    }
    return {
      videos: response.data.videos.map(transformVideo),
      totalPages: response.data.totalPages,
      totalItems: response.data.totalItems,
      currentPage: response.data.currentPage,
    }
  } catch (err) {
    throw err instanceof Error ? err : new Error(API_ERRORS.UNKNOWN_ERROR)
  }
}

/**
 * Get video by ID
 * 
 * @param id - Video ID
 * @returns Promise resolving to video object
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string,
 *   data: Video
 * }
 */
export const getVideoById = async (id: string): Promise<Video> => {
  try {
    // Interceptor returns response.data directly, so 'response' is already the ApiResponse
    const response = await apiClient.get<ApiResponse<BackendVideo>>(`/videos/${id}`) as unknown as ApiResponse<BackendVideo>

    if (!response || typeof response !== 'object') {
      throw new Error('Invalid response: response is not an object')
    }

    if (!response.success) {
      throw new Error(response.message || API_ERRORS.FETCH_FAILED('video'))
    }
    // Validate shape
    if (!response.data) {
      throw new Error(API_ERRORS.MISSING_DATA_FIELD)
    }
    return transformVideo(response.data)
  } catch (err) {
    throw err instanceof Error ? err : new Error(API_ERRORS.UNKNOWN_ERROR)
  }
}


/**
 * Get related videos
 * 
 * @param id - Video ID to exclude from results
 * @returns Promise resolving to related videos list
 */
export const getRelatedVideos = async (id: string): Promise<Video[]> => {
  try {
    const response = await getVideos({ limit: 5 })
    return response.videos.filter((v) => v.id !== id)
  } catch (err) {
    throw err instanceof Error ? err : new Error(API_ERRORS.UNKNOWN_ERROR)
  }
}
