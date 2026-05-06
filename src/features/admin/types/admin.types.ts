import type { Product, UserRole } from "@/shared/types/domain.types";

export type AdminUserRow = {
  id: string;
  role: UserRole;
  full_name: string;
  avatar_url: string | null;
  city: string | null;
  country: string | null;
  is_active: boolean;
  is_banned: boolean;
  created_at: string;
};

export type AdminListingRow = Product & {
  seller_name: string | null;
};

export interface PlatformStats {
  totalUsers: number;
  totalVets: number;
  totalSellers: number;
  totalBookings: number;
  pendingListings: number;
}
