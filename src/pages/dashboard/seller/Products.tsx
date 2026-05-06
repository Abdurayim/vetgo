import { Package } from "lucide-react";

export function SellerProductsPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 py-24 text-center">
      <title>My Products — VetGo</title>
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
        <Package className="h-7 w-7 text-primary" />
      </div>
      <div>
        <h1 className="text-xl font-bold">My Products</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your marketplace listings.
        </p>
      </div>
    </div>
  );
}
