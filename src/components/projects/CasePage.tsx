import type { ReactNode } from "react";

import { useReveal } from "../../hooks/reveal";
import { caseStudies, type CaseShot, type CaseStudy } from "../../lib/projects";
import { CALENDLY_URL } from "../../lib/site";

// Página de estudo de caso: problema → o que faz (prints + bento) → como foi feito.
// Os blocos do bento são pedaços do app desenhados pequenos, com dados genéricos.

export function CasePage({ study }: { study: CaseStudy }) {
  const other = caseStudies.find((item) => item.slug !== study.slug);
  const [hero, ...rest] = study.shots;

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
            <dl className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
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
            {hero ? (
              <div className="mt-12 md:mt-16">
                <Shot shot={hero} priority />
              </div>
            ) : null}
          </div>
        </section>

        <section className="border-y border-[var(--s-line)] bg-[var(--s-bg-2)] py-12 md:py-16">
          <Reveal className="mx-auto grid max-w-5xl gap-4 px-5 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-8">
            <p className="text-sm font-medium text-[var(--s-accent)]">{study.problem.title}</p>
            <p className="max-w-3xl text-[clamp(1.15rem,2.2vw,1.45rem)] leading-snug tracking-tight">{study.problem.body}</p>
          </Reveal>
        </section>

        {rest.length ? (
          <section className="py-14 md:py-20">
            <div className="mx-auto max-w-5xl space-y-12 px-5 md:space-y-16">
              {rest.map((shot) => (
                <Shot key={shot.src} shot={shot} priority={false} />
              ))}
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
              <h2 className="text-2xl font-semibold tracking-tight">Quer algo assim no seu negócio?</h2>
              <p className="mt-2 max-w-md text-sm text-[var(--s-muted)]">
                Do problema ao app no aparelho de quem usa. Vamos conversar.
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
                  Ver o {other.name} <span aria-hidden>→</span>
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
        <span className={soft}>Liberar</span> <b>5 min</b> <span className={soft}>— por quê?</span>
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
};
