"use client";

import { IconPackage } from "@/components/icons";

export default function PedidosPage() {
  return (
    <div>
      <h1 className="font-display font-extrabold text-3xl">Pedidos</h1>
      <p className="text-ink-soft mt-1 text-sm">
        Acompanhe aqui os pedidos da sua loja.
      </p>

      <div className="mt-10 rounded-3xl bg-white border border-ink/10 p-12 text-center">
        <span className="inline-grid place-items-center w-14 h-14 rounded-full bg-mint-100 text-grape">
          <IconPackage width={26} height={26} />
        </span>
        <h2 className="font-display font-bold text-xl mt-5">
          Os pedidos chegam pelo WhatsApp
        </h2>
        <p className="text-ink-soft text-sm mt-2 max-w-md mx-auto">
          Por enquanto, quando um cliente finaliza a compra, o pedido cai direto no
          seu WhatsApp com a lista de itens e o total. Quando o pagamento online
          (cartão/Pix) for ativado, os pedidos aparecerão automaticamente nesta tela.
        </p>
        <span className="inline-block mt-6 px-4 py-2 rounded-full bg-sun/15 text-sun font-bold text-xs uppercase tracking-wide">
          Pagamento online em breve
        </span>
      </div>
    </div>
  );
}
