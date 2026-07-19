"use client";

import Link from "next/link";
import { useStore } from "@/lib/store-context";
import { CATEGORIES, formatPrice, type Product } from "@/lib/types";
import { IconPlus } from "./icons";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useStore();
  const out = product.stock <= 0;

  return (
    <div className="group relative flex flex-col rounded-2xl bg-white border border-ink/10 overflow-hidden transition-all duration-300 hover:border-ink/25 hover:shadow-[0_12px_32px_-12px_rgb(36_29_56_/_0.18)]">
      <Link href={`/produto/${product.id}`} className="relative block aspect-square overflow-hidden bg-mint-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        {product.featured && !out && (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-ink text-mint-50 text-[10px] font-extrabold uppercase tracking-[0.14em]">
            Destaque
          </span>
        )}
        {out && (
          <span className="absolute inset-0 grid place-items-center bg-ink/55 text-mint-50 font-display font-bold text-lg backdrop-blur-[2px]">
            Esgotado
          </span>
        )}
      </Link>

      <div className="flex flex-col grow p-4">
        <p className="eyebrow text-ink-soft/70 !text-[10px]">{CATEGORIES[product.category]}</p>
        <Link href={`/produto/${product.id}`} className="mt-1.5">
          <h3 className="font-display font-bold leading-snug transition-colors group-hover:text-grape">
            {product.name}
          </h3>
        </Link>
        <div className="mt-auto pt-4 flex items-center justify-between gap-2">
          <span className="font-display font-extrabold text-lg tracking-tight">
            {formatPrice(product.price)}
          </span>
          <button
            onClick={() => addToCart(product.id)}
            disabled={out}
            aria-label={`Adicionar ${product.name} ao carrinho`}
            className="grid place-items-center w-10 h-10 rounded-full border border-ink/15 text-ink transition-all hover:bg-ink hover:text-mint-50 active:scale-90 disabled:opacity-30 disabled:pointer-events-none"
          >
            <IconPlus width={16} height={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
