export interface PPVPurchase {
  id: string
  user_id: string
  target_type: 'movie' | 'episode'
  target_id: string
  purchase_type: 'rent' | 'buy'
  amount: number
  currency: string
  expires_at?: string
  transaction_id?: string
  createdAt?: string
  updatedAt?: string
}

export interface PurchasePPVData {
  target_type: 'movie' | 'episode'
  target_id: string
  purchase_type: 'rent' | 'buy'
}

export interface PPVAccessCheck {
  hasAccess: boolean
  purchaseType?: 'rent' | 'buy'
  expiresAt?: string
}

