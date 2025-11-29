export interface PaymentMethod {
  id: string
  name: string
  type: 'stripe' | 'paypal' | 'razorpay' | 'other'
  is_active: boolean
  config?: Record<string, unknown>
  createdAt?: string
  updatedAt?: string
}

