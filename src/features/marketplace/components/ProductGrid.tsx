import { Package } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { EmptyState } from "@/shared/components/feedback/EmptyState";
import type { ProductWithSeller } from "@/features/marketplace/types/product.types";

interface ProductGridProps {
  products: ProductWithSeller[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <EmptyState
        title="No products found"
        description="Try a different category or clear your search."
        icon={<Package className="h-12 w-12" />}
      />
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
