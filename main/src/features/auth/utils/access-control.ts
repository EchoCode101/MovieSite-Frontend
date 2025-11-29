import type { SubscriptionPlanName } from '@/types/subscription'
import type { PurchaseType } from '@/types/monetization'

export const SUBSCRIPTION_TIERS = {
  Free: 0,
  Basic: 1,
  Premium: 2,
  Ultimate: 3,
} as const

export type SubscriptionTier = keyof typeof SUBSCRIPTION_TIERS

/**
 * Check if user can access content based on subscription plan
 * 
 * @param userPlan - User's subscription plan from activeSubscription or user object
 * @param requiredPlans - Array of plan IDs that can access the content
 * @param accessType - Content access type (free, subscription, pay_per_view)
 * @param userSubscriptionPlan - User's subscription_plan field (fallback)
 * @param trustBackend - If true, trust that backend has already validated access (default: true)
 * @returns Whether user has access
 */
export const canAccessContent = (
  userPlan: SubscriptionPlanName | undefined,
  requiredPlans: string[] | undefined,
  accessType: 'free' | 'subscription' | 'pay_per_view',
  userSubscriptionPlan?: SubscriptionPlanName | undefined,
  trustBackend: boolean = true
): boolean => {
  // Free content is always accessible
  if (accessType === 'free') {
    return true
  }

  // Pay-per-view content
  if (accessType === 'pay_per_view') {
    // If we trust the backend (default), and backend returned the content,
    // assume user has access. This handles cases where access control is disabled
    // or backend has already validated access through aggregation pipelines.
    if (trustBackend) {
      // Backend has already validated access, so grant access
      // This is especially important when ENABLE_ACCESS_CONTROL=false
      return true
    }
    
    // Otherwise, must check PPV purchases separately (when trustBackend=false)
    return false
  }

  // Subscription content requires active subscription with matching plan
  if (accessType === 'subscription') {
    // If we trust the backend (default), and backend returned the content,
    // assume user has access. This handles cases where access control is disabled
    // or backend has already validated access through aggregation pipelines.
    if (trustBackend) {
      // Backend has already validated access, so grant access
      // This is especially important when ENABLE_ACCESS_CONTROL=false
      return true
    }

    // Otherwise, do frontend validation (for cases where we want extra security)
    // Determine user's plan: prefer activeSubscription plan, fallback to user's subscription_plan field
    const effectivePlan = userPlan || userSubscriptionPlan

    if (!effectivePlan || effectivePlan === 'Free') {
      return false
    }

    // Ultimate users have access to all subscription content
    if (effectivePlan === 'Ultimate') {
      return true
    }

    // If no specific plans required, any paid plan works
    if (!requiredPlans || requiredPlans.length === 0) {
      return effectivePlan !== 'Free'
    }

    // For now, if user has a paid plan and there are plan restrictions,
    // we assume backend has already validated access
    // Frontend can't easily map plan IDs to plan names without additional API calls
    // So we trust that if backend returned the content, user has access
    // This is a simplified check - full validation happens on backend
    const userLevel = SUBSCRIPTION_TIERS[effectivePlan] ?? 0
    return userLevel > 0
  }

  return false
}

/**
 * Check if user can access a video based on subscription tier
 * 
 * @param userTier - User's subscription tier
 * @param videoAccessLevel - Video access level
 * @returns Whether user has access
 */
export const canAccessVideo = (
  userTier: string | undefined,
  videoAccessLevel: string
): boolean => {
  if (!userTier) return videoAccessLevel === 'Free'

  const userLevel = SUBSCRIPTION_TIERS[userTier as SubscriptionTier] ?? 0
  const requiredLevel = SUBSCRIPTION_TIERS[videoAccessLevel as SubscriptionTier] ?? 0

  return userLevel >= requiredLevel
}

/**
 * Check if user can create comments
 * 
 * @param _userTier - User's subscription tier (unused, all users can comment)
 * @returns Whether user can comment
 */
export const canComment = (_userTier: string | undefined): boolean => {
  // All users can comment (including free)
  return true
}

/**
 * Check if user can create reviews
 * 
 * @param userTier - User's subscription tier
 * @returns Whether user can review
 */
export const canReview = (userTier: string | undefined): boolean => {
  // Basic tier and above can review
  if (!userTier) return false
  const userLevel = SUBSCRIPTION_TIERS[userTier as SubscriptionTier] ?? 0
  return userLevel >= SUBSCRIPTION_TIERS.Basic
}

/**
 * Check if user can reply to comments
 * 
 * @param userTier - User's subscription tier
 * @returns Whether user can reply
 */
export const canReply = (userTier: string | undefined): boolean => {
  // Basic tier and above can reply
  if (!userTier) return false
  const userLevel = SUBSCRIPTION_TIERS[userTier as SubscriptionTier] ?? 0
  return userLevel >= SUBSCRIPTION_TIERS.Basic
}

/**
 * Check if user can like/dislike content
 * 
 * @param userTier - User's subscription tier
 * @returns Whether user can like/dislike
 */
export const canLike = (userTier: string | undefined): boolean => {
  // All authenticated users can like/dislike
  return !!userTier
}

/**
 * Check if user has PPV access
 * 
 * @param hasPurchase - Whether user has purchased the content
 * @param purchaseType - Type of purchase (rent/buy)
 * @param expiresAt - Expiration date for rentals
 * @returns Whether user has valid access
 */
export const hasPPVAccess = (
  hasPurchase: boolean,
  purchaseType?: PurchaseType,
  expiresAt?: string
): boolean => {
  if (!hasPurchase) return false

  // Buy purchases never expire
  if (purchaseType === 'buy') return true

  // Rent purchases expire
  if (purchaseType === 'rent' && expiresAt) {
    return new Date(expiresAt) > new Date()
  }

  return hasPurchase
}

/**
 * Check device limit
 * 
 * @param currentDevices - Current number of devices
 * @param maxDevices - Maximum allowed devices
 * @returns Whether user can add more devices
 */
export const canAddDevice = (currentDevices: number, maxDevices: number): boolean => {
  return currentDevices < maxDevices
}

/**
 * Get the required tier for a specific action
 * 
 * @param action - Action type
 * @param accessLevel - Access level (optional)
 * @returns Required subscription tier
 */
export const getRequiredTier = (
  action: 'video' | 'comment' | 'review' | 'reply' | 'like',
  accessLevel?: string
): SubscriptionTier => {
  switch (action) {
    case 'video':
      return (accessLevel as SubscriptionTier) || 'Free'
    case 'comment':
      return 'Free'
    case 'review':
      return 'Basic'
    case 'reply':
      return 'Basic'
    case 'like':
      return 'Free'
    default:
      return 'Free'
  }
}

/**
 * Get user-friendly tier name
 * 
 * @param tier - Subscription tier
 * @returns Display name
 */
export const getTierDisplayName = (tier: string): string => {
  return tier.charAt(0).toUpperCase() + tier.slice(1)
}
