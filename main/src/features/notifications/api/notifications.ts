import { apiClient } from '@/config/api'
import type { ApiResponse } from '@/lib/api-response'
import { logger } from '@/lib/logger'
import type { Notification, NotificationsResponse, UnreadCountResponse } from '../types'

/**
 * Fetch paginated notifications
 * 
 * @param page - Page number (default: 1)
 * @param limit - Items per page (default: 10)
 * @returns Promise resolving to notifications response
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string,
 *   data: {
 *     notifications: Notification[],
 *     currentPage: number,
 *     totalPages: number,
 *     totalNotifications: number,
 *     unreadCount: number
 *   }
 * }
 */
export const fetchNotifications = async (page = 1, limit = 10): Promise<NotificationsResponse> => {
  try {
    // Interceptor returns response.data, so 'data' here is already the ApiResponse
    const data = await apiClient.get<ApiResponse<NotificationsResponse>>('/notifications', {
      params: { page, limit },
    })

    // Check if data is undefined or null
    if (!data) {
      throw new Error('Invalid response: response data is undefined')
    }

    // Expect ApiResponse format: { success, message, data }
    if (!data.success) {
      throw new Error(data.message || 'Failed to fetch notifications')
    }
    // Validate shape
    if (!data.data) {
      throw new Error('Invalid response: missing data field')
    }
    if (!Array.isArray(data.data.notifications)) {
      throw new Error('Invalid response: notifications is not an array')
    }
    // Ensure unreadCount is present and is a number
    if (typeof data.data.unreadCount !== 'number') {
      // If unreadCount is missing, calculate it from notifications
      data.data.unreadCount = data.data.notifications.filter((n: Notification) => !n.is_read).length
    }
    return data.data
  } catch (err) {
    logger.error('Error fetching notifications', err instanceof Error ? err : new Error('Unknown error'))
    throw err instanceof Error ? err : new Error('Unknown error')
  }
}

/**
 * Get unread notifications count
 * 
 * @returns Promise resolving to unread count
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string,
 *   data: { count: number }
 * }
 */
export const fetchUnreadCount = async (): Promise<number> => {
  try {
    // Interceptor returns response.data directly, so 'response' is already the ApiResponse
    const response = await apiClient.get<ApiResponse<UnreadCountResponse>>('/notifications/unread-count') as unknown as ApiResponse<UnreadCountResponse>

    if (!response || typeof response !== 'object') {
      throw new Error('Invalid response: response is not an object')
    }

    if (!response.success) {
      throw new Error(response.message || 'Failed to fetch unread count')
    }
    // Validate shape
    if (!response.data) {
      throw new Error('Invalid response: missing data field')
    }
    if (typeof response.data.count !== 'number') {
      throw new Error('Invalid response: count must be a number')
    }
    return response.data.count
  } catch (err) {
    throw err instanceof Error ? err : new Error('Unknown error')
  }
}

/**
 * Mark a single notification as read
 * 
 * @param id - Notification ID
 * @returns Promise resolving to updated notification
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string,
 *   data: Notification
 * }
 */
export const markNotificationAsRead = async (id: string): Promise<Notification> => {
  try {
    // Interceptor returns response.data directly, so 'response' is already the ApiResponse
    const response = await apiClient.put<ApiResponse<Notification>>(`/notifications/${id}/read`)

    if (!response || typeof response !== 'object') {
      throw new Error('Invalid response: response is not an object')
    }

    if (!response.success) {
      throw new Error(response.message || 'Failed to mark notification as read')
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

/**
 * Mark all notifications as read
 * 
 * @returns Promise resolving when operation is complete
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string
 * }
 */
export const markAllNotificationsAsRead = async (): Promise<void> => {
  try {
    // Interceptor returns response.data directly, so 'response' is already the ApiResponse
    const response = await apiClient.put<ApiResponse<null>>('/notifications/read-all')

    if (!response || typeof response !== 'object') {
      throw new Error('Invalid response: response is not an object')
    }

    if (!response.success) {
      throw new Error(response.message || 'Failed to mark all notifications as read')
    }
  } catch (err) {
    throw err instanceof Error ? err : new Error('Unknown error')
  }
}

/**
 * Delete a single notification
 * 
 * @param id - Notification ID
 * @returns Promise resolving when deletion is complete
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string
 * }
 */
export const deleteNotification = async (id: string): Promise<void> => {
  try {
    // Interceptor returns response.data directly, so 'response' is already the ApiResponse
    const response = await apiClient.delete<ApiResponse<null>>(`/notifications/${id}`)

    if (!response || typeof response !== 'object') {
      throw new Error('Invalid response: response is not an object')
    }

    if (!response.success) {
      throw new Error(response.message || 'Failed to delete notification')
    }
  } catch (err) {
    throw err instanceof Error ? err : new Error('Unknown error')
  }
}

/**
 * Bulk delete notifications
 * 
 * @param ids - Array of notification IDs
 * @returns Promise resolving when deletion is complete
 * 
 * Backend Response Format:
 * {
 *   success: boolean,
 *   message?: string
 * }
 */
export const bulkDeleteNotifications = async (ids: string[]): Promise<void> => {
  try {
    // Interceptor returns response.data directly, so 'response' is already the ApiResponse
    const response = await apiClient.delete<ApiResponse<null>>('/notifications/bulk', {
      data: { ids },
    })

    if (!response || typeof response !== 'object') {
      throw new Error('Invalid response: response is not an object')
    }

    if (!response.success) {
      throw new Error(response.message || 'Failed to delete notifications')
    }
  } catch (err) {
    throw err instanceof Error ? err : new Error('Unknown error')
  }
}
