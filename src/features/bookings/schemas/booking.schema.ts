import { z } from "zod";

export const appointmentTypeSchema = z.enum(
  ["in_clinic", "home_visit", "telemedicine"],
  { error: "Please select an appointment type" }
);

export const createBookingSchema = z.object({
  vetProfileId: z.string().uuid("Invalid vet"),
  vetUserId: z.string().uuid("Invalid vet user"),
  petId: z.string().uuid().optional(),
  appointmentType: appointmentTypeSchema,
  scheduledAt: z
    .string()
    .min(1, "Please select a date and time")
    .refine((val) => {
      const date = new Date(val);
      return !isNaN(date.getTime()) && date > new Date();
    }, "Appointment must be in the future"),
  durationMinutes: z.number().int().min(15).max(240).optional(),
  notes: z.string().max(500).optional(),
  ownerAddress: z.string().max(300).optional(),
});

export const cancelBookingSchema = z.object({
  bookingId: z.string().uuid("Invalid booking"),
  cancelReason: z.string().min(3, "Please provide a reason").max(300),
});

export type CreateBookingFormValues = z.infer<typeof createBookingSchema>;
export type CancelBookingFormValues = z.infer<typeof cancelBookingSchema>;
