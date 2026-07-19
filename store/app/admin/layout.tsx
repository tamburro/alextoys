"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useStore } from "@/lib/store-context";
import { IconBag, IconChart, IconClose, IconGear, IconMenu, IconPackage } from "@/components/icons";

const MENU = [
  { href: "/admin", label: "Visão geral", icon: IconChart },
  { href: "/admin/produtos", label: "Produtos", icon: IconBag },
  { href: "/admin/pedidos", label: "Pedidos", icon: IconPackage },
  { href: "/admin/configuracoes", label: "Configurações", icon: IconGear },
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
          className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-colors ${
            pathname === m.href
              ? "bg-ink text-mint-50"
              : "text-ink-soft hover:bg-mint-100 hover:text-ink"
          }`}
        >
          <m.icon width={17} height={17} />
          {m.label}
        </Link>
      ))}
      <Link
        href="/"
        className="mt-4 flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm text-ink-soft hover:bg-mint-100"
      >
        Ver a loja
      </Link>
    </nav>
  );

  return (
    <div className="min-h-dvh flex flex-col lg:flex-row bg-mint-50">
      {/* Topbar mobile */}
      <div className="lg:hidden sticky top-0 z-40 flex items-center justify-between px-4 h-14 bg-white border-b border-ink/10">
        <p className="font-display font-extrabold">
          {settings.storeName} <span className="text-grape">Admin</span>
        </p>
        <button onClick={() => setOpen(!open)} className="w-10 h-10 grid place-items-center rounded-full border border-ink/15" aria-label="Menu">
          {open ? <IconClose width={17} height={17} /> : <IconMenu width={17} height={17} />}
        </button>
      </div>
      {open && <aside className="lg:hidden bg-white border-b border-ink/10">{nav}</aside>}

      {/* Sidebar desktop */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-white border-r border-ink/10 sticky top-0 h-dvh">
        <div className="p-6 border-b border-ink/10">
          <p className="font-display font-extrabold text-xl tracking-tight">
            {settings.storeName.replace(/!$/, "")}
            <span className="text-grape">!</span>
          </p>
          <p className="eyebrow text-ink-soft mt-1.5">Painel do lojista</p>
        </div>
        {nav}
        <div className="mt-auto p-4 text-[11px] text-ink-soft border-t border-ink/10">
          Logado como <b>Alex</b> · login Google em breve
        </div>
      </aside>

      <main className="grow p-4 sm:p-8 max-w-5xl w-full mx-auto">{children}</main>
    </div>
  );
}
