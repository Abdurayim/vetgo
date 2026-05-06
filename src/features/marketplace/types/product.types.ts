import type {
  Product,
  ProductCategory,
  ProductStatus,
} from "@/shared/types/domain.types";

export type { Product, ProductCategory, ProductStatus };

export interface ProductWithSeller extends Product {
  seller_name: string;
  seller_rating: number;
}

export interface ProductFilters {
  search?: string;
  category?: ProductCategory;
  maxPrice?: number;
  sort?: "newest" | "price_asc" | "price_desc" | "popular";
  page?: number;
}
