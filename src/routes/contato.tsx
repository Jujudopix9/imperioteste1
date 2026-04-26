import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Phone, Mail, MapPin, Instagram, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/contato")({
  component: ContatoPage,
  head: () => ({
    meta: [
      { title: "Contato — Império Portas" },
      {
        name: "description",
        content: "Fale com a Império Portas pelo WhatsApp, e-mail ou redes sociais.",
      },
    ],
  }),
});

const CHANNELS = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    desc: "Resposta rápida no horário comercial",
    value: "(19) 99974-2110",
    href: "https://wa.me/5519999742110",
    primary: true,
  },
  {
    icon: Phone,
    title: "Telefone",
    desc: "Ligue diretamente",
    value: "(19) 99974-2110",
    href: "tel:+5519999742110",
  },
  {
    icon: Mail,
    title: "E-mail",
    desc: "Envie sua mensagem",
    value: "contato@imperioportas.com.br",
    href: "mailto:contato@imperioportas.com.br",
  },
  {
    icon: Instagram,
    title: "Instagram",
    desc: "Veja nossos trabalhos",
    value: "@imperioportas",
    href: "#",
  },
  {
    icon: MapPin,
    title: "Localização",
    desc: "Atendimento na região",
    value: "Campinas e região - SP",
    href: "#",
  },
];

function ContatoPage() {
  return (
    <SiteLayout>
      <section className="bg-gradient-dark py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-4">Fale conosco</p>
          <h1 className="text-4xl md:text-5xl font-display mb-4">
            Vamos <span className="gold-gradient-text">conversar</span>
          </h1>
          <p className="text-muted-foreground">
            Escolha o canal de sua preferência. Responderemos o quanto antes.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl grid sm:grid-cols-2 gap-4">
          {CHANNELS.map((c) => (
            <a
              key={c.title}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className={`p-6 rounded-xl border transition flex items-start gap-4 ${
                c.primary
                  ? "bg-gold/10 border-gold hover:bg-gold/15"
                  : "bg-card border-gold/15 hover:border-gold/40"
              }`}
            >
              <div className="w-12 h-12 rounded-lg bg-gold/15 flex items-center justify-center flex-shrink-0">
                <c.icon className="text-gold" size={22} />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-0.5">{c.title}</h3>
                <p className="text-xs text-muted-foreground mb-1">{c.desc}</p>
                <p className="text-gold text-sm font-medium">{c.value}</p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
