import { Link, useLocation } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Phone, Instagram, Mail, MapPin, MessageCircle } from "lucide-react";
import logo from "@/assets/imperio-logo.jpeg";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

const NAV = [
  { to: "/", label: "Início" },
  { to: "/sobre", label: "Sobre" },
  { to: "/servicos", label: "Serviços" },
  { to: "/orcamento", label: "Orçamento" },
  { to: "/faq", label: "FAQ" },
  { to: "/contato", label: "Contato" },
] as const;

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Top contact bar */}
      <div className="hidden md:block bg-card border-b border-gold/15 text-xs">
        <div className="mx-auto max-w-7xl px-6 h-9 flex items-center justify-between text-muted-foreground">
          <div className="flex items-center gap-5">
            <a href="tel:+5519999742110" className="flex items-center gap-1.5 hover:text-gold transition">
              <Phone size={12} className="text-gold" /> (19) 99974-2110
            </a>
            <span className="flex items-center gap-1.5">
              <MapPin size={12} className="text-gold" /> Atendimento na região de Campinas - SP
            </span>
          </div>
          <a
            href="https://wa.me/5519999742110"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-gold hover:opacity-80 transition"
          >
            <MessageCircle size={12} /> WhatsApp direto
          </a>
        </div>
      </div>

      <header className="sticky top-0 z-40 bg-background/85 backdrop-blur-md border-b border-gold/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={logo}
              alt="Império Portas — logo"
              className="h-12 w-12 rounded-lg object-cover ring-1 ring-gold/40 group-hover:ring-gold transition"
            />
            <div className="flex flex-col leading-tight">
              <span className="font-display text-xl text-gold tracking-wide">IMPÉRIO</span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                Instalação de Portas
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((item) => {
              const active = pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    active
                      ? "text-gold"
                      : "text-foreground/80 hover:text-gold"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              to="/orcamento"
              className="ml-3 inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-gold text-primary-foreground font-semibold text-sm hover:opacity-90 transition shadow-gold"
            >
              Pedir Orçamento
            </Link>
          </nav>

          <button
            className="lg:hidden text-gold p-2"
            onClick={() => setOpen(!open)}
            aria-label="Abrir menu"
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {open && (
          <div className="lg:hidden border-t border-gold/20 bg-background">
            <div className="px-4 py-4 flex flex-col gap-1">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={`px-3 py-3 rounded-md text-base ${
                    pathname === item.to
                      ? "text-gold bg-gold/10"
                      : "text-foreground/90 hover:bg-gold/5"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-gold/20 bg-card mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="" className="h-10 w-10 rounded-md object-cover" />
              <span className="font-display text-lg text-gold tracking-wide">IMPÉRIO</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Instalação profissional de portas com acabamento impecável e atendimento dedicado.
            </p>
          </div>

          <div>
            <h4 className="text-gold text-sm uppercase tracking-widest mb-4">Navegação</h4>
            <ul className="space-y-2 text-sm">
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="text-muted-foreground hover:text-gold transition">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-gold text-sm uppercase tracking-widest mb-4">Contato</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-gold" />
                <a href="https://wa.me/5519999742110" className="hover:text-gold">
                  (19) 99974-2110
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-gold" />
                <span>contato@imperioportas.com.br</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={14} className="text-gold" />
                <span>Região de Campinas - SP</span>
              </li>
              <li className="flex items-center gap-2">
                <Instagram size={14} className="text-gold" />
                <a href="#" className="hover:text-gold">@imperioportas</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gold/10 py-6 text-center text-xs text-muted-foreground tracking-widest uppercase">
          © {new Date().getFullYear()} Império — Todos os direitos reservados
        </div>
      </footer>

      <WhatsAppFloat />
    </div>
  );
}
