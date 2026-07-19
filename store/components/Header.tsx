"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useStore } from "@/lib/store-context";
import { IconBag, IconClose, IconMenu } from "./icons";

const NAV = [
  { href: "/produtos", label: "Todos" },
  { href: "/produtos?cat=classicos", label: "Clássicos" },
  { href: "/produtos?cat=modernos", label: "Modernos" },
  { href: "/produtos?cat=colecionaveis", label: "Colecionáveis" },
  { href: "/produtos?cat=pelucias", label: "Pelúcias" },
];

export default function Header() {
  const { cartCount, settings } = useStore();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-mint-50/90 backdrop-blur-md border-b border-ink/10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between gap-6">
        <Link href="/" className="font-display font-extrabold text-xl tracking-tight shrink-0">
          {settings.storeName.replace(/!$/, "")}
          <span className="text-grape">!</span>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`link-line text-[13px] font-bold tracking-wide ${
                pathname === "/produtos" && n.href === "/produtos"
                  ? "text-ink"
                  : "text-ink-soft hover:text-ink"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/carrinho"
            aria-label="Carrinho"
            className="relative grid place-items-center w-10 h-10 rounded-full border border-ink/15 text-ink hover:bg-ink hover:text-mint-50 transition-colors"
          >
            <IconBag width={18} height={18} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 grid place-items-center rounded-full bg-grape text-white text-[10px] font-extrabold">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            className="md:hidden grid place-items-center w-10 h-10 rounded-full border border-ink/15"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <IconClose width={18} height={18} /> : <IconMenu width={18} height={18} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden border-t border-ink/10 bg-mint-50 px-4 py-4 flex flex-col">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="py-3 border-b border-ink/5 font-display font-bold text-lg"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
