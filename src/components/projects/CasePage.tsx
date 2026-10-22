import type { ReactNode } from "react";

import { useReveal } from "../../hooks/reveal";
import { caseStudies, type CaseShot, type CaseStudy } from "../../lib/projects";
import { CALENDLY_URL } from "../../lib/site";

// Página de estudo de caso: problema → o que faz (prints + bento) → como foi feito.
// Os blocos do bento são pedaços do app desenhados pequenos, com dados genéricos.

export function CasePage({ study }: { study: CaseStudy }) {
  const index = caseStudies.findIndex((item) => item.slug === study.slug);
  const other = caseStudies[(index + 1) % caseStudies.length];
  // Com vídeo, ele abre a página e todos os prints vão para a seção de baixo.
  const hero = study.video ? undefined : study.shots[0];
  const below = study.video ? study.shots : study.shots.slice(1);
  // Prints de iPhone vão juntos, lado a lado, depois dos outros.
  const rest = below.filter((shot) => shot.frame !== "phone");
  const phones = below.filter((shot) => shot.frame === "phone");

  return (
    <div className="studio-shell min-h-svh font-sans">
      <header className="sticky top-0 z-40 border-b border-[var(--s-line)] bg-[var(--s-header)] pt-[env(safe-area-inset-top)] backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-2 sm:px-5 sm:py-3">
          <a
            href="/#portfolio"
            className="inline-flex min-h-11 items-center gap-1.5 text-sm text-[var(--s-muted)] transition-colors hover:text-[var(--s-fg)] sm:min-h-0"
          >
            <span aria-hidden>←</span> Portfólio
          </a>
          <p className="ml-auto text-sm font-semibold tracking-tight">
            <a href="/" className="transition-colors hover:text-[var(--s-accent)]">
              Vinícius Hack
            </a>
          </p>
          <a
            href="/#contato"
            className="inline-flex min-h-11 items-center rounded-md bg-[var(--s-btn)] px-3 text-sm text-[var(--s-btn-fg)] sm:min-h-0 sm:py-1.5"
          >
            Contato
          </a>
        </div>
      </header>

      <main id="conteudo">
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 right-[6%] size-[26rem] rounded-full bg-[var(--s-accent)]/12 blur-3xl"
          />
          <div className="relative mx-auto max-w-5xl px-5 pb-12 pt-10 md:pb-16 md:pt-20">
            <p className="text-sm font-medium text-[var(--s-accent)]">{study.kicker}</p>
            <h1 className="mt-3 text-[clamp(2.6rem,7vw,4.6rem)] font-semibold leading-[1.02] tracking-tight">
              {study.name}
            </h1>
            <p className="mt-3 max-w-2xl text-[clamp(1.25rem,2.6vw,1.6rem)] font-medium leading-snug tracking-tight">
              {study.headline}
            </p>
            <p className="mt-4 max-w-2xl text-[1.05rem] leading-relaxed text-[var(--s-muted)]">{study.lead}</p>
            {study.site ? (
              <a
                href={study.site.href}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex min-h-11 items-center gap-1.5 rounded-md border border-[var(--s-line)] px-4 text-sm font-medium transition-colors hover:border-[var(--s-accent)] hover:text-[var(--s-accent)]"
              >
                {study.site.label} <span aria-hidden>↗</span>
              </a>
            ) : null}
            {study.video ? (
              <div className="mt-8 overflow-hidden rounded-2xl shadow-xl ring-1 ring-[var(--s-line)] md:mt-10">
                <video
                  src={study.video.src}
                  poster={study.video.poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label={`${study.name} em movimento`}
                  className="aspect-[16/10] h-auto w-full motion-reduce:hidden"
                />
                <img
                  src={study.video.poster}
                  alt={`${study.name}: tela principal`}
                  width={1600}
                  height={1000}
                  className="hidden h-auto w-full motion-reduce:block"
                />
              </div>
            ) : hero ? (
              <div className="mt-8 md:mt-10">
                <Shot shot={hero} priority />
              </div>
            ) : null}
            <dl className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
              {study.facts.map((fact) => (
                <div key={fact.label} className="rounded-xl border border-[var(--s-line)] bg-[var(--s-bg-2)] px-4 py-3">
                  <dt className="sr-only">{fact.label}</dt>
                  <dd>
                    <span className="block text-2xl font-semibold tracking-tight tabular-nums md:text-3xl">{fact.value}</span>
                    <span className="mt-0.5 block text-xs leading-snug text-[var(--s-muted)]">{fact.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="border-y border-[var(--s-line)] bg-[var(--s-bg-2)] py-12 md:py-16">
          <Reveal className="mx-auto grid max-w-5xl gap-4 px-5 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-8">
            <p className="text-sm font-medium text-[var(--s-accent)]">{study.problem.title}</p>
            <div>
              <p className="max-w-3xl text-[clamp(1.15rem,2.2vw,1.45rem)] leading-snug tracking-tight">{study.problem.body}</p>
              {study.problem.points?.length ? (
                <ul className="mt-6 grid max-w-3xl gap-3 sm:grid-cols-2">
                  {study.problem.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-2.5 rounded-xl border border-[var(--s-line)] bg-[var(--s-bg)] px-4 py-3 text-sm leading-relaxed text-[var(--s-muted)]"
                    >
                      <span aria-hidden className="mt-[0.45rem] size-1.5 shrink-0 rounded-full bg-[var(--s-accent)]" />
                      {point}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </Reveal>
        </section>

        {study.delivers ? (
          <section className="py-14 md:py-20">
            <div className="mx-auto max-w-5xl px-5">
              <Reveal>
                <p className="text-sm font-medium text-[var(--s-accent)]">Entrega</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight">{study.delivers.title}</h2>
                <p className="mt-3 max-w-xl text-[var(--s-muted)]">{study.delivers.lead}</p>
              </Reveal>
              <div className="mt-10 grid gap-4 md:grid-cols-3">
                {study.delivers.parts.map((part, partIndex) => (
                  <Reveal key={part.title} className="h-full">
                    <article className="flex h-full flex-col rounded-2xl border border-[var(--s-line)] bg-[var(--s-bg-2)] p-5">
                      <p className="font-mono text-[11px] text-[var(--s-soft)]">
                        {String(partIndex + 1).padStart(2, "0")} · {part.label}
                      </p>
                      <h3 className="mt-2 text-xl font-semibold tracking-tight">{part.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-[var(--s-muted)]">{part.body}</p>
                      <ul className="mt-4 grid gap-2 border-t border-[var(--s-line)] pt-4">
                        {part.items.map((item) => (
                          <li key={item} className="flex gap-2 text-sm leading-snug">
                            <span aria-hidden className="text-[var(--s-accent)]">
                              ✓
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {rest.length || phones.length ? (
          <section className="py-14 md:py-20">
            <div className="mx-auto max-w-5xl space-y-12 px-5 md:space-y-16">
              {rest.map((shot) => (
                <Shot key={shot.src} shot={shot} priority={false} />
              ))}
              {phones.length ? (
                <div className="grid gap-10 sm:grid-cols-2">
                  {phones.map((shot) => (
                    <Shot key={shot.src} shot={shot} priority={false} />
                  ))}
                </div>
              ) : null}
            </div>
          </section>
        ) : null}

        {study.process ? (
          <section className="border-t border-[var(--s-line)] py-14 md:py-20">
            <div className="mx-auto max-w-5xl px-5">
              <Reveal>
                <p className="text-sm font-medium text-[var(--s-accent)]">Processo</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight">{study.process.title}</h2>
                <p className="mt-3 max-w-xl text-[var(--s-muted)]">{study.process.lead}</p>
              </Reveal>
              <ol className="mt-10 grid gap-3">
                {study.process.steps.map((step, stepIndex) => (
                  <li key={step.step}>
                    <Reveal className="grid gap-3 rounded-2xl border border-[var(--s-line)] bg-[var(--s-bg-2)] p-4 md:grid-cols-[12rem_minmax(0,1fr)_auto_minmax(0,1fr)] md:items-center md:gap-5 md:px-5">
                      <p className="flex items-baseline gap-2 font-semibold tracking-tight">
                        <span className="font-mono text-[11px] font-normal text-[var(--s-soft)]">
                          {String(stepIndex + 1).padStart(2, "0")}
                        </span>
                        {step.step}
                      </p>
                      <p className="text-sm leading-relaxed text-[var(--s-muted)]">
                        <span className="mb-0.5 block text-[11px] font-medium text-[var(--s-soft)] md:hidden">{study.process?.labels?.[0] ?? "Antes"}</span>
                        {step.before}
                      </p>
                      <span aria-hidden className="hidden text-[var(--s-accent)] md:block">
                        →
                      </span>
                      <p className="text-sm leading-relaxed">
                        <span className="mb-0.5 block text-[11px] font-medium text-[var(--s-accent)] md:hidden">{study.process?.labels?.[1] ?? "Depois"}</span>
                        {step.after}
                      </p>
                    </Reveal>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        ) : null}

        <section className="border-t border-[var(--s-line)] bg-[var(--s-bg-2)] py-14 md:py-20">
          <div className="mx-auto max-w-5xl px-5">
            <Reveal>
              <p className="text-sm font-medium text-[var(--s-accent)]">Funcionalidades</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">{study.featuresTitle}</h2>
              <p className="mt-3 max-w-xl text-[var(--s-muted)]">{study.featuresLead}</p>
            </Reveal>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {study.features.map((feature) => (
                <article
                  key={feature.id}
                  className={`flex flex-col rounded-2xl border border-[var(--s-line)] bg-[var(--s-bg)] p-5 transition-shadow hover:shadow-md ${
                    feature.size === "wide" ? "lg:col-span-2" : feature.size === "tall" ? "lg:row-span-2" : ""
                  }`}
                >
                  <div
                    aria-hidden
                    className={`flex items-center justify-center rounded-xl bg-[var(--s-chip)] p-4 ${
                      feature.size === "tall" ? "min-h-[12rem] lg:flex-1" : "min-h-[11rem]"
                    }`}
                  >
                    {visuals[feature.id] ?? null}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold tracking-tight">{feature.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--s-muted)]">{feature.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20">
          <div className="mx-auto max-w-5xl px-5">
            <Reveal>
              <p className="text-sm font-medium text-[var(--s-accent)]">Como foi feito</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">Decisões técnicas.</h2>
            </Reveal>
            <ol className="mt-10 grid gap-x-8 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
              {study.decisions.map((decision, index) => (
                <li key={decision.title} className="border-t border-[var(--s-line)] pt-4">
                  <p className="font-mono text-[11px] text-[var(--s-soft)]">{String(index + 1).padStart(2, "0")}</p>
                  <h3 className="mt-1 text-base font-semibold tracking-tight">{decision.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--s-muted)]">{decision.body}</p>
                </li>
              ))}
            </ol>
            <ul className="mt-12 flex flex-wrap gap-1.5">
              {study.stack.map((item) => (
                <li key={item} className="rounded bg-[var(--s-chip)] px-2 py-0.5 font-mono text-[11px] text-[var(--s-muted)]">
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-[var(--s-soft)]">{study.note}</p>
          </div>
        </section>

        <section className="px-5 pb-16 md:pb-20">
          <div className="mx-auto flex max-w-5xl flex-col gap-6 rounded-2xl border border-[var(--s-line)] bg-[var(--s-bg-2)] px-5 py-8 md:flex-row md:items-center md:justify-between md:px-10">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Quer algo parecido no seu negócio?</h2>
              <p className="mt-2 max-w-md text-sm text-[var(--s-muted)]">
                Me conta o problema e a gente vê juntos o que dá para fazer.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center justify-center rounded-md bg-[var(--s-btn)] px-4 text-sm font-medium text-[var(--s-btn-fg)]"
              >
                Marcar 30 min
              </a>
              {other ? (
                <a
                  href={other.path}
                  className="inline-flex min-h-11 items-center justify-center gap-1 rounded-md border border-[var(--s-line)] px-4 text-sm font-medium"
                >
                  Próximo: {other.name} <span aria-hidden>→</span>
                </a>
              ) : null}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--s-line)] px-5 py-6">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 text-center text-xs text-[var(--s-soft)] sm:flex-row sm:justify-between sm:text-left">
          <p>© 2026 Vinícius Hack</p>
          <a href="/#portfolio" className="hover:text-[var(--s-fg)]">
            Voltar ao portfólio
          </a>
        </div>
      </footer>
    </div>
  );
}

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const { ref, visible } = useReveal<HTMLDivElement>(0.1);
  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function Shot({ shot, priority }: { shot: CaseShot; priority: boolean }) {
  const card = shot.frame === "card";
  const Wrap = priority ? "div" : Reveal;
  if (shot.frame === "phone") {
    return (
      <Wrap>
        <figure className="mx-auto max-w-[17rem]">
          <img
            src={shot.src}
            alt={shot.alt}
            width={shot.width}
            height={shot.height}
            loading="lazy"
            decoding="async"
            className="h-auto w-full rounded-[2.2rem] shadow-xl ring-1 ring-[var(--s-line)]"
          />
          <figcaption className="mt-3 text-sm leading-relaxed text-[var(--s-muted)]">{shot.caption}</figcaption>
        </figure>
      </Wrap>
    );
  }
  return (
    <Wrap>
      <figure className={card ? "mx-auto max-w-3xl" : ""}>
        <div
          className={
            card || shot.frame === "page"
              ? "overflow-hidden rounded-2xl shadow-xl ring-1 ring-[var(--s-line)]"
              : "rounded-[14px] bg-gradient-to-b from-[var(--s-chip)] to-transparent p-2 sm:p-4"
          }
        >
          <img
            src={shot.src}
            alt={shot.alt}
            width={shot.width}
            height={shot.height}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : undefined}
            decoding="async"
            className={shot.frame ? "h-auto w-full" : "h-auto w-full drop-shadow-xl"}
          />
        </div>
        <figcaption className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--s-muted)]">{shot.caption}</figcaption>
      </figure>
    </Wrap>
  );
}

/* ---------- Pedaços do app, desenhados pequenos ---------- */

const box = "w-full max-w-[17rem] rounded-xl border border-[var(--s-line)] bg-[var(--s-bg-2)] p-3 shadow-sm";
const tiny = "text-[11px] leading-tight";
const soft = "text-[var(--s-muted)]";

function Pill({ children, tone = "accent" }: { children: ReactNode; tone?: "accent" | "good" | "warn" | "bad" | "plain" }) {
  const tones = {
    accent: "bg-[var(--s-accent)]/12 text-[var(--s-accent)]",
    good: "bg-emerald-500/15 text-emerald-600",
    warn: "bg-amber-500/18 text-amber-600",
    bad: "bg-rose-500/15 text-rose-500",
    plain: "bg-[var(--s-chip)] text-[var(--s-muted)]",
  } as const;
  return (
    <span className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-[10.5px] font-semibold ${tones[tone]}`}>
      {children}
    </span>
  );
}

function Bar({ value, tone = "accent" }: { value: number; tone?: "accent" | "good" | "warn" | "bad" }) {
  const color = { accent: "bg-[var(--s-accent)]", good: "bg-emerald-500", warn: "bg-amber-500", bad: "bg-rose-500" }[tone];
  return (
    <span className="block h-1.5 w-full overflow-hidden rounded-full bg-[var(--s-chip)]">
      <span className={`block h-full rounded-full ${color}`} style={{ width: `${Math.min(100, value)}%` }} />
    </span>
  );
}

function Check({ done = true }: { done?: boolean }) {
  return (
    <span
      className={`grid size-4 shrink-0 place-items-center rounded-full text-[9px] font-bold ${
        done ? "bg-emerald-500 text-white" : "border border-[var(--s-soft)]"
      }`}
    >
      {done ? "✓" : ""}
    </span>
  );
}

function Row({ left, right }: { left: ReactNode; right: ReactNode }) {
  return (
    <div className={`flex items-center justify-between gap-3 ${tiny}`}>
      <span className="min-w-0 truncate">{left}</span>
      <span className="shrink-0">{right}</span>
    </div>
  );
}

const lumeBox = "rounded-xl bg-[#1E1203] p-3 text-[#FBEFD6] shadow-md ring-1 ring-black/10";

const visuals: Record<string, ReactNode> = {
  // Ritmo
  auto: (
    <div className="grid w-full max-w-md gap-2">
      {[
        ["Cursor · ~/projetos/loja", "Trabalho", "accent"],
        ["youtube.com · 14 min", "Rolar feed", "bad"],
        ["Kindle · Hábitos Atômicos", "Leitura", "warn"],
        ["📍 Academia · pelo iPhone", "Treino", "good"],
      ].map(([source, area, tone]) => (
        <div key={source} className="flex items-center gap-2 rounded-lg bg-[var(--s-bg-2)] px-3 py-2 shadow-sm">
          <span className={`min-w-0 flex-1 truncate ${tiny}`}>{source}</span>
          <span className={`${tiny} ${soft}`}>→</span>
          <Pill tone={tone as "accent"}>{area}</Pill>
        </div>
      ))}
    </div>
  ),
  coach: (
    <div className={box}>
      <p className="text-[10px] font-semibold text-[var(--s-accent)]">Seu coach · 16:40</p>
      <p className="mt-1 font-display text-[20px] leading-tight">1h20 hoje no side project.</p>
      <div className="mt-2">
        <Bar value={100} tone="warn" />
      </div>
      <p className={`mt-2 ${tiny} ${soft}`}>O que importa agora</p>
      <p className="text-[12px] font-semibold">Enviar a proposta comercial</p>
      <span className="mt-2 inline-flex rounded-full bg-[var(--s-accent)] px-2.5 py-1 text-[10.5px] font-semibold text-white">
        Ir para a prioridade
      </span>
    </div>
  ),
  habits: (
    <div className={`${box} grid gap-2.5`}>
      <Row left={<span className="flex items-center gap-2"><Check />📖 Leitura 20 min</span>} right={<span className={soft}>Kindle 24 min</span>} />
      <Row left={<span className="flex items-center gap-2"><Check />🏋️ Treino</span>} right={<span className={soft}>chegou 18:32</span>} />
      <Row left={<span className="flex items-center gap-2"><Check done={false} />🎥 YouTube ≤ 30 min</span>} right={<span className={soft}>12 min</span>} />
    </div>
  ),
  limits: (
    <div className={`${box} grid gap-2`}>
      <Row left={<b>Instagram · 30 min/dia</b>} right={<Pill tone="bad">passou</Pill>} />
      <Bar value={100} tone="bad" />
      <div className={`rounded-lg bg-[var(--s-chip)] px-2 py-1.5 ${tiny}`}>
        <span className={soft}>Liberar</span> <b>5 min</b> <span className={soft}>· por quê?</span>
        <span className="mt-0.5 block">responder um cliente</span>
      </div>
      <p className={`${tiny} ${soft}`}>Mac + iPhone · 3 tentativas no foco</p>
    </div>
  ),
  quick: (
    <div className="grid w-full max-w-[17rem] gap-2">
      <div className={`rounded-lg border border-[var(--s-line)] bg-[var(--s-bg-2)] px-3 py-2 font-mono ${tiny}`}>
        Ligar pro contador amanhã 15:30 #trabalho ! ~20m
      </div>
      <div className="flex flex-wrap gap-1.5">
        <Pill>amanhã 15:30</Pill>
        <Pill tone="plain">Trabalho</Pill>
        <Pill tone="bad">urgente</Pill>
        <Pill tone="plain">~20 min</Pill>
        <Pill tone="good">📞 contador</Pill>
      </div>
    </div>
  ),
  cards: (
    <div className="relative w-full max-w-[13rem] py-4">
      <div className="absolute inset-x-6 top-1 h-full rotate-[-5deg] rounded-2xl bg-[var(--s-accent)]/25" />
      <div className="relative rounded-2xl border border-[var(--s-line)] bg-[var(--s-bg-2)] p-4 shadow-lg">
        <p className="text-[10px] font-semibold text-[var(--s-accent)]">Carta de hoje</p>
        <p className="mt-2 font-display text-[18px] leading-snug">“Comece pelo que dá para terminar hoje.”</p>
        <div className="my-3 h-px bg-[var(--s-line)]" />
        <p className={`${tiny} ${soft}`}>Missão do dia</p>
        <p className="text-[12px] font-semibold">10 min de caminhada sem celular</p>
        <div className="mt-3 flex items-center justify-between">
          <Pill tone="warn">+20 XP</Pill>
          <span className="rounded-full bg-[var(--s-accent)] px-2.5 py-1 text-[10.5px] font-semibold text-white">Feita</span>
        </div>
      </div>
    </div>
  ),
  examen: (
    <div className="grid w-full max-w-[17rem] justify-items-center gap-2">
      <p className="text-[12px] font-semibold">O que foi bom hoje?</p>
      <span className="grid size-12 place-items-center rounded-full bg-[var(--s-accent)] text-white shadow-md">
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <rect x="9" y="3" width="6" height="11" rx="3" />
          <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
        </svg>
      </span>
      <span className={`rounded-2xl rounded-tl-md bg-[var(--s-bg-2)] px-3 py-1.5 shadow-sm ${tiny}`}>
        Fechei a proposta antes do almoço.
      </span>
    </div>
  ),
  wake: (
    <div className={`${box} text-center`}>
      <p className="font-display text-5xl tabular-nums tracking-tight">06:30</p>
      <p className={`mt-1 ${tiny} ${soft}`}>Parou deitado · toca de novo em 2 min</p>
      <div className="mt-3 flex items-center gap-2">
        <Bar value={100} tone="good" />
        <span className={`${tiny} whitespace-nowrap font-semibold`}>32 passos ✓</span>
      </div>
    </div>
  ),
  meals: (
    <div className={`${box} grid gap-2`}>
      <div className="flex items-center gap-2">
        <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-amber-200/60 text-xl">🍛</span>
        <span className={tiny}>
          Arroz 120 g · Feijão 90 g
          <br />
          Frango grelhado 140 g
        </span>
      </div>
      <Row left="Proteína do dia" right={<b>96 / 140 g</b>} />
      <Bar value={69} />
      <p className={`${tiny} ${soft}`}>Almoço · 620 kcal</p>
    </div>
  ),

  // Finance Hub
  aggregate: (
    <div className="grid w-full max-w-md gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
      <div className="grid gap-1.5 rounded-xl bg-[var(--s-bg-2)] p-3 shadow-sm">
        {[
          ["Conta corrente", "R$ 8.420"],
          ["Fatura do cartão", "− R$ 3.180"],
          ["Renda fixa", "R$ 142.300"],
          ["Ações e FIIs", "R$ 96.750"],
          ["Exterior", "R$ 88.900"],
          ["Cripto", "R$ 22.100"],
        ].map(([label, value]) => (
          <Row key={label} left={label} right={<span className="tabular-nums">{value}</span>} />
        ))}
      </div>
      <div className="rounded-xl bg-[var(--s-bg-2)] p-3 shadow-sm">
        <p className={`${tiny} ${soft}`}>Patrimônio</p>
        <p className="text-xl font-semibold tabular-nums tracking-tight">R$ 355.290</p>
        <svg viewBox="0 0 120 36" className="mt-1 h-9 w-32 text-[var(--s-accent)]" fill="none">
          <path d="M0 30 L15 27 L30 28 L45 22 L60 20 L75 16 L90 14 L105 9 L120 5" stroke="currentColor" strokeWidth="2" />
          <path d="M0 30 L15 27 L30 28 L45 22 L60 20 L75 16 L90 14 L105 9 L120 5 V36 H0 Z" fill="currentColor" opacity="0.12" />
        </svg>
        <p className="text-[10.5px] font-semibold text-emerald-600">+ 2,4% no mês</p>
      </div>
    </div>
  ),
  forecast: (
    <div className={`${box} grid gap-2`}>
      <Row left={<span className={soft}>Recebido</span>} right={<b className="tabular-nums">R$ 12.000</b>} />
      <Row left={<span className={soft}>Gasto até hoje</span>} right={<b className="tabular-nums">R$ 4.870</b>} />
      <Row left={<span className={soft}>Ainda vence</span>} right={<b className="tabular-nums">R$ 2.900</b>} />
      <div className="h-px bg-[var(--s-line)]" />
      <Row left={<b>Sobra prevista</b>} right={<Pill tone="good">R$ 4.230</Pill>} />
    </div>
  ),
  split: (
    <div className="grid w-full max-w-[17rem] gap-2">
      <div className={`flex items-center justify-between rounded-lg bg-[var(--s-bg-2)] px-3 py-2 shadow-sm ${tiny}`}>
        <span>🍝 Jantar · cartão</span>
        <b className="tabular-nums">R$ 240,00</b>
      </div>
      <div className="flex justify-center">
        <Pill tone="good">↕ metade, no centavo</Pill>
      </div>
      <div className={`flex items-center justify-between rounded-lg bg-[var(--s-bg-2)] px-3 py-2 shadow-sm ${tiny}`}>
        <span>Pix recebido · Ana</span>
        <b className="tabular-nums text-emerald-600">+ R$ 120,00</b>
      </div>
      <p className={`text-center ${tiny} ${soft}`}>Restaurantes: R$ 120 (Ana devolveu R$ 120)</p>
    </div>
  ),
  bands: (
    <div className={`${box} grid gap-2.5`}>
      {[
        ["Renda fixa", 38, 30, 45],
        ["Ações BR", 22, 15, 25],
        ["Exterior", 21, 25, 35],
        ["Cripto", 6, 5, 8],
      ].map(([label, now, min, max]) => {
        const inside = (now as number) >= (min as number) && (now as number) <= (max as number);
        return (
          <div key={label as string}>
            <Row
              left={label as string}
              right={
                <span className={inside ? soft : "font-semibold text-amber-600"}>
                  {now}% · {min}–{max}%
                </span>
              }
            />
            <span className="relative mt-1 block h-1.5 rounded-full bg-[var(--s-chip)]">
              <span
                className="absolute inset-y-0 rounded-full bg-[var(--s-accent)]/25"
                style={{ left: `${(min as number) * 2}%`, width: `${((max as number) - (min as number)) * 2}%` }}
              />
              <span
                className={`absolute -top-0.5 size-2.5 rounded-full ${inside ? "bg-[var(--s-accent)]" : "bg-amber-500"}`}
                style={{ left: `calc(${(now as number) * 2}% - 5px)` }}
              />
            </span>
          </div>
        );
      })}
    </div>
  ),
  contribution: (
    <div className={`${box} grid gap-2`}>
      <Row left={<span className={soft}>Aporte de outubro</span>} right={<b className="tabular-nums">R$ 5.000</b>} />
      {[
        ["Exterior · ETF global", 40, "R$ 2.000"],
        ["Tesouro IPCA+", 30, "R$ 1.500"],
        ["Ações BR · ETF", 20, "R$ 1.000"],
        ["Cripto · Bitcoin", 10, "R$ 500"],
      ].map(([label, pct, value]) => (
        <div key={label as string}>
          <Row left={label} right={<span className="tabular-nums">{value}</span>} />
          <div className="mt-1">
            <Bar value={(pct as number) * 2.5} />
          </div>
        </div>
      ))}
    </div>
  ),
  report: (
    <div className="w-full max-w-[17rem] rounded-xl border border-[var(--s-line)] bg-[var(--s-bg-2)] p-3 shadow-sm">
      <p className="border-l-2 border-[var(--s-accent)] pl-2 text-[12px] leading-snug">
        Outubro vai bem: a sobra prevista está acima do típico e um ponto pede sua confirmação.
      </p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-lg bg-[var(--s-chip)] p-2">
          <p className={`${tiny} ${soft}`}>Poupança</p>
          <p className="text-[15px] font-semibold text-emerald-600">41%</p>
        </div>
        <div className="rounded-lg bg-[var(--s-chip)] p-2">
          <p className={`${tiny} ${soft}`}>Reserva</p>
          <p className="text-[15px] font-semibold">8,9 meses</p>
        </div>
      </div>
      <div className={`mt-2 rounded-lg bg-amber-500/12 p-2 ${tiny}`}>
        Cobrança nova de <b>R$ 39,90</b> no cartão. Assinatura que você esqueceu?
      </div>
      <div className={`mt-3 grid gap-1.5 ${tiny}`}>
        <span className="flex items-center gap-2">
          <Check /> Aportar R$ 5.000 até dia 10
        </span>
        <span className="flex items-center gap-2">
          <Check done={false} /> Trocar o ETF de 0,5% a.a. pelo de 0,15%
        </span>
        <span className="flex items-center gap-2">
          <Check done={false} /> Separar o informe para o IR
        </span>
      </div>
    </div>
  ),
  notify: (
    <div className="grid w-full max-w-[17rem] gap-2">
      {[
        ["💸", "Sua renda chegou: R$ 12.000", "agora"],
        ["🧾", "Fatura de R$ 3.180 vence amanhã", "8h"],
        ["📋", "Resumo do dia · 3 observações", "19h"],
      ].map(([icon, text, when]) => (
        <div key={text} className="flex items-center gap-2 rounded-xl bg-[var(--s-bg-2)]/90 px-3 py-2 shadow-sm backdrop-blur">
          <span className="text-base">{icon}</span>
          <span className={`min-w-0 flex-1 truncate ${tiny} font-medium`}>{text}</span>
          <span className={`${tiny} ${soft}`}>{when}</span>
        </div>
      ))}
    </div>
  ),
  goals: (
    <div className={`${box} grid gap-2.5`}>
      {[
        ["Reserva de 12 meses", 74, "no ritmo"],
        ["Viagem em 2027", 41, "+ R$ 380/mês"],
        ["Independência financeira", 18, "2041 no ritmo"],
      ].map(([label, pct, note]) => (
        <div key={label as string}>
          <Row left={label} right={<span className={soft}>{note}</span>} />
          <div className="mt-1">
            <Bar value={pct as number} tone="good" />
          </div>
        </div>
      ))}
    </div>
  ),
  theses: (
    <div className={`${box} grid gap-2`}>
      <Row left={<b>Cripto</b>} right={<Pill>faixa 5–8%</Pill>} />
      <p className={`${tiny} ${soft}`}>Regra: rebalancear quando passar de 8%. Notícia não muda a faixa.</p>
      <div className="h-px bg-[var(--s-line)]" />
      <Row left={<b>Exterior</b>} right={<Pill>alvo 30%</Pill>} />
      <p className={`${tiny} ${soft}`}>Sinal que reabre: juro real acima de 7% por 3 meses.</p>
    </div>
  ),

  // Alento
  "a-gallery": (
    <div className="grid w-full max-w-md gap-3 sm:grid-cols-[1fr_auto]">
      <div className="grid gap-2 rounded-xl bg-[var(--s-bg-2)] p-3 shadow-sm">
        <Row left={<span className={soft}>Nome do casal</span>} right={<b>Ana &amp; Pedro</b>} />
        <Row left={<span className={soft}>Data</span>} right="Março 2026" />
        <Row left={<span className={soft}>Senha</span>} right={<span className="tracking-widest">••••••</span>} />
        <Row left={<span className={soft}>Expira em</span>} right="14/09/2026" />
        <div className="h-px bg-[var(--s-line)]" />
        <Row left="Galeria ativa" right={<Pill tone="good">sim</Pill>} />
        <Row left="Pública (aparece no portfólio)" right={<Pill tone="plain">não</Pill>} />
      </div>
      <div className="grid content-start gap-2 rounded-xl bg-[var(--s-bg-2)] p-3 shadow-sm sm:w-36">
        <span className="aspect-[3/4] w-full rounded-lg bg-gradient-to-br from-stone-300 to-stone-500/70" />
        <p className={`${tiny} ${soft}`}>Capa · 1.412 fotos · 2 filmes</p>
      </div>
    </div>
  ),
  "a-upload": (
    <div className={`${box} grid gap-2`}>
      <Row left={<b>Enviando 640 fotos</b>} right={<span className="tabular-nums">412 / 640</span>} />
      <Bar value={64} />
      {[
        ["IMG_0412.jpg · 18 MB", "ok"],
        ["IMG_0413.jpg · 22 MB", "ok"],
        ["IMG_0414.jpg · 27 MB", "subindo"],
      ].map(([name, state]) => (
        <Row key={name} left={<span className={soft}>{name}</span>} right={<Pill tone={state === "ok" ? "good" : "accent"}>{state}</Pill>} />
      ))}
    </div>
  ),
  "a-moments": (
    <div className="grid w-full max-w-[17rem] gap-2">
      <div className="flex gap-1.5">
        <Pill tone="plain">Pré-wedding · 180</Pill>
        <Pill>Casamento · 1.232</Pill>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {["Dia da Noiva", "Dia do Noivo", "Cerimônia Religiosa", "Cartório", "Festa"].map((moment) => (
          <span key={moment} className={`rounded-full border border-[var(--s-line)] bg-[var(--s-bg-2)] px-2 py-0.5 ${tiny}`}>
            {moment}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-1">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <span key={i} className={`aspect-square rounded ${i % 3 ? "bg-stone-400/40" : "bg-stone-500/50"}`} />
        ))}
      </div>
    </div>
  ),
  "a-share": (
    <div className="grid w-full max-w-[17rem] gap-2">
      <div className={`flex items-center gap-2 rounded-lg bg-[var(--s-bg-2)] px-3 py-2 shadow-sm ${tiny}`}>
        <span className={`min-w-0 flex-1 truncate font-mono ${soft}`}>alentofotoefilme.com.br/galeria/k3f…</span>
        <Pill>Copiar</Pill>
      </div>
      <div className="overflow-hidden rounded-xl rounded-tr-sm bg-emerald-500/12 shadow-sm">
        <span className="block h-16 bg-gradient-to-br from-stone-300 to-stone-500/70" />
        <p className={`px-3 py-2 ${tiny}`}>
          <b>Ana &amp; Pedro · Alento Foto &amp; Filme</b>
          <span className={`block ${soft}`}>A galeria do nosso casamento</span>
        </p>
      </div>
      <p className={`${tiny} ${soft}`}>Revogar o link fecha para todos.</p>
    </div>
  ),
  "a-download": (
    <div className="grid w-full max-w-[17rem] gap-2.5">
      <div className="grid grid-cols-3 gap-1">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <span key={i} className="relative aspect-square rounded bg-stone-400/40">
            {i % 2 === 0 ? (
              <span className="absolute right-1 top-1 grid size-3.5 place-items-center rounded-full bg-[var(--s-accent)] text-[8px] font-bold text-white">
                ✓
              </span>
            ) : null}
          </span>
        ))}
      </div>
      <span className="rounded-full bg-[var(--s-accent)] px-3 py-1.5 text-center text-[11px] font-semibold text-white">
        Baixar 3 selecionadas
      </span>
      <span className={`rounded-full border border-[var(--s-line)] px-3 py-1.5 text-center ${tiny} font-semibold`}>
        Baixar tudo · 1.412 fotos (ZIP)
      </span>
      <div className={`rounded-lg bg-[var(--s-bg-2)] p-2 shadow-sm ${tiny}`}>
        <Row left="ana-e-pedro.zip" right={<span className={soft}>2,1 de 9,8 GB</span>} />
        <div className="mt-1.5">
          <Bar value={21} tone="good" />
        </div>
        <p className={`mt-1.5 ${soft}`}>No gerenciador de downloads do celular</p>
      </div>
    </div>
  ),
  "a-films": (
    <div className="grid w-full max-w-[17rem] gap-2">
      <div className="flex gap-1.5">
        <Pill>Trailer</Pill>
        <Pill tone="plain">Curta-metragem</Pill>
      </div>
      <div className="relative grid aspect-video place-items-center rounded-xl bg-gradient-to-br from-stone-500 to-stone-800 shadow-sm">
        <span className="grid size-9 place-items-center rounded-full bg-white/85 text-[12px] text-stone-800">▶</span>
        <span className="absolute bottom-1.5 right-2 text-[10px] text-white/80">2:41</span>
      </div>
      <Row left={<span className={soft}>Baixar · melhor resolução</span>} right={<b>1080p</b>} />
    </div>
  ),
  "a-expire": (
    <div className="grid w-full max-w-md gap-2">
      {[
        ["Ana & Pedro", "expira em 42 dias", "good"],
        ["Júlia & Rafael", "expira em 6 dias", "warn"],
        ["Carla & Tiago", "expirou · 18 GB liberados", "plain"],
      ].map(([couple, state, tone]) => (
        <div key={couple} className="flex items-center gap-2 rounded-lg bg-[var(--s-bg-2)] px-3 py-2 shadow-sm">
          <span className={`min-w-0 flex-1 truncate ${tiny} font-medium`}>{couple}</span>
          <Pill tone={tone as "good"}>{state}</Pill>
        </div>
      ))}
    </div>
  ),

  // Lume (na marca dele: noite quente, creme e a luz)
  "l-said": (
    <div className="grid w-full max-w-md gap-3 sm:grid-cols-2">
      <div className={lumeBox}>
        <p className="text-[10px] text-[#FBEFD6]/55">Você disse</p>
        <p className="mt-1 font-display text-[17px] leading-tight text-[#FFC93C]">Enviar a proposta</p>
        <p className="text-[10.5px] text-[#FBEFD6]/60">45 min, hoje</p>
      </div>
      <div className={lumeBox}>
        <p className="text-[10px] text-[#FBEFD6]/55">Você está</p>
        <p className="mt-1 font-display text-[17px] leading-tight text-[#F07A5F]">no feed</p>
        <p className="text-[10.5px] text-[#FBEFD6]/60">há 20 min</p>
      </div>
    </div>
  ),
  "l-escape": (
    <div className={`${lumeBox} w-full max-w-[17rem]`}>
      <LumeHead />
      <p className="mt-2 font-display text-[19px] leading-tight">1h40 hoje no projeto paralelo.</p>
      <p className="mt-2 text-[10px] text-[#FBEFD6]/55">Esperando desde terça</p>
      <p className="font-display text-[15px] text-[#FFC93C]">A proposta</p>
      <span className="mt-3 block rounded-full bg-[#FFC93C] py-1.5 text-center text-[11px] font-semibold text-[#1E1203]">Ir agora</span>
      <p className="mt-2 text-[10.5px] text-[#FBEFD6]/55">Mais 20 min, porque…</p>
    </div>
  ),
  "l-transition": (
    <div className={`${lumeBox} w-full max-w-[17rem]`}>
      <LumeHead />
      <p className="mt-2 font-display text-[17px] leading-tight">Você voltou depois de 40 min. O que vem agora?</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {["A proposta, 45 min", "Ler 20 min", "Outra coisa"].map((option, i) => (
          <span
            key={option}
            className={`rounded-full px-2.5 py-1 text-[10.5px] font-semibold ${
              i === 0 ? "bg-[#FFC93C] text-[#1E1203]" : "border border-[#FBEFD6]/20 text-[#FBEFD6]/80"
            }`}
          >
            {option}
          </span>
        ))}
      </div>
    </div>
  ),
  "l-skip": (
    <div className={`${lumeBox} w-full max-w-[15rem]`}>
      <LumeHead />
      <p className="mt-2 font-display text-[18px] leading-tight">Por que hoje não?</p>
      <span className="mt-3 block rounded-full bg-[#FFC93C] py-1.5 text-center text-[11px] font-semibold text-[#1E1203]">
        Só 5 min agora
      </span>
      <p className="mt-2 text-center text-[10.5px] text-[#FBEFD6]/60">Amanhã às 7h</p>
      <div className="mt-3 grid gap-1.5">
        {["Cansado", "Sem tempo hoje", "Imprevisto", "Não é importante agora"].map((reason) => (
          <span key={reason} className="rounded-lg border border-[#FBEFD6]/15 px-2.5 py-1.5 text-[10.5px] text-[#FBEFD6]/80">
            {reason}
          </span>
        ))}
      </div>
      <p className="mt-3 text-[10px] text-[#FBEFD6]/45">Sem motivo, nada é gravado.</p>
    </div>
  ),
  "l-fez": (
    <div className={`${lumeBox} w-full max-w-[17rem]`}>
      <LumeHead />
      <p className="mt-2 font-display text-[18px] leading-tight">
        Fez <span className="text-[#FFC93C]">a proposta</span>?
      </p>
      <p className="text-[10.5px] text-[#FBEFD6]/60">Vi 42 min nela desde as 16h10.</p>
      <div className="mt-3 flex gap-1.5">
        <span className="rounded-full bg-[#FFC93C] px-3 py-1 text-[10.5px] font-semibold text-[#1E1203]">Feito</span>
        <span className="rounded-full border border-[#FBEFD6]/20 px-3 py-1 text-[10.5px] text-[#FBEFD6]/80">Em parte</span>
        <span className="rounded-full border border-[#FBEFD6]/20 px-3 py-1 text-[10.5px] text-[#FBEFD6]/80">Não rolou</span>
      </div>
    </div>
  ),
  "l-learn": (
    <div className={`${lumeBox} grid w-full max-w-[17rem] gap-2.5`}>
      {[
        ["Depois de reunião, o feed.", "5 vezes"],
        ["Às 15h, a tarefa difícil some.", "4 de 5 dias"],
        ["Uma frase sua te traz de volta.", "3 de 4"],
      ].map(([belief, evidence]) => (
        <div key={belief}>
          <p className="font-display text-[14px] leading-tight">{belief}</p>
          <p className="text-[10px] text-[#FBEFD6]/50">
            {evidence} · <span className="underline decoration-[#FBEFD6]/30">Não é verdade</span>
          </p>
        </div>
      ))}
    </div>
  ),
  "l-move": (
    <div className="grid w-full max-w-[17rem] gap-2">
      {[
        ["antes", "Às 15h costuma ser difícil.", "«É justo que muito custe o que muito vale.»"],
        ["durante", "20 min no feed.", "«Comece pelo que dá para terminar hoje.»"],
        ["depois", "Passou. O que ainda dá:", "10 min de alongamento agora."],
      ].map(([moment, line, quote]) => (
        <div key={moment} className={lumeBox}>
          <p className="text-[10px] text-[#FFC93C]">{moment}</p>
          <p className="mt-1 text-[10.5px] text-[#FBEFD6]/65">{line}</p>
          <p className="mt-1.5 font-display text-[13px] leading-snug">{quote}</p>
        </div>
      ))}
    </div>
  ),
};

function LumeHead() {
  return (
    <p className="flex items-center gap-1.5 font-display text-[12px]">
      <span className="size-2 rounded-full bg-[#FFC93C] shadow-[0_0_8px_2px_rgba(255,201,60,0.55)]" />
      lume
    </p>
  );
}
