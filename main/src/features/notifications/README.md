# Notifications Feature

## Purpose

In-app notification management. Handles user notifications, read/unread status, and notification counts.

## API Endpoints

- `GET /api/notifications` - Get paginated notifications
- `GET /api/notifications/unread-count` - Get unread notification count
- `PUT /api/notifications/:id/read` - Mark notification as read
- `PUT /api/notifications/read-all` - Mark all notifications as read
- `DELETE /api/notifications/:id` - Delete notification
- `DELETE /api/notifications/bulk` - Bulk delete notifications

## Components

None (notifications are typically displayed in a notification dropdown or dedicated page)

## Hooks

- `useNotifications(page, limit)` - Fetch paginated notifications
- `useUnreadNotificationCount()` - Fetch unread notification count
- `useMarkNotificationAsRead()` - Mark notification as read mutation
- `useMarkAllNotificationsAsRead()` - Mark all notifications as read mutation
- `useDeleteNotification()` - Delete notification mutation
- `useBulkDeleteNotifications()` - Bulk delete notifications mutation

## Integration Points

- Notification dropdown in header/navbar
- Notification center/page
- Unread count badges
- Real-time notification updates

