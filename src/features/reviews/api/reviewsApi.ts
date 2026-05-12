import { apiClient } from "@/shared/lib/api-client";
import type {
  CreateReviewInput,
  ReviewWithReviewer,
} from "@/features/reviews/types/review.types";

export interface ReviewStats {
  total: number;
  average: number;
  distribution: Record<1 | 2 | 3 | 4 | 5, number>;
}

export async function getReviewsForVet(
  vetId: string,
): Promise<ReviewWithReviewer[]> {
  return apiClient.get<ReviewWithReviewer[]>(`/vets/${vetId}/reviews`);
}

export async function getMyVetReviews(): Promise<ReviewWithReviewer[]> {
  return apiClient.get<ReviewWithReviewer[]>("/vets/me/reviews");
}

export async function getMyVetReviewStats(): Promise<ReviewStats> {
  return apiClient.get<ReviewStats>("/vets/me/reviews/stats");
}

export async function createReview(input: CreateReviewInput): Promise<void> {
  await apiClient.post("/reviews", {
    bookingId: input.bookingId,
    vetId: input.vetId,
    rating: input.rating,
    comment: input.comment,
  });
}
