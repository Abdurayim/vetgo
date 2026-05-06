import { useSearchParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Package } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { getListings } from "@/features/admin/api/adminApi";
import { ListingRow } from "@/features/admin/components/ListingRow";
import { EmptyState } from "@/shared/components/feedback/EmptyState";
import { LoadingSpinner } from "@/shared/components/feedback/LoadingSpinner";
import type { ProductStatus } from "@/shared/types/domain.types";

const STATUS_TABS: { label: string; value: ProductStatus | "all" }[] = [
  { label: "Pending", value: "pending_review" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
  { label: "All", value: "all" },
];

const VALID: (ProductStatus | "all")[] = [
  "pending_review",
  "approved",
  "rejected",
  "draft",
  "all",
];

export function AdminListingsPage() {
  const [searchParams] = useSearchParams();
  const statusParam = searchParams.get("status") ?? "";
  const activeStatus: ProductStatus | "all" = VALID.includes(
    statusParam as ProductStatus | "all"
  )
    ? (statusParam as ProductStatus | "all")
    : "pending_review";

  const { data: listings, isLoading } = useQuery({
    queryKey: ["admin-listings", activeStatus],
    queryFn: () => getListings(activeStatus),
  });

  return (
    <div className="space-y-6">
      <title>Listings — Admin — VetGo</title>
      <div>
        <h1 className="text-2xl font-bold">Listings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Approve or reject products submitted by sellers.
        </p>
      </div>

      <div className="flex flex-wrap gap-1 rounded-xl border border-border/50 bg-muted/40 p-1.5">
        {STATUS_TABS.map((tab) => {
          const isActive = activeStatus === tab.value;
          const href =
            tab.value === "pending_review"
              ? "/admin/listings"
              : `/admin/listings?status=${tab.value}`;
          return (
            <Link
              key={tab.value}
              to={href}
              className={
                isActive
                  ? "rounded-lg bg-background px-3 py-1.5 text-sm font-medium text-primary shadow-sm border border-border/60"
                  : "rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
              }
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      ) : !listings || listings.length === 0 ? (
        <EmptyState
          icon={<Package className="h-6 w-6" />}
          title="Nothing here"
          description={
            activeStatus === "pending_review"
              ? "No listings are waiting for review."
              : "No listings match this filter."
          }
        />
      ) : (
        <Card>
          <CardContent className="p-0">
            <ul className="divide-y divide-border/50">
              {listings.map((listing) => (
                <ListingRow key={listing.id} listing={listing} />
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
