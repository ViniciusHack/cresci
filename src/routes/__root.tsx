import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
  useRouter,
  useRouterState,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import { I18nProvider, useI18n } from "../lib/i18n";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { localeFromLocation } from "../lib/locale";
import appCss from "../styles.css?url";

const favicon =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect fill='%2314110e' width='32' height='32'/%3E%3Ctext x='5' y='22' fill='%23f6f1e8' font-size='13' font-family='Georgia,serif' font-weight='600'%3EVH%3C/text%3E%3C/svg%3E";

function NotFoundComponent() {
  const { copy } = useI18n();
  return (
    <div className="flex min-h-svh flex-col bg-paper px-5 text-ink">
      <div className="mx-auto flex w-full max-w-[40rem] flex-1 flex-col justify-center py-24">
        <p className="font-mono text-[11px] tracking-[0.18em] text-gold uppercase">404</p>
        <h1 className="mt-5 font-display text-[clamp(2.8rem,8vw,5rem)] leading-[0.92] tracking-[-0.03em]">
          {copy.notFound.title}
        </h1>
        <p className="mt-5 text-[1.05rem] leading-relaxed text-ink-soft">{copy.notFound.body}</p>
        <Link to="/" className="mt-10 inline-flex items-center gap-2 text-[15px] text-ink hover:text-gold">
          <span aria-hidden>→</span>
          {copy.notFound.back}
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  const { copy } = useI18n();

  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-svh flex-col bg-paper px-5 text-ink">
      <div className="mx-auto flex w-full max-w-[40rem] flex-1 flex-col justify-center py-24">
        <h1 className="font-display text-[clamp(2.4rem,6vw,4rem)] leading-[0.95] tracking-[-0.03em]">
          {copy.error.title}
        </h1>
        <p className="mt-5 text-[1.05rem] leading-relaxed text-ink-soft">{copy.error.body}</p>
        <div className="mt-10 flex flex-wrap gap-6">
          <button
            type="button"
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="text-[15px] text-ink hover:text-gold"
          >
            {copy.error.retry}
          </button>
          <a href="/" className="text-[15px] text-ink-soft hover:text-ink">
            {copy.error.back}
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: "Vinícius Hack" },
      { name: "author", content: "Vinícius Hack" },
      { name: "theme-color", content: "#f8fafc" },
    ],
    links: [
      { rel: "icon", href: favicon },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "me", href: "https://github.com/ViniciusHack" },
      { rel: "me", href: "https://www.linkedin.com/in/viniciushack" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&family=Inter:ital,wght@0,400;0,500;0,600;1,400&family=Space+Grotesk:wght@500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const locale = useRouterState({
    select: (state) => localeFromLocation(state.location.pathname, state.location.search),
  });

  return (
    <html lang={locale}>
      <head>
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html:
              '(function(){try{var p=location.pathname;if(p!=="/"&&p!=="")return;var d=localStorage.getItem("studio-theme")==="dark";document.documentElement.dataset.theme=d?"dark":"light";document.documentElement.style.colorScheme=d?"dark":"light"}catch(e){}})();',
          }}
        />
      </head>
      <body>
        <I18nProvider>{children}</I18nProvider>
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
