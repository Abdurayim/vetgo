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

const MOCK_BOOKINGS: BookingWithDetails[] = [
  {
    id: "b_1",
    owner_id: "u_owner",
    vet_id: "u_vet",
    pet_id: "p_1",
    appointment_type: "in_clinic",
    status: "confirmed",
    scheduled_at: new Date(Date.now() + 86_400_000).toISOString(),
    duration_minutes: 60,
    notes: "Annual checkup",
    owner_address: null,
    cancelled_at: null,
    cancel_reason: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    vet_full_name: "Dr. Ada Vetson",
    vet_avatar_url: null,
    owner_full_name: "Demo User",
    owner_avatar_url: null,
    pet_name: "Whiskers",
  },
];

// TODO: replace with apiClient.get<BookingWithDetails[]>("/bookings", { role, status }) when backend is ready
export async function getBookings(
  filters: BookingListFilters,
): Promise<BookingWithDetails[]> {
  await new Promise((r) => setTimeout(r, 200));
  return MOCK_BOOKINGS.filter(
    (b) => !filters.status || b.status === filters.status,
  );
}

// TODO: replace with apiClient.get<BookingWithDetails>(`/bookings/${bookingId}`) when backend is ready
export async function getBookingById(
  bookingId: string,
): Promise<BookingWithDetails> {
  await new Promise((r) => setTimeout(r, 200));
  const found = MOCK_BOOKINGS.find((b) => b.id === bookingId);
  if (!found) throw new Error("Booking not found");
  return found;
}

// TODO: replace with apiClient.post<{ bookingId: string }>("/bookings", input) when backend is ready
export async function createBookingAction(
  input: CreateBookingInput,
): Promise<CreateBookingResult> {
  await new Promise((r) => setTimeout(r, 300));
  void input;
  return { success: true, bookingId: `b_${Date.now()}` };
}

// TODO: replace with apiClient.patch<void>(`/bookings/${bookingId}/confirm`) when backend is ready
export async function confirmBookingAction(
  bookingId: string,
): Promise<ActionResult> {
  await new Promise((r) => setTimeout(r, 200));
  void bookingId;
  return { success: true };
}

// TODO: replace with apiClient.patch<void>(`/bookings/${bookingId}/start`) when backend is ready
export async function startBookingAction(
  bookingId: string,
): Promise<ActionResult> {
  await new Promise((r) => setTimeout(r, 200));
  void bookingId;
  return { success: true };
}

// TODO: replace with apiClient.patch<void>(`/bookings/${bookingId}/complete`) when backend is ready
export async function completeBookingAction(
  bookingId: string,
): Promise<ActionResult> {
  await new Promise((r) => setTimeout(r, 200));
  void bookingId;
  return { success: true };
}

// TODO: replace with apiClient.patch<void>(`/bookings/${bookingId}/cancel`, { cancelReason }) when backend is ready
export async function cancelBookingAction(input: {
  bookingId: string;
  cancelReason: string;
}): Promise<ActionResult> {
  await new Promise((r) => setTimeout(r, 200));
  void input;
  return { success: true };
}
