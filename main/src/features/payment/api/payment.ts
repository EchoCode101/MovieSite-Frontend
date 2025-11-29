import { apiClient } from '@/config/api'
import type { ApiResponse } from '@/lib/api-response'

/**
 * Update user's own subscription plan
 * 
 * @param subscriptionPlan - Subscription plan name
 * @returns Promise resolving when update is complete
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string,
 *   data: { subscription_plan: string }
 * }
 */
export const updateOwnSubscription = async (subscriptionPlan: string): Promise<void> => {
  try {
    // Interceptor returns response.data directly, so 'response' is already the ApiResponse
    const response = await apiClient.put<ApiResponse<{ subscription_plan: string }>>('/users/subscription_plan', {
      subscription_plan: subscriptionPlan,
    })
    
    if (!response || typeof response !== 'object') {
      throw new Error('Invalid response: response is not an object')
    }
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to update subscription plan')
    }
  } catch (err) {
    throw err instanceof Error ? err : new Error('Unknown error')
  }
}

/**
 * Admin: Update another user's subscription
 * 
 * @param userId - User ID
 * @param newPlan - New subscription plan
 * @returns Promise resolving when update is complete
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string,
 *   data: { user_id: string, old_plan: string, new_plan: string, updated_at: string }
 * }
 */
export const updateUserSubscription = async (userId: string, newPlan: string): Promise<void> => {
  try {
    // Interceptor returns response.data directly, so 'response' is already the ApiResponse
    const response = await apiClient.put<ApiResponse<{ user_id: string; old_plan: string; new_plan: string; updated_at: string }>>(
      '/admin/subscription',
      { userId, newPlan }
    )
    
    if (!response || typeof response !== 'object') {
      throw new Error('Invalid response: response is not an object')
    }
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to update user subscription')
    }
  } catch (err) {
    throw err instanceof Error ? err : new Error('Unknown error')
  }
}
