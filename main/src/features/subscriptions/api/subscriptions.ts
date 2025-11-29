import { apiClient } from '@/config/api'
import type { ApiResponse } from '@/lib/api-response'
import { logger } from '@/lib/logger'
import type { Subscription, SubscriptionPlan, CreateSubscriptionData, CancelSubscriptionData } from '../types'

/**
 * Get user subscriptions
 * 
 * @returns Promise resolving to subscriptions array
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string,
 *   data: Subscription[]
 * }
 */
export const getSubscriptions = async (): Promise<Subscription[]> => {
  try {
    // Interceptor returns response.data directly, so 'response' is already the ApiResponse
    const response = await apiClient.get<ApiResponse<Subscription[]>>('/subscriptions') as unknown as ApiResponse<Subscription[]>

    if (!response || typeof response !== 'object') {
      throw new Error('Invalid response: response is not an object')
    }

    if (!response.success) {
      throw new Error(response.message || 'Failed to fetch subscriptions')
    }
    // Validate shape
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

/**
 * Get active subscription
 * 
 * @returns Promise resolving to active subscription or null
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string,
 *   data: Subscription | null
 * }
 */
/**
 * Parse plan_id string to SubscriptionPlan object
 * Handles various formats: object, JSON string, or stringified JS object
 */
function parsePlanId(planIdString: string | any): SubscriptionPlan | undefined {
  if (!planIdString) return undefined

  // If it's already an object with _id, transform it
  if (typeof planIdString === 'object' && planIdString._id) {
    return {
      id: planIdString._id.toString(),
      name: planIdString.name,
      slug: planIdString.slug,
      description: planIdString.description,
      price: planIdString.price,
      billing_cycle: planIdString.billing_cycle,
      max_profiles: planIdString.max_profiles,
      max_devices: planIdString.max_devices,
      allow_download: planIdString.allow_download,
      allow_cast: planIdString.allow_cast,
      ad_supported: planIdString.ad_supported,
      is_featured: planIdString.is_featured,
      is_active: planIdString.is_active,
      tax_included: planIdString.tax_included,
      available_for_ppv: planIdString.available_for_ppv,
      createdAt: planIdString.createdAt,
      updatedAt: planIdString.updatedAt,
    }
  }

  // If it's a string, try to parse it
  if (typeof planIdString === 'string') {
    try {
      // Try to parse as JSON first
      const parsed = JSON.parse(planIdString)
      if (parsed._id || parsed.id) {
        return {
          id: (parsed._id || parsed.id).toString(),
          name: parsed.name,
          slug: parsed.slug,
          description: parsed.description,
          price: parsed.price,
          billing_cycle: parsed.billing_cycle,
          max_profiles: parsed.max_profiles,
          max_devices: parsed.max_devices,
          allow_download: parsed.allow_download,
          allow_cast: parsed.allow_cast,
          ad_supported: parsed.ad_supported,
          is_featured: parsed.is_featured,
          is_active: parsed.is_active,
          tax_included: parsed.tax_included,
          available_for_ppv: parsed.available_for_ppv,
          createdAt: parsed.createdAt,
          updatedAt: parsed.updatedAt,
        }
      }
    } catch {
      // If JSON parsing fails, try to extract data from stringified JS object format
      // This handles cases like: "{ _id: new ObjectId('...'), name: '...', ... }"
      try {
        // Extract name using regex
        const nameMatch = planIdString.match(/name:\s*['"]([^'"]+)['"]/)
        const priceMatch = planIdString.match(/price:\s*([\d.]+)/)
        const billingCycleMatch = planIdString.match(/billing_cycle:\s*['"]([^'"]+)['"]/)

        if (nameMatch) {
          return {
            id: '',
            name: nameMatch[1],
            slug: '',
            description: '',
            price: priceMatch ? parseFloat(priceMatch[1]) : 0,
            billing_cycle: (billingCycleMatch?.[1] || 'monthly') as SubscriptionPlan['billing_cycle'],
            max_profiles: 0,
            max_devices: 0,
            allow_download: false,
            allow_cast: false,
            ad_supported: false,
            is_featured: false,
            is_active: true,
            tax_included: false,
            available_for_ppv: false,
          }
        }
      } catch {
        // If all parsing fails, it's just an ID string
        return undefined
      }
    }
  }

  return undefined
}

export const getActiveSubscription = async (): Promise<Subscription | null> => {
  try {
    // Interceptor returns response.data, so 'data' here is already the ApiResponse
    const data = await apiClient.get<ApiResponse<Subscription>>('/subscriptions/active') as unknown as ApiResponse<Subscription>

    // Check if data is undefined or null
    if (!data) {
      return null
    }

    // Expect ApiResponse format: { success, message, data }
    if (!data.success) {
      throw new Error(data.message || 'Failed to fetch active subscription')
    }

    // If no data, return null
    if (!data.data) {
      return null
    }

    // Transform subscription data
    const subscription = data.data
    const subscriptionResult: Subscription = {
      id: subscription.id || subscription._id,
      user_id: subscription.user_id,
      plan_id: typeof subscription.plan_id === 'string' ? subscription.plan_id : (subscription.plan_id?._id?.toString() || subscription.plan_id?.toString() || ''),
      status: subscription.status,
      started_at: subscription.started_at,
      ends_at: subscription.ends_at,
      cancelled_at: subscription.cancelled_at,
      base_amount: subscription.base_amount,
      tax_amount: subscription.tax_amount,
      discount_amount: subscription.discount_amount,
      total_amount: subscription.total_amount,
      currency: subscription.currency,
      coupon_id: subscription.coupon_id,
      payment_status: subscription.payment_status,
      payment_transaction_id: subscription.payment_transaction_id,
      is_manual: subscription.is_manual,
      createdAt: subscription.createdAt,
      updatedAt: subscription.updatedAt,
    }

    // Use plan object if provided by backend (preferred)
    if (subscription.plan) {
      subscriptionResult.plan = subscription.plan as SubscriptionPlan
    } else if (subscription.plan_id) {
      // Fallback: Try to parse plan_id to plan object
      subscriptionResult.plan = parsePlanId(subscription.plan_id)
    }

    return subscriptionResult
  } catch (err) {
    logger.error('Error fetching active subscription', err instanceof Error ? err : new Error('Unknown error'))
    throw err instanceof Error ? err : new Error('Unknown error')
  }
}

/**
 * Create subscription
 * 
 * @param data - Subscription creation data
 * @returns Promise resolving to created subscription
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string,
 *   data: Subscription
 * }
 */
export const createSubscription = async (data: CreateSubscriptionData): Promise<Subscription> => {
  try {
    // Interceptor returns response.data, so 'response' is already the ApiResponse
    const response = await apiClient.post<ApiResponse<Subscription>>('/subscriptions', data) as unknown as ApiResponse<Subscription>
    if (!response) {
      throw new Error('Invalid response: response is undefined')
    }
    if (!response.success) {
      throw new Error(response.message || 'Failed to create subscription')
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

/**
 * Cancel subscription
 * 
 * @param data - Cancel subscription data
 * @returns Promise resolving to cancelled subscription
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string,
 *   data: Subscription
 * }
 */
export const cancelSubscription = async (data: CancelSubscriptionData): Promise<Subscription> => {
  try {
    // Interceptor returns response.data, so 'response' is already the ApiResponse
    const response = await apiClient.post<ApiResponse<Subscription>>('/subscriptions/cancel', data) as unknown as ApiResponse<Subscription>
    if (!response) {
      throw new Error('Invalid response: response is undefined')
    }
    if (!response.success) {
      throw new Error(response.message || 'Failed to cancel subscription')
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

