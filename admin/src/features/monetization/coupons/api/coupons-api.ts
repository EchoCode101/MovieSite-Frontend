import { apiClient } from '@/config/api'
import { API_ERRORS } from '@/lib/api-errors'
import { extractData } from '@/lib/api-response'
import { logger } from '@/lib/logger'
import type { ApiResponse } from '@/types'

import type {
  Coupon,
  CouponListResponse,
  CreateCouponPayload,
  UpdateCouponPayload,
  ValidateCouponResponse,
} from '../types'

const COUPONS_BASE_PATH = '/coupons'

/**
 * Get all coupons (admin)
 *
 * Maps to: GET /api/coupons
 */
export async function getCoupons(): Promise<CouponListResponse> {
  try {
    const response = (await apiClient.get<ApiResponse<CouponListResponse>>(
      COUPONS_BASE_PATH,
    )) as unknown as ApiResponse<CouponListResponse>

    return extractData(response)
  } catch (error) {
    logger.error('getCoupons failed', error)
    throw new Error(API_ERRORS.FETCH_FAILED('coupons'))
  }
}

/**
 * Get coupon by ID (admin)
 *
 * Maps to: GET /api/coupons/:id
 */
export async function getCouponById(id: string): Promise<Coupon> {
  try {
    const response = (await apiClient.get<ApiResponse<Coupon>>(
      `${COUPONS_BASE_PATH}/${id}`,
    )) as unknown as ApiResponse<Coupon>

    return extractData(response)
  } catch (error) {
    logger.error('getCouponById failed', error)
    throw new Error(API_ERRORS.FETCH_FAILED('coupon'))
  }
}

/**
 * Create coupon (admin)
 *
 * Maps to: POST /api/coupons
 */
export async function createCoupon(
  payload: CreateCouponPayload,
): Promise<Coupon> {
  try {
    const response = (await apiClient.post<ApiResponse<Coupon>>(
      COUPONS_BASE_PATH,
      payload,
    )) as unknown as ApiResponse<Coupon>

    return extractData(response)
  } catch (error) {
    logger.error('createCoupon failed', error)
    throw new Error(API_ERRORS.CREATE_FAILED('coupon'))
  }
}

/**
 * Update coupon (admin)
 *
 * Maps to: PUT /api/coupons/:id
 */
export async function updateCoupon(
  id: string,
  payload: UpdateCouponPayload,
): Promise<Coupon> {
  try {
    const response = (await apiClient.put<ApiResponse<Coupon>>(
      `${COUPONS_BASE_PATH}/${id}`,
      payload,
    )) as unknown as ApiResponse<Coupon>

    return extractData(response)
  } catch (error) {
    logger.error('updateCoupon failed', error)
    throw new Error(API_ERRORS.UPDATE_FAILED('coupon'))
  }
}

/**
 * Delete coupon (admin)
 *
 * Maps to: DELETE /api/coupons/:id
 */
export async function deleteCoupon(id: string): Promise<void> {
  try {
    await apiClient.delete<ApiResponse<null>>(`${COUPONS_BASE_PATH}/${id}`)
  } catch (error) {
    logger.error('deleteCoupon failed', error)
    throw new Error(API_ERRORS.DELETE_FAILED('coupon'))
  }
}

/**
 * Validate coupon for a given code (and optional plan)
 *
 * Maps to: GET /api/coupons/validate/:code
 */
export async function validateCoupon(
  code: string,
  planId?: string,
): Promise<ValidateCouponResponse> {
  try {
    const response = (await apiClient.get<ApiResponse<ValidateCouponResponse>>(
      `${COUPONS_BASE_PATH}/validate/${encodeURIComponent(code)}`,
      {
        params: planId ? { plan_id: planId } : undefined,
      },
    )) as unknown as ApiResponse<ValidateCouponResponse>

    return extractData(response)
  } catch (error) {
    logger.error('validateCoupon failed', error)
    throw new Error(API_ERRORS.FETCH_FAILED('coupon'))
  }
}


