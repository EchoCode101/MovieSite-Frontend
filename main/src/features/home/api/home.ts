import { apiClient } from '@/config/api'
import type { ApiResponse } from '@/lib/api-response'
import type { Video } from '@/features/videos/types'

interface BackendVideo {
  _id: string
  title: string
  description: string
  video_url: string
  thumbnail_url: string
  category: string
  access_level: string
  duration?: number
  average_rating?: number
  views_count?: number
  created_at?: string
  createdAt?: string
  updated_at?: string
  updatedAt?: string
}

interface PaginatedVideosData {
  videos: BackendVideo[]
  total: number
  page: number
  limit: number
}

// Transform backend video data to frontend format
const transformVideo = (video: BackendVideo): Video => ({
  id: video._id,
  title: video.title || 'Untitled',
  description: video.description || '',
  thumbnailUrl: video.thumbnail_url || '',
  videoUrl: video.video_url || '',
  duration: video.duration || 0,
  category: video.category || 'Uncategorized',
  accessLevel: (video.access_level || 'Free') as Video['accessLevel'],
  isPremium: video.access_level !== 'Free',
  rating: video.average_rating || 0,
  views: video.views_count || 0,
  viewsCount: video.views_count || 0,
  createdAt: video.created_at || video.createdAt || new Date().toISOString(),
  updatedAt: video.updated_at || video.updatedAt,
})

/**
 * Fetch featured videos
 * 
 * @param limit - Number of videos to fetch (default: 8)
 * @returns Promise resolving to videos array
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string,
 *   data: {
 *     currentPage: number,
 *     totalPages: number,
 *     totalItems: number,
 *     videos: BackendVideo[]
 *   }
 * }
 */
export const fetchFeaturedVideos = async (limit = 8): Promise<Video[]> => {
  try {
    // Interceptor returns response.data directly, so 'response' is already the ApiResponse
    const response = await apiClient.get<ApiResponse<{ currentPage: number; totalPages: number; totalItems: number; videos: BackendVideo[] }>>(
      '/videos/paginated',
      {
        params: { page: 1, limit, sort: 'views_count', order: 'DESC' },
      }
    )
    
    if (!response || typeof response !== 'object') {
      throw new Error('Invalid response: response is not an object')
    }
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to fetch featured videos')
    }
    // Validate shape
    if (!response.data) {
      throw new Error('Invalid response: missing data field')
    }
    if (!Array.isArray(response.data.videos)) {
      throw new Error('Invalid response: videos is not an array')
    }
    return response.data.videos.map(transformVideo)
  } catch (err) {
    throw err instanceof Error ? err : new Error('Unknown error')
  }
}

/**
 * Fetch popular videos
 * 
 * @param limit - Number of videos to fetch (default: 12)
 * @returns Promise resolving to videos array
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string,
 *   data: {
 *     currentPage: number,
 *     totalPages: number,
 *     totalItems: number,
 *     videos: BackendVideo[]
 *   }
 * }
 */
export const fetchPopularVideos = async (limit = 12): Promise<Video[]> => {
  try {
    // Interceptor returns response.data directly, so 'response' is already the ApiResponse
    const response = await apiClient.get<ApiResponse<{ currentPage: number; totalPages: number; totalItems: number; videos: BackendVideo[] }>>(
      '/videos/paginated',
      {
        params: { page: 1, limit, sort: 'views_count', order: 'DESC' },
      }
    )
    
    if (!response || typeof response !== 'object') {
      throw new Error('Invalid response: response is not an object')
    }
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to fetch popular videos')
    }
    // Validate shape
    if (!response.data) {
      throw new Error('Invalid response: missing data field')
    }
    if (!Array.isArray(response.data.videos)) {
      throw new Error('Invalid response: videos is not an array')
    }
    return response.data.videos.map(transformVideo)
  } catch (err) {
    throw err instanceof Error ? err : new Error('Unknown error')
  }
}

/**
 * Fetch videos by category
 * 
 * @param category - Category name
 * @param limit - Number of videos to fetch (default: 12)
 * @returns Promise resolving to videos array
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string,
 *   data: {
 *     currentPage: number,
 *     totalPages: number,
 *     totalItems: number,
 *     videos: BackendVideo[]
 *   }
 * }
 */
export const fetchVideosByCategory = async (category: string, limit = 12): Promise<Video[]> => {
  try {
    // Interceptor returns response.data directly, so 'response' is already the ApiResponse
    const response = await apiClient.get<ApiResponse<{ currentPage: number; totalPages: number; totalItems: number; videos: BackendVideo[] }>>(
      '/videos/paginated',
      {
        params: { page: 1, limit, sort: 'createdAt', order: 'DESC' },
      }
    )
    
    if (!response || typeof response !== 'object') {
      throw new Error('Invalid response: response is not an object')
    }
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to fetch videos by category')
    }
    // Validate shape
    if (!response.data) {
      throw new Error('Invalid response: missing data field')
    }
    if (!Array.isArray(response.data.videos)) {
      throw new Error('Invalid response: videos is not an array')
    }
    // Filter by category on frontend (backend filtering can be added later)
    const filtered = response.data.videos.filter((v) =>
      v.category?.toLowerCase().includes(category.toLowerCase())
    )
    return filtered.map(transformVideo)
  } catch (err) {
    throw err instanceof Error ? err : new Error('Unknown error')
  }
}

/**
 * Fetch videos by access level
 * 
 * @param accessLevel - Access level (Free, Basic, Premium, Ultimate)
 * @param limit - Number of videos to fetch (default: 20)
 * @returns Promise resolving to videos array
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string,
 *   data: {
 *     currentPage: number,
 *     totalPages: number,
 *     totalItems: number,
 *     videos: BackendVideo[]
 *   }
 * }
 */
export const fetchVideosByAccessLevel = async (accessLevel: string, limit = 20): Promise<Video[]> => {
  try {
    // Interceptor returns response.data directly, so 'response' is already the ApiResponse
    const response = await apiClient.get<ApiResponse<{ currentPage: number; totalPages: number; totalItems: number; videos: BackendVideo[] }>>(
      '/videos/paginated',
      {
        params: { page: 1, limit, sort: 'createdAt', order: 'DESC' },
      }
    )
    
    if (!response || typeof response !== 'object') {
      throw new Error('Invalid response: response is not an object')
    }
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to fetch videos by access level')
    }
    // Validate shape
    if (!response.data) {
      throw new Error('Invalid response: missing data field')
    }
    if (!Array.isArray(response.data.videos)) {
      throw new Error('Invalid response: videos is not an array')
    }
    // Filter by access level
    const filtered = response.data.videos.filter((v) => v.access_level === accessLevel)
    return filtered.map(transformVideo)
  } catch (err) {
    throw err instanceof Error ? err : new Error('Unknown error')
  }
}
