import { apiClient } from '@/config/api'
import { API_ERRORS } from '@/lib/api-errors'
import { extractData } from '@/lib/api-response'
import { logger } from '@/lib/logger'
import type { ApiResponse } from '@/types'

import type { CreateTaxPayload, Tax, TaxListResponse, UpdateTaxPayload } from '../types'

const TAXES_BASE_PATH = '/taxes'

/**
 * Get all taxes (admin)
 *
 * Maps to: GET /api/taxes
 */
export async function getTaxes(): Promise<TaxListResponse> {
  try {
    const response = (await apiClient.get<ApiResponse<TaxListResponse>>(
      TAXES_BASE_PATH,
    )) as unknown as ApiResponse<TaxListResponse>

    return extractData(response)
  } catch (error) {
    logger.error('getTaxes failed', error)
    throw new Error(API_ERRORS.FETCH_FAILED('taxes'))
  }
}

/**
 * Get tax by ID (admin)
 *
 * Maps to: GET /api/taxes/:id
 */
export async function getTaxById(id: string): Promise<Tax> {
  try {
    const response = (await apiClient.get<ApiResponse<Tax>>(
      `${TAXES_BASE_PATH}/${id}`,
    )) as unknown as ApiResponse<Tax>

    return extractData(response)
  } catch (error) {
    logger.error('getTaxById failed', error)
    throw new Error(API_ERRORS.FETCH_FAILED('tax'))
  }
}

/**
 * Get tax by country
 *
 * Maps to: GET /api/taxes/country/:country
 */
export async function getTaxByCountry(country: string): Promise<Tax> {
  try {
    const response = (await apiClient.get<ApiResponse<Tax>>(
      `${TAXES_BASE_PATH}/country/${encodeURIComponent(country)}`,
    )) as unknown as ApiResponse<Tax>

    return extractData(response)
  } catch (error) {
    logger.error('getTaxByCountry failed', error)
    throw new Error(API_ERRORS.FETCH_FAILED('tax'))
  }
}

/**
 * Create tax (admin)
 *
 * Maps to: POST /api/taxes
 */
export async function createTax(
  payload: CreateTaxPayload,
): Promise<Tax> {
  try {
    const response = (await apiClient.post<ApiResponse<Tax>>(
      TAXES_BASE_PATH,
      payload,
    )) as unknown as ApiResponse<Tax>

    return extractData(response)
  } catch (error) {
    logger.error('createTax failed', error)
    throw new Error(API_ERRORS.CREATE_FAILED('tax'))
  }
}

/**
 * Update tax (admin)
 *
 * Maps to: PUT /api/taxes/:id
 */
export async function updateTax(
  id: string,
  payload: UpdateTaxPayload,
): Promise<Tax> {
  try {
    const response = (await apiClient.put<ApiResponse<Tax>>(
      `${TAXES_BASE_PATH}/${id}`,
      payload,
    )) as unknown as ApiResponse<Tax>

    return extractData(response)
  } catch (error) {
    logger.error('updateTax failed', error)
    throw new Error(API_ERRORS.UPDATE_FAILED('tax'))
  }
}

/**
 * Delete tax (admin)
 *
 * Maps to: DELETE /api/taxes/:id
 */
export async function deleteTax(id: string): Promise<void> {
  try {
    await apiClient.delete<ApiResponse<null>>(`${TAXES_BASE_PATH}/${id}`)
  } catch (error) {
    logger.error('deleteTax failed', error)
    throw new Error(API_ERRORS.DELETE_FAILED('tax'))
  }
}


