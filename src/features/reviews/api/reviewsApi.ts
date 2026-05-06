import type {
  CreateReviewInput,
  ReviewWithReviewer,
} from "@/features/reviews/types/review.types";

const MOCK_REVIEWS: ReviewWithReviewer[] = [
  {
    id: "r_1",
    booking_id: "b_old_1",
    reviewer_id: "u_owner_1",
    vet_id: "u_vet_1",
    rating: 5,
    comment: "Wonderful with my anxious dog. Highly recommended.",
    is_visible: true,
    created_at: new Date(Date.now() - 7 * 86_400_000).toISOString(),
    reviewer_full_name: "Maria L.",
    reviewer_avatar_url: null,
  },
  {
    id: "r_2",
    booking_id: "b_old_2",
    reviewer_id: "u_owner_2",
    vet_id: "u_vet_1",
    rating: 4,
    comment: "Great care, slightly long wait time.",
    is_visible: true,
    created_at: new Date(Date.now() - 14 * 86_400_000).toISOString(),
    reviewer_full_name: "Tomás R.",
    reviewer_avatar_url: null,
  },
];

// TODO: replace with apiClient.get<ReviewWithReviewer[]>(`/vets/${vetId}/reviews`) when backend is ready
export async function getReviewsForVet(
  vetId: string,
): Promise<ReviewWithReviewer[]> {
  await new Promise((r) => setTimeout(r, 100));
  return MOCK_REVIEWS.filter((r) => r.vet_id === vetId || vetId === "u_vet_1");
}

// TODO: replace with apiClient.get<ReviewWithReviewer[]>("/vets/me/reviews") when backend is ready
export async function getMyVetReviews(): Promise<ReviewWithReviewer[]> {
  return getReviewsForVet("u_vet_1");
}

export interface ReviewStats {
  total: number;
  average: number;
  distribution: Record<1 | 2 | 3 | 4 | 5, number>;
}

// TODO: replace with apiClient.get<ReviewStats>("/vets/me/reviews/stats") when backend is ready
export async function getMyVetReviewStats(): Promise<ReviewStats> {
  await new Promise((r) => setTimeout(r, 100));
  const ratings = MOCK_REVIEWS.map((r) => r.rating);
  const total = ratings.length;
  const average = total > 0 ? ratings.reduce((a, b) => a + b, 0) / total : 0;
  const distribution: Record<1 | 2 | 3 | 4 | 5, number> = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };
  for (const r of ratings) {
    const k = Math.max(1, Math.min(5, Math.round(r))) as 1 | 2 | 3 | 4 | 5;
    distribution[k] += 1;
  }
  return { total, average, distribution };
}

// TODO: replace with apiClient.post<void>("/reviews", input) when backend is ready
export async function createReview(input: CreateReviewInput): Promise<void> {
  if (input.rating < 1 || input.rating > 5) {
    throw new Error("Rating must be between 1 and 5");
  }
  await new Promise((r) => setTimeout(r, 200));
}
