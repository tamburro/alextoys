"use client";

import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import {
  IconArrowRight,
  IconArrowUpRight,
  IconChat,
  IconHeart,
  IconSpark,
  IconTruck,
} from "@/components/icons";
import { useStore } from "@/lib/store-context";
import { CATEGORIES, type Category } from "@/lib/types";

const CAT_DESC: Record<Category, string> = {
  classicos: "Lata, madeira e memórias de infância",
  modernos: "Robôs, drones e o que há de novo",
  colecionaveis: "Blind boxes, figuras e peças raras",
  pelucias: "Macias, fofas e prontas pro abraço",
};

export default function Home() {
  const { products, settings } = useStore();
  const featured = products.filter((p) => p.featured).slice(0, 4);
  const newest = [...products].sort((a, b) => b.createdAt - a.createdAt).slice(0, 8);
  const countByCat = (c: Category) => products.filter((p) => p.category === c).length;

  return (
    <>
      {/* HERO */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pt-16 sm:pt-24 pb-14">
        <div className="flex items-center gap-4">
          <span className="h-px w-10 bg-ink/30" />
          <p className="eyebrow text-ink-soft">{settings.tagline}</p>
        </div>
        <h1 className="mt-6 font-display font-extrabold tracking-tight leading-[0.98] text-[clamp(2.6rem,7.5vw,5.5rem)] max-w-4xl">
          Brinquedos que atravessam{" "}
          <span className="text-grape">gerações</span> — e os que acabaram de
          chegar.
        </h1>
        <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-6">
          <div className="flex flex-wrap gap-3">
            <Link
              href="/produtos"
              className="group inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-ink text-mint-50 font-display font-bold hover:bg-grape transition-colors"
            >
              Explorar a loja
              <IconArrowRight width={17} height={17} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href={`https://wa.me/${settings.whatsapp}`}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full border border-ink/20 font-display font-bold hover:border-ink transition-colors"
            >
              <IconChat width={17} height={17} />
              Pedir pelo WhatsApp
            </a>
          </div>
          <p className="text-sm text-ink-soft max-w-[30ch] sm:ml-auto leading-relaxed">
            Clássicos garimpados e lançamentos escolhidos a dedo, direto do Rio
            pra sua coleção.
          </p>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="border-y border-ink/10 bg-mint-100 py-3.5 overflow-hidden select-none" aria-hidden>
        <div className="marquee-track items-center gap-8 text-ink/70">
          {[0, 1].map((i) => (
            <div key={i} className="flex items-center gap-8 pr-8">
              {(Object.keys(CATEGORIES) as Category[]).map((c) => (
                <span key={c} className="flex items-center gap-8 whitespace-nowrap">
                  <span className="font-display font-bold text-sm uppercase tracking-[0.18em]">
                    {CATEGORIES[c]}
                  </span>
                  <IconSpark width={13} height={13} className="text-grape" />
                </span>
              ))}
              <span className="flex items-center gap-8 whitespace-nowrap">
                <span className="font-display font-bold text-sm uppercase tracking-[0.18em]">
                  Envio para todo o Brasil
                </span>
                <IconSpark width={13} height={13} className="text-grape" />
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* CATEGORIAS — lista editorial */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 mt-20">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight">
            Navegue por categoria
          </h2>
        </div>
        <div className="mt-8 border-t border-ink/10">
          {(Object.keys(CATEGORIES) as Category[]).map((c, i) => (
            <Link
              key={c}
              href={`/produtos?cat=${c}`}
              className="group grid grid-cols-[auto_1fr_auto] sm:grid-cols-[64px_1fr_1fr_auto] items-center gap-4 sm:gap-8 py-6 border-b border-ink/10 transition-colors hover:bg-white"
            >
              <span className="font-display font-bold text-sm text-ink-soft/60 pl-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight transition-colors group-hover:text-grape">
                {CATEGORIES[c]}
              </span>
              <span className="hidden sm:block text-sm text-ink-soft">
                {CAT_DESC[c]} · {countByCat(c)} {countByCat(c) === 1 ? "item" : "itens"}
              </span>
              <span className="grid place-items-center w-11 h-11 rounded-full border border-ink/15 mr-1 transition-all group-hover:bg-ink group-hover:text-mint-50 group-hover:-rotate-45">
                <IconArrowRight width={17} height={17} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* DESTAQUES */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 mt-24">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <p className="eyebrow text-grape">Escolhidos a dedo</p>
            <h2 className="mt-2 font-display font-extrabold text-3xl sm:text-4xl tracking-tight">
              Destaques da loja
            </h2>
          </div>
          <Link href="/produtos" className="link-line hidden sm:inline-flex items-center gap-1.5 text-sm font-bold text-ink-soft hover:text-ink">
            Ver todos <IconArrowRight width={14} height={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="mt-24 bg-ink text-mint-100">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
          <p className="font-display font-extrabold tracking-tight leading-tight text-[clamp(1.6rem,4vw,2.8rem)] max-w-3xl text-white">
            A gente acredita que brinquedo bom não tem idade — tem história.
          </p>
          <div className="mt-14 grid gap-y-10 gap-x-8 sm:grid-cols-3">
            {[
              {
                icon: IconHeart,
                n: "01",
                title: "Garimpo de verdade",
                body: "Cada clássico é escolhido, conferido e fotografado um a um antes de entrar na loja.",
              },
              {
                icon: IconSpark,
                n: "02",
                title: "Novidades toda semana",
                body: "Colecionáveis, blind boxes e lançamentos entram no catálogo continuamente.",
              },
              {
                icon: IconTruck,
                n: "03",
                title: "Envio nacional",
                body: "Embalagem reforçada e rastreio para qualquer canto do Brasil.",
              },
            ].map((f) => (
              <div key={f.n} className="border-t border-white/15 pt-6">
                <div className="flex items-center justify-between">
                  <f.icon width={22} height={22} className="text-bubble" />
                  <span className="font-display text-sm text-mint-200/50">{f.n}</span>
                </div>
                <h3 className="mt-4 font-display font-bold text-lg text-white">{f.title}</h3>
                <p className="mt-2 text-sm text-mint-200/75 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NOVIDADES */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 mt-24">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <p className="eyebrow text-grape">Acabou de chegar</p>
            <h2 className="mt-2 font-display font-extrabold text-3xl sm:text-4xl tracking-tight">
              Novidades
            </h2>
          </div>
          <Link href="/produtos" className="link-line hidden sm:inline-flex items-center gap-1.5 text-sm font-bold text-ink-soft hover:text-ink">
            Ver todos <IconArrowRight width={14} height={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {newest.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 mt-24">
        <a
          href={`https://wa.me/${settings.whatsapp}`}
          target="_blank"
          rel="noopener"
          className="group block rounded-3xl border border-ink/10 bg-white p-8 sm:p-14 transition-colors hover:bg-mint-100"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8">
            <div>
              <p className="eyebrow text-grape">Não achou o que procura?</p>
              <p className="mt-3 font-display font-extrabold tracking-tight leading-none text-[clamp(2rem,5vw,3.6rem)]">
                A gente garimpa
                <br />
                pra você.
              </p>
              <p className="mt-4 text-ink-soft text-sm max-w-[40ch]">
                Manda mensagem contando qual brinquedo você procura — se ele
                existe, a {settings.storeName.replace(/!$/, "")} encontra.
              </p>
            </div>
            <span className="grid place-items-center w-16 h-16 shrink-0 rounded-full bg-ink text-mint-50 transition-all group-hover:bg-grape group-hover:scale-110">
              <IconArrowUpRight width={24} height={24} />
            </span>
          </div>
        </a>
      </section>
    </>
  );
}
