import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Inbox, Phone, Trash2, RefreshCw } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: OrcamentosAdmin,
});

type Status = "novo" | "em_contato" | "fechado" | "perdido";

interface Orcamento {
  id: string;
  nome: string;
  cidade: string;
  tipo: string;
  medida: string | null;
  obs: string | null;
  status: Status;
  notas_admin: string | null;
  created_at: string;
}

const STATUS_LABEL: Record<Status, string> = {
  novo: "Novo",
  em_contato: "Em contato",
  fechado: "Fechado",
  perdido: "Perdido",
};

const STATUS_COLOR: Record<Status, string> = {
  novo: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  em_contato: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  fechado: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  perdido: "bg-zinc-500/15 text-zinc-400 border-zinc-500/30",
};

function OrcamentosAdmin() {
  const [items, setItems] = useState<Orcamento[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Status | "todos">("todos");

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from("orcamentos")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setItems(data as Orcamento[]);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function updateStatus(id: string, status: Status) {
    await supabase.from("orcamentos").update({ status }).eq("id", id);
    setItems((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  }

  async function remove(id: string) {
    if (!confirm("Excluir este orçamento?")) return;
    await supabase.from("orcamentos").delete().eq("id", id);
    setItems((prev) => prev.filter((o) => o.id !== id));
  }

  const filtered = filter === "todos" ? items : items.filter((o) => o.status === filter);
  const counts = {
    novo: items.filter((i) => i.status === "novo").length,
    em_contato: items.filter((i) => i.status === "em_contato").length,
    fechado: items.filter((i) => i.status === "fechado").length,
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-display text-gold">Orçamentos</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {items.length} no total · {counts.novo} novos · {counts.em_contato} em contato
          </p>
        </div>
        <button
          onClick={load}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-md border border-gold/30 text-gold hover:bg-gold/10"
        >
          <RefreshCw size={14} /> Atualizar
        </button>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {(["todos", "novo", "em_contato", "fechado", "perdido"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider transition ${
              filter === s
                ? "bg-gold text-primary-foreground"
                : "border border-border text-muted-foreground hover:text-gold"
            }`}
          >
            {s === "todos" ? "Todos" : STATUS_LABEL[s]}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-muted-foreground">Carregando...</p>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-gold/20 rounded-xl">
          <Inbox className="mx-auto text-gold/40 mb-3" size={40} />
          <p className="text-muted-foreground">Nenhum orçamento por aqui ainda.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filtered.map((o) => (
            <div key={o.id} className="bg-card border border-gold/15 rounded-xl p-5">
              <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg font-medium">{o.nome}</h3>
                    <span className={`text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border ${STATUS_COLOR[o.status]}`}>
                      {STATUS_LABEL[o.status]}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {o.cidade} · {new Date(o.created_at).toLocaleString("pt-BR")}
                  </p>
                </div>
                <div className="flex gap-2">
                  <select
                    value={o.status}
                    onChange={(e) => updateStatus(o.id, e.target.value as Status)}
                    className="text-xs px-2 py-1.5 rounded-md bg-input border border-border"
                  >
                    {(Object.keys(STATUS_LABEL) as Status[]).map((s) => (
                      <option key={s} value={s}>{STATUS_LABEL[s]}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => remove(o.id)}
                    className="p-1.5 rounded-md text-destructive hover:bg-destructive/10"
                    aria-label="Excluir"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-xs uppercase tracking-wider text-gold mb-1">Produto</div>
                  <div>{o.tipo}</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-gold mb-1">Medida</div>
                  <div>{o.medida || "—"}</div>
                </div>
                {o.obs && (
                  <div className="sm:col-span-2">
                    <div className="text-xs uppercase tracking-wider text-gold mb-1">Observações</div>
                    <div className="text-foreground/85 whitespace-pre-wrap">{o.obs}</div>
                  </div>
                )}
              </div>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`Olá ${o.nome}, sou da Império Portas, recebi seu pedido de orçamento.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-xs text-gold hover:underline"
              >
                <Phone size={12} /> Abrir WhatsApp
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
