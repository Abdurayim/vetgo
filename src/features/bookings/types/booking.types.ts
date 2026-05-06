import type {
  Booking,
  BookingStatus,
  AppointmentType,
} from "@/shared/types/domain.types";

export type { Booking, BookingStatus, AppointmentType };

export interface BookingWithDetails extends Booking {
  vet_full_name: string;
  vet_avatar_url: string | null;
  owner_full_name: string;
  owner_avatar_url: string | null;
  pet_name: string | null;
}

export interface CreateBookingInput {
  vetProfileId: string;
  vetUserId: string;
  petId?: string;
  appointmentType: AppointmentType;
  scheduledAt: string;
  durationMinutes?: number;
  notes?: string;
  ownerAddress?: string;
}

export interface UpdateBookingStatusInput {
  bookingId: string;
  status: BookingStatus;
  cancelReason?: string;
}

export type BookingRole = "owner" | "vet";

export interface BookingListFilters {
  status?: BookingStatus;
  role: BookingRole;
}
