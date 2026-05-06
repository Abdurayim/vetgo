import type { VetProfile, VetSearchRow } from "@/shared/types/domain.types";

export type { VetProfile };
export type VetSearchResult = VetSearchRow;

export interface VetSearchFilters {
  search?: string;
  specialty?: string;
  minRating?: number;
  maxFee?: number;
  lat?: number;
  lng?: number;
  radiusKm?: number;
  page?: number;
}
