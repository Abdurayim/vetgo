import { useParams, Link, Navigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import {
  ShieldAlert,
  ShieldCheck,
  Star,
  Truck,
  Undo2,
  ArrowLeft,
} from "lucide-react";

import { getProductById, getRelatedProducts } from "@/features/marketplace/api/productsApi";
import { ProductGallery } from "@/features/marketplace/components/ProductGallery";
import { ProductCard } from "@/features/marketplace/components/ProductCard";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { LoadingSpinner } from "@/shared/components/feedback/LoadingSpinner";
import { formatCurrency } from "@/shared/lib/utils";
import { ROUTES } from "@/shared/constants/routes";

const CATEGORY_LABELS: Record<string, string> = {
  food: "Food",
  drug: "Prescription",
  supplement: "Supplement",
  accessory: "Accessory",
  other: "Other",
};

export function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>();

  const { data: product, isLoading, isError } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId!),
    enabled: !!productId,
  });

  const { data: related = [] } = useQuery({
    queryKey: ["products", "related", product?.id],
    queryFn: () => getRelatedProducts(product!),
    enabled: !!product,
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (isError || !product) {
    return <Navigate to={ROUTES.products} replace />;
  }

  return (
    <>
      <title>{product.title} — VetGo</title>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <Link
          to={ROUTES.products}
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to shop
        </Link>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <ProductGallery images={product.image_urls} alt={product.title} />

          <div className="space-y-6">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">
                  {CATEGORY_LABELS[product.category] ?? product.category}
                </Badge>
                {product.is_prescription && (
                  <Badge
                    variant="outline"
                    className="gap-1 border-amber-400/40 bg-amber-400/10 text-amber-500"
                  >
                    <ShieldAlert className="h-3 w-3" />
                    Prescription required
                  </Badge>
                )}
                {product.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <h1 className="mt-4 text-3xl font-bold tracking-tight">
                {product.title}
              </h1>

              <div className="mt-3 flex items-center gap-3 text-sm">
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <span className="font-medium">{product.seller_name}</span>
                  <span className="inline-flex items-center gap-0.5 text-amber-500">
                    <Star className="h-3.5 w-3.5 fill-amber-400" />
                    {product.seller_rating.toFixed(1)}
                  </span>
                </span>
              </div>
            </div>

            <div className="flex items-end gap-3">
              <span className="text-3xl font-bold">
                {formatCurrency(product.price)}
              </span>
              {product.weight_g && (
                <span className="pb-1 text-sm text-muted-foreground">
                  ({product.weight_g >= 1000
                    ? `${(product.weight_g / 1000).toFixed(1)} kg`
                    : `${product.weight_g} g`})
                </span>
              )}
            </div>

            {product.description && (
              <p className="leading-relaxed text-muted-foreground">
                {product.description}
              </p>
            )}

            {product.is_prescription && (
              <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
                <p className="font-medium text-amber-600 dark:text-amber-300">
                  Prescription required
                </p>
                <p className="mt-1 text-muted-foreground">
                  You&apos;ll need a valid prescription from a licensed veterinarian.
                  Contact your vet through your booking messages.
                </p>
              </div>
            )}

            <Separator />

            <ul className="grid gap-3 text-sm sm:grid-cols-3">
              <li className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Truck className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-medium">Free delivery</p>
                  <p className="text-xs text-muted-foreground">On orders over $75</p>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Undo2 className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-medium">30-day returns</p>
                  <p className="text-xs text-muted-foreground">No questions asked</p>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <ShieldCheck className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-medium">Vet-approved</p>
                  <p className="text-xs text-muted-foreground">Quality reviewed</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-5 text-xl font-bold">You may also like</h2>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
