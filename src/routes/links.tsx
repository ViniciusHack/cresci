import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { pageHead } from "../lib/seo";
import { SITE_EMAIL, SITE_FULL_NAME, SOCIAL_REL } from "../lib/site";

// Página do adesivo NFC: fora do sitemap e sem índice.
type LinkItem = { label: string; handle: string; href: string; external: boolean; copy?: string };

const LINKS: LinkItem[] = [
  { label: "Instagram", handle: "@viniwhack", href: "https://www.instagram.com/viniwhack/", external: true },
  { label: "LinkedIn", handle: "in/viniciushack", href: "https://www.linkedin.com/in/viniciushack/", external: true },
  { label: "Site", handle: "viniciushack.com", href: "/", external: false },
  // O botão ao lado copia o número sem o +55.
  { label: "WhatsApp", handle: "(47) 99266-4694", href: "https://wa.me/5547992664694", external: true, copy: "47992664694" },
];

export const Route = createFileRoute("/links")({
  head: () =>
    pageHead({
      title: "Links · Vinícius Hack",
      description: "Instagram, LinkedIn e site de Vinícius Hack.",
      path: "/links",
      locale: "pt-BR",
      index: false,
    }),
  component: LinksPage,
});

const rowClass =
  "group flex items-center justify-between rounded-2xl border border-line bg-paper-2/50 px-5 py-4 transition-colors hover:border-ink hover:bg-ink hover:text-paper";

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // Navegador sem a API de área de transferência: seleciona num campo escondido e copia.
    const el = document.createElement("textarea");
    el.value = text;
    el.setAttribute("readonly", "");
    el.style.position = "fixed";
    el.style.opacity = "0";
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    el.remove();
  }
}

function useCopied() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = async (key: string, text: string) => {
    await copyText(text);
    setCopied(key);
    window.setTimeout(() => setCopied((c) => (c === key ? null : c)), 1600);
  };
  return { copied, copy };
}

function CopyIcon({ done }: { done: boolean }) {
  return done ? (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <rect x="9" y="9" width="11" height="11" rx="2.5" />
      <path d="M15 9V6.5A2.5 2.5 0 0 0 12.5 4h-6A2.5 2.5 0 0 0 4 6.5v6A2.5 2.5 0 0 0 6.5 15H9" />
    </svg>
  );
}

function LinksPage() {
  const { copied, copy } = useCopied();
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
            <li key={link.label} className="reveal flex gap-2" style={{ animationDelay: `${120 + i * 80}ms` }}>
              <a
                href={link.href}
                {...(link.external ? { target: "_blank", rel: SOCIAL_REL } : {})}
                className={`${rowClass} min-w-0 flex-1`}
              >
                <span className="flex flex-col">
                  <span className="text-[16px] font-medium">{link.label}</span>
                  <span className="text-[13px] text-muted group-hover:text-paper/70">{link.handle}</span>
                </span>
                <span aria-hidden className="text-[18px] transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
              {link.copy && (
                <button
                  type="button"
                  onClick={() => copy(link.label, link.copy!)}
                  aria-label={`Copiar o número do ${link.label}`}
                  className="flex w-14 shrink-0 flex-col items-center justify-center gap-1 rounded-2xl border border-line bg-paper-2/50 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                >
                  <CopyIcon done={copied === link.label} />
                  <span className="text-[10px]">{copied === link.label ? "copiado" : "copiar"}</span>
                </button>
              )}
            </li>
          ))}
          <li className="reveal" style={{ animationDelay: `${120 + LINKS.length * 80}ms` }}>
            <button
              type="button"
              onClick={() => copy("email", SITE_EMAIL)}
              aria-label="Copiar o email"
              className={`${rowClass} w-full text-left`}
            >
              <span className="flex flex-col">
                <span className="text-[16px] font-medium">Email</span>
                <span className="text-[13px] text-muted group-hover:text-paper/70">
                  {copied === "email" ? "copiado ✓" : SITE_EMAIL}
                </span>
              </span>
              <CopyIcon done={copied === "email"} />
            </button>
          </li>
        </ul>
      </div>
    </main>
  );
}
