import { useState } from "react";
import { Check, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn, formatCurrency } from "@/shared/lib/utils";
import { setListingStatus } from "@/features/admin/api/adminApi";
import type { AdminListingRow } from "@/features/admin/types/admin.types";

interface ListingRowProps {
  listing: AdminListingRow;
}

const STATUS_STYLES: Record<string, string> = {
  approved:
    "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  rejected: "border-destructive/40 bg-destructive/10 text-destructive",
  pending_review:
    "border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400",
  draft: "border-border bg-muted text-muted-foreground",
};

export function ListingRow({ listing }: ListingRowProps) {
  const queryClient = useQueryClient();
  const [pending, setPending] = useState(false);

  async function decide(status: "approved" | "rejected") {
    setPending(true);
    try {
      await setListingStatus(listing.id, status);
      toast.success(
        status === "approved" ? "Listing approved" : "Listing rejected",
      );
      await queryClient.invalidateQueries({ queryKey: ["admin", "listings"] });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed");
    } finally {
      setPending(false);
    }
  }

  return (
    <li className="flex items-start gap-3 px-4 py-3">
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-muted">
        {listing.image_urls[0] ? (
          <img
            src={listing.image_urls[0]}
            alt={listing.title}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
        ) : null}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="truncate text-sm font-medium">{listing.title}</p>
          <Badge
            variant="outline"
            className={cn("capitalize", STATUS_STYLES[listing.status])}
          >
            {listing.status.replace("_", " ")}
          </Badge>
          <Badge variant="outline" className="capitalize">
            {listing.category}
          </Badge>
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {listing.seller_name ?? "Unknown seller"} ·{" "}
          {formatCurrency(listing.price)}
          {listing.is_prescription && " · Rx"}
        </p>
        {listing.description && (
          <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
            {listing.description}
          </p>
        )}
      </div>

      {listing.status === "pending_review" && (
        <div className="flex shrink-0 gap-1">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => decide("rejected")}
            disabled={pending}
            className="gap-1 text-muted-foreground hover:text-destructive"
          >
            {pending ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <X className="h-3.5 w-3.5" />
            )}
            Reject
          </Button>
          <Button
            size="sm"
            onClick={() => decide("approved")}
            disabled={pending}
            className="gap-1"
          >
            {pending ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Check className="h-3.5 w-3.5" />
            )}
            Approve
          </Button>
        </div>
      )}
    </li>
  );
}
