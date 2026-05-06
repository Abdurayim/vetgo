import { Link } from "react-router";
import { Star, ShieldAlert } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/shared/lib/utils";
import { ROUTES } from "@/shared/constants/routes";
import type { ProductWithSeller } from "@/features/marketplace/types/product.types";

const CATEGORY_LABELS: Record<ProductWithSeller["category"], string> = {
  food: "Food",
  drug: "Prescription",
  supplement: "Supplement",
  accessory: "Accessory",
  other: "Other",
};

interface ProductCardProps {
  product: ProductWithSeller;
}

export function ProductCard({ product }: ProductCardProps) {
  const thumb = product.image_urls[0];
  const outOfStock = product.stock_quantity <= 0;

  return (
    <Link
      to={ROUTES.product(product.id)}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5"
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        {thumb && (
          <img
            src={thumb}
            alt={product.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        )}
        <Badge
          variant="secondary"
          className="absolute left-3 top-3 text-[10px] uppercase tracking-wide"
        >
          {CATEGORY_LABELS[product.category]}
        </Badge>
        {product.is_prescription && (
          <Badge
            variant="outline"
            className="absolute right-3 top-3 gap-1 border-amber-400/40 bg-amber-400/10 text-amber-500"
          >
            <ShieldAlert className="h-3 w-3" />
            Rx
          </Badge>
        )}
        {outOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/70 backdrop-blur-sm">
            <span className="rounded-full border border-border/60 bg-background px-3 py-1 text-xs font-medium">
              Out of stock
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug group-hover:text-primary">
          {product.title}
        </h3>

        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <span className="truncate">{product.seller_name}</span>
          <span>·</span>
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span>{product.seller_rating.toFixed(1)}</span>
        </div>

        <div className="mt-auto flex items-end justify-between pt-1">
          <span className="text-base font-bold">
            {formatCurrency(product.price)}
          </span>
          <span className="text-xs text-muted-foreground">
            {product.stock_quantity > 0
              ? `${product.stock_quantity} in stock`
              : "—"}
          </span>
        </div>
      </div>
    </Link>
  );
}
