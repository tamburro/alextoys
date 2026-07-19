"use client";

import { useEffect, useState } from "react";
import { signInWithGoogle } from "@/lib/integrations";
import { useStore } from "@/lib/store-context";
import type { StoreSettings } from "@/lib/types";

export default function ConfiguracoesPage() {
  const { settings, saveSettings, ready } = useStore();
  const [form, setForm] = useState<StoreSettings>(settings);
  const [saved, setSaved] = useState(false);

  useEffect(() => setForm(settings), [settings]);

  function handleSave() {
    saveSettings({
      ...form,
      whatsapp: form.whatsapp.replace(/\D/g, ""),
      instagram: form.instagram.replace(/^@/, ""),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  if (!ready) return <p className="text-ink-soft">Carregando…</p>;

  return (
    <div>
      <h1 className="font-display font-extrabold text-3xl">Configurações</h1>
      <p className="text-ink-soft mt-1 text-sm">Dados da sua loja, do seu jeito.</p>

      <div className="mt-8 max-w-lg rounded-[2rem] bg-white border border-mint-200 p-6 sm:p-8 space-y-4">
        <Field label="Nome da loja">
          <input className={inp} value={form.storeName} onChange={(e) => setForm({ ...form, storeName: e.target.value })} />
        </Field>
        <Field label="Slogan">
          <input className={inp} value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} />
        </Field>
        <Field label="WhatsApp (com DDI, só números)">
          <input className={inp} inputMode="numeric" value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} placeholder="5521967480201" />
        </Field>
        <Field label="Instagram (sem @)">
          <input className={inp} value={form.instagram} onChange={(e) => setForm({ ...form, instagram: e.target.value })} placeholder="aspm.toys" />
        </Field>

        <button
          onClick={handleSave}
          className={`w-full px-6 py-3.5 rounded-full font-display font-bold text-white transition ${
            saved ? "bg-emerald-500" : "bg-grape hover:bg-grape-dark"
          }`}
        >
          {saved ? "✓ Salvo!" : "Salvar configurações"}
        </button>
      </div>

      <div className="mt-6 max-w-lg rounded-[2rem] bg-white border border-mint-200 p-6 sm:p-8">
        <h2 className="font-display font-bold text-lg">Conta e segurança</h2>
        <p className="text-sm text-ink-soft mt-1">
          Em breve o painel será protegido por login com Google.
        </p>
        <button
          onClick={signInWithGoogle}
          className="mt-4 w-full px-6 py-3.5 rounded-full border-2 border-mint-200 font-bold text-sm hover:border-grape transition"
        >
          Conectar conta Google (em breve)
        </button>
      </div>
    </div>
  );
}

const inp =
  "w-full px-4 py-3 rounded-2xl bg-mint-50 border border-mint-200 text-sm outline-none focus:border-grape focus:bg-white transition";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm font-bold mb-1.5">{label}</span>
      {children}
    </label>
  );
}
