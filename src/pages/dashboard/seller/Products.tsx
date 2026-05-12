import { useRef, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ImagePlus, Loader2, Package, Pencil, Plus, Trash2, X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { resolveMediaUrl } from "@/shared/lib/utils";
import { LoadingSpinner } from "@/shared/components/feedback/LoadingSpinner";
import { EmptyState } from "@/shared/components/feedback/EmptyState";
import {
  getMyProducts,
  createProductAction,
  updateProductAction,
  deleteProductAction,
  uploadProductImage,
  type CreateProductInput,
} from "@/features/marketplace/api/productsApi";
import type { ProductWithSeller } from "@/features/marketplace/types/product.types";
import type { ProductCategory } from "@/shared/types/domain.types";

// ─── Form schema ──────────────────────────────────────────────────────────────

const productSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().optional(),
  category: z.enum(["food", "drug", "supplement", "accessory", "other"]),
  price: z.number().min(0.01, "Price must be greater than 0"),
  stock_quantity: z.number().min(0),
  tags: z.string().optional(),
  weight_g: z.number().min(0).optional(),
  is_prescription: z.boolean(),
});

type ProductFormValues = z.infer<typeof productSchema>;

const CATEGORY_LABELS: Record<ProductCategory, string> = {
  food: "Food",
  drug: "Drug / Medicine",
  supplement: "Supplement",
  accessory: "Accessory",
  other: "Other",
};

const STATUS_COLORS: Record<string, string> = {
  approved: "bg-green-100 text-green-800",
  pending_review: "bg-yellow-100 text-yellow-800",
  rejected: "bg-red-100 text-red-800",
  draft: "bg-gray-100 text-gray-700",
};

// ─── Image picker sub-component ───────────────────────────────────────────────

function ImagePicker({
  imageUrls,
  onChange,
}: {
  imageUrls: string[];
  onChange: (urls: string[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      const uploaded = await Promise.all(
        Array.from(files).map((f) => uploadProductImage(f)),
      );
      onChange([...imageUrls, ...uploaded]);
    } catch {
      toast.error("Image upload failed — check file type/size");
    } finally {
      setUploading(false);
    }
  }

  function remove(url: string) {
    onChange(imageUrls.filter((u) => u !== url));
  }

  return (
    <div className="space-y-2">
      <Label>Product Images</Label>

      {/* Thumbnails */}
      {imageUrls.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {imageUrls.map((url) => (
            <div key={url} className="group relative h-20 w-20 overflow-hidden rounded-lg border border-border">
              <img
                src={resolveMediaUrl(url)}
                alt="product"
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={() => remove(url)}
                className="absolute right-0.5 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload button */}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="flex items-center gap-2 rounded-md border border-dashed border-input px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary disabled:opacity-50"
      >
        {uploading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <ImagePlus className="h-4 w-4" />
        )}
        {uploading ? "Uploading…" : "Add images"}
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}

// ─── Product Form Modal ────────────────────────────────────────────────────────

function ProductForm({
  initial,
  onClose,
  onSaved,
}: {
  initial?: ProductWithSeller;
  onClose: () => void;
  onSaved: () => void;
}) {
  // imageUrls is managed outside react-hook-form so we can mutate it independently
  const [imageUrls, setImageUrls] = useState<string[]>(initial?.image_urls ?? []);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: initial?.title ?? "",
      description: initial?.description ?? "",
      category: (initial?.category as ProductCategory) ?? "food",
      price: initial?.price ?? 0,
      stock_quantity: initial?.stock_quantity ?? 0,
      tags: initial?.tags?.join(", ") ?? "",
      weight_g: initial?.weight_g ?? undefined,
      is_prescription: initial?.is_prescription ?? false,
    },
  });

  const categoryValue = watch("category");

  async function onSubmit(values: ProductFormValues) {
    const input: CreateProductInput = {
      title: values.title,
      description: values.description,
      category: values.category,
      price: values.price,
      stock_quantity: values.stock_quantity,
      image_urls: imageUrls,
      tags: values.tags
        ? values.tags.split(",").map((t) => t.trim()).filter(Boolean)
        : [],
      weight_g: values.weight_g,
      is_prescription: values.is_prescription,
    };

    if (initial) {
      await updateProductAction(String(initial.id), input);
    } else {
      await createProductAction(input);
    }
    onSaved();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-4 pt-12">
      <div className="w-full max-w-lg rounded-xl border border-border bg-background shadow-xl">
        <div className="flex items-center justify-between border-b px-5 py-4">
          <h2 className="text-lg font-semibold">
            {initial ? "Edit Product" : "New Product"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-5">
          {/* Images */}
          <ImagePicker imageUrls={imageUrls} onChange={setImageUrls} />

          {/* Title */}
          <div className="space-y-1.5">
            <Label htmlFor="title">Title *</Label>
            <input
              id="title"
              {...register("title")}
              placeholder="e.g. Premium Dog Food"
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
            {errors.title && (
              <p className="text-xs text-destructive">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              {...register("description")}
              rows={3}
              placeholder="Describe your product…"
              className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>

          {/* Category + Price */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Category *</Label>
              <Select
                value={categoryValue}
                onValueChange={(v) => setValue("category", v as ProductCategory)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(CATEGORY_LABELS) as ProductCategory[]).map((c) => (
                    <SelectItem key={c} value={c}>
                      {CATEGORY_LABELS[c]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="price">Price ($) *</Label>
              <input
                id="price"
                type="number"
                step="0.01"
                min="0"
                {...register("price", { valueAsNumber: true })}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
              {errors.price && (
                <p className="text-xs text-destructive">{errors.price.message}</p>
              )}
            </div>
          </div>

          {/* Stock + Weight */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="stock_quantity">Stock Quantity</Label>
              <input
                id="stock_quantity"
                type="number"
                min="0"
                {...register("stock_quantity", { valueAsNumber: true })}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="weight_g">Weight (g)</Label>
              <input
                id="weight_g"
                type="number"
                min="0"
                {...register("weight_g", { valueAsNumber: true })}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-1.5">
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <input
              id="tags"
              {...register("tags")}
              placeholder="e.g. dog, adult, dry-food"
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>

          {/* Prescription toggle */}
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              {...register("is_prescription")}
              className="h-4 w-4 rounded border-input"
            />
            Requires prescription
          </label>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {initial ? "Save Changes" : "Publish Product"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export function SellerProductsPage() {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<ProductWithSeller | undefined>();
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["seller-products", statusFilter],
    queryFn: () => getMyProducts(statusFilter === "all" ? undefined : statusFilter),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteProductAction(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["seller-products"] }),
  });

  function handleSaved() {
    queryClient.invalidateQueries({ queryKey: ["seller-products"] });
    setShowForm(false);
    setEditing(undefined);
  }

  const STATUS_TABS = [
    { label: "All", value: "all" },
    { label: "Approved", value: "approved" },
    { label: "Pending Review", value: "pending_review" },
    { label: "Rejected", value: "rejected" },
  ];

  return (
    <div className="space-y-6">
      <title>My Products — VetGo</title>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Products</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your marketplace listings.
          </p>
        </div>
        <Button
          onClick={() => {
            setEditing(undefined);
            setShowForm(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      {/* Status filter tabs */}
      <div className="flex flex-wrap gap-1 rounded-xl border border-border/50 bg-muted/40 p-1.5">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setStatusFilter(tab.value)}
            className={[
              "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
              statusFilter === tab.value
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            ].join(" ")}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Product list */}
      {isLoading ? (
        <div className="flex justify-center py-16">
          <LoadingSpinner size="lg" />
        </div>
      ) : products.length === 0 ? (
        <EmptyState
          icon={<Package className="h-8 w-8" />}
          title="No products yet"
          description="Add your first product to start selling on VetGo."
          action={
            <Button
              onClick={() => {
                setEditing(undefined);
                setShowForm(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <CardContent className="p-0">
                {/* Image / placeholder */}
                <div className="flex h-36 items-center justify-center bg-muted">
                  {product.image_urls?.[0] ? (
                    <img
                      src={resolveMediaUrl(product.image_urls[0])}
                      alt={product.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Package className="h-10 w-10 text-muted-foreground/40" />
                  )}
                </div>

                <div className="space-y-2 p-4">
                  {/* Status badge */}
                  <span
                    className={[
                      "inline-block rounded-full px-2 py-0.5 text-xs font-medium",
                      STATUS_COLORS[product.status] ?? "bg-gray-100 text-gray-600",
                    ].join(" ")}
                  >
                    {product.status.replace("_", " ")}
                  </span>

                  <h3 className="font-semibold leading-tight">{product.title}</h3>
                  <p className="line-clamp-2 text-xs text-muted-foreground">
                    {product.description || "No description"}
                  </p>

                  <div className="flex items-center justify-between text-sm">
                    <span className="font-bold">${product.price.toFixed(2)}</span>
                    <span className="text-muted-foreground">
                      {product.stock_quantity} in stock
                    </span>
                  </div>

                  <div className="flex gap-2 pt-1">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        setEditing(product);
                        setShowForm(true);
                      }}
                    >
                      <Pencil className="mr-1 h-3 w-3" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-destructive hover:bg-destructive/10"
                      disabled={deleteMutation.isPending}
                      onClick={() => {
                        if (confirm(`Delete "${product.title}"?`)) {
                          deleteMutation.mutate(String(product.id));
                        }
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Product form modal */}
      {showForm && (
        <ProductForm
          initial={editing}
          onClose={() => {
            setShowForm(false);
            setEditing(undefined);
          }}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
}
