import { apiClient } from '@/config/api'
import type { ApiResponse } from '@/lib/api-response'
import type { PPVPurchase, PurchasePPVData, PPVAccessCheck } from '../types'

export const getPPVPurchases = async (): Promise<PPVPurchase[]> => {
  try {
    // Interceptor returns response.data directly, so 'response' is already the ApiResponse
    const response = await apiClient.get<ApiResponse<PPVPurchase[]>>('/pay-per-view') as unknown as ApiResponse<PPVPurchase[]>

    if (!response || typeof response !== 'object') {
      throw new Error('Invalid response: response is not an object')
    }

    if (!response.success) {
      throw new Error(response.message || 'Failed to fetch PPV purchases')
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

export const purchasePPV = async (data: PurchasePPVData): Promise<PPVPurchase> => {
  try {
    // Interceptor returns response.data, so 'response' is already the ApiResponse
    const response = await apiClient.post<ApiResponse<PPVPurchase>>('/pay-per-view/purchase', data) as unknown as ApiResponse<PPVPurchase>
    if (!response) {
      throw new Error('Invalid response: response is undefined')
    }
    if (!response.success) {
      throw new Error(response.message || 'Failed to purchase PPV content')
    }
    if (!response.data) {
      throw new Error('Invalid response: missing data field')
    }
    return response.data
  } catch (err) {
    throw err instanceof Error ? err : new Error('Unknown error')
  }
}

export const checkPPVAccess = async (targetType: string, targetId: string): Promise<PPVAccessCheck> => {
  try {
    // Interceptor returns response.data directly, so 'response' is already the ApiResponse
    const response = await apiClient.get<ApiResponse<PPVAccessCheck>>(
      `/pay-per-view/check-access/${targetType}/${targetId}`
    ) as unknown as ApiResponse<PPVAccessCheck>

    if (!response || typeof response !== 'object') {
      throw new Error('Invalid response: response is not an object')
    }

    if (!response.success) {
      throw new Error(response.message || 'Failed to check PPV access')
    }
    if (!response.data) {
      throw new Error('Invalid response: missing data field')
    }
    return response.data
  } catch (err) {
    throw err instanceof Error ? err : new Error('Unknown error')
  }
}

