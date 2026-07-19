"use client";

import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { useStore } from "@/lib/store-context";
import { CATEGORIES, type Category } from "@/lib/types";

const CAT_EMOJI: Record<Category, string> = {
  classicos: "🪀",
  modernos: "🤖",
  colecionaveis: "🎁",
  pelucias: "🧸",
};

export default function Home() {
  const { products, settings } = useStore();
  const featured = products.filter((p) => p.featured).slice(0, 4);
  const newest = [...products].sort((a, b) => b.createdAt - a.createdAt).slice(0, 4);
  const countByCat = (c: Category) => products.filter((p) => p.category === c).length;

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-grape/15 blur-3xl" />
        <div className="absolute top-40 -left-32 w-80 h-80 rounded-full bg-bubble/15 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-4 pt-16 pb-20 sm:pt-24 sm:pb-28 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-mint-200/60 text-sm font-bold text-ink-soft">
            🎠 {settings.tagline}
          </span>
          <h1 className="bubble-title mt-6 text-5xl sm:text-7xl text-mint-50">
            {settings.storeName}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-ink-soft">
            Brinquedos clássicos e modernos pra você mergulhar na nostalgia e dar
            aquele upgrade na sua coleção.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/produtos"
              className="px-8 py-4 rounded-full bg-grape text-white font-display font-bold text-lg shadow-xl shadow-grape/30 hover:bg-grape-dark hover:-translate-y-0.5 transition"
            >
              Explorar brinquedos
            </Link>
            <a
              href={`https://wa.me/${settings.whatsapp}`}
              target="_blank"
              rel="noopener"
              className="px-8 py-4 rounded-full bg-white border-2 border-mint-200 font-display font-bold text-lg hover:border-grape hover:text-grape transition"
            >
              💬 Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* CATEGORIAS */}
      <section className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {(Object.keys(CATEGORIES) as Category[]).map((c) => (
            <Link
              key={c}
              href={`/produtos?cat=${c}`}
              className="group flex items-center gap-4 rounded-3xl bg-white border border-mint-200 p-5 hover:border-grape hover:shadow-lg transition"
            >
              <span className="grid place-items-center w-14 h-14 rounded-2xl bg-mint-100 text-3xl group-hover:scale-110 transition-transform">
                {CAT_EMOJI[c]}
              </span>
              <div>
                <p className="font-display font-bold group-hover:text-grape transition-colors">
                  {CATEGORIES[c]}
                </p>
                <p className="text-xs text-ink-soft">
                  {countByCat(c)} itens
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* DESTAQUES */}
      <section className="mx-auto max-w-6xl px-4 mt-20">
        <SectionTitle
          eyebrow="Escolhidos a dedo"
          title="Destaques da loja"
          href="/produtos"
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* FAIXA NOSTALGIA */}
      <section className="mt-20 bg-ink text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 grid gap-10 md:grid-cols-3 text-center">
          {[
            ["🕹️", "Nostalgia de verdade", "Peças que marcaram gerações, garimpadas uma a uma."],
            ["🚀", "Lançamentos toda semana", "Colecionáveis, blind boxes e as novidades do momento."],
            ["📦", "Enviamos pra todo o Brasil", "Embalagem caprichada e envio rápido e seguro."],
          ].map(([emoji, title, body]) => (
            <div key={title}>
              <span className="text-4xl">{emoji}</span>
              <h3 className="font-display font-bold text-xl mt-3">{title}</h3>
              <p className="mt-2 text-sm text-mint-200/80">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* NOVIDADES */}
      <section className="mx-auto max-w-6xl px-4 mt-20">
        <SectionTitle
          eyebrow="Acabou de chegar"
          title="Novidades"
          href="/produtos"
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {newest.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="mx-auto max-w-6xl px-4 mt-20">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-grape text-white text-center px-6 py-16">
          <div className="absolute -top-10 -left-10 w-48 h-48 rounded-full bg-white/10" />
          <div className="absolute -bottom-16 -right-10 w-64 h-64 rounded-full bg-white/10" />
          <h2 className="bubble-title relative text-3xl sm:text-5xl text-white">
            Procurando um brinquedo específico?
          </h2>
          <p className="relative mt-4 text-white/85 max-w-md mx-auto">
            Manda mensagem que a gente garimpa pra você. Se existe, a Alex Toys encontra.
          </p>
          <a
            href={`https://wa.me/${settings.whatsapp}`}
            target="_blank"
            rel="noopener"
            className="relative inline-block mt-8 px-8 py-4 rounded-full bg-white text-grape font-display font-bold text-lg hover:scale-105 transition-transform"
          >
            💬 Chamar no WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}

function SectionTitle({ eyebrow, title, href }: { eyebrow: string; title: string; href: string }) {
  return (
    <div className="flex items-end justify-between mb-8">
      <div>
        <p className="text-sm font-extrabold uppercase tracking-widest text-grape">{eyebrow}</p>
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl mt-1">{title}</h2>
      </div>
      <Link href={href} className="hidden sm:block text-sm font-bold text-ink-soft hover:text-grape">
        Ver todos →
      </Link>
    </div>
  );
}
