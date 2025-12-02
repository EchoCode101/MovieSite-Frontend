import { apiClient } from '@/config/api'
import { API_ERRORS } from '@/lib/api-errors'
import { extractData } from '@/lib/api-response'
import { logger } from '@/lib/logger'
import type { ApiResponse } from '@/types'

import type {
  Transaction,
  TransactionListParams,
  TransactionListResponse,
} from '../types'

const TRANSACTIONS_BASE_PATH = '/transactions'

/**
 * Get all transactions (admin)
 *
 * Maps to: GET /api/transactions/admin/all
 */
export async function getTransactions(
  _params: TransactionListParams,
): Promise<TransactionListResponse> {
  try {
    const response = (await apiClient.get<ApiResponse<TransactionListResponse>>(
      `${TRANSACTIONS_BASE_PATH}/admin/all`,
    )) as unknown as ApiResponse<TransactionListResponse>

    return extractData(response)
  } catch (error) {
    logger.error('getTransactions failed', error)
    throw new Error(API_ERRORS.FETCH_FAILED('transactions'))
  }
}

/**
 * Get transaction by ID
 *
 * Maps to: GET /api/transactions/:id
 */
export async function getTransactionById(id: string): Promise<Transaction> {
  try {
    const response = (await apiClient.get<ApiResponse<Transaction>>(
      `${TRANSACTIONS_BASE_PATH}/${id}`,
    )) as unknown as ApiResponse<Transaction>

    return extractData(response)
  } catch (error) {
    logger.error('getTransactionById failed', error)
    throw new Error(API_ERRORS.FETCH_FAILED('transaction'))
  }
}


