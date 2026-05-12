import { useState } from "react";

import { cn, resolveMediaUrl } from "@/shared/lib/utils";

interface ProductGalleryProps {
  images: string[];
  alt: string;
}

export function ProductGallery({ images, alt }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const primary = resolveMediaUrl(images[active] ?? images[0]);

  return (
    <div className="space-y-3">
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-border/60 bg-muted">
        {primary && (
          <img
            src={primary}
            alt={alt}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
      </div>
      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border bg-muted transition",
                i === active
                  ? "border-primary ring-2 ring-primary/30"
                  : "border-border/60 hover:border-border",
              )}
              aria-label={`Image ${i + 1}`}
            >
              <img
                src={resolveMediaUrl(src)}
                alt={`${alt} thumbnail ${i + 1}`}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
