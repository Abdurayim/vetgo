export type UserRole = "pet_owner" | "vet" | "seller" | "admin";

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "in_progress"
  | "completed"
  | "cancelled"
  | "no_show";

export type ProductCategory =
  | "food"
  | "drug"
  | "supplement"
  | "accessory"
  | "other";

export type ProductStatus =
  | "draft"
  | "pending_review"
  | "approved"
  | "rejected";

export type MessageType = "text" | "image" | "file";
export type AppointmentType = "in_clinic" | "home_visit" | "telemedicine";

export interface Profile {
  id: string;
  role: UserRole;
  full_name: string;
  avatar_url: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  country: string | null;
  latitude: number | null;
  longitude: number | null;
  is_active: boolean;
  is_banned: boolean;
  created_at: string;
  updated_at: string;
}

export interface VetProfile {
  id: string;
  user_id: string;
  bio: string | null;
  specialties: string[];
  years_of_experience: number | null;
  license_number: string | null;
  license_verified: boolean;
  consultation_fee: number;
  home_visit_fee: number | null;
  tele_fee: number | null;
  rating_average: number;
  review_count: number;
  is_available: boolean;
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: string;
  owner_id: string;
  vet_id: string;
  pet_id: string | null;
  appointment_type: AppointmentType;
  status: BookingStatus;
  scheduled_at: string;
  duration_minutes: number;
  notes: string | null;
  owner_address: string | null;
  cancelled_at: string | null;
  cancel_reason: string | null;
  created_at: string;
  updated_at: string;
}

export interface Pet {
  id: string;
  owner_id: string;
  name: string;
  species: string;
  breed: string | null;
  birth_date: string | null;
  weight_kg: number | null;
  notes: string | null;
  avatar_url: string | null;
  created_at: string;
}

export interface Product {
  id: string;
  seller_id: string;
  title: string;
  description: string | null;
  category: ProductCategory;
  price: number;
  stock_quantity: number;
  image_urls: string[];
  status: ProductStatus;
  tags: string[];
  weight_g: number | null;
  is_prescription: boolean;
  created_at: string;
  updated_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  body: string | null;
  data: Record<string, unknown> | null;
  is_read: boolean;
  created_at: string;
}

export interface Review {
  id: string;
  booking_id: string;
  reviewer_id: string;
  vet_id: string;
  rating: number;
  comment: string | null;
  is_visible: boolean;
  created_at: string;
}

export interface AvailabilitySlot {
  id: string;
  vet_id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_active: boolean;
}

export interface BlockedDate {
  id: string;
  vet_id: string;
  blocked_date: string;
  reason: string | null;
}

export interface VetSearchRow {
  vet_profile_id: string;
  user_id: string;
  full_name: string;
  avatar_url: string | null;
  city: string | null;
  country: string | null;
  latitude: number | null;
  longitude: number | null;
  specialties: string[];
  years_of_experience: number | null;
  consultation_fee: number;
  home_visit_fee: number | null;
  tele_fee: number | null;
  rating_average: number;
  review_count: number;
  is_available: boolean;
  bio: string | null;
  distance_km: number | null;
}
