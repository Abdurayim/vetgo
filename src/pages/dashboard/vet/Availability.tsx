import { useQuery } from "@tanstack/react-query";
import { getMyAvailability } from "@/features/vets/api/vetsApi";
import { WeeklyScheduleEditor } from "@/features/vets/components/WeeklyScheduleEditor";
import { BlockedDatesEditor } from "@/features/vets/components/BlockedDatesEditor";
import { LoadingSpinner } from "@/shared/components/feedback/LoadingSpinner";

export function VetAvailabilityPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["vet-availability"],
    queryFn: getMyAvailability,
  });

  if (isLoading || !data) {
    return (
      <div className="flex justify-center py-16">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <title>Availability — VetGo</title>
      <div>
        <h1 className="text-2xl font-bold">Availability</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Set your weekly schedule and block off dates you&apos;re away.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="mb-2 text-sm font-semibold text-muted-foreground">
            Weekly schedule
          </h2>
          <WeeklyScheduleEditor slots={data.slots} />
        </div>
        <BlockedDatesEditor blocked={data.blocked} />
      </div>
    </div>
  );
}
