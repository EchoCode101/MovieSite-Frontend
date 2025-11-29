import { apiClient } from '@/config/api'
import type { ApiResponse } from '@/lib/api-response'
import type { VideoMetrics } from '../types'

export const getVideoMetrics = async (): Promise<VideoMetrics[]> => {
  try {
    // Interceptor returns response.data directly, so 'response' is already the ApiResponse
    const response = await apiClient.get<ApiResponse<VideoMetrics[]>>('/video_metrics') as unknown as ApiResponse<VideoMetrics[]>

    if (!response || typeof response !== 'object') {
      throw new Error('Invalid response: response is not an object')
    }

    if (!response.success) {
      throw new Error(response.message || 'Failed to fetch video metrics')
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

