import type { Notification } from "@/features/notifications/types/notification.types";

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "n_1",
    user_id: "u_mock_1",
    type: "booking_confirmed",
    title: "Booking confirmed",
    body: "Dr. Ada Vetson confirmed your appointment.",
    data: null,
    is_read: false,
    created_at: new Date(Date.now() - 3_600_000).toISOString(),
  },
  {
    id: "n_2",
    user_id: "u_mock_1",
    type: "message_received",
    title: "New message",
    body: "You have a new message from your vet.",
    data: null,
    is_read: true,
    created_at: new Date(Date.now() - 86_400_000).toISOString(),
  },
];

// TODO: replace with apiClient.get<Notification[]>("/notifications", { limit }) when backend is ready
export async function getNotifications(limit = 20): Promise<Notification[]> {
  await new Promise((r) => setTimeout(r, 100));
  return MOCK_NOTIFICATIONS.slice(0, limit);
}

// TODO: replace with apiClient.get<{ count: number }>("/notifications/unread-count") when backend is ready
export async function getUnreadCount(): Promise<number> {
  await new Promise((r) => setTimeout(r, 50));
  return MOCK_NOTIFICATIONS.filter((n) => !n.is_read).length;
}

// TODO: replace with apiClient.patch<void>(`/notifications/${notificationId}/read`) when backend is ready
export async function markAsRead(notificationId: string): Promise<void> {
  await new Promise((r) => setTimeout(r, 50));
  void notificationId;
}

// TODO: replace with apiClient.patch<void>("/notifications/read-all") when backend is ready
export async function markAllAsRead(): Promise<void> {
  await new Promise((r) => setTimeout(r, 50));
}
