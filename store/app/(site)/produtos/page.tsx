"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { useStore } from "@/lib/store-context";
import { CATEGORIES, type Category } from "@/lib/types";

type Sort = "recentes" | "menor-preco" | "maior-preco" | "nome";

function Catalog() {
  const { products } = useStore();
  const params = useSearchParams();
  const catParam = params.get("cat") as Category | null;

  const [cat, setCat] = useState<Category | "todos">(
    catParam && catParam in CATEGORIES ? catParam : "todos",
  );
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<Sort>("recentes");

  const list = useMemo(() => {
    let r = products;
    if (cat !== "todos") r = r.filter((p) => p.category === cat);
    if (q.trim()) {
      const t = q.trim().toLowerCase();
      r = r.filter(
        (p) =>
          p.name.toLowerCase().includes(t) ||
          p.description.toLowerCase().includes(t),
      );
    }
    const sorted = [...r];
    if (sort === "menor-preco") sorted.sort((a, b) => a.price - b.price);
    else if (sort === "maior-preco") sorted.sort((a, b) => b.price - a.price);
    else if (sort === "nome") sorted.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
    else sorted.sort((a, b) => b.createdAt - a.createdAt);
    return sorted;
  }, [products, cat, q, sort]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display font-extrabold text-4xl sm:text-5xl tracking-tight">Todos os brinquedos</h1>
      <p className="text-ink-soft mt-1">
        {list.length} {list.length === 1 ? "item encontrado" : "itens encontrados"}
      </p>

      {/* Filtros */}
      <div className="mt-6 flex flex-col lg:flex-row gap-3 lg:items-center">
        <div className="flex flex-wrap gap-2">
          {(["todos", ...Object.keys(CATEGORIES)] as (Category | "todos")[]).map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                cat === c
                  ? "bg-ink text-mint-50"
                  : "bg-white border border-ink/15 text-ink-soft hover:border-ink hover:text-ink"
              }`}
            >
              {c === "todos" ? "Todos" : CATEGORIES[c as Category]}
            </button>
          ))}
        </div>
        <div className="flex gap-3 lg:ml-auto">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar brinquedo…"
            className="w-full lg:w-56 px-4 py-2 rounded-full bg-white border border-ink/15 text-sm outline-none focus:border-ink"
          />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="px-4 py-2 rounded-full bg-white border border-ink/15 text-sm font-bold outline-none focus:border-ink"
          >
            <option value="recentes">Mais recentes</option>
            <option value="menor-preco">Menor preço</option>
            <option value="maior-preco">Maior preço</option>
            <option value="nome">Nome A–Z</option>
          </select>
        </div>
      </div>

      {/* Grade */}
      {list.length === 0 ? (
        <div className="mt-20 border border-dashed border-ink/20 rounded-3xl py-20 text-center">
          <p className="font-display font-extrabold text-2xl">Nenhum brinquedo encontrado</p>
          <p className="text-ink-soft text-sm mt-2">Tente outra busca ou categoria.</p>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProdutosPage() {
  return (
    <Suspense>
      <Catalog />
    </Suspense>
  );
}
