import { createFileRoute } from "@tanstack/react-router";

import { pageHead } from "../lib/seo";
import { SITE_FULL_NAME, SOCIAL_REL } from "../lib/site";

// Página do adesivo NFC: fora do sitemap e sem índice.
const LINKS = [
  { label: "Instagram", handle: "@viniwhack", href: "https://www.instagram.com/viniwhack/", external: true },
  { label: "LinkedIn", handle: "in/viniciushack", href: "https://www.linkedin.com/in/viniciushack/", external: true },
  { label: "Site", handle: "viniciushack.com", href: "/", external: false },
] as const;

export const Route = createFileRoute("/links")({
  head: () =>
    pageHead({
      title: "Links — Vinícius Hack",
      description: "Instagram, LinkedIn e site de Vinícius Hack.",
      path: "/links",
      locale: "pt-BR",
      index: false,
    }),
  component: LinksPage,
});

function LinksPage() {
  return (
    <main className="flex min-h-svh flex-col bg-paper px-5 text-ink">
      <div className="mx-auto flex w-full max-w-[26rem] flex-1 flex-col justify-center py-16">
        <div className="reveal flex flex-col items-center text-center">
          <img
            src="/vinicius.jpg"
            alt={SITE_FULL_NAME}
            width={112}
            height={112}
            className="h-28 w-28 rounded-full object-cover"
          />
          <h1 className="mt-6 font-display text-[2.6rem] leading-[0.95] tracking-[-0.02em]">Vinícius Hack</h1>
          <p className="mt-3 font-mono text-[11px] tracking-[0.18em] text-gold uppercase">
            Engenheiro de software e produto
          </p>
        </div>

        <ul className="mt-12 flex flex-col gap-3">
          {LINKS.map((link, i) => (
            <li key={link.label} className="reveal" style={{ animationDelay: `${120 + i * 80}ms` }}>
              <a
                href={link.href}
                {...(link.external ? { target: "_blank", rel: SOCIAL_REL } : {})}
                className="group flex items-center justify-between rounded-2xl border border-line bg-paper-2/50 px-5 py-4 transition-colors hover:border-ink hover:bg-ink hover:text-paper"
              >
                <span className="flex flex-col">
                  <span className="text-[16px] font-medium">{link.label}</span>
                  <span className="text-[13px] text-muted group-hover:text-paper/70">{link.handle}</span>
                </span>
                <span aria-hidden className="text-[18px] transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
