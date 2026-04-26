import { MessageCircle } from "lucide-react";

const PHONE = "5519999742110";
const MSG = encodeURIComponent("Olá! Vim pelo site e gostaria de um orçamento.");

export function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${PHONE}?text=${MSG}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-50 group flex items-center gap-2"
    >
      <span className="hidden sm:inline-block bg-card text-foreground text-sm px-3 py-2 rounded-full border border-gold/30 shadow-gold opacity-0 group-hover:opacity-100 transition">
        Fale conosco
      </span>
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-gold hover:scale-110 transition">
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
        <MessageCircle size={26} fill="white" strokeWidth={0} />
      </span>
    </a>
  );
}
