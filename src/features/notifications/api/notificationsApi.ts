import { apiClient } from "@/shared/lib/api-client";
import type { Notification } from "@/features/notifications/types/notification.types";

export async function getNotifications(limit = 50): Promise<Notification[]> {
  return apiClient.get<Notification[]>("/notifications", { limit });
}

export async function getUnreadCount(): Promise<number> {
  const res = await apiClient.get<{ count: number }>("/notifications/unread-count");
  return res.count;
}

export async function markAsRead(notificationId: string): Promise<void> {
  await apiClient.patch(`/notifications/${notificationId}/read`);
}

export async function markAllAsRead(): Promise<void> {
  await apiClient.patch("/notifications/mark-all-read");
}
