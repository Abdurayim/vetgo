import { useSearchParams } from "react-router";
import { VetGrid } from "@/features/vets/components/VetGrid";
import { VetFilters } from "@/features/vets/components/VetFilters";

export function VetsPage() {
  const [searchParams] = useSearchParams();

  const filters = {
    search: searchParams.get("search") ?? undefined,
    specialty: searchParams.get("specialty") ?? undefined,
    minRating: searchParams.get("minRating") ? Number(searchParams.get("minRating")) : undefined,
    maxFee: searchParams.get("maxFee") ? Number(searchParams.get("maxFee")) : undefined,
    page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
  };

  return (
    <>
      <title>Find a Vet — VetGo</title>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Find a Veterinarian</h1>
          <p className="mt-2 text-muted-foreground">
            Search and book trusted vets near you
          </p>
        </div>

        <div className="mb-6">
          <VetFilters />
        </div>

        <VetGrid filters={filters} />
      </div>
    </>
  );
}
