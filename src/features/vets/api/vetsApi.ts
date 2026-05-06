import type {
  VetSearchFilters,
  VetSearchResult,
  VetProfile,
} from "@/features/vets/types/vet.types";
import type {
  AddSlotInput,
  AvailabilitySlot,
  BlockDateInput,
  BlockedDate,
} from "@/features/vets/types/availability.types";
import type { Profile } from "@/shared/types/domain.types";

const MOCK_VETS: VetSearchResult[] = [
  {
    vet_profile_id: "vp_1",
    user_id: "u_vet_1",
    full_name: "Dr. Ada Vetson",
    avatar_url: null,
    city: "Brooklyn",
    country: "US",
    latitude: 40.6782,
    longitude: -73.9442,
    specialties: ["dogs", "preventive_care"],
    years_of_experience: 8,
    consultation_fee: 75,
    home_visit_fee: 120,
    tele_fee: 40,
    rating_average: 4.8,
    review_count: 142,
    is_available: true,
    bio: "Compassionate small-animal vet focused on preventive care.",
    distance_km: 2.3,
  },
  {
    vet_profile_id: "vp_2",
    user_id: "u_vet_2",
    full_name: "Dr. Marco Felini",
    avatar_url: null,
    city: "Queens",
    country: "US",
    latitude: 40.7282,
    longitude: -73.7949,
    specialties: ["cats", "exotic"],
    years_of_experience: 12,
    consultation_fee: 90,
    home_visit_fee: null,
    tele_fee: 50,
    rating_average: 4.7,
    review_count: 88,
    is_available: true,
    bio: "Feline-only practice with two decades of experience.",
    distance_km: 6.1,
  },
];

// TODO: replace with apiClient.get<VetSearchResult[]>("/vets", filters) when backend is ready
export async function getVets(
  filters: VetSearchFilters = {},
): Promise<VetSearchResult[]> {
  await new Promise((r) => setTimeout(r, 200));
  let items = [...MOCK_VETS];
  if (filters.search) {
    const q = filters.search.toLowerCase();
    items = items.filter(
      (v) =>
        v.full_name.toLowerCase().includes(q) ||
        v.specialties.some((s) => s.toLowerCase().includes(q)),
    );
  }
  if (filters.specialty) {
    items = items.filter((v) => v.specialties.includes(filters.specialty!));
  }
  if (filters.minRating != null) {
    items = items.filter((v) => v.rating_average >= filters.minRating!);
  }
  if (filters.maxFee != null) {
    items = items.filter((v) => v.consultation_fee <= filters.maxFee!);
  }
  return items;
}

// TODO: replace with apiClient.get<{ vetProfile, profile }>(`/vets/${vetProfileId}`) when backend is ready
export async function getVetById(
  vetProfileId: string,
): Promise<{ vetProfile: VetProfile; profile: Pick<
  Profile,
  "id" | "full_name" | "avatar_url" | "city" | "country" | "latitude" | "longitude"
> }> {
  await new Promise((r) => setTimeout(r, 200));
  const search = MOCK_VETS.find((v) => v.vet_profile_id === vetProfileId);
  if (!search) throw new Error("Vet not found");
  const now = new Date().toISOString();
  return {
    vetProfile: {
      id: search.vet_profile_id,
      user_id: search.user_id,
      bio: search.bio,
      specialties: search.specialties,
      years_of_experience: search.years_of_experience,
      license_number: null,
      license_verified: true,
      consultation_fee: search.consultation_fee,
      home_visit_fee: search.home_visit_fee,
      tele_fee: search.tele_fee,
      rating_average: search.rating_average,
      review_count: search.review_count,
      is_available: search.is_available,
      created_at: now,
      updated_at: now,
    },
    profile: {
      id: search.user_id,
      full_name: search.full_name,
      avatar_url: search.avatar_url,
      city: search.city,
      country: search.country,
      latitude: search.latitude,
      longitude: search.longitude,
    },
  };
}

let mockSlots: AvailabilitySlot[] = [
  {
    id: "s_1",
    vet_id: "vp_1",
    day_of_week: 1,
    start_time: "09:00",
    end_time: "12:00",
    is_active: true,
  },
  {
    id: "s_2",
    vet_id: "vp_1",
    day_of_week: 3,
    start_time: "13:00",
    end_time: "17:00",
    is_active: true,
  },
];
let mockBlocked: BlockedDate[] = [];

// TODO: replace with apiClient.get<{ slots, blocked }>("/vets/me/availability") when backend is ready
export async function getMyAvailability(): Promise<{
  slots: AvailabilitySlot[];
  blocked: BlockedDate[];
}> {
  await new Promise((r) => setTimeout(r, 100));
  return { slots: [...mockSlots], blocked: [...mockBlocked] };
}

// TODO: replace with apiClient.post<AvailabilitySlot>("/vets/me/availability/slots", input) when backend is ready
export async function addAvailabilitySlot(input: AddSlotInput): Promise<void> {
  if (input.startTime >= input.endTime) {
    throw new Error("End time must be after start time");
  }
  mockSlots = [
    ...mockSlots,
    {
      id: `s_${Date.now()}`,
      vet_id: "vp_1",
      day_of_week: input.dayOfWeek,
      start_time: input.startTime,
      end_time: input.endTime,
      is_active: true,
    },
  ];
}

// TODO: replace with apiClient.delete<void>(`/vets/me/availability/slots/${slotId}`) when backend is ready
export async function removeAvailabilitySlot(slotId: string): Promise<void> {
  mockSlots = mockSlots.filter((s) => s.id !== slotId);
}

// TODO: replace with apiClient.post<BlockedDate>("/vets/me/availability/blocked", input) when backend is ready
export async function addBlockedDate(input: BlockDateInput): Promise<void> {
  mockBlocked = [
    ...mockBlocked,
    {
      id: `b_${Date.now()}`,
      vet_id: "vp_1",
      blocked_date: input.blockedDate,
      reason: input.reason ?? null,
    },
  ];
}

// TODO: replace with apiClient.delete<void>(`/vets/me/availability/blocked/${id}`) when backend is ready
export async function removeBlockedDate(id: string): Promise<void> {
  mockBlocked = mockBlocked.filter((b) => b.id !== id);
}

export interface VetEarningsSummary {
  allTime: number;
  thisMonth: number;
  pending: number;
  totalBookings: number;
  completedBookings: number;
  recent: Array<{
    id: string;
    scheduled_at: string;
    amount: number;
    owner_name: string;
  }>;
}

// TODO: replace with apiClient.get<VetEarningsSummary>("/vets/me/earnings") when backend is ready
export async function getMyEarnings(): Promise<VetEarningsSummary> {
  await new Promise((r) => setTimeout(r, 200));
  return {
    allTime: 12_450,
    thisMonth: 1_980,
    pending: 320,
    totalBookings: 184,
    completedBookings: 161,
    recent: [
      {
        id: "b_recent_1",
        scheduled_at: new Date(Date.now() - 86_400_000).toISOString(),
        amount: 90,
        owner_name: "Maria L.",
      },
      {
        id: "b_recent_2",
        scheduled_at: new Date(Date.now() - 3 * 86_400_000).toISOString(),
        amount: 75,
        owner_name: "Tomás R.",
      },
    ],
  };
}
