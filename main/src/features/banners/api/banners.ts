import { apiClient } from '@/config/api'
import type { ApiResponse } from '@/lib/api-response'
import type { Banner } from '../types'

export const getBanners = async (params?: {
  device?: 'web' | 'mobile' | 'tv'
  position?: 'home' | 'movie' | 'tv' | 'video'
}): Promise<Banner[]> => {
  try {
    // Interceptor returns response.data directly, so 'response' is already the ApiResponse
    const response = await apiClient.get<ApiResponse<Banner[]>>('/banners', { params }) as unknown as ApiResponse<Banner[]>

    if (!response || typeof response !== 'object') {
      throw new Error('Invalid response: response is not an object')
    }

    if (!response.success) {
      throw new Error(response.message || 'Failed to fetch banners')
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

