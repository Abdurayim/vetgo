import { z } from "zod";

export const profileSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name too long"),
  phone: z.string().max(30).optional(),
  address: z.string().max(200).optional(),
  city: z.string().max(100).optional(),
  country: z.string().max(100).optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
});

export const vetProfileSchema = z.object({
  bio: z.string().max(1000).optional(),
  specialties: z.array(z.string()).min(1, "Select at least one specialty"),
  years_of_experience: z.coerce
    .number()
    .min(0)
    .max(50)
    .optional(),
  license_number: z.string().optional(),
  consultation_fee: z.coerce.number().min(0, "Fee must be positive"),
  home_visit_fee: z.coerce.number().min(0).optional(),
  tele_fee: z.coerce.number().min(0).optional(),
  is_available: z.boolean().default(true),
});

export type ProfileInput = z.infer<typeof profileSchema>;
export type VetProfileInput = z.infer<typeof vetProfileSchema>;
