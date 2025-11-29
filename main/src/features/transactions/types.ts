export interface Transaction {
  id: string
  user_id: string
  type: 'subscription' | 'pay_per_view'
  status: 'pending' | 'paid' | 'failed' | 'refunded'
  amount: number
  currency: string
  payment_method_id?: string
  payment_transaction_id?: string
  reference_id?: string
  description?: string
  createdAt?: string
  updatedAt?: string
}

