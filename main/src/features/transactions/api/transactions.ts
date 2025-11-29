import { apiClient } from '@/config/api'
import type { ApiResponse } from '@/lib/api-response'
import { logger } from '@/lib/logger'
import type { Transaction } from '../types'

export const getTransactions = async (params?: {
  type?: 'subscription' | 'pay_per_view'
  status?: 'pending' | 'paid' | 'failed' | 'refunded'
  limit?: number
  page?: number
}): Promise<Transaction[]> => {
  try {
    // Interceptor returns response.data, so 'data' here is already the ApiResponse
    const data = await apiClient.get<ApiResponse<Transaction[]>>('/transactions', { params })

    // Check if data is undefined or null
    if (!data) {
      throw new Error('Invalid response: response data is undefined')
    }

    // Check if response is already unwrapped (has transactions directly) - shouldn't happen but handle it
    if (Array.isArray(data) && !('success' in data)) {
      // Response is already unwrapped - apply limit and return
      if (params?.limit) {
        return data.slice(0, params.limit)
      }
      return data
    }

    // Expect ApiResponse format: { success, message, data }
    if (!data.success) {
      throw new Error(data.message || 'Failed to fetch transactions')
    }
    if (!data.data) {
      throw new Error('Invalid response: missing data field')
    }
    if (!Array.isArray(data.data)) {
      throw new Error('Invalid response: data is not an array')
    }
    // Apply limit if provided
    const transactions = data.data
    if (params?.limit) {
      return transactions.slice(0, params.limit)
    }
    return transactions
  } catch (err) {
    logger.error('Error fetching transactions', err instanceof Error ? err : new Error('Unknown error'))
    throw err instanceof Error ? err : new Error('Unknown error')
  }
}

export const getTransactionById = async (id: string): Promise<Transaction> => {
  try {
    // Interceptor returns response.data directly, so 'response' is already the ApiResponse
    const response = await apiClient.get<ApiResponse<Transaction>>(`/transactions/${id}`) as unknown as ApiResponse<Transaction>

    if (!response || typeof response !== 'object') {
      throw new Error('Invalid response: response is not an object')
    }

    if (!response.success) {
      throw new Error(response.message || 'Failed to fetch transaction')
    }
    if (!response.data) {
      throw new Error('Invalid response: missing data field')
    }
    return response.data
  } catch (err) {
    throw err instanceof Error ? err : new Error('Unknown error')
  }
}

