import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  useMarkNotificationAsRead,
  useNotifications,
  useUnreadNotificationCount,
} from "@/features/notifications/hooks/useNotifications";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Notification } from "@/features/notifications/types";

export function NotificationDropdown() {
  const { data } = useNotifications(1, 10);
  const { data: unreadCountFromApi } = useUnreadNotificationCount();
  const markAsReadMutation = useMarkNotificationAsRead();

  const notifications: Notification[] = data?.notifications ?? [];

  const computedUnread = notifications.filter((n) => !n.is_read).length || 0;
  const unreadCount = unreadCountFromApi ?? computedUnread;

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.is_read) {
      markAsReadMutation.mutate(notification._id);
    }

    // Optional: navigate based on related_entity if desired in the future
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className="h-[300px]">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No notifications
            </div>
          ) : (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification._id}
                className="cursor-pointer flex flex-col items-start gap-1 p-3"
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="flex w-full justify-between items-center">
                  <span
                    className={`font-medium ${
                      !notification.is_read ? "text-primary" : ""
                    }`}
                  >
                    {notification.sender_id?.username || 'Someone'}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(notification.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {notification.message}
                </p>
              </DropdownMenuItem>
            ))
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
