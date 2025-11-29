export interface Coupon {
  code: string
  discount_type: 'percent' | 'fixed'
  discount_value: number
  is_valid: boolean
  max_uses?: number
  valid_from?: string
  valid_until?: string
}

