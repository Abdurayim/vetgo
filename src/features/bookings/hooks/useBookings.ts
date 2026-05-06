import { useQuery } from "@tanstack/react-query";
import { getBookings } from "@/features/bookings/api/bookingsApi";
import type { BookingListFilters } from "@/features/bookings/types/booking.types";

export function useBookings(filters: BookingListFilters) {
  return useQuery({
    queryKey: ["bookings", filters],
    queryFn: () => getBookings(filters),
  });
}
