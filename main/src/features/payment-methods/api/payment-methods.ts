import { apiClient } from '@/config/api'
import type { ApiResponse } from '@/lib/api-response'
import type { PaymentMethod } from '../types'

export const getPaymentMethods = async (): Promise<PaymentMethod[]> => {
  try {
    // Interceptor returns response.data directly, so 'response' is already the ApiResponse
    const response = await apiClient.get<ApiResponse<PaymentMethod[]>>('/payment-methods') as unknown as ApiResponse<PaymentMethod[]>

    if (!response || typeof response !== 'object') {
      throw new Error('Invalid response: response is not an object')
    }

    if (!response.success) {
      throw new Error(response.message || 'Failed to fetch payment methods')
    }
    if (!response.data) {
      throw new Error('Invalid response: missing data field')
    }
    if (!Array.isArray(response.data)) {
      throw new Error('Invalid response: data is not an array')
    }
    // Remove config for non-admin users
    return response.data.map(({ config, ...method }) => method)
  } catch (err) {
    throw err instanceof Error ? err : new Error('Unknown error')
  }
}

