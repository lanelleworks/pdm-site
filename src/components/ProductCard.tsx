import { Link } from "react-router-dom";
import { ArrowRight, Package } from "lucide-react";
import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";

export default function ProductCard({
  product,
  compact = false,
}: {
  product: Product;
  compact?: boolean;
}) {
  return (
    <Link
      to={`/products/${product.slug}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-all",
        "hover:-translate-y-1 hover:border-brand-yellow/60 hover:shadow-card-lg",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2",
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center border-b border-line bg-white p-4",
          compact ? "h-28" : "h-36",
        )}
      >
        {product.img ? (
          <img
            src={product.img}
            alt={product.title}
            loading="lazy"
            className="max-h-full w-auto object-contain transition-transform duration-300 group-hover:scale-[1.05]"
          />
        ) : (
          <Package size={36} strokeWidth={1.2} className="text-neutral-300" />
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-sm font-bold leading-snug text-neutral-900">
          {product.title}
        </h3>
        <span className="mt-auto flex items-center gap-1.5 pt-3 text-xs font-bold text-neutral-400 transition-colors group-hover:text-neutral-900">
          View details
          <ArrowRight
            size={13}
            strokeWidth={2.5}
            className="transition-transform group-hover:translate-x-1"
          />
        </span>
      </div>
    </Link>
  );
}
