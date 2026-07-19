"use client";

export default function PedidosPage() {
  return (
    <div>
      <h1 className="font-display font-extrabold text-3xl">Pedidos</h1>
      <p className="text-ink-soft mt-1 text-sm">
        Acompanhe aqui os pedidos da sua loja.
      </p>

      <div className="mt-10 rounded-[2rem] bg-white border border-mint-200 p-12 text-center">
        <p className="text-6xl">📦</p>
        <h2 className="font-display font-bold text-xl mt-4">
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
