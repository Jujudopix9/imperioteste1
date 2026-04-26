import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/hooks/useAuth";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Império Portas | Instalação Profissional de Portas" },
      {
        name: "description",
        content:
          "Império Portas — instalação profissional de portas pivotantes, de correr e esquadrias de alumínio. Orçamento rápido pelo WhatsApp.",
      },
      { name: "author", content: "Império Portas" },
      { property: "og:title", content: "Império Portas | Instalação Profissional de Portas" },
      {
        property: "og:description",
        content: "Instalação de portas com acabamento impecável. Solicite seu orçamento.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Império Portas | Instalação Profissional de Portas" },
      { name: "description", content: "Sogro's Site Solutions creates professional websites for businesses, featuring distinct pages for services, contact, and more." },
      { property: "og:description", content: "Sogro's Site Solutions creates professional websites for businesses, featuring distinct pages for services, contact, and more." },
      { name: "twitter:description", content: "Sogro's Site Solutions creates professional websites for businesses, featuring distinct pages for services, contact, and more." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/bbcb5313-375e-445f-960d-561fdb6425c3/id-preview-bfc09302--82e7b77d-930b-41bc-a548-d7e577344ef9.lovable.app-1777172914470.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/bbcb5313-375e-445f-960d-561fdb6425c3/id-preview-bfc09302--82e7b77d-930b-41bc-a548-d7e577344ef9.lovable.app-1777172914470.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
