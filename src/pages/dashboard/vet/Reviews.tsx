import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";

import { getMyVetReviews, getMyVetReviewStats } from "@/features/reviews/api/reviewsApi";
import { ReviewCard } from "@/features/reviews/components/ReviewCard";
import { ReviewStatsCard } from "@/features/reviews/components/ReviewStatsCard";
import { EmptyState } from "@/shared/components/feedback/EmptyState";
import { LoadingSpinner } from "@/shared/components/feedback/LoadingSpinner";

export function VetReviewsPage() {
  const { data: reviews, isLoading: reviewsLoading } = useQuery({
    queryKey: ["vet-reviews"],
    queryFn: getMyVetReviews,
  });

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["vet-review-stats"],
    queryFn: getMyVetReviewStats,
  });

  if (reviewsLoading || statsLoading || !reviews || !stats) {
    return (
      <div className="flex justify-center py-16">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <title>Reviews — VetGo</title>
      <div>
        <h1 className="text-2xl font-bold">Reviews</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          See what pet owners say about your service.
        </p>
      </div>

      {stats.total === 0 ? (
        <EmptyState
          icon={<Star className="h-6 w-6" />}
          title="No reviews yet"
          description="Complete a few bookings — pet owners can leave a review afterwards."
        />
      ) : (
        <>
          <ReviewStatsCard stats={stats} />
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-muted-foreground">
              Recent reviews
            </h2>
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
