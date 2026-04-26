import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { useState } from "react";
import { z } from "zod";
import { Send, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/orcamento")({
  component: OrcamentoPage,
  head: () => ({
    meta: [
      { title: "Orçamento — Império Portas" },
      {
        name: "description",
        content:
          "Solicite seu orçamento de instalação de portas. Resposta rápida pelo WhatsApp.",
      },
    ],
  }),
});

const schema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome").max(80),
  cidade: z.string().trim().min(2, "Informe sua cidade/bairro").max(120),
  tipo: z.string().min(1),
  medida: z.string().trim().max(80).optional(),
  obs: z.string().trim().max(500).optional(),
});

const PHONE = "5519999742110";

function OrcamentoPage() {
  const [form, setForm] = useState({
    nome: "",
    cidade: "",
    tipo: "Porta Pivotante",
    medida: "",
    obs: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Verifique os dados");
      return;
    }
    setError(null);
    setSubmitting(true);
    const { nome, cidade, tipo, medida, obs } = result.data;

    const { error: dbErr } = await supabase.from("orcamentos").insert({
      nome,
      cidade,
      tipo,
      medida: medida || null,
      obs: obs || null,
    });
    if (dbErr) console.error("Erro ao salvar orçamento:", dbErr);

    const lines = [
      "*Novo Orçamento — Império*",
      "",
      `*Nome:* ${nome}`,
      `*Local:* ${cidade}`,
      `*Produto:* ${tipo}`,
      `*Medida:* ${medida || "Não informada"}`,
    ];
    if (obs) lines.push(`*Obs:* ${obs}`);
    const url = `https://wa.me/${PHONE}?text=${encodeURIComponent(lines.join("\n"))}`;
    setSubmitting(false);
    window.open(url, "_blank");
  };

  const upd = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <SiteLayout>
      <section className="bg-gradient-dark py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-4">Orçamento</p>
          <h1 className="text-4xl md:text-5xl font-display mb-4">
            Solicite seu <span className="gold-gradient-text">orçamento</span>
          </h1>
          <p className="text-muted-foreground">
            Preencha os dados abaixo e envie diretamente para nosso WhatsApp.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <form
          onSubmit={handle}
          className="mx-auto max-w-2xl bg-card border border-gold/20 rounded-2xl p-8 md:p-10 shadow-gold"
        >
          <div className="grid gap-5">
            <Field label="Seu nome *">
              <input
                type="text"
                value={form.nome}
                onChange={upd("nome")}
                className="input-style"
                placeholder="Nome completo"
                maxLength={80}
              />
            </Field>

            <Field label="Cidade / Bairro *">
              <input
                type="text"
                value={form.cidade}
                onChange={upd("cidade")}
                className="input-style"
                placeholder="Onde será a instalação?"
                maxLength={120}
              />
            </Field>

            <Field label="O que você precisa?">
              <select value={form.tipo} onChange={upd("tipo")} className="input-style">
                <option>Porta Pivotante</option>
                <option>Porta de Correr</option>
                <option>Esquadrias de Alumínio</option>
                <option>Porta Blindada</option>
                <option>Manutenção / Reparos</option>
                <option>Outros modelos</option>
              </select>
            </Field>

            <Field label="Medidas (Largura x Altura)">
              <input
                type="text"
                value={form.medida}
                onChange={upd("medida")}
                className="input-style"
                placeholder="Ex: 2,10 x 0,90"
                maxLength={80}
              />
            </Field>

            <Field label="Observações">
              <textarea
                value={form.obs}
                onChange={upd("obs")}
                className="input-style min-h-[110px] resize-none"
                placeholder="Cor, urgência, detalhes do local..."
                maxLength={500}
              />
            </Field>

            {error && (
              <p className="text-destructive text-sm bg-destructive/10 border border-destructive/30 rounded-md px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="mt-2 inline-flex items-center justify-center gap-2 px-7 py-4 rounded-md bg-gold text-primary-foreground font-semibold hover:opacity-90 transition shadow-gold disabled:opacity-50"
            >
              <Send size={18} /> {submitting ? "Enviando..." : "Enviar para o WhatsApp"}
            </button>

            <a
              href={`https://wa.me/${PHONE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center text-sm text-gold hover:underline inline-flex items-center justify-center gap-2"
            >
              <MessageCircle size={14} /> Prefere falar direto? Abrir WhatsApp
            </a>
          </div>
        </form>
      </section>

      <style>{`
        .input-style {
          width: 100%;
          padding: 12px 14px;
          border-radius: 8px;
          background: var(--input);
          border: 1px solid var(--border);
          color: var(--foreground);
          font-size: 15px;
          outline: none;
          transition: border-color .2s, box-shadow .2s;
        }
        .input-style:focus {
          border-color: var(--gold);
          box-shadow: 0 0 0 3px oklch(0.78 0.13 85 / .15);
        }
        .input-style::placeholder { color: var(--muted-foreground); }
      `}</style>
    </SiteLayout>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-gold mb-2 uppercase tracking-wider text-xs">
        {label}
      </span>
      {children}
    </label>
  );
}
