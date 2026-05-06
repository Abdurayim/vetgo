
import { useVets } from "@/features/vets/hooks/useVets";
import { VetCard } from "@/features/vets/components/VetCard";
import { LoadingSpinner } from "@/shared/components/feedback/LoadingSpinner";
import { EmptyState } from "@/shared/components/feedback/EmptyState";
import { Stethoscope } from "lucide-react";
import type { VetSearchFilters, VetSearchResult } from "@/features/vets/types/vet.types";

interface VetGridProps {
  filters?: VetSearchFilters;
  initialData?: VetSearchResult[];
}

export function VetGrid({ filters = {}, initialData }: VetGridProps) {
  const { data: vets, isLoading, isError } = useVets(filters);

  const displayVets = vets ?? initialData ?? [];

  if (isLoading && !initialData) {
    return (
      <div className="flex justify-center py-16">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (isError) {
    return (
      <EmptyState
        title="Something went wrong"
        description="Failed to load vets. Please try again."
      />
    );
  }

  if (displayVets.length === 0) {
    return (
      <EmptyState
        title="No vets found"
        description="Try adjusting your filters or search query."
        icon={<Stethoscope className="h-12 w-12" />}
      />
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {displayVets.map((vet) => (
        <VetCard key={vet.vet_profile_id} vet={vet} />
      ))}
    </div>
  );
}
