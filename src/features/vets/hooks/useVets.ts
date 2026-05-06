import { useQuery } from "@tanstack/react-query";
import { getVets } from "@/features/vets/api/vetsApi";
import type { VetSearchFilters } from "@/features/vets/types/vet.types";

export function useVets(filters: VetSearchFilters = {}) {
  return useQuery({
    queryKey: ["vets", filters],
    queryFn: () => getVets(filters),
    staleTime: 2 * 60 * 1000,
  });
}
