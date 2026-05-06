import {
  MOCK_PRODUCTS,
  findMockProduct,
} from "@/features/marketplace/data/mockProducts";
import type {
  ProductFilters,
  ProductWithSeller,
} from "@/features/marketplace/types/product.types";

const PAGE_SIZE = 12;

// TODO: replace with apiClient.get<{ products, total }>("/products", filters) when backend is ready
export async function getProducts(
  filters: ProductFilters = {},
): Promise<{ products: ProductWithSeller[]; total: number }> {
  let items = [...MOCK_PRODUCTS];

  if (filters.search) {
    const q = filters.search.toLowerCase();
    items = items.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.tags.some((t) => t.includes(q)),
    );
  }
  if (filters.category) {
    items = items.filter((p) => p.category === filters.category);
  }
  if (filters.maxPrice != null) {
    items = items.filter((p) => p.price <= filters.maxPrice!);
  }

  switch (filters.sort) {
    case "price_asc":
      items.sort((a, b) => a.price - b.price);
      break;
    case "price_desc":
      items.sort((a, b) => b.price - a.price);
      break;
    case "popular":
      items.sort((a, b) => b.seller_rating - a.seller_rating);
      break;
    default:
      items.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );
  }

  const total = items.length;
  const page = filters.page ?? 1;
  const start = (page - 1) * PAGE_SIZE;
  const products = items.slice(start, start + PAGE_SIZE);
  return { products, total };
}

// TODO: replace with apiClient.get<ProductWithSeller>(`/products/${id}`) when backend is ready
export async function getProductById(
  id: string,
): Promise<ProductWithSeller | null> {
  return findMockProduct(id) ?? null;
}

// TODO: replace with apiClient.get<ProductWithSeller[]>(`/products/${id}/related`) when backend is ready
export async function getRelatedProducts(
  product: ProductWithSeller,
  max = 4,
): Promise<ProductWithSeller[]> {
  return MOCK_PRODUCTS.filter(
    (p) => p.id !== product.id && p.category === product.category,
  ).slice(0, max);
}
