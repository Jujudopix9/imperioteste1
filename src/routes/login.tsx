import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Lock, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({
    meta: [{ title: "Login — Império Portas" }, { name: "robots", content: "noindex" }],
  }),
});

function LoginPage() {
  const { signIn, user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user && isAdmin) navigate({ to: "/admin" });
  }, [user, isAdmin, loading, navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setErr(null);
    const { error } = await signIn(email, password);
    setSubmitting(false);
    if (error) setErr(error);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-dark px-4">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold mb-6">
          <ArrowLeft size={14} /> Voltar ao site
        </Link>
        <form
          onSubmit={onSubmit}
          className="bg-card border border-gold/20 rounded-2xl p-8 shadow-gold"
        >
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gold/10 mx-auto mb-5">
            <Lock className="text-gold" size={22} />
          </div>
          <h1 className="text-2xl font-display text-center mb-2">Acesso Restrito</h1>
          <p className="text-sm text-muted-foreground text-center mb-7">
            Painel administrativo Império Portas
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-gold mb-2">E-mail</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-md bg-input border border-border text-foreground outline-none focus:border-gold"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-gold mb-2">Senha</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-md bg-input border border-border text-foreground outline-none focus:border-gold"
              />
            </div>
            {err && (
              <p className="text-destructive text-sm bg-destructive/10 border border-destructive/30 rounded-md px-3 py-2">
                {err}
              </p>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-md bg-gold text-primary-foreground font-semibold hover:opacity-90 transition disabled:opacity-50"
            >
              {submitting ? "Entrando..." : "Entrar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
