import { useQuery } from "@tanstack/react-query";
import { DollarSign, TrendingUp, Clock, CheckCircle2 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { getMyEarnings } from "@/features/vets/api/vetsApi";
import { EmptyState } from "@/shared/components/feedback/EmptyState";
import { LoadingSpinner } from "@/shared/components/feedback/LoadingSpinner";
import { formatCurrency, formatDateTime } from "@/shared/lib/utils";

export function VetEarningsPage() {
  const { data: earnings, isLoading } = useQuery({
    queryKey: ["vet-earnings"],
    queryFn: getMyEarnings,
  });

  if (isLoading || !earnings) {
    return (
      <div className="flex justify-center py-16">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const metrics = [
    {
      label: "All-time earnings",
      value: formatCurrency(earnings.allTime),
      icon: <DollarSign className="h-5 w-5" />,
    },
    {
      label: "This month",
      value: formatCurrency(earnings.thisMonth),
      icon: <TrendingUp className="h-5 w-5" />,
    },
    {
      label: "Pending payout",
      value: formatCurrency(earnings.pending),
      icon: <Clock className="h-5 w-5" />,
    },
    {
      label: "Completed bookings",
      value: earnings.completedBookings.toString(),
      icon: <CheckCircle2 className="h-5 w-5" />,
    },
  ];

  return (
    <div className="space-y-6">
      <title>Earnings — VetGo</title>
      <div>
        <h1 className="text-2xl font-bold">Earnings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Track your payouts and booking revenue.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => (
          <Card key={m.label}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {m.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">{m.label}</p>
                  <p className="mt-0.5 truncate text-lg font-bold">{m.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div>
        <h2 className="mb-2 text-sm font-semibold text-muted-foreground">
          Recent completed bookings
        </h2>
        {earnings.recent.length === 0 ? (
          <EmptyState
            icon={<DollarSign className="h-6 w-6" />}
            title="No earnings yet"
            description="Completed bookings will show up here once you start seeing pets."
          />
        ) : (
          <Card>
            <CardContent className="p-0">
              <ul className="divide-y divide-border/50">
                {earnings.recent.map((r) => (
                  <li
                    key={r.id}
                    className="flex items-center justify-between gap-3 px-4 py-3 text-sm"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium">{r.owner_name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDateTime(r.scheduled_at)}
                      </p>
                    </div>
                    <p className="shrink-0 font-semibold text-primary">
                      +{formatCurrency(r.amount)}
                    </p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
