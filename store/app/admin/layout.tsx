"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useStore } from "@/lib/store-context";

const MENU = [
  { href: "/admin", label: "Visão geral", emoji: "📊" },
  { href: "/admin/produtos", label: "Produtos", emoji: "🧸" },
  { href: "/admin/pedidos", label: "Pedidos", emoji: "📦" },
  { href: "/admin/configuracoes", label: "Configurações", emoji: "⚙️" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { settings } = useStore();
  const [open, setOpen] = useState(false);

  const nav = (
    <nav className="flex flex-col gap-1 p-3">
      {MENU.map((m) => (
        <Link
          key={m.href}
          href={m.href}
          onClick={() => setOpen(false)}
          className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm transition ${
            pathname === m.href
              ? "bg-grape text-white shadow-lg shadow-grape/25"
              : "text-ink-soft hover:bg-mint-100 hover:text-ink"
          }`}
        >
          <span className="text-lg">{m.emoji}</span>
          {m.label}
        </Link>
      ))}
      <Link
        href="/"
        className="mt-4 flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm text-ink-soft hover:bg-mint-100"
      >
        ← Ver a loja
      </Link>
    </nav>
  );

  return (
    <div className="min-h-dvh flex flex-col lg:flex-row bg-mint-50">
      {/* Topbar mobile */}
      <div className="lg:hidden sticky top-0 z-40 flex items-center justify-between px-4 h-14 bg-white border-b border-mint-200">
        <p className="font-display font-extrabold">
          {settings.storeName} <span className="text-grape">Admin</span>
        </p>
        <button onClick={() => setOpen(!open)} className="w-10 h-10 grid place-items-center rounded-full bg-mint-100">
          {open ? "✕" : "☰"}
        </button>
      </div>
      {open && <aside className="lg:hidden bg-white border-b border-mint-200">{nav}</aside>}

      {/* Sidebar desktop */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-white border-r border-mint-200 sticky top-0 h-dvh">
        <div className="p-6 border-b border-mint-200">
          <p className="bubble-title text-2xl text-mint-50">{settings.storeName}</p>
          <p className="text-xs font-extrabold uppercase tracking-widest text-grape mt-1">
            Painel do lojista
          </p>
        </div>
        {nav}
        <div className="mt-auto p-4 text-[11px] text-ink-soft border-t border-mint-200">
          Logado como <b>Alex</b> · login Google em breve
        </div>
      </aside>

      <main className="grow p-4 sm:p-8 max-w-5xl w-full mx-auto">{children}</main>
    </div>
  );
}
