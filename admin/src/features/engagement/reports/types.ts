/**
 * Report target type
 */
export type ReportTargetType = 'video' | 'comment' | 'review' | 'comment_reply'

/**
 * Report reason
 */
export type ReportReason =
  | 'Spam'
  | 'Harassment'
  | 'Inappropriate Content'
  | 'Hate Speech'
  | 'Other'

/**
 * Report status
 */
export type ReportStatus = 'Pending' | 'Reviewed' | 'Resolved' | 'Dismissed'

/**
 * Reporter/user information in report
 */
export interface ReportUser {
  _id: string
  username?: string
  email?: string
  first_name?: string
  last_name?: string
}

/**
 * Report entity
 */
export interface Report {
  id?: string
  _id?: string // Backend may return either
  reporter_id?: string
  reporter?: ReportUser
  target_id: string
  target_type: ReportTargetType
  reason: ReportReason
  description?: string
  status: ReportStatus
  createdAt: string
  updatedAt: string
}

/**
 * Extended report detail with full populated data
 */
export interface ReportDetail extends Report {
  reporter: ReportUser
}

/**
 * Parameters for filtering reports (no pagination)
 */
export interface ReportListParams {
  status?: ReportStatus
  target_type?: ReportTargetType
  reason?: ReportReason
}

/**
 * Update report status payload
 */
export interface UpdateReportStatusPayload {
  status: ReportStatus
}

