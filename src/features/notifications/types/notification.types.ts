import type { Notification } from "@/shared/types/domain.types";

export type { Notification };

export type NotificationType =
  | "booking_requested"
  | "booking_confirmed"
  | "booking_cancelled"
  | "booking_completed"
  | "message_received"
  | "review_received"
  | "listing_approved"
  | "listing_rejected";
