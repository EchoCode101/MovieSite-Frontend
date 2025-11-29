export interface CreateReportData {
  target_id: string
  target_type: 'video' | 'comment' | 'review' | 'user'
  reason: string
  description?: string
}

/**
 * Report object returned from the API
 * Based on backend API documentation
 */
export interface Report {
  _id: string
  reporter_id: string
  target_id: string
  target_type: 'video' | 'comment' | 'review' | 'user'
  reason: 'Spam' | 'Harassment' | 'Inappropriate Content' | 'Hate Speech' | 'Other'
  description?: string
  status: 'Pending' | 'Reviewed' | 'Resolved' | 'Dismissed'
  createdAt: string
  updatedAt: string
}

/**
 * Report response - this is what the API returns in the data field
 */
export type ReportResponse = Report
