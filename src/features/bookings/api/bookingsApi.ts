import { apiClient } from "@/shared/lib/api-client";
import type {
  BookingListFilters,
  BookingWithDetails,
  CreateBookingInput,
} from "@/features/bookings/types/booking.types";

interface ActionResult {
  success: boolean;
  error?: string;
}

interface CreateBookingResult extends ActionResult {
  bookingId?: string;
}

export async function getBookings(
  filters: BookingListFilters,
): Promise<BookingWithDetails[]> {
  return apiClient.get<BookingWithDetails[]>("/bookings", {
    status: filters.status,
  });
}

export async function getBookingById(
  bookingId: string,
): Promise<BookingWithDetails> {
  return apiClient.get<BookingWithDetails>(`/bookings/${bookingId}`);
}

export async function createBookingAction(
  input: CreateBookingInput,
): Promise<CreateBookingResult> {
  try {
    const res = await apiClient.post<{ bookingId: string }>("/bookings", {
      vetProfileId: input.vetProfileId,
      vetUserId: input.vetUserId,
      petId: input.petId,
      appointmentType: input.appointmentType,
      scheduledAt: input.scheduledAt,
      durationMinutes: input.durationMinutes ?? 60,
      notes: input.notes,
      ownerAddress: input.ownerAddress,
    });
    return { success: true, bookingId: res.bookingId };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to create booking";
    return { success: false, error: msg };
  }
}

export async function confirmBookingAction(
  bookingId: string,
): Promise<ActionResult> {
  try {
    await apiClient.patch(`/bookings/${bookingId}/confirm`);
    return { success: true };
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : "Error" };
  }
}

export async function startBookingAction(
  bookingId: string,
): Promise<ActionResult> {
  try {
    await apiClient.patch(`/bookings/${bookingId}/start`);
    return { success: true };
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : "Error" };
  }
}

export async function completeBookingAction(
  bookingId: string,
): Promise<ActionResult> {
  try {
    await apiClient.patch(`/bookings/${bookingId}/complete`);
    return { success: true };
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : "Error" };
  }
}

export async function cancelBookingAction(input: {
  bookingId: string;
  cancelReason: string;
}): Promise<ActionResult> {
  try {
    await apiClient.patch(`/bookings/${input.bookingId}/cancel`, {
      cancelReason: input.cancelReason,
    });
    return { success: true };
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : "Error" };
  }
}
