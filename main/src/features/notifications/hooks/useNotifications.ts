import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  bulkDeleteNotifications,
  deleteNotification,
  fetchNotifications,
  fetchUnreadCount,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "../api/notifications"
import type { NotificationsResponse, Notification } from "../types"
import { toast } from "sonner"
import { queryKeys } from "@/lib/query-keys"

/**
 * Hook to fetch paginated notifications
 * 
 * @param page - Page number (default: 1)
 * @param limit - Items per page (default: 10)
 * @returns Query hook for notifications
 */
export const useNotifications = (
  page = 1,
  limit = 10,
) => {
  return useQuery<NotificationsResponse>({
    queryKey: queryKeys.notifications.list(page, limit),
    queryFn: () => fetchNotifications(page, limit),
  })
}

/**
 * Hook to fetch unread notification count
 * 
 * @returns Query hook for unread count
 */
export const useUnreadNotificationCount = () => {
  return useQuery<number>({
    queryKey: queryKeys.notifications.unreadCount(),
    queryFn: fetchUnreadCount,
  })
}

/**
 * Hook to mark a notification as read
 * 
 * @returns Mutation hook for marking notification as read with optimistic updates
 */
export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => markNotificationAsRead(id),
    onMutate: async (id) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.notifications.all })
      await queryClient.cancelQueries({ queryKey: queryKeys.notifications.unreadCount() })

      // Snapshot previous values
      const allQueries = queryClient.getQueryCache().findAll({ 
        queryKey: queryKeys.notifications.all 
      })
      
      let previousNotifications: NotificationsResponse | undefined
      let previousUnreadCount: number | undefined
      
      for (const query of allQueries) {
        const data = query.state.data as NotificationsResponse | undefined
        if (data) {
          previousNotifications = data
          break
        }
      }
      
      const unreadQuery = queryClient.getQueryData<number>(
        queryKeys.notifications.unreadCount()
      )
      previousUnreadCount = unreadQuery

      // Optimistically update notification
      if (previousNotifications) {
        const updatedNotifications = {
          ...previousNotifications,
          notifications: previousNotifications.notifications.map((n) =>
            n._id === id ? { ...n, is_read: true } : n
          ),
          unreadCount: Math.max(0, (previousNotifications.unreadCount || 0) - 1),
        }
        queryClient.setQueryData(
          queryKeys.notifications.list(previousNotifications.currentPage, 10),
          updatedNotifications
        )
      }

      // Optimistically update unread count
      if (previousUnreadCount !== undefined) {
        queryClient.setQueryData(
          queryKeys.notifications.unreadCount(),
          Math.max(0, previousUnreadCount - 1)
        )
      }

      return { previousNotifications, previousUnreadCount }
    },
    onSuccess: () => {
      // Invalidate for consistency
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.notifications.all,
        refetchType: 'none'
      })
      queryClient.invalidateQueries({
        queryKey: queryKeys.notifications.unreadCount(),
        refetchType: 'none'
      })
    },
    onError: (error, id, context) => {
      // Rollback on error
      if (context?.previousNotifications) {
        queryClient.setQueryData(
          queryKeys.notifications.list(context.previousNotifications.currentPage, 10),
          context.previousNotifications
        )
      }
      if (context?.previousUnreadCount !== undefined) {
        queryClient.setQueryData(
          queryKeys.notifications.unreadCount(),
          context.previousUnreadCount
        )
      }
      toast.error("Failed to mark notification as read")
    },
  })
}

/**
 * Hook to mark all notifications as read
 * 
 * @returns Mutation hook for marking all notifications as read with optimistic updates
 */
export const useMarkAllNotificationsAsRead = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => markAllNotificationsAsRead(),
    onMutate: async () => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.notifications.all })
      await queryClient.cancelQueries({ queryKey: queryKeys.notifications.unreadCount() })

      // Snapshot previous values
      const allQueries = queryClient.getQueryCache().findAll({ 
        queryKey: queryKeys.notifications.all 
      })
      
      const previousData: Array<{ queryKey: unknown[], data: NotificationsResponse }> = []
      
      for (const query of allQueries) {
        const data = query.state.data as NotificationsResponse | undefined
        if (data) {
          previousData.push({ queryKey: query.queryKey, data })
        }
      }
      
      const previousUnreadCount = queryClient.getQueryData<number>(
        queryKeys.notifications.unreadCount()
      )

      // Optimistically update all notifications
      for (const { queryKey, data } of previousData) {
        queryClient.setQueryData(queryKey, {
          ...data,
          notifications: data.notifications.map((n) => ({ ...n, is_read: true })),
          unreadCount: 0,
        })
      }

      // Optimistically update unread count
      queryClient.setQueryData(queryKeys.notifications.unreadCount(), 0)

      return { previousData, previousUnreadCount }
    },
    onSuccess: () => {
      toast.success('All notifications marked as read')
      // Invalidate for consistency
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.notifications.all,
        refetchType: 'none'
      })
      queryClient.invalidateQueries({
        queryKey: queryKeys.notifications.unreadCount(),
        refetchType: 'none'
      })
    },
    onError: (error, _, context) => {
      // Rollback on error
      if (context?.previousData) {
        for (const { queryKey, data } of context.previousData) {
          queryClient.setQueryData(queryKey, data)
        }
      }
      if (context?.previousUnreadCount !== undefined) {
        queryClient.setQueryData(
          queryKeys.notifications.unreadCount(),
          context.previousUnreadCount
        )
      }
      toast.error("Failed to mark all notifications as read")
    },
  })
}

/**
 * Hook to delete a notification
 * 
 * @returns Mutation hook for deleting notification with optimistic updates
 */
export const useDeleteNotification = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteNotification(id),
    onMutate: async (id) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.notifications.all })
      await queryClient.cancelQueries({ queryKey: queryKeys.notifications.unreadCount() })

      // Find and snapshot the notification being deleted
      const allQueries = queryClient.getQueryCache().findAll({ 
        queryKey: queryKeys.notifications.all 
      })
      
      let previousNotifications: NotificationsResponse | undefined
      let previousUnreadCount: number | undefined
      
      for (const query of allQueries) {
        const data = query.state.data as NotificationsResponse | undefined
        if (data) {
          const notification = data.notifications.find((n) => n._id === id)
          if (notification) {
            previousNotifications = data
            break
          }
        }
      }
      
      previousUnreadCount = queryClient.getQueryData<number>(
        queryKeys.notifications.unreadCount()
      )

      // Optimistically remove notification
      if (previousNotifications) {
        const deletedNotification = previousNotifications.notifications.find((n) => n._id === id)
        const updatedNotifications = {
          ...previousNotifications,
          notifications: previousNotifications.notifications.filter((n) => n._id !== id),
          totalNotifications: Math.max(0, previousNotifications.totalNotifications - 1),
          unreadCount: deletedNotification && !deletedNotification.is_read
            ? Math.max(0, (previousNotifications.unreadCount || 0) - 1)
            : previousNotifications.unreadCount,
        }
        queryClient.setQueryData(
          queryKeys.notifications.list(previousNotifications.currentPage, 10),
          updatedNotifications
        )
      }

      // Optimistically update unread count if deleted notification was unread
      if (previousNotifications) {
        const deletedNotification = previousNotifications.notifications.find((n) => n._id === id)
        if (deletedNotification && !deletedNotification.is_read && previousUnreadCount !== undefined) {
          queryClient.setQueryData(
            queryKeys.notifications.unreadCount(),
            Math.max(0, previousUnreadCount - 1)
          )
        }
      }

      return { previousNotifications, previousUnreadCount }
    },
    onSuccess: () => {
      toast.success('Notification deleted')
      // Invalidate for consistency
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.notifications.all,
        refetchType: 'none'
      })
      queryClient.invalidateQueries({
        queryKey: queryKeys.notifications.unreadCount(),
        refetchType: 'none'
      })
    },
    onError: (error, id, context) => {
      // Rollback on error
      if (context?.previousNotifications) {
        queryClient.setQueryData(
          queryKeys.notifications.list(context.previousNotifications.currentPage, 10),
          context.previousNotifications
        )
      }
      if (context?.previousUnreadCount !== undefined) {
        queryClient.setQueryData(
          queryKeys.notifications.unreadCount(),
          context.previousUnreadCount
        )
      }
      toast.error("Failed to delete notification")
    },
  })
}

/**
 * Hook to bulk delete notifications
 * 
 * @returns Mutation hook for bulk deleting notifications with optimistic updates
 */
export const useBulkDeleteNotifications = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (ids: string[]) => bulkDeleteNotifications(ids),
    onMutate: async (ids) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.notifications.all })
      await queryClient.cancelQueries({ queryKey: queryKeys.notifications.unreadCount() })

      // Snapshot previous values
      const allQueries = queryClient.getQueryCache().findAll({ 
        queryKey: queryKeys.notifications.all 
      })
      
      const previousData: Array<{ queryKey: unknown[], data: NotificationsResponse }> = []
      let unreadCountToDecrease = 0
      
      for (const query of allQueries) {
        const data = query.state.data as NotificationsResponse | undefined
        if (data) {
          const deletedNotifications = data.notifications.filter((n) => ids.includes(n._id))
          unreadCountToDecrease += deletedNotifications.filter((n) => !n.is_read).length
          previousData.push({ queryKey: query.queryKey, data })
        }
      }
      
      const previousUnreadCount = queryClient.getQueryData<number>(
        queryKeys.notifications.unreadCount()
      )

      // Optimistically remove notifications
      for (const { queryKey, data } of previousData) {
        queryClient.setQueryData(queryKey, {
          ...data,
          notifications: data.notifications.filter((n) => !ids.includes(n._id)),
          totalNotifications: Math.max(0, data.totalNotifications - ids.length),
          unreadCount: Math.max(0, (data.unreadCount || 0) - unreadCountToDecrease),
        })
      }

      // Optimistically update unread count
      if (previousUnreadCount !== undefined) {
        queryClient.setQueryData(
          queryKeys.notifications.unreadCount(),
          Math.max(0, previousUnreadCount - unreadCountToDecrease)
        )
      }

      return { previousData, previousUnreadCount, unreadCountToDecrease }
    },
    onSuccess: (_, variables) => {
      toast.success(`${variables.length} notification(s) deleted`)
      // Invalidate for consistency
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.notifications.all,
        refetchType: 'none'
      })
      queryClient.invalidateQueries({
        queryKey: queryKeys.notifications.unreadCount(),
        refetchType: 'none'
      })
    },
    onError: (error, ids, context) => {
      // Rollback on error
      if (context?.previousData) {
        for (const { queryKey, data } of context.previousData) {
          queryClient.setQueryData(queryKey, data)
        }
      }
      if (context?.previousUnreadCount !== undefined) {
        queryClient.setQueryData(
          queryKeys.notifications.unreadCount(),
          context.previousUnreadCount
        )
      }
      toast.error("Failed to delete notifications")
    },
  })
}


