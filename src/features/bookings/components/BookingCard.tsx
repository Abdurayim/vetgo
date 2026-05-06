import { useState } from "react";
import {
  CalendarDays,
  Clock,
  MapPin,
  User,
  Stethoscope,
} from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { formatDateTime, getInitials } from "@/shared/lib/utils";
import { BookingStatusBadge } from "./BookingStatusBadge";
import {
  confirmBookingAction,
  cancelBookingAction,
  completeBookingAction,
  startBookingAction,
} from "@/features/bookings/api/bookingsApi";
import type {
  BookingWithDetails,
  BookingRole,
} from "@/features/bookings/types/booking.types";

interface BookingCardProps {
  booking: BookingWithDetails;
  role: BookingRole;
}

const APPOINTMENT_TYPE_LABELS = {
  in_clinic: "In Clinic",
  home_visit: "Home Visit",
  telemedicine: "Telemedicine",
} as const;

export function BookingCard({ booking, role }: BookingCardProps) {
  const queryClient = useQueryClient();
  const [isPending, setPending] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [error, setError] = useState<string | null>(null);

  const isVet = role === "vet";
  const isOwner = role === "owner";
  const status = booking.status;

  const counterpartName = isVet
    ? booking.owner_full_name
    : booking.vet_full_name;
  const counterpartAvatar = isVet
    ? booking.owner_avatar_url
    : booking.vet_avatar_url;

  async function handleAction(
    fn: () => Promise<{ success: boolean; error?: string }>,
  ) {
    setError(null);
    setPending(true);
    try {
      const result = await fn();
      if (!result.success) {
        setError(result.error ?? "Something went wrong");
      } else {
        await queryClient.invalidateQueries({ queryKey: ["bookings"] });
      }
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <Avatar className="h-10 w-10 shrink-0">
                <AvatarImage
                  src={counterpartAvatar ?? undefined}
                  alt={counterpartName}
                />
                <AvatarFallback>{getInitials(counterpartName)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 text-sm font-medium">
                  {isVet ? (
                    <User className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                  ) : (
                    <Stethoscope className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                  )}
                  <span className="truncate">{counterpartName}</span>
                </div>
                {booking.pet_name && (
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Pet: {booking.pet_name}
                  </p>
                )}
              </div>
            </div>
            <BookingStatusBadge status={status} />
          </div>

          <div className="mt-3 space-y-1.5 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5 shrink-0" />
              <span>{formatDateTime(booking.scheduled_at)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 shrink-0" />
              <span>{booking.duration_minutes} minutes</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span>{APPOINTMENT_TYPE_LABELS[booking.appointment_type]}</span>
            </div>
          </div>

          {booking.notes && (
            <p className="mt-3 rounded-md bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
              {booking.notes}
            </p>
          )}

          {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
        </CardContent>

        <CardFooter className="gap-2 px-4 pb-4 pt-0 flex-wrap">
          {isVet && status === "pending" && (
            <Button
              size="sm"
              disabled={isPending}
              onClick={() =>
                handleAction(() => confirmBookingAction(booking.id))
              }
            >
              Confirm
            </Button>
          )}
          {isVet && status === "confirmed" && (
            <Button
              size="sm"
              disabled={isPending}
              onClick={() =>
                handleAction(() => startBookingAction(booking.id))
              }
            >
              Start Appointment
            </Button>
          )}
          {isVet && status === "in_progress" && (
            <Button
              size="sm"
              disabled={isPending}
              onClick={() =>
                handleAction(() => completeBookingAction(booking.id))
              }
            >
              Mark Complete
            </Button>
          )}

          {(status === "pending" || status === "confirmed") && (
            <Button
              size="sm"
              variant="outline"
              disabled={isPending}
              onClick={() => setCancelOpen(true)}
            >
              Cancel
            </Button>
          )}

          {isOwner && status === "completed" && (
            <Button size="sm" variant="outline" disabled>
              Leave Review
            </Button>
          )}
        </CardFooter>
      </Card>

      <Dialog open={cancelOpen} onOpenChange={setCancelOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Booking</DialogTitle>
            <DialogDescription>
              Please provide a reason so the other party is informed.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label htmlFor="cancel-reason">Reason</Label>
            <Textarea
              id="cancel-reason"
              placeholder="e.g. Schedule conflict, pet feeling better…"
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              rows={3}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCancelOpen(false)}>
              Keep Booking
            </Button>
            <Button
              variant="destructive"
              disabled={isPending || cancelReason.trim().length < 3}
              onClick={() => {
                setCancelOpen(false);
                handleAction(() =>
                  cancelBookingAction({
                    bookingId: booking.id,
                    cancelReason: cancelReason.trim(),
                  }),
                );
              }}
            >
              Confirm Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
