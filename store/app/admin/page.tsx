"use client";

import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import { IconArrowUpRight, IconBag, IconChart, IconPackage, IconSpark } from "@/components/icons";
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
        <Stat label="Produtos cadastrados" value={String(totalItems)} icon={IconBag} />
        <Stat label="Unidades em estoque" value={String(inStock)} icon={IconPackage} />
        <Stat label="Valor do estoque" value={formatPrice(stockValue)} icon={IconChart} />
        <Stat label="Esgotados" value={String(outOfStock)} icon={IconSpark} alert={outOfStock > 0} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl bg-white border border-ink/10 p-6">
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

        <div className="rounded-3xl bg-white border border-ink/10 p-6 flex flex-col">
          <h2 className="font-display font-bold text-lg">Ações rápidas</h2>
          <div className="mt-5 grid gap-3">
            <Link href="/admin/produtos?novo=1" className="px-5 py-4 rounded-xl bg-ink text-mint-50 font-bold text-center hover:bg-grape transition-colors">
              Adicionar brinquedo
            </Link>
            <Link href="/admin/produtos" className="px-5 py-4 rounded-xl bg-mint-100 font-bold text-center hover:bg-mint-200 transition-colors">
              Gerenciar produtos
            </Link>
            <Link href="/" target="_blank" className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl border border-ink/15 font-bold text-center hover:border-ink transition-colors">
              Ver a loja como cliente <IconArrowUpRight width={15} height={15} />
            </Link>
          </div>
          <p className="mt-auto pt-4 text-xs text-ink-soft">
            Produtos marcados como <b>Destaque</b> aparecem na página inicial.
          </p>
        </div>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  icon: Icon,
  alert,
}: {
  label: string;
  value: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  alert?: boolean;
}) {
  return (
    <div className={`rounded-2xl border p-5 ${alert ? "bg-bubble/10 border-bubble/40" : "bg-white border-ink/10"}`}>
      <Icon width={20} height={20} className={alert ? "text-bubble" : "text-grape"} />
      <p className="font-display font-extrabold text-2xl mt-3 truncate tracking-tight">{value}</p>
      <p className="text-xs font-bold text-ink-soft mt-0.5">{label}</p>
    </div>
  );
}
