import { apiClient } from '@/config/api'
import type { ApiResponse } from '@/lib/api-response'
import type { SubscriptionPlan, PlansResponse } from '../types'

/**
 * Get subscription plans
 * 
 * @param params - Query parameters (is_active, is_featured, billing_cycle, page, limit)
 * @returns Promise resolving to plans response
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string,
 *   data: PlansResponse
 * }
 */
export const getPlans = async (params?: {
  is_active?: boolean
  is_featured?: boolean
  billing_cycle?: 'weekly' | 'monthly' | 'quarterly' | 'yearly'
  page?: number
  limit?: number
}): Promise<PlansResponse> => {
  try {
    // Interceptor returns response.data directly, so 'response' is already the ApiResponse
    const response = await apiClient.get<ApiResponse<PlansResponse>>('/subscriptions/plans', { params }) as unknown as ApiResponse<PlansResponse>
    
    if (!response || typeof response !== 'object') {
      throw new Error('Invalid response: response is not an object')
    }
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to fetch plans')
    }
    // Validate shape
    if (!response.data) {
      throw new Error('Invalid response: missing data field')
    }
    if (!Array.isArray(response.data.plans)) {
      throw new Error('Invalid response: plans is not an array')
    }
    return response.data
  } catch (err) {
    throw err instanceof Error ? err : new Error('Unknown error')
  }
}

/**
 * Get plan by ID
 * 
 * @param id - Plan ID
 * @returns Promise resolving to plan
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string,
 *   data: SubscriptionPlan
 * }
 */
export const getPlanById = async (id: string): Promise<SubscriptionPlan> => {
  try {
    // Interceptor returns response.data directly, so 'response' is already the ApiResponse
    const response = await apiClient.get<ApiResponse<SubscriptionPlan>>(`/subscriptions/plans/${id}`) as unknown as ApiResponse<SubscriptionPlan>
    
    if (!response || typeof response !== 'object') {
      throw new Error('Invalid response: response is not an object')
    }
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to fetch plan')
    }
    // Validate shape
    if (!response.data) {
      throw new Error('Invalid response: missing data field')
    }
    return response.data
  } catch (err) {
    throw err instanceof Error ? err : new Error('Unknown error')
  }
}

