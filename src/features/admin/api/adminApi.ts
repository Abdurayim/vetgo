import { apiClient } from "@/shared/lib/api-client";
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

// ---------------------------------------------------------------------------
// Dev mock data — active when VITE_MOCK_AUTH=true (no backend required)
// ---------------------------------------------------------------------------
const MOCK = import.meta.env.VITE_MOCK_AUTH === "true";

let mockUsers: AdminUserRow[] = [
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
  {
    id: "u_4",
    role: "admin",
    full_name: "Demo Admin",
    avatar_url: null,
    city: "New York",
    country: "US",
    is_active: true,
    is_banned: false,
    created_at: new Date(Date.now() - 120 * 86_400_000).toISOString(),
  },
];

let mockListings: AdminListingRow[] = [
  {
    id: "p_pending_1",
    seller_id: "u_3",
    title: "New Joint Care Chew",
    description: "Pending review — glucosamine complex for senior dogs.",
    category: "supplement",
    price: 28,
    stock_quantity: 50,
    image_urls: [],
    status: "pending_review",
    tags: ["joint", "senior", "dog"],
    weight_g: 200,
    is_prescription: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    seller_name: "PawGear Co.",
  },
  {
    id: "p_approved_1",
    seller_id: "u_3",
    title: "Organic Salmon Treats",
    description: "Wild-caught salmon freeze-dried treats.",
    category: "food",
    price: 18,
    stock_quantity: 200,
    image_urls: [],
    status: "approved",
    tags: ["salmon", "treats"],
    weight_g: 100,
    is_prescription: false,
    created_at: new Date(Date.now() - 7 * 86_400_000).toISOString(),
    updated_at: new Date(Date.now() - 5 * 86_400_000).toISOString(),
    seller_name: "PawGear Co.",
  },
];

// ---------------------------------------------------------------------------
// API functions
// ---------------------------------------------------------------------------

export async function getUsers(
  filters: GetUsersFilters = {},
): Promise<AdminUserRow[]> {
  if (MOCK) {
    await new Promise((r) => setTimeout(r, 100));
    let items = [...mockUsers];
    if (filters.role && filters.role !== "all") {
      items = items.filter((u) => u.role === filters.role);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      items = items.filter((u) => u.full_name.toLowerCase().includes(q));
    }
    return items;
  }
  return apiClient.get<AdminUserRow[]>("/admin/users", {
    role: filters.role,
    search: filters.search,
  });
}

export async function setUserBanned(
  userId: string,
  isBanned: boolean,
): Promise<void> {
  if (MOCK) {
    await new Promise((r) => setTimeout(r, 100));
    mockUsers = mockUsers.map((u) =>
      u.id === userId ? { ...u, is_banned: isBanned } : u,
    );
    return;
  }
  await apiClient.patch(`/admin/users/${userId}`, { is_banned: isBanned });
}

export async function getListings(
  status: ProductStatus | "all" = "pending_review",
): Promise<AdminListingRow[]> {
  if (MOCK) {
    await new Promise((r) => setTimeout(r, 100));
    if (status === "all") return [...mockListings];
    return mockListings.filter((p) => p.status === status);
  }
  return apiClient.get<AdminListingRow[]>("/admin/listings", { status });
}

export async function setListingStatus(
  productId: string,
  status: ProductStatus,
): Promise<void> {
  if (MOCK) {
    await new Promise((r) => setTimeout(r, 100));
    mockListings = mockListings.map((p) =>
      p.id === productId ? { ...p, status, updated_at: new Date().toISOString() } : p,
    );
    return;
  }
  if (status === "approved") {
    await apiClient.patch(`/admin/listings/${productId}/approve`);
  } else if (status === "rejected") {
    await apiClient.patch(`/admin/listings/${productId}/reject`);
  }
}

export async function getPlatformStats(): Promise<PlatformStats> {
  if (MOCK) {
    await new Promise((r) => setTimeout(r, 150));
    return {
      totalUsers: mockUsers.length,
      totalVets: mockUsers.filter((u) => u.role === "vet").length,
      totalSellers: mockUsers.filter((u) => u.role === "seller").length,
      totalBookings: 184,
      pendingListings: mockListings.filter((p) => p.status === "pending_review").length,
    };
  }
  return apiClient.get<PlatformStats>("/admin/stats");
}
