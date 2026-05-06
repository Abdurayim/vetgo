import { useQuery } from "@tanstack/react-query";
import {
  getNotifications,
  getUnreadCount,
} from "@/features/notifications/api/notificationsApi";

export function useNotifications(limit = 20) {
  return useQuery({
    queryKey: ["notifications", "list", limit],
    queryFn: () => getNotifications(limit),
    staleTime: 30_000,
  });
}

export function useUnreadCount() {
  return useQuery({
    queryKey: ["notifications", "unread-count"],
    queryFn: () => getUnreadCount(),
    staleTime: 30_000,
    refetchInterval: 60_000,
  });
}
