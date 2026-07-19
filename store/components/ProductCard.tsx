"use client";

import Link from "next/link";
import { useStore } from "@/lib/store-context";
import { CATEGORIES, formatPrice, type Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useStore();
  const out = product.stock <= 0;

  return (
    <div className="group relative flex flex-col rounded-3xl bg-white border border-mint-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <Link href={`/produto/${product.id}`} className="relative block aspect-square overflow-hidden bg-mint-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur text-[11px] font-extrabold text-grape uppercase tracking-wide">
          {CATEGORIES[product.category]}
        </span>
        {product.featured && !out && (
          <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-sun text-white text-[11px] font-extrabold">
            ⭐ Destaque
          </span>
        )}
        {out && (
          <span className="absolute inset-0 grid place-items-center bg-ink/50 text-white font-display font-bold text-lg">
            Esgotado
          </span>
        )}
      </Link>

      <div className="flex flex-col grow p-4">
        <Link href={`/produto/${product.id}`}>
          <h3 className="font-display font-bold leading-snug group-hover:text-grape transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 text-xs text-ink-soft line-clamp-2">{product.description}</p>
        <div className="mt-auto pt-4 flex items-center justify-between gap-2">
          <span className="font-display font-extrabold text-lg">{formatPrice(product.price)}</span>
          <button
            onClick={() => addToCart(product.id)}
            disabled={out}
            className="px-4 py-2 rounded-full bg-grape text-white text-sm font-bold hover:bg-grape-dark active:scale-95 transition disabled:opacity-40 disabled:pointer-events-none"
          >
            + Carrinho
          </button>
        </div>
      </div>
    </div>
  );
}
