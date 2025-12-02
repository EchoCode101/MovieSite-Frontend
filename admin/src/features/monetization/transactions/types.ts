import type { PaymentStatus } from '../types'

export type TransactionType = 'subscription' | 'pay_per_view'

export interface Transaction {
  id?: string
  _id?: string
  user_id: string
  type: TransactionType
  gateway: string
  gateway_transaction_id?: string
  status: PaymentStatus
  amount: number
  currency: string
  subscription_id?: string | null
  ppv_id?: string | null
  createdAt: string
  updatedAt: string
}

export interface TransactionListParams {
  type?: TransactionType
  status?: PaymentStatus
}

export type TransactionListResponse = Transaction[]


