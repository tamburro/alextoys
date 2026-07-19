"use client";

import Link from "next/link";
import { IconCard, IconChat } from "@/components/icons";
import { buildWhatsAppOrderURL, startCheckout } from "@/lib/integrations";
import { useStore } from "@/lib/store-context";
import { formatPrice } from "@/lib/types";

export default function CarrinhoPage() {
  const { cart, products, setCartQty, clearCart, settings, ready } = useStore();

  const items = cart
    .map((c) => ({ product: products.find((p) => p.id === c.productId), qty: c.qty }))
    .filter((i): i is { product: NonNullable<typeof i.product>; qty: number } => !!i.product);

  const total = items.reduce((n, i) => n + i.product.price * i.qty, 0);

  async function handleStripe() {
    const res = await startCheckout(items);
    if (res.ok && res.url) window.location.href = res.url;
    else alert("Pagamento online chegando em breve. Por enquanto, finalize pelo WhatsApp.");
  }

  if (!ready) return <div className="py-32 text-center text-ink-soft">Carregando…</div>;

  if (items.length === 0) {
    return (
      <div className="py-32 text-center px-4">
        <h1 className="font-display font-extrabold text-3xl">Seu carrinho está vazio</h1>
        <p className="text-ink-soft mt-2 text-sm">Que tal explorar o mundo de brinquedos?</p>
        <Link href="/produtos" className="inline-block mt-8 px-8 py-4 rounded-full bg-ink text-mint-50 font-display font-bold hover:bg-grape transition-colors">
          Ver brinquedos
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="font-display font-extrabold text-4xl">Seu carrinho</h1>

      <div className="mt-8 space-y-4">
        {items.map(({ product, qty }) => (
          <div key={product.id} className="flex gap-4 rounded-3xl bg-white border border-ink/10 p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={product.image} alt={product.name} className="w-24 h-24 rounded-2xl object-cover bg-mint-100" />
            <div className="grow min-w-0">
              <Link href={`/produto/${product.id}`} className="font-display font-bold hover:text-grape line-clamp-1">
                {product.name}
              </Link>
              <p className="text-sm text-ink-soft mt-0.5">{formatPrice(product.price)} cada</p>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex items-center rounded-full border border-ink/10 overflow-hidden">
                  <button onClick={() => setCartQty(product.id, qty - 1)} className="px-3 py-1.5 font-bold hover:bg-mint-100">−</button>
                  <span className="w-8 text-center font-bold text-sm">{qty}</span>
                  <button onClick={() => setCartQty(product.id, Math.min(product.stock, qty + 1))} className="px-3 py-1.5 font-bold hover:bg-mint-100">+</button>
                </div>
                <button onClick={() => setCartQty(product.id, 0)} className="text-xs font-bold text-ink-soft hover:text-bubble">
                  Remover
                </button>
              </div>
            </div>
            <div className="font-display font-extrabold whitespace-nowrap">
              {formatPrice(product.price * qty)}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-3xl bg-white border border-ink/10 p-6">
        <div className="flex items-center justify-between font-display font-extrabold text-2xl">
          <span>Total</span>
          <span className="text-grape">{formatPrice(total)}</span>
        </div>
        <p className="text-xs text-ink-soft mt-1">Frete combinado na finalização do pedido.</p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <a
            href={buildWhatsAppOrderURL(settings.whatsapp, items, formatPrice(total))}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-full bg-ink text-mint-50 font-display font-bold text-lg hover:bg-grape transition-colors"
          >
            <IconChat width={18} height={18} /> Finalizar pelo WhatsApp
          </a>
          <button
            onClick={handleStripe}
            className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-full text-ink-soft font-display font-bold text-lg border border-ink/15 hover:border-ink hover:text-ink transition-colors"
            title="Pagamento online em breve"
          >
            <IconCard width={18} height={18} /> Pagar online — em breve
          </button>
        </div>
        <button onClick={clearCart} className="mt-4 text-xs font-bold text-ink-soft hover:text-bubble">
          Esvaziar carrinho
        </button>
      </div>
    </div>
  );
}
