export interface PaymentPlan {
  id: string
  name: string
  tier: 'Free' | 'Basic' | 'Premium' | 'Ultimate'
  price: number
  interval: 'month' | 'year'
  features: string[]
  popular?: boolean
}

export interface BillingHistory {
  id: string
  date: string
  amount: number
  plan: string
  status: 'paid' | 'pending' | 'failed'
}
