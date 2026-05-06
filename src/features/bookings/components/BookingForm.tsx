import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { CalendarDays, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  createBookingSchema,
  type CreateBookingFormValues,
} from "@/features/bookings/schemas/booking.schema";
import { createBookingAction } from "@/features/bookings/api/bookingsApi";
import { ROUTES } from "@/shared/constants/routes";

interface BookingFormProps {
  vetProfileId: string;
  vetUserId: string;
  consultationFee: number;
  homeVisitFee: number | null;
  teleFee: number | null;
  vetName: string;
}

export function BookingForm({
  vetProfileId,
  vetUserId,
  consultationFee,
  homeVisitFee,
  teleFee,
  vetName,
}: BookingFormProps) {
  const navigate = useNavigate();
  const [isPending, setPending] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateBookingFormValues>({
    resolver: zodResolver(createBookingSchema),
    defaultValues: {
      vetProfileId,
      vetUserId,
      appointmentType: "in_clinic",
      durationMinutes: 60,
    },
  });

  const appointmentType = watch("appointmentType");

  const feeForType = {
    in_clinic: consultationFee,
    home_visit: homeVisitFee,
    telemedicine: teleFee,
  }[appointmentType];

  async function onSubmit(values: CreateBookingFormValues) {
    setServerError(null);
    setPending(true);
    try {
      const result = await createBookingAction(values);
      if (!result.success) {
        setServerError(result.error ?? "Something went wrong");
        return;
      }
      navigate(ROUTES.bookings);
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-1.5">
        <Label>Appointment Type</Label>
        <Select
          defaultValue="in_clinic"
          onValueChange={(val) =>
            setValue(
              "appointmentType",
              (val ?? "in_clinic") as CreateBookingFormValues["appointmentType"],
              { shouldValidate: true },
            )
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="in_clinic">
              In Clinic — ${consultationFee}
            </SelectItem>
            {homeVisitFee != null && (
              <SelectItem value="home_visit">
                Home Visit — ${homeVisitFee}
              </SelectItem>
            )}
            {teleFee != null && (
              <SelectItem value="telemedicine">
                Telemedicine — ${teleFee}
              </SelectItem>
            )}
          </SelectContent>
        </Select>
        {errors.appointmentType && (
          <p className="text-xs text-destructive">
            {errors.appointmentType.message}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="scheduledAt">Date & Time</Label>
        <div className="relative">
          <CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <input
            id="scheduledAt"
            type="datetime-local"
            className="flex h-9 w-full rounded-md border border-input bg-transparent pl-9 pr-3 py-1 text-sm shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            min={new Date(Date.now() + 60_000).toISOString().slice(0, 16)}
            {...register("scheduledAt")}
          />
        </div>
        {errors.scheduledAt && (
          <p className="text-xs text-destructive">{errors.scheduledAt.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label>Duration</Label>
        <Select
          defaultValue="60"
          onValueChange={(val) =>
            setValue("durationMinutes", Number(val ?? 60), {
              shouldValidate: true,
            })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="30">30 minutes</SelectItem>
            <SelectItem value="60">1 hour</SelectItem>
            <SelectItem value="90">1.5 hours</SelectItem>
            <SelectItem value="120">2 hours</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="notes">Notes (optional)</Label>
        <Textarea
          id="notes"
          placeholder={`e.g. My dog has a limp in its front left leg…`}
          rows={3}
          {...register("notes")}
        />
        {errors.notes && (
          <p className="text-xs text-destructive">{errors.notes.message}</p>
        )}
      </div>

      {serverError && (
        <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {serverError}
        </p>
      )}

      {feeForType != null && (
        <p className="text-sm text-muted-foreground">
          Estimated fee:{" "}
          <span className="font-semibold text-foreground">
            ${feeForType}
          </span>
        </p>
      )}

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Book with {vetName}
      </Button>
    </form>
  );
}
