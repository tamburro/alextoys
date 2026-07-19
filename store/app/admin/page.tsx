"use client";

import Link from "next/link";
import { useStore } from "@/lib/store-context";
import { CATEGORIES, formatPrice, type Category } from "@/lib/types";

export default function AdminHome() {
  const { products } = useStore();

  const totalItems = products.length;
  const inStock = products.reduce((n, p) => n + p.stock, 0);
  const outOfStock = products.filter((p) => p.stock <= 0).length;
  const stockValue = products.reduce((n, p) => n + p.price * p.stock, 0);
  const byCat = (Object.keys(CATEGORIES) as Category[]).map((c) => ({
    cat: c,
    count: products.filter((p) => p.category === c).length,
  }));
  const max = Math.max(1, ...byCat.map((b) => b.count));

  return (
    <div>
      <h1 className="font-display font-extrabold text-3xl">Visão geral</h1>
      <p className="text-ink-soft mt-1 text-sm">
        Bem-vindo de volta! Aqui está o resumo da sua loja.
      </p>

      <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Produtos cadastrados" value={String(totalItems)} emoji="🧸" />
        <Stat label="Unidades em estoque" value={String(inStock)} emoji="📦" />
        <Stat label="Valor do estoque" value={formatPrice(stockValue)} emoji="💰" />
        <Stat label="Esgotados" value={String(outOfStock)} emoji="⚠️" alert={outOfStock > 0} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl bg-white border border-mint-200 p-6">
          <h2 className="font-display font-bold text-lg">Produtos por categoria</h2>
          <div className="mt-5 space-y-4">
            {byCat.map((b) => (
              <div key={b.cat}>
                <div className="flex justify-between text-sm font-bold">
                  <span>{CATEGORIES[b.cat]}</span>
                  <span className="text-ink-soft">{b.count}</span>
                </div>
                <div className="mt-1.5 h-3 rounded-full bg-mint-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-grape transition-all"
                    style={{ width: `${(b.count / max) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-white border border-mint-200 p-6 flex flex-col">
          <h2 className="font-display font-bold text-lg">Ações rápidas</h2>
          <div className="mt-5 grid gap-3">
            <Link href="/admin/produtos?novo=1" className="px-5 py-4 rounded-2xl bg-grape text-white font-bold text-center hover:bg-grape-dark transition">
              + Adicionar brinquedo
            </Link>
            <Link href="/admin/produtos" className="px-5 py-4 rounded-2xl bg-mint-100 font-bold text-center hover:bg-mint-200 transition">
              Gerenciar produtos
            </Link>
            <Link href="/" target="_blank" className="px-5 py-4 rounded-2xl border border-mint-200 font-bold text-center hover:border-grape transition">
              Ver a loja como cliente ↗
            </Link>
          </div>
          <p className="mt-auto pt-4 text-xs text-ink-soft">
            💡 Produtos marcados como <b>Destaque</b> aparecem na página inicial.
          </p>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, emoji, alert }: { label: string; value: string; emoji: string; alert?: boolean }) {
  return (
    <div className={`rounded-3xl border p-5 ${alert ? "bg-bubble/10 border-bubble/40" : "bg-white border-mint-200"}`}>
      <span className="text-2xl">{emoji}</span>
      <p className="font-display font-extrabold text-2xl mt-2 truncate">{value}</p>
      <p className="text-xs font-bold text-ink-soft mt-0.5">{label}</p>
    </div>
  );
}
