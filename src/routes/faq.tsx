import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export const Route = createFileRoute("/faq")({
  component: FaqPage,
  head: () => ({
    meta: [
      { title: "FAQ — Império Portas" },
      {
        name: "description",
        content: "Perguntas frequentes sobre instalação de portas e nossos serviços.",
      },
    ],
  }),
});

const FAQS = [
  {
    q: "Quais regiões vocês atendem?",
    a: "Atendemos toda a região de Campinas e cidades próximas. Para regiões mais distantes, consulte-nos.",
  },
  {
    q: "Como funciona o orçamento?",
    a: "Você envia os dados pelo formulário ou WhatsApp. Avaliamos e respondemos com o valor estimado. Em alguns casos, é necessária visita técnica.",
  },
  {
    q: "Vocês fornecem a porta ou apenas instalam?",
    a: "Trabalhamos das duas formas. Podemos indicar fornecedores parceiros ou instalar a porta que você já adquiriu.",
  },
  {
    q: "Qual o prazo de instalação?",
    a: "Depende do tipo e complexidade. A maioria das instalações é concluída em 1 dia. Combinamos prazo na confirmação do orçamento.",
  },
  {
    q: "Existe garantia do serviço?",
    a: "Sim. Todos os nossos serviços possuem garantia de mão de obra. Detalhamos as condições no momento do orçamento.",
  },
  {
    q: "Como faço o pagamento?",
    a: "Aceitamos PIX, dinheiro e cartão. As condições são combinadas conforme o valor do projeto.",
  },
];

function FaqPage() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <SiteLayout>
      <section className="bg-gradient-dark py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-4">Dúvidas</p>
          <h1 className="text-4xl md:text-5xl font-display mb-4">
            Perguntas <span className="gold-gradient-text">Frequentes</span>
          </h1>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-3">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className="bg-card border border-gold/20 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between text-left px-6 py-5 hover:bg-gold/5 transition"
                >
                  <span className="font-medium text-foreground pr-4">{item.q}</span>
                  <ChevronDown
                    className={`text-gold flex-shrink-0 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    size={20}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 text-muted-foreground leading-relaxed">{item.a}</div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mx-auto max-w-3xl mt-12 text-center">
          <p className="text-muted-foreground mb-4">Não encontrou sua resposta?</p>
          <Link
            to="/contato"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-gold/40 text-gold hover:bg-gold/10 transition"
          >
            Fale com a gente
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
