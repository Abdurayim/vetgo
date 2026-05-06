import { useQuery } from "@tanstack/react-query";
import {
  Users,
  Stethoscope,
  Store,
  Calendar,
  ClipboardList,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { getPlatformStats } from "@/features/admin/api/adminApi";
import { LoadingSpinner } from "@/shared/components/feedback/LoadingSpinner";

export function AdminPage() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["platform-stats"],
    queryFn: getPlatformStats,
    staleTime: 60_000,
  });

  if (isLoading || !stats) {
    return (
      <div className="flex justify-center py-16">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const cards = [
    { label: "Total users", value: stats.totalUsers, icon: <Users className="h-5 w-5" /> },
    { label: "Vets", value: stats.totalVets, icon: <Stethoscope className="h-5 w-5" /> },
    { label: "Sellers", value: stats.totalSellers, icon: <Store className="h-5 w-5" /> },
    { label: "Bookings", value: stats.totalBookings, icon: <Calendar className="h-5 w-5" /> },
    {
      label: "Pending listings",
      value: stats.pendingListings,
      icon: <ClipboardList className="h-5 w-5" />,
      accent: stats.pendingListings > 0,
    },
  ];

  return (
    <div className="space-y-6">
      <title>Admin — VetGo</title>
      <div>
        <h1 className="text-2xl font-bold">Admin overview</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Platform-wide stats and management tools.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {cards.map((c) => (
          <Card key={c.label}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div
                  className={
                    c.accent
                      ? "flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400"
                      : "flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"
                  }
                >
                  {c.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">{c.label}</p>
                  <p className="mt-0.5 truncate text-lg font-bold">{c.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
