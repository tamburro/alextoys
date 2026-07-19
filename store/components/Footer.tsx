"use client";

import Link from "next/link";
import { useStore } from "@/lib/store-context";
import { IconArrowUpRight, IconChat, IconInstagram } from "./icons";

export default function Footer() {
  const { settings } = useStore();
  return (
    <footer className="mt-24 bg-ink text-mint-100">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-16 pb-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 pb-12 border-b border-white/10">
          <p className="font-display font-extrabold text-[clamp(2.5rem,7vw,5rem)] leading-none tracking-tight text-white">
            {settings.storeName.replace(/!$/, "")}
            <span className="text-bubble">!</span>
          </p>
          <div className="flex gap-3">
            <a
              href={`https://wa.me/${settings.whatsapp}`}
              target="_blank"
              rel="noopener"
              className="flex items-center gap-2 px-5 py-3 rounded-full border border-white/20 text-sm font-bold hover:bg-white hover:text-ink transition-colors"
            >
              <IconChat width={16} height={16} /> WhatsApp
            </a>
            <a
              href={`https://instagram.com/${settings.instagram}`}
              target="_blank"
              rel="noopener"
              className="flex items-center gap-2 px-5 py-3 rounded-full border border-white/20 text-sm font-bold hover:bg-white hover:text-ink transition-colors"
            >
              <IconInstagram width={16} height={16} /> @{settings.instagram}
            </a>
          </div>
        </div>

        <div className="grid gap-10 sm:grid-cols-3 py-12">
          <div>
            <p className="eyebrow text-mint-200/60">Sobre</p>
            <p className="mt-3 text-sm text-mint-200/85 max-w-[30ch] leading-relaxed">
              {settings.tagline}. Brinquedos clássicos e modernos, garimpados um a
              um para a sua coleção.
            </p>
          </div>
          <div>
            <p className="eyebrow text-mint-200/60">Loja</p>
            <ul className="mt-3 space-y-2.5 text-sm">
              <li><Link className="link-line" href="/produtos">Todos os brinquedos</Link></li>
              <li><Link className="link-line" href="/produtos?cat=classicos">Clássicos</Link></li>
              <li><Link className="link-line" href="/produtos?cat=colecionaveis">Colecionáveis</Link></li>
              <li><Link className="link-line" href="/carrinho">Carrinho</Link></li>
            </ul>
          </div>
          <div>
            <p className="eyebrow text-mint-200/60">Atendimento</p>
            <ul className="mt-3 space-y-2.5 text-sm">
              <li>
                <a className="link-line inline-flex items-center gap-1.5" href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noopener">
                  Pedidos pelo WhatsApp <IconArrowUpRight width={13} height={13} />
                </a>
              </li>
              <li>
                <a className="link-line inline-flex items-center gap-1.5" href={`https://instagram.com/${settings.instagram}`} target="_blank" rel="noopener">
                  Novidades no Instagram <IconArrowUpRight width={13} height={13} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-2 text-xs text-mint-200/50">
          <span>© {new Date().getFullYear()} {settings.storeName} — Rio de Janeiro, RJ</span>
          <span>Um mundo de brinquedos</span>
        </div>
      </div>
    </footer>
  );
}
