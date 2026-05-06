import { useSearchParams, Link } from "react-router";
import { ChevronLeft, ChevronRight, ShieldCheck, Stars, Truck } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { getProducts } from "@/features/marketplace/api/productsApi";
import { ProductGrid } from "@/features/marketplace/components/ProductGrid";
import { ProductFilters } from "@/features/marketplace/components/ProductFilters";
import { buttonVariants } from "@/components/ui/button";
import { LoadingSpinner } from "@/shared/components/feedback/LoadingSpinner";
import { cn } from "@/shared/lib/utils";
import type { ProductCategory } from "@/features/marketplace/types/product.types";

const PERKS = [
  {
    icon: <ShieldCheck className="h-4 w-4" />,
    title: "Vet-approved",
    description: "Every product reviewed by our veterinary board",
  },
  {
    icon: <Truck className="h-4 w-4" />,
    title: "Free shipping over $75",
    description: "Standard delivery in 2–4 business days",
  },
  {
    icon: <Stars className="h-4 w-4" />,
    title: "30-day guarantee",
    description: "Full refund if your pet doesn't love it",
  },
];

const VALID_CATEGORIES = ["food", "supplement", "drug", "accessory", "other"];
const VALID_SORTS = ["newest", "price_asc", "price_desc", "popular"];

export function ProductsPage() {
  const [searchParams] = useSearchParams();

  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const category = VALID_CATEGORIES.includes(searchParams.get("category") ?? "")
    ? (searchParams.get("category") as ProductCategory)
    : undefined;
  const sort = VALID_SORTS.includes(searchParams.get("sort") ?? "")
    ? (searchParams.get("sort") as "newest" | "price_asc" | "price_desc" | "popular")
    : "newest";

  const queryParams = {
    search: searchParams.get("search") ?? undefined,
    category,
    sort,
    page,
  };

  const { data, isLoading } = useQuery({
    queryKey: ["products", queryParams],
    queryFn: () => getProducts(queryParams),
    staleTime: 2 * 60 * 1000,
  });

  const products = data?.products ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / 12));

  function buildHref(nextPage: number) {
    const sp = new URLSearchParams(searchParams);
    if (nextPage > 1) sp.set("page", String(nextPage));
    else sp.delete("page");
    const str = sp.toString();
    return str ? `?${str}` : "?";
  }

  return (
    <>
      <title>Shop — VetGo</title>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Shop vet-approved pet care
            </h1>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              Food, supplements, and prescription medications — all reviewed by our
              veterinary team before they land on the marketplace.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 lg:w-auto lg:gap-3">
            {PERKS.map((p) => (
              <div
                key={p.title}
                className="flex items-start gap-2 rounded-xl border border-border/60 bg-card/50 px-3 py-2.5"
              >
                <span className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {p.icon}
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold">{p.title}</p>
                  <p className="text-[11px] text-muted-foreground leading-tight">{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <ProductFilters />
        </div>

        <div className="mb-4 flex items-baseline justify-between">
          <p className="text-sm text-muted-foreground">
            {total} product{total === 1 ? "" : "s"}
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-16">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <ProductGrid products={products} />
        )}

        {totalPages > 1 && (
          <nav
            aria-label="Pagination"
            className="mt-10 flex items-center justify-center gap-1"
          >
            <Link
              to={buildHref(Math.max(1, page - 1))}
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                page <= 1 && "pointer-events-none opacity-50"
              )}
              aria-disabled={page <= 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Link>
            <div className="mx-2 text-sm text-muted-foreground">
              Page {page} of {totalPages}
            </div>
            <Link
              to={buildHref(Math.min(totalPages, page + 1))}
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                page >= totalPages && "pointer-events-none opacity-50"
              )}
              aria-disabled={page >= totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Link>
          </nav>
        )}
      </div>
    </>
  );
}
