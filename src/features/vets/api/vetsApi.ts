import { apiClient } from "@/shared/lib/api-client";
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

export async function getVets(
  filters: VetSearchFilters = {},
): Promise<VetSearchResult[]> {
  return apiClient.get<VetSearchResult[]>("/vets", {
    search: filters.search,
    specialty: filters.specialty,
    minRating: filters.minRating,
    maxFee: filters.maxFee,
  });
}

export async function getVetById(vetProfileId: string): Promise<{
  vetProfile: VetProfile;
  profile: Pick<
    Profile,
    "id" | "full_name" | "avatar_url" | "city" | "country" | "latitude" | "longitude"
  >;
}> {
  return apiClient.get(`/vets/${vetProfileId}`);
}

export async function getMyAvailability(): Promise<{
  slots: AvailabilitySlot[];
  blocked: BlockedDate[];
}> {
  return apiClient.get("/vets/me/availability");
}

export async function addAvailabilitySlot(input: AddSlotInput): Promise<void> {
  if (input.startTime >= input.endTime) {
    throw new Error("End time must be after start time");
  }
  await apiClient.post("/vets/me/availability/slots", {
    day_of_week: input.dayOfWeek,
    start_time: input.startTime,
    end_time: input.endTime,
  });
}

export async function removeAvailabilitySlot(slotId: string | number): Promise<void> {
  await apiClient.delete(`/vets/me/availability/slots/${slotId}`);
}

export async function addBlockedDate(input: BlockDateInput): Promise<void> {
  await apiClient.post("/vets/me/availability/blocked", {
    blocked_date: input.blockedDate,
    reason: input.reason,
  });
}

export async function removeBlockedDate(id: string | number): Promise<void> {
  await apiClient.delete(`/vets/me/availability/blocked/${id}`);
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

export async function getMyEarnings(): Promise<VetEarningsSummary> {
  return apiClient.get<VetEarningsSummary>("/vets/me/earnings");
}
