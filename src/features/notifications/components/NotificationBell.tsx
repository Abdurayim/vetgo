import { Bell, Check } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useQueryClient } from "@tanstack/react-query";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/shared/lib/utils";
import {
  useNotifications,
  useUnreadCount,
} from "@/features/notifications/hooks/useNotifications";
import {
  markAllAsRead,
  markAsRead,
} from "@/features/notifications/api/notificationsApi";
import type { Notification } from "@/features/notifications/types/notification.types";

export function NotificationBell() {
  const { data: notifications = [], isLoading } = useNotifications(10);
  const { data: unreadCount = 0 } = useUnreadCount();
  const queryClient = useQueryClient();

  async function handleMarkRead(id: string) {
    await markAsRead(id);
    queryClient.invalidateQueries({ queryKey: ["notifications"] });
  }

  async function handleMarkAll() {
    await markAllAsRead();
    queryClient.invalidateQueries({ queryKey: ["notifications"] });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "relative text-muted-foreground hover:text-foreground"
        )}
        aria-label={`Notifications (${unreadCount} unread)`}
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between border-b border-border/50 px-3 py-2.5">
          <p className="text-sm font-semibold">Notifications</p>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMarkAll}
              className="h-7 gap-1 px-2 text-xs"
            >
              <Check className="h-3 w-3" />
              Mark all read
            </Button>
          )}
        </div>

        <div className="max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="flex h-24 items-center justify-center text-xs text-muted-foreground">
              Loading…
            </div>
          ) : notifications.length === 0 ? (
            <div className="flex h-24 flex-col items-center justify-center gap-1 text-xs text-muted-foreground">
              <Bell className="h-5 w-5 opacity-40" />
              No notifications yet
            </div>
          ) : (
            notifications.map((n) => (
              <NotificationItem key={n.id} notification={n} onMarkRead={handleMarkRead} />
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function NotificationItem({
  notification,
  onMarkRead,
}: {
  notification: Notification;
  onMarkRead: (id: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => {
        if (!notification.is_read) onMarkRead(notification.id);
      }}
      className={cn(
        "flex w-full gap-2.5 border-b border-border/40 px-3 py-3 text-left transition-colors hover:bg-accent/40 last:border-b-0",
        !notification.is_read && "bg-primary/5"
      )}
    >
      <span
        className={cn(
          "mt-1 h-2 w-2 shrink-0 rounded-full",
          notification.is_read ? "bg-transparent" : "bg-primary"
        )}
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{notification.title}</p>
        {notification.body && (
          <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
            {notification.body}
          </p>
        )}
        <p className="mt-1 text-[10px] uppercase tracking-wide text-muted-foreground/70">
          {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
        </p>
      </div>
    </button>
  );
}
