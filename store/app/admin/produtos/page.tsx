"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useStore } from "@/lib/store-context";
import { CATEGORIES, formatPrice, type Category, type Product } from "@/lib/types";

interface FormState {
  name: string;
  description: string;
  priceBRL: string;
  category: Category;
  image: string;
  stock: string;
  featured: boolean;
}

const EMPTY: FormState = {
  name: "",
  description: "",
  priceBRL: "",
  category: "classicos",
  image: "",
  stock: "1",
  featured: false,
};

function parsePriceBRL(s: string): number {
  const n = Number(s.replace(/\./g, "").replace(",", "."));
  return Math.round((Number.isFinite(n) ? n : 0) * 100);
}

function ProductsAdmin() {
  const { products, addProduct, updateProduct, removeProduct, ready } = useStore();
  const params = useSearchParams();

  const [editing, setEditing] = useState<Product | "new" | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [q, setQ] = useState("");

  useEffect(() => {
    if (params.get("novo") === "1") openNew();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  function openNew() {
    setForm(EMPTY);
    setEditing("new");
  }

  function openEdit(p: Product) {
    setForm({
      name: p.name,
      description: p.description,
      priceBRL: (p.price / 100).toFixed(2).replace(".", ","),
      category: p.category,
      image: p.image,
      stock: String(p.stock),
      featured: p.featured,
    });
    setEditing(p);
  }

  function save() {
    if (!form.name.trim()) return alert("Dê um nome ao brinquedo.");
    const price = parsePriceBRL(form.priceBRL);
    if (price <= 0) return alert("Informe um preço válido, ex: 49,90");
    const image =
      form.image.trim() ||
      `https://picsum.photos/seed/alextoys-${encodeURIComponent(form.name.trim().toLowerCase().replace(/\s+/g, "-"))}/640/640`;
    const data = {
      name: form.name.trim(),
      description: form.description.trim(),
      price,
      category: form.category,
      image,
      stock: Math.max(0, parseInt(form.stock, 10) || 0),
      featured: form.featured,
    };
    if (editing === "new") addProduct(data);
    else if (editing) updateProduct(editing.id, data);
    setEditing(null);
  }

  const list = products.filter(
    (p) => !q.trim() || p.name.toLowerCase().includes(q.trim().toLowerCase()),
  );

  if (!ready) return <p className="text-ink-soft">Carregando…</p>;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display font-extrabold text-3xl">Produtos</h1>
          <p className="text-ink-soft mt-1 text-sm">
            Adicione, edite ou remova os brinquedos da sua loja.
          </p>
        </div>
        <button
          onClick={openNew}
          className="px-6 py-3 rounded-full bg-ink text-mint-50 font-display font-bold hover:bg-grape transition-colors"
        >
          Adicionar brinquedo
        </button>
      </div>

      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Buscar produto…"
        className="mt-6 w-full sm:w-72 px-4 py-2.5 rounded-full bg-white border border-ink/10 text-sm outline-none focus:border-grape"
      />

      {/* Lista */}
      <div className="mt-6 space-y-3">
        {list.map((p) => (
          <div key={p.id} className="flex items-center gap-4 rounded-3xl bg-white border border-ink/10 p-3 sm:p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.image} alt={p.name} className="w-16 h-16 rounded-2xl object-cover bg-mint-100 shrink-0" />
            <div className="grow min-w-0">
              <p className="font-display font-bold truncate">
                {p.name}{p.featured && <span className="ml-2 align-middle inline-block px-2 py-0.5 rounded-full bg-ink text-mint-50 text-[9px] font-extrabold uppercase tracking-[0.14em]">Destaque</span>}
              </p>
              <p className="text-xs text-ink-soft">
                {CATEGORIES[p.category]} · {formatPrice(p.price)} ·{" "}
                {p.stock > 0 ? (
                  <span>{p.stock} em estoque</span>
                ) : (
                  <span className="text-bubble font-bold">esgotado</span>
                )}
              </p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => openEdit(p)}
                className="px-4 py-2 rounded-full bg-mint-100 text-sm font-bold hover:bg-mint-200 transition"
              >
                Editar
              </button>
              <button
                onClick={() => {
                  if (confirm(`Remover "${p.name}" da loja?`)) removeProduct(p.id);
                }}
                className="px-4 py-2 rounded-full text-sm font-bold text-bubble hover:bg-bubble/10 transition"
              >
                Remover
              </button>
            </div>
          </div>
        ))}
        {list.length === 0 && (
          <p className="text-center py-16 text-ink-soft">Nenhum produto encontrado.</p>
        )}
      </div>

      {/* Modal de formulário */}
      {editing && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-ink/50 backdrop-blur-sm p-4" onClick={() => setEditing(null)}>
          <div
            className="w-full max-w-lg max-h-[90dvh] overflow-y-auto rounded-[2rem] bg-white p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-display font-extrabold text-2xl">
              {editing === "new" ? "Novo brinquedo" : "Editar brinquedo"}
            </h2>

            <div className="mt-6 space-y-4">
              <Field label="Nome do brinquedo *">
                <input className={inp} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ex: Robô de Lata Vintage" />
              </Field>
              <Field label="Descrição">
                <textarea className={`${inp} min-h-24 resize-y`} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Conte o que torna esse brinquedo especial…" />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Preço (R$) *">
                  <input className={inp} inputMode="decimal" value={form.priceBRL} onChange={(e) => setForm({ ...form, priceBRL: e.target.value })} placeholder="49,90" />
                </Field>
                <Field label="Estoque">
                  <input className={inp} inputMode="numeric" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} placeholder="10" />
                </Field>
              </div>
              <Field label="Categoria">
                <select className={inp} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as Category })}>
                  {Object.entries(CATEGORIES).map(([k, v]) => (
                    <option key={k} value={k}>{v}</option>
                  ))}
                </select>
              </Field>
              <Field label="Foto (link da imagem — deixe vazio para usar uma imagem provisória)">
                <input className={inp} value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://…" />
              </Field>
              <label className="flex items-center gap-3 font-bold text-sm cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="w-5 h-5 accent-grape"
                />
                Mostrar como destaque na página inicial
              </label>
            </div>

            <div className="mt-8 flex gap-3">
              <button onClick={save} className="grow px-6 py-3.5 rounded-full bg-grape text-white font-display font-bold hover:bg-grape-dark transition">
                {editing === "new" ? "Adicionar à loja" : "Salvar alterações"}
              </button>
              <button onClick={() => setEditing(null)} className="px-6 py-3.5 rounded-full bg-mint-100 font-bold hover:bg-mint-200 transition">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const inp =
  "w-full px-4 py-3 rounded-2xl bg-mint-50 border border-ink/10 text-sm outline-none focus:border-grape focus:bg-white transition";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm font-bold mb-1.5">{label}</span>
      {children}
    </label>
  );
}

export default function Page() {
  return (
    <Suspense>
      <ProductsAdmin />
    </Suspense>
  );
}
