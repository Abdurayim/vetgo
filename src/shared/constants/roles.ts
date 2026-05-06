import type { UserRole } from "@/shared/types/domain.types";

export const USER_ROLES: Record<UserRole, string> = {
  pet_owner: "Pet Owner",
  vet: "Veterinarian",
  seller: "Seller",
  admin: "Admin",
};

export const ROLE_DASHBOARD_ROUTES: Record<UserRole, string> = {
  pet_owner: "/dashboard",
  vet: "/dashboard/vet",
  seller: "/dashboard/seller/products",
  admin: "/admin",
};
