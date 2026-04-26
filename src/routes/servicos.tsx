import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { DoorOpen, MoveHorizontal, Square, Wrench, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/servicos")({
  component: ServicosPage,
  head: () => ({
    meta: [
      { title: "Serviços — Império Portas" },
      {
        name: "description",
        content:
          "Instalação de portas pivotantes, portas de correr, esquadrias de alumínio e outros modelos.",
      },
    ],
  }),
});

const SERVICES = [
  {
    icon: DoorOpen,
    title: "Portas Pivotantes",
    desc: "Soluções modernas e elegantes para entradas que impressionam. Instalação precisa com acabamento profissional.",
    features: ["Madeira maciça", "Alumínio reforçado", "Vidro temperado"],
  },
  {
    icon: MoveHorizontal,
    title: "Portas de Correr",
    desc: "Praticidade e otimização de espaço. Ideais para ambientes internos, sacadas e closets.",
    features: ["Trilhos suaves", "Sistema embutido", "Vidro ou madeira"],
  },
  {
    icon: Square,
    title: "Esquadrias de Alumínio",
    desc: "Janelas, portas e estruturas em alumínio com vedação perfeita e acabamento impecável.",
    features: ["Linha residencial", "Linha comercial", "Cores variadas"],
  },
  {
    icon: Wrench,
    title: "Outros Serviços",
    desc: "Manutenção, ajustes, troca de fechaduras, instalação de portas blindadas e modelos especiais sob medida.",
    features: ["Sob consulta", "Atendimento técnico", "Reparos rápidos"],
  },
];

function ServicosPage() {
  return (
    <SiteLayout>
      <section className="bg-gradient-dark py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-4">O que fazemos</p>
          <h1 className="text-5xl md:text-6xl font-display mb-6">
            Nossos <span className="gold-gradient-text">Serviços</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Instalação especializada para residências, comércios e obras.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-6">
          {SERVICES.map((s) => (
            <article
              key={s.title}
              className="p-8 rounded-xl bg-card border border-gold/15 hover:border-gold/40 transition group"
            >
              <div className="w-14 h-14 rounded-lg bg-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition">
                <s.icon className="text-gold" size={26} />
              </div>
              <h2 className="text-2xl font-display mb-3">{s.title}</h2>
              <p className="text-muted-foreground mb-5 leading-relaxed">{s.desc}</p>
              <ul className="space-y-2 mb-6">
                {s.features.map((f) => (
                  <li key={f} className="text-sm text-foreground/80 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold" /> {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/orcamento"
                className="inline-flex items-center gap-2 text-gold text-sm font-medium hover:gap-3 transition-all"
              >
                Pedir orçamento <ArrowRight size={16} />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
