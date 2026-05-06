import { useSearchParams, Link } from "react-router";
import { BookingList } from "@/features/bookings/components/BookingList";
import { useBookings } from "@/features/bookings/hooks/useBookings";
import { LoadingSpinner } from "@/shared/components/feedback/LoadingSpinner";
import { buttonVariants } from "@/components/ui/button";
import { useAuthStore } from "@/shared/stores/authStore";
import { ROUTES } from "@/shared/constants/routes";
import { cn } from "@/shared/lib/utils";
import type { BookingRole, BookingStatus } from "@/features/bookings/types/booking.types";

const STATUS_TABS: { label: string; value: BookingStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Confirmed", value: "confirmed" },
  { label: "In Progress", value: "in_progress" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];

export function BookingsPage() {
  const user = useAuthStore((s) => s.user)!;
  const [searchParams] = useSearchParams();

  const statusParam = searchParams.get("status");
  const activeStatus =
    statusParam && statusParam !== "all"
      ? (statusParam as BookingStatus)
      : undefined;

  const role: BookingRole = user.role === "vet" ? "vet" : "owner";

  const { data: bookings = [], isLoading } = useBookings({ role, status: activeStatus });

  return (
    <div className="space-y-6">
      <title>Bookings — VetGo</title>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Bookings</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {role === "vet"
              ? "Manage your incoming appointments."
              : "Track and manage your appointments."}
          </p>
        </div>
        {role === "owner" && (
          <Link to={ROUTES.vets} className={cn(buttonVariants({ size: "sm" }))}>
            Book a Vet
          </Link>
        )}
      </div>

      {/* Status tabs */}
      <div className="flex flex-wrap gap-1 rounded-xl border border-border/50 bg-muted/40 p-1.5">
        {STATUS_TABS.map((tab) => {
          const isActive =
            tab.value === "all" ? !activeStatus : activeStatus === tab.value;
          const href =
            tab.value === "all"
              ? ROUTES.bookings
              : `${ROUTES.bookings}?status=${tab.value}`;
          return (
            <Link
              key={tab.value}
              to={href}
              className={cn(
                "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-background text-primary shadow-sm border border-border/60"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      ) : (
        <BookingList bookings={bookings} role={role} />
      )}
    </div>
  );
}
