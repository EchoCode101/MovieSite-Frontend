/**
 * Shared API response types
 * 
 * Common response patterns used across all API endpoints
 */

import type { ApiResponse } from '@/lib/api-response'

/**
 * Paginated response structure
 */
export interface PaginatedResponse<T> {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage?: number
  items: T[]
}

/**
 * Paginated API response
 */
export type PaginatedApiResponse<T> = ApiResponse<PaginatedResponse<T>>

/**
 * Error response structure
 */
export interface ErrorResponse {
  success: false
  message: string
  error?: {
    message: string
    stack?: string
  }
}

/**
 * Success response structure
 */
export interface SuccessResponse<T> {
  success: true
  message?: string
  data: T
}

