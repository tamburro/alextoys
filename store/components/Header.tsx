"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useStore } from "@/lib/store-context";

const NAV = [
  { href: "/", label: "Início" },
  { href: "/produtos", label: "Brinquedos" },
  { href: "/produtos?cat=classicos", label: "Clássicos" },
  { href: "/produtos?cat=modernos", label: "Modernos" },
];

export default function Header() {
  const { cartCount, settings } = useStore();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-mint-50/85 backdrop-blur-md border-b border-mint-200">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="grid place-items-center w-9 h-9 rounded-xl bg-grape text-white font-display font-extrabold text-lg shadow-lg shadow-grape/30">
            A
          </span>
          <span className="bubble-title text-xl text-mint-50 leading-none">
            {settings.storeName}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                pathname === n.href.split("?")[0] && n.href === pathname
                  ? "bg-grape text-white"
                  : "text-ink-soft hover:text-ink hover:bg-mint-100"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/carrinho"
            className="relative grid place-items-center w-10 h-10 rounded-full bg-ink text-white hover:scale-105 transition-transform"
            aria-label="Carrinho"
          >
            🛒
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 grid place-items-center rounded-full bg-bubble text-white text-[11px] font-extrabold">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            className="md:hidden grid place-items-center w-10 h-10 rounded-full bg-mint-100 text-ink"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden border-t border-mint-200 bg-mint-50 px-4 py-3 flex flex-col gap-1">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="px-4 py-3 rounded-xl font-bold text-ink-soft hover:bg-mint-100"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
