"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { useStore } from "@/lib/store-context";
import { CATEGORIES, formatPrice } from "@/lib/types";

export default function ProdutoPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { products, addToCart, ready } = useStore();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const product = products.find((p) => p.id === id);

  if (!ready) return <div className="py-32 text-center text-ink-soft">Carregando…</div>;

  if (!product) {
    return (
      <div className="py-32 text-center px-4">
        <p className="font-display font-extrabold text-3xl">Brinquedo não encontrado</p>
        <p className="text-ink-soft mt-2 text-sm">Ele pode ter saído do catálogo.</p>
        <Link href="/produtos" className="inline-block mt-8 px-7 py-3.5 rounded-full bg-ink text-mint-50 font-display font-bold hover:bg-grape transition-colors">
          Ver todos os brinquedos
        </Link>
      </div>
    );
  }

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  const out = product.stock <= 0;

  function handleAdd() {
    addToCart(product!.id, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <nav className="text-sm text-ink-soft">
        <Link href="/" className="hover:text-grape">Início</Link>
        {" / "}
        <Link href="/produtos" className="hover:text-grape">Brinquedos</Link>
        {" / "}
        <span className="text-ink font-bold">{product.name}</span>
      </nav>

      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <div className="relative rounded-[2rem] overflow-hidden bg-mint-100 border border-ink/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={product.image} alt={product.name} className="w-full aspect-square object-cover" />
          {product.featured && (
            <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-ink text-mint-50 text-[11px] font-extrabold uppercase tracking-[0.14em]">
              Destaque
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <span className="self-start px-4 py-1.5 rounded-full text-[11px] font-extrabold text-grape uppercase tracking-[0.18em] border border-grape/30">
            {CATEGORIES[product.category]}
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl mt-4">{product.name}</h1>
          <p className="mt-4 text-ink-soft leading-relaxed">{product.description}</p>

          <div className="mt-6 font-display font-extrabold text-4xl text-grape">
            {formatPrice(product.price)}
          </div>
          <p className="mt-1 text-sm text-ink-soft">
            {out ? "Esgotado no momento" : `${product.stock} em estoque`}
          </p>

          {!out && (
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="flex items-center rounded-full border border-ink/15 overflow-hidden">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-3 font-bold hover:bg-mint-100">−</button>
                <span className="w-10 text-center font-display font-bold">{qty}</span>
                <button onClick={() => setQty(Math.min(product.stock, qty + 1))} className="px-4 py-3 font-bold hover:bg-mint-100">+</button>
              </div>
              <button
                onClick={handleAdd}
                className={`grow sm:grow-0 px-8 py-4 rounded-full font-display font-bold text-lg text-mint-50 transition-colors ${
                  added ? "bg-emerald-600" : "bg-ink hover:bg-grape"
                }`}
              >
                {added ? "Adicionado" : "Adicionar ao carrinho"}
              </button>
            </div>
          )}

          <button
            onClick={() => { addToCart(product.id, qty); router.push("/carrinho"); }}
            disabled={out}
            className="mt-4 self-start text-sm font-bold text-ink-soft hover:text-grape disabled:opacity-40"
          >
            Comprar agora
          </button>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="font-display font-extrabold text-2xl mb-6">Você também vai gostar</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
