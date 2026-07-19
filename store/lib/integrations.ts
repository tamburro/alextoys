/**
 * Pontos de integração futuros.
 * Cada função abaixo é o ÚNICO lugar a alterar quando as integrações chegarem —
 * o resto do app já chama estas interfaces.
 */
import type { CartItem, Product } from "./types";

// ---------------------------------------------------------------------------
// AUTH (Google) — trocar por NextAuth/Auth.js quando for integrar.
// 1. npm i next-auth  2. criar app/api/auth/[...nextauth]/route.ts
// 3. substituir o corpo destas funções.
// ---------------------------------------------------------------------------
export interface SessionUser {
  name: string;
  email: string;
  isAdmin: boolean;
}

export async function getSessionUser(): Promise<SessionUser | null> {
  // TODO(auth): retornar sessão real do NextAuth.
  // Por enquanto o admin é aberto — protegido apenas por obscuridade da URL.
  return { name: "Alex", email: "dono@alextoys.com", isAdmin: true };
}

export function signInWithGoogle(): void {
  // TODO(auth): signIn("google")
  alert("Login Google será ativado em breve!");
}

// ---------------------------------------------------------------------------
// PAGAMENTOS (Stripe) — trocar por Stripe Checkout quando for integrar.
// 1. npm i stripe  2. criar app/api/checkout/route.ts com stripe.checkout.sessions.create
// 3. substituir o corpo de startCheckout.
// ---------------------------------------------------------------------------
export async function startCheckout(
  items: { product: Product; qty: number }[],
): Promise<{ ok: boolean; url?: string }> {
  // TODO(stripe): criar Checkout Session e retornar session.url
  return { ok: false };
}

// ---------------------------------------------------------------------------
// BANCO DE DADOS — hoje os dados vivem em localStorage (lib/store-context.tsx).
// Quando houver banco (ex: Postgres/Supabase/Prisma):
// 1. criar app/api/products/route.ts (GET/POST/PUT/DELETE)
// 2. no store-context, trocar loadProducts/persistProducts por fetch dessas rotas.
// ---------------------------------------------------------------------------
const LS_PRODUCTS = "alextoys.products.v1";
const LS_CART = "alextoys.cart.v1";
const LS_SETTINGS = "alextoys.settings.v1";

export function loadLS<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function saveLS<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export const STORAGE_KEYS = { LS_PRODUCTS, LS_CART, LS_SETTINGS };

// Checkout provisório via WhatsApp — já vende de verdade sem Stripe.
export function buildWhatsAppOrderURL(
  whatsapp: string,
  items: { product: Product; qty: number }[],
  total: string,
): string {
  const lines = items.map(
    (i) => `• ${i.qty}x ${i.product.name}`,
  );
  const msg = encodeURIComponent(
    `Olá! Quero fazer um pedido na Alex Toys:\n\n${lines.join("\n")}\n\nTotal: ${total}`,
  );
  return `https://wa.me/${whatsapp}?text=${msg}`;
}

export type { CartItem };
