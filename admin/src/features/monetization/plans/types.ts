import type { BillingCycle } from '../types'

export interface Plan {
  id?: string
  _id?: string
  name: string
  slug: string
  description?: string
  price: number
  billing_cycle: BillingCycle
  max_profiles?: number
  max_devices?: number
  allow_download?: boolean
  allow_cast?: boolean
  ad_supported?: boolean
  is_featured?: boolean
  is_active?: boolean
  tax_included?: boolean
  available_for_ppv?: boolean
  createdAt: string
  updatedAt: string
}

export interface PlanListParams {
  is_active?: boolean
  is_featured?: boolean
  billing_cycle?: BillingCycle
  page?: number
  limit?: number
}

export interface PlanListResponse {
  currentPage: number
  totalPages: number
  totalItems: number
  plans: Plan[]
}

export interface CreatePlanPayload {
  name: string
  slug?: string
  description?: string
  price: number
  billing_cycle: BillingCycle
  max_profiles?: number
  max_devices?: number
  allow_download?: boolean
  allow_cast?: boolean
  ad_supported?: boolean
  is_featured?: boolean
  is_active?: boolean
  tax_included?: boolean
  available_for_ppv?: boolean
}

export interface UpdatePlanPayload extends Partial<CreatePlanPayload> {}


