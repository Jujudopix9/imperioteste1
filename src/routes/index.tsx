import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PublicGallery } from "@/components/PublicGallery";
import { ShieldCheck, Hammer, Sparkles, ArrowRight, CheckCircle2, Star, Quote } from "lucide-react";
import logo from "@/assets/imperio-logo.jpeg";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "Império Portas | Instalação Profissional de Portas em Campinas" },
      {
        name: "description",
        content:
          "Instalação de portas pivotantes, de correr e esquadrias de alumínio com acabamento impecável. Orçamento rápido pelo WhatsApp.",
      },
    ],
  }),
});

function HomePage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-dark">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, var(--gold) 0, transparent 40%), radial-gradient(circle at 80% 80%, var(--gold) 0, transparent 40%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/40 text-xs uppercase tracking-[0.25em] text-gold mb-6">
              <Sparkles size={14} /> Instalação Premium
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display leading-[1.05] mb-6">
              Portas que transformam o seu{" "}
              <span className="gold-gradient-text">ambiente</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
              Instalação profissional de portas pivotantes, de correr e esquadrias de alumínio.
              Acabamento impecável, prazo cumprido e atendimento dedicado.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/orcamento"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md bg-gold text-primary-foreground font-semibold hover:opacity-90 transition shadow-gold"
              >
                Solicitar Orçamento <ArrowRight size={18} />
              </Link>
              <Link
                to="/servicos"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md border border-gold/40 text-gold hover:bg-gold/10 transition"
              >
                Ver Serviços
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-6 text-sm text-muted-foreground">
              {["Mão de obra qualificada", "Garantia de serviço", "Atendimento rápido"].map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-gold" />
                  {t}
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-gold opacity-20 blur-3xl rounded-full" />
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-gold/40 shadow-gold">
              <img
                src={logo}
                alt="Logo Império Portas"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">Por que Império</p>
            <h2 className="text-4xl md:text-5xl font-display">Excelência em cada detalhe</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Hammer,
                title: "Mão de obra especializada",
                desc: "Equipe treinada para garantir instalação perfeita em cada projeto.",
              },
              {
                icon: ShieldCheck,
                title: "Garantia e segurança",
                desc: "Trabalho com responsabilidade e garantia em todos os serviços executados.",
              },
              {
                icon: Sparkles,
                title: "Acabamento impecável",
                desc: "Atenção aos mínimos detalhes para um resultado elegante e duradouro.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="p-8 rounded-xl bg-card border border-gold/15 hover:border-gold/40 transition"
              >
                <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center mb-5">
                  <f.icon className="text-gold" size={22} />
                </div>
                <h3 className="text-xl mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prova social — números */}
      <section className="px-4 sm:px-6 lg:px-8 pb-4">
        <div className="mx-auto max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { n: "+500", l: "Portas instaladas" },
            { n: "10+", l: "Anos de experiência" },
            { n: "100%", l: "Clientes satisfeitos" },
            { n: "5,0", l: "Avaliação média" },
          ].map((s) => (
            <div key={s.l} className="text-center p-6 rounded-xl bg-card border border-gold/15">
              <div className="font-display text-3xl md:text-4xl text-gold">{s.n}</div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Galeria pública (aparece quando há fotos cadastradas no admin) */}
      <PublicGallery limit={6} />

      {/* Depoimentos */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">Depoimentos</p>
            <h2 className="text-4xl md:text-5xl font-display">O que dizem nossos clientes</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Marcos R.", city: "Campinas - SP", text: "Instalação impecável da porta pivotante. Pontualidade, capricho e atendimento excelente. Recomendo demais!" },
              { name: "Fernanda L.", city: "Valinhos - SP", text: "Profissionais sérios e atenciosos. O acabamento ficou perfeito, exatamente como combinado." },
              { name: "João P.", city: "Vinhedo - SP", text: "Orçamento rápido pelo WhatsApp e instalação no prazo. Equipe muito qualificada, virou referência pra mim." },
            ].map((d) => (
              <div key={d.name} className="p-7 rounded-xl bg-card border border-gold/15 hover:border-gold/40 transition flex flex-col">
                <Quote className="text-gold/60 mb-3" size={26} />
                <p className="text-foreground/90 leading-relaxed mb-5 flex-1">{d.text}</p>
                <div className="flex items-center gap-1 text-gold mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <div className="text-sm font-medium">{d.name}</div>
                <div className="text-xs text-muted-foreground">{d.city}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="mx-auto max-w-5xl rounded-2xl bg-gradient-dark border border-gold/30 p-12 text-center shadow-gold">
          <h2 className="text-3xl md:text-4xl font-display mb-4">
            Pronto para <span className="gold-gradient-text">transformar</span> seu espaço?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Receba seu orçamento em poucos minutos diretamente pelo WhatsApp.
          </p>
          <Link
            to="/orcamento"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-md bg-gold text-primary-foreground font-semibold hover:opacity-90 transition"
          >
            Solicitar Orçamento Agora <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
