import { apiClient } from '@/config/api'
import { API_ERRORS } from '@/lib/api-errors'
import { extractData } from '@/lib/api-response'
import { logger } from '@/lib/logger'
import type { ApiResponse } from '@/types'

import type {
  Report,
  ReportListParams,
  UpdateReportStatusPayload,
} from '../types'

const REPORTS_BASE_PATH = '/reports'

/**
 * Get all reports (admin) - no pagination
 */
export async function getReports(
  params?: ReportListParams,
): Promise<Report[]> {
  try {
    const response = (await apiClient.get<ApiResponse<Report[]>>(
      REPORTS_BASE_PATH,
      { params },
    )) as unknown as ApiResponse<Report[]>

    return extractData(response)
  } catch (error) {
    logger.error('getReports failed', error)
    throw new Error(API_ERRORS.FETCH_FAILED('reports'))
  }
}

/**
 * Get report by ID (if endpoint exists, otherwise filter from getReports)
 */
export async function getReportById(id: string): Promise<Report> {
  try {
    // Try to get single report endpoint first
    const response = (await apiClient.get<ApiResponse<Report>>(
      `${REPORTS_BASE_PATH}/${id}`,
    )) as unknown as ApiResponse<Report>

    return extractData(response)
  } catch (_error) {
    // If endpoint doesn't exist, get all and filter
    logger.warn('getReportById: single endpoint not available, filtering from all reports')
    const allReports = await getReports()
    const report = allReports.find((r) => (r.id || r._id) === id)
    if (!report) {
      throw new Error('Report not found')
    }
    return report
  }
}

/**
 * Update report status (admin)
 */
export async function updateReportStatus(
  id: string,
  payload: UpdateReportStatusPayload,
): Promise<Report> {
  try {
    const response = (await apiClient.put<ApiResponse<Report>>(
      `${REPORTS_BASE_PATH}/${id}`,
      payload,
    )) as unknown as ApiResponse<Report>

    return extractData(response)
  } catch (error) {
    logger.error('updateReportStatus failed', error)
    throw new Error(API_ERRORS.UPDATE_FAILED('report'))
  }
}

