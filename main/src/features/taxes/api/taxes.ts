import { apiClient } from '@/config/api'
import type { ApiResponse } from '@/lib/api-response'
import type { Tax } from '../types'

export const getTaxByCountry = async (country: string): Promise<Tax | null> => {
  try {
    // Interceptor returns response.data directly, so 'response' is already the ApiResponse
    const response = await apiClient.get<ApiResponse<Tax>>(`/taxes/country/${country}`) as unknown as ApiResponse<Tax>

    if (!response || typeof response !== 'object') {
      return null
    }

    if (!response.success) {
      return null
    }
    if (!response.data) {
      return null
    }
    return response.data
  } catch (err) {
    return null
  }
}

