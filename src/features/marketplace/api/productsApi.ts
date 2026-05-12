import { apiClient } from "@/shared/lib/api-client";
import type {
  ProductFilters,
  ProductWithSeller,
} from "@/features/marketplace/types/product.types";
import type { ProductCategory } from "@/shared/types/domain.types";

/** Upload a single image file. Returns the server-relative URL, e.g. "/uploads/abc.jpg" */
export async function uploadProductImage(file: File): Promise<string> {
  const form = new FormData();
  form.append("file", file);
  const res = await apiClient.postForm<{ url: string }>("/upload", form);
  return res.url;
}

export async function getProducts(
  filters: ProductFilters = {},
): Promise<{ products: ProductWithSeller[]; total: number }> {
  return apiClient.get<{ products: ProductWithSeller[]; total: number }>(
    "/products",
    {
      search: filters.search,
      category: filters.category,
      maxPrice: filters.maxPrice,
      sort: filters.sort,
      page: filters.page,
    },
  );
}

export async function getProductById(
  id: string,
): Promise<ProductWithSeller | null> {
  try {
    return await apiClient.get<ProductWithSeller>(`/products/${id}`);
  } catch {
    return null;
  }
}

export async function getRelatedProducts(
  product: ProductWithSeller,
  max = 4,
): Promise<ProductWithSeller[]> {
  try {
    const results = await apiClient.get<ProductWithSeller[]>(
      `/products/${product.id}/related`,
    );
    return results.slice(0, max);
  } catch {
    return [];
  }
}

// ── Seller-facing ─────────────────────────────────────────────────────────────

export interface CreateProductInput {
  title: string;
  description?: string;
  category: ProductCategory;
  price: number;
  stock_quantity?: number;
  image_urls?: string[];
  tags?: string[];
  weight_g?: number;
  is_prescription?: boolean;
}

export async function getMyProducts(
  status?: string,
): Promise<ProductWithSeller[]> {
  return apiClient.get<ProductWithSeller[]>("/products/mine", { status });
}

export async function createProductAction(
  input: CreateProductInput,
): Promise<ProductWithSeller> {
  return apiClient.post<ProductWithSeller>("/products", {
    title: input.title,
    description: input.description ?? "",
    category: input.category,
    price: input.price,
    stock_quantity: input.stock_quantity ?? 0,
    image_urls: input.image_urls ?? [],
    tags: input.tags ?? [],
    weight_g: input.weight_g ?? 0,
    is_prescription: input.is_prescription ?? false,
  });
}

export async function updateProductAction(
  id: string,
  input: Partial<CreateProductInput>,
): Promise<ProductWithSeller> {
  return apiClient.patch<ProductWithSeller>(`/products/${id}`, input);
}

export async function deleteProductAction(id: string): Promise<void> {
  await apiClient.delete(`/products/${id}`);
}
