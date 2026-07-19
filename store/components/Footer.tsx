"use client";

import Link from "next/link";
import { useStore } from "@/lib/store-context";

export default function Footer() {
  const { settings } = useStore();
  return (
    <footer className="mt-20 bg-ink text-mint-100">
      <div className="mx-auto max-w-6xl px-4 py-12 grid gap-10 sm:grid-cols-3">
        <div>
          <p className="bubble-title text-2xl text-white">{settings.storeName}</p>
          <p className="mt-2 text-sm text-mint-200/80 max-w-[28ch]">
            {settings.tagline}. Brinquedos clássicos e modernos pra mergulhar na
            nostalgia.
          </p>
        </div>
        <div>
          <p className="font-display font-bold text-white mb-3">Navegue</p>
          <ul className="space-y-2 text-sm">
            <li><Link className="hover:text-white" href="/produtos">Todos os brinquedos</Link></li>
            <li><Link className="hover:text-white" href="/produtos?cat=classicos">Clássicos</Link></li>
            <li><Link className="hover:text-white" href="/produtos?cat=colecionaveis">Colecionáveis</Link></li>
            <li><Link className="hover:text-white" href="/carrinho">Carrinho</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-display font-bold text-white mb-3">Fale com a gente</p>
          <ul className="space-y-2 text-sm">
            <li>
              <a className="hover:text-white" href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noopener">
                💬 WhatsApp
              </a>
            </li>
            <li>
              <a className="hover:text-white" href={`https://instagram.com/${settings.instagram}`} target="_blank" rel="noopener">
                📸 @{settings.instagram}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-mint-200/60">
        © {new Date().getFullYear()} {settings.storeName} — feito com carinho no Rio de Janeiro
      </div>
    </footer>
  );
}
