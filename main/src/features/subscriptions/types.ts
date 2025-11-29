export interface SubscriptionPlan {
  id: string
  name: string
  slug: string
  description?: string
  price: number
  billing_cycle: 'weekly' | 'monthly' | 'quarterly' | 'yearly'
  max_profiles: number
  max_devices: number
  allow_download: boolean
  allow_cast: boolean
  ad_supported: boolean
  is_featured: boolean
  is_active: boolean
  tax_included: boolean
  available_for_ppv: boolean
  createdAt?: string
  updatedAt?: string
}

export interface Subscription {
  id: string
  user_id: string
  plan_id: string
  status: 'active' | 'cancelled' | 'expired' | 'pending'
  started_at: string
  ends_at: string
  cancelled_at?: string | null
  base_amount: number
  tax_amount: number
  discount_amount: number
  total_amount: number
  currency: string
  coupon_id?: string | null
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
  payment_transaction_id?: string | null
  is_manual: boolean
  plan?: SubscriptionPlan
  createdAt?: string
  updatedAt?: string
}

export interface CreateSubscriptionData {
  plan_id: string
  coupon_code?: string
}

export interface CancelSubscriptionData {
  subscription_id: string
}

export interface PlansResponse {
  currentPage: number
  totalPages: number
  totalItems: number
  plans: SubscriptionPlan[]
}

