import { CalendarX } from "lucide-react";
import { BookingCard } from "./BookingCard";
import type { BookingWithDetails, BookingRole } from "@/features/bookings/types/booking.types";

interface BookingListProps {
  bookings: BookingWithDetails[];
  role: BookingRole;
}

export function BookingList({ bookings, role }: BookingListProps) {
  if (bookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <CalendarX className="h-6 w-6 text-muted-foreground" />
        </div>
        <div>
          <p className="font-medium">No bookings yet</p>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {role === "owner"
              ? "Book an appointment with a vet to get started."
              : "Your confirmed appointments will appear here."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {bookings.map((booking) => (
        <BookingCard key={booking.id} booking={booking} role={role} />
      ))}
    </div>
  );
}
