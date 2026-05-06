import { Star } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/shared/lib/utils";
import type { ReviewStats } from "@/features/reviews/api/reviewsApi";

interface ReviewStatsCardProps {
  stats: ReviewStats;
}

export function ReviewStatsCard({ stats }: ReviewStatsCardProps) {
  const { total, average, distribution } = stats;

  return (
    <Card>
      <CardContent className="grid gap-6 p-6 sm:grid-cols-[minmax(0,200px)_1fr] sm:items-center">
        {/* Average */}
        <div className="text-center">
          <p className="text-5xl font-bold">{average.toFixed(1)}</p>
          <div className="mt-2 flex justify-center gap-0.5">
            {[1, 2, 3, 4, 5].map((n) => (
              <Star
                key={n}
                className={cn(
                  "h-4 w-4",
                  n <= Math.round(average)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-muted-foreground/30"
                )}
              />
            ))}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Based on {total} {total === 1 ? "review" : "reviews"}
          </p>
        </div>

        {/* Distribution */}
        <div className="space-y-1.5">
          {([5, 4, 3, 2, 1] as const).map((star) => {
            const count = distribution[star];
            const pct = total > 0 ? (count / total) * 100 : 0;
            return (
              <div key={star} className="flex items-center gap-3 text-xs">
                <span className="flex w-6 items-center gap-0.5 text-muted-foreground">
                  {star}
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                </span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full bg-yellow-400 transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="w-8 text-right tabular-nums text-muted-foreground">
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
