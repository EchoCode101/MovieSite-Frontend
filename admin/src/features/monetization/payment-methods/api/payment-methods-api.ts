import { apiClient } from '@/config/api'
import { API_ERRORS } from '@/lib/api-errors'
import { extractData } from '@/lib/api-response'
import { logger } from '@/lib/logger'
import type { ApiResponse } from '@/types'

import type {
  CreatePaymentMethodPayload,
  PaymentMethod,
  PaymentMethodListResponse,
  UpdatePaymentMethodPayload,
} from '../types'

const PAYMENT_METHODS_BASE_PATH = '/payment-methods'

/**
 * Get all payment methods (admin)
 *
 * Maps to: GET /api/payment-methods/admin/all
 */
export async function getPaymentMethods(): Promise<PaymentMethodListResponse> {
  try {
    const response = (await apiClient.get<ApiResponse<PaymentMethodListResponse>>(
      `${PAYMENT_METHODS_BASE_PATH}/admin/all`,
    )) as unknown as ApiResponse<PaymentMethodListResponse>

    return extractData(response)
  } catch (error) {
    logger.error('getPaymentMethods failed', error)
    throw new Error(API_ERRORS.FETCH_FAILED('payment methods'))
  }
}

/**
 * Get payment method by ID (admin)
 *
 * Maps to: GET /api/payment-methods/:id
 */
export async function getPaymentMethodById(id: string): Promise<PaymentMethod> {
  try {
    const response = (await apiClient.get<ApiResponse<PaymentMethod>>(
      `${PAYMENT_METHODS_BASE_PATH}/${id}`,
    )) as unknown as ApiResponse<PaymentMethod>

    return extractData(response)
  } catch (error) {
    logger.error('getPaymentMethodById failed', error)
    throw new Error(API_ERRORS.FETCH_FAILED('payment method'))
  }
}

/**
 * Create payment method (admin)
 *
 * Maps to: POST /api/payment-methods
 */
export async function createPaymentMethod(
  payload: CreatePaymentMethodPayload,
): Promise<PaymentMethod> {
  try {
    const response = (await apiClient.post<ApiResponse<PaymentMethod>>(
      PAYMENT_METHODS_BASE_PATH,
      payload,
    )) as unknown as ApiResponse<PaymentMethod>

    return extractData(response)
  } catch (error) {
    logger.error('createPaymentMethod failed', error)
    throw new Error(API_ERRORS.CREATE_FAILED('payment method'))
  }
}

/**
 * Update payment method (admin)
 *
 * Maps to: PUT /api/payment-methods/:id
 */
export async function updatePaymentMethod(
  id: string,
  payload: UpdatePaymentMethodPayload,
): Promise<PaymentMethod> {
  try {
    const response = (await apiClient.put<ApiResponse<PaymentMethod>>(
      `${PAYMENT_METHODS_BASE_PATH}/${id}`,
      payload,
    )) as unknown as ApiResponse<PaymentMethod>

    return extractData(response)
  } catch (error) {
    logger.error('updatePaymentMethod failed', error)
    throw new Error(API_ERRORS.UPDATE_FAILED('payment method'))
  }
}

/**
 * Delete payment method (admin)
 *
 * Maps to: DELETE /api/payment-methods/:id
 */
export async function deletePaymentMethod(id: string): Promise<void> {
  try {
    await apiClient.delete<ApiResponse<null>>(`${PAYMENT_METHODS_BASE_PATH}/${id}`)
  } catch (error) {
    logger.error('deletePaymentMethod failed', error)
    throw new Error(API_ERRORS.DELETE_FAILED('payment method'))
  }
}


