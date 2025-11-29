import { apiClient } from '@/config/api'
import type { ApiResponse } from '@/lib/api-response'
import type { CreateReportData, ReportResponse } from '../types'

/**
 * Create a report
 * 
 * @param data - Report data
 * @returns Promise resolving to created report
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string,
 *   data: ReportResponse
 * }
 */
export const createReport = async (data: CreateReportData): Promise<ReportResponse> => {
  try {
    // Interceptor returns response.data, so 'response' is already the ApiResponse
    const response = await apiClient.post<ApiResponse<ReportResponse>>('/reports', data) as unknown as ApiResponse<ReportResponse>
    if (!response) {
      throw new Error('Invalid response: response is undefined')
    }
    if (!response.success) {
      throw new Error(response.message || 'Failed to create report')
    }
    // Validate shape
    if (!response.data) {
      throw new Error('Invalid response: missing data field')
    }
    return response.data
  } catch (err) {
    throw err instanceof Error ? err : new Error('Unknown error')
  }
}
