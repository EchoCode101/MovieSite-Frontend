import type { DiscountType } from '../types'

export interface Coupon {
  id?: string
  _id?: string
  code: string
  description?: string
  discount_type: DiscountType
  discount_value: number
  max_uses?: number
  max_uses_per_user?: number
  valid_from?: string
  valid_until?: string
  applicable_plan_ids?: string[]
  is_active: boolean
  createdAt: string
  updatedAt: string
}

export interface CouponListParams {
  is_active?: boolean
  discount_type?: DiscountType
}

export type CouponListResponse = Coupon[]

export interface CreateCouponPayload {
  code: string
  description?: string
  discount_type: DiscountType
  discount_value: number
  max_uses?: number
  max_uses_per_user?: number
  valid_from?: string
  valid_until?: string
  applicable_plan_ids?: string[]
  is_active?: boolean
}

export interface UpdateCouponPayload extends Partial<CreateCouponPayload> {}

export interface ValidateCouponResponse {
  code: string
  discount_type: DiscountType
  discount_value: number
  is_valid: boolean
  description?: string
  max_uses?: number
  max_uses_per_user?: number
  valid_from?: string
  valid_until?: string
  applicable_plan_ids?: string[]
  is_active: boolean
}


