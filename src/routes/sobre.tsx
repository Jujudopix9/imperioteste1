import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Award, Users, Clock, Heart } from "lucide-react";

export const Route = createFileRoute("/sobre")({
  component: SobrePage,
  head: () => ({
    meta: [
      { title: "Sobre — Império Portas" },
      {
        name: "description",
        content:
          "Conheça a Império Portas: tradição, dedicação e excelência na instalação de portas e esquadrias.",
      },
    ],
  }),
});

function SobrePage() {
  return (
    <SiteLayout>
      <section className="bg-gradient-dark py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-4">Nossa história</p>
          <h1 className="text-5xl md:text-6xl font-display mb-6">
            Tradição em <span className="gold-gradient-text">cada instalação</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            A Império nasceu da paixão por fazer bem feito. Acreditamos que uma porta é mais
            do que uma passagem: é o convite ao seu lar e a primeira impressão do seu espaço.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-display mb-6">Quem somos</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Somos uma empresa especializada na instalação profissional de portas pivotantes,
                de correr, esquadrias de alumínio e diversos outros modelos. Atendemos residências,
                comércios e construtoras em toda a região.
              </p>
              <p>
                Nossa equipe é formada por profissionais experientes que entendem que cada projeto
                tem suas particularidades. Trabalhamos com cuidado, precisão e respeito ao seu prazo.
              </p>
              <p>
                Para nós, o nome <span className="text-gold">Império</span> representa mais do que
                uma marca — é o compromisso de entregar trabalhos sólidos, duradouros e dignos da
                confiança que você deposita em nós.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Award, label: "Qualidade garantida" },
              { icon: Users, label: "Atendimento próximo" },
              { icon: Clock, label: "Prazos cumpridos" },
              { icon: Heart, label: "Trabalho com paixão" },
            ].map((v) => (
              <div
                key={v.label}
                className="p-6 rounded-xl bg-card border border-gold/15 text-center"
              >
                <v.icon className="text-gold mx-auto mb-3" size={28} />
                <p className="text-sm font-medium">{v.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="mx-auto max-w-5xl rounded-2xl bg-gradient-dark border border-gold/30 p-12 text-center">
          <h2 className="text-3xl font-display mb-4">Vamos conversar?</h2>
          <p className="text-muted-foreground mb-6">
            Tire suas dúvidas e receba um orçamento personalizado.
          </p>
          <Link
            to="/contato"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-md bg-gold text-primary-foreground font-semibold hover:opacity-90"
          >
            Entrar em contato
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
