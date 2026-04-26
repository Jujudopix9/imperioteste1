import { createFileRoute, Outlet, Link, useNavigate, useLocation } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { LayoutDashboard, Image as ImageIcon, LogOut, Home } from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
  head: () => ({
    meta: [{ title: "Painel — Império Portas" }, { name: "robots", content: "noindex" }],
  }),
});

function AdminLayout() {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) navigate({ to: "/login" });
  }, [user, isAdmin, loading, navigate]);

  if (loading || !user || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Carregando...
      </div>
    );
  }

  const items = [
    { to: "/admin", label: "Orçamentos", icon: LayoutDashboard },
    { to: "/admin/galeria", label: "Galeria", icon: ImageIcon },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      <aside className="md:w-64 border-b md:border-b-0 md:border-r border-gold/20 bg-card md:min-h-screen">
        <div className="p-6 border-b border-gold/15">
          <div className="font-display text-xl text-gold">IMPÉRIO</div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Painel</div>
        </div>
        <nav className="p-3 flex md:flex-col gap-1 overflow-x-auto">
          {items.map((it) => {
            const active = pathname === it.to;
            return (
              <Link
                key={it.to}
                to={it.to}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-md text-sm whitespace-nowrap transition ${
                  active ? "bg-gold/10 text-gold" : "text-foreground/80 hover:bg-gold/5 hover:text-gold"
                }`}
              >
                <it.icon size={16} /> {it.label}
              </Link>
            );
          })}
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-2.5 rounded-md text-sm text-foreground/60 hover:text-gold whitespace-nowrap"
          >
            <Home size={16} /> Ver site
          </Link>
          <button
            onClick={async () => { await signOut(); navigate({ to: "/login" }); }}
            className="flex items-center gap-3 px-4 py-2.5 rounded-md text-sm text-foreground/60 hover:text-destructive whitespace-nowrap"
          >
            <LogOut size={16} /> Sair
          </button>
        </nav>
      </aside>
      <main className="flex-1 p-6 md:p-10">
        <Outlet />
      </main>
    </div>
  );
}
