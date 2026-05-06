import type {
  AdminListingRow,
  AdminUserRow,
  PlatformStats,
} from "@/features/admin/types/admin.types";
import type {
  ProductStatus,
  UserRole,
} from "@/shared/types/domain.types";

export interface GetUsersFilters {
  role?: UserRole | "all";
  search?: string;
}

const MOCK_USERS: AdminUserRow[] = [
  {
    id: "u_1",
    role: "pet_owner",
    full_name: "Maria López",
    avatar_url: null,
    city: "Brooklyn",
    country: "US",
    is_active: true,
    is_banned: false,
    created_at: new Date(Date.now() - 30 * 86_400_000).toISOString(),
  },
  {
    id: "u_2",
    role: "vet",
    full_name: "Dr. Ada Vetson",
    avatar_url: null,
    city: "Brooklyn",
    country: "US",
    is_active: true,
    is_banned: false,
    created_at: new Date(Date.now() - 60 * 86_400_000).toISOString(),
  },
  {
    id: "u_3",
    role: "seller",
    full_name: "PawGear Co.",
    avatar_url: null,
    city: "Queens",
    country: "US",
    is_active: true,
    is_banned: false,
    created_at: new Date(Date.now() - 90 * 86_400_000).toISOString(),
  },
];

const MOCK_LISTINGS: AdminListingRow[] = [
  {
    id: "p_pending_1",
    seller_id: "u_3",
    title: "New Joint Care Chew",
    description: "Pending review.",
    category: "supplement",
    price: 28,
    stock_quantity: 50,
    image_urls: [],
    status: "pending_review",
    tags: [],
    weight_g: 200,
    is_prescription: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    seller_name: "PawGear Co.",
  },
];

// TODO: replace with apiClient.get<AdminUserRow[]>("/admin/users", filters) when backend is ready
export async function getUsers(
  filters: GetUsersFilters = {},
): Promise<AdminUserRow[]> {
  await new Promise((r) => setTimeout(r, 100));
  let items = [...MOCK_USERS];
  if (filters.role && filters.role !== "all") {
    items = items.filter((u) => u.role === filters.role);
  }
  if (filters.search) {
    const q = filters.search.toLowerCase();
    items = items.filter((u) => u.full_name.toLowerCase().includes(q));
  }
  return items;
}

// TODO: replace with apiClient.patch<void>(`/admin/users/${userId}`, { is_banned }) when backend is ready
export async function setUserBanned(
  userId: string,
  isBanned: boolean,
): Promise<void> {
  await new Promise((r) => setTimeout(r, 100));
  void userId;
  void isBanned;
}

// TODO: replace with apiClient.get<AdminListingRow[]>("/admin/listings", { status }) when backend is ready
export async function getListings(
  status: ProductStatus | "all" = "pending_review",
): Promise<AdminListingRow[]> {
  await new Promise((r) => setTimeout(r, 100));
  if (status === "all") return MOCK_LISTINGS;
  return MOCK_LISTINGS.filter((p) => p.status === status);
}

// TODO: replace with apiClient.patch<void>(`/admin/listings/${productId}`, { status }) when backend is ready
export async function setListingStatus(
  productId: string,
  status: ProductStatus,
): Promise<void> {
  await new Promise((r) => setTimeout(r, 100));
  void productId;
  void status;
}

// TODO: replace with apiClient.get<PlatformStats>("/admin/stats") when backend is ready
export async function getPlatformStats(): Promise<PlatformStats> {
  await new Promise((r) => setTimeout(r, 150));
  return {
    totalUsers: MOCK_USERS.length,
    totalVets: MOCK_USERS.filter((u) => u.role === "vet").length,
    totalSellers: MOCK_USERS.filter((u) => u.role === "seller").length,
    totalBookings: 184,
    pendingListings: MOCK_LISTINGS.filter((p) => p.status === "pending_review")
      .length,
  };
}
