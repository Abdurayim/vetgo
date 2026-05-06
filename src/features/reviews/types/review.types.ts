import type { Review } from "@/shared/types/domain.types";

export type { Review };

export interface ReviewWithReviewer extends Review {
  reviewer_full_name: string;
  reviewer_avatar_url: string | null;
}

export interface CreateReviewInput {
  bookingId: string;
  vetId: string;
  rating: number;
  comment?: string;
}
