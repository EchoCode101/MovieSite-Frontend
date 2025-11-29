export interface NotificationSender {
  _id: string
  username: string
  profile_pic?: string
}

/**
 * Reference ID can be a string (ID) or a populated object
 * Based on backend: reference_id is Types.ObjectId, but can be populated
 */
export type NotificationReferenceId = string | { _id: string; [key: string]: unknown }

export interface Notification {
  _id: string
  recipient_id: string
  sender_id: NotificationSender
  type: string
  message: string
  is_read: boolean
  reference_id: NotificationReferenceId
  reference_type: 'Videos' | 'Comments' | 'ReviewsAndRatings' | string
  createdAt: string
  updatedAt?: string
}

export interface NotificationsResponse {
  notifications: Notification[]
  currentPage: number
  totalPages: number
  totalNotifications: number
  unreadCount: number
}

export interface UnreadCountResponse {
  count: number
}
