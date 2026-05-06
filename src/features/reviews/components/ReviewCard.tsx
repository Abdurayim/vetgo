import { Star } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn, getInitials } from "@/shared/lib/utils";
import type { ReviewWithReviewer } from "@/features/reviews/types/review.types";

interface ReviewCardProps {
  review: ReviewWithReviewer;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <Card>
      <CardContent className="flex gap-4 p-4">
        <Avatar className="h-10 w-10 shrink-0">
          <AvatarImage
            src={review.reviewer_avatar_url ?? undefined}
            alt={review.reviewer_full_name}
          />
          <AvatarFallback>{getInitials(review.reviewer_full_name)}</AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p className="truncate text-sm font-semibold">
              {review.reviewer_full_name}
            </p>
            <span className="shrink-0 text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(review.created_at), {
                addSuffix: true,
              })}
            </span>
          </div>

          <div className="mt-1 flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((n) => (
              <Star
                key={n}
                className={cn(
                  "h-3.5 w-3.5",
                  n <= review.rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-muted-foreground/30"
                )}
              />
            ))}
          </div>

          {review.comment && (
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {review.comment}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
