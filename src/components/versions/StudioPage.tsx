import {
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { flushSync } from "react-dom";

import { HackEggProvider, HackTrigger } from "../site/HackEgg";
import { useClientMounted } from "../../hooks/page-theme";
import { useI18n } from "../../lib/i18n";
import type { WorkItem } from "../../lib/copy";
import { CALENDLY_URL, SOCIAL_REL } from "../../lib/site";
import { LangSwitch, VersionSwitch } from "./VersionChrome";

const THEME_KEY = "studio-theme";
const PROJECT_CYCLE_MS = 5000;

const stacks: Record<string, string[]> = {
  alento: ["React", "TypeScript", "Supabase"],
  mytribe: ["Expo", "Supabase", "Stripe"],
  cards: ["React Native", "local-first"],
  bot: ["NestJS", "Rust"],
  simulation: ["Firebase", "BullMQ", "Postgres"],
  automatize: ["AI agent", "WhatsApp"],
  goalfy: ["Stripe", "react-flow"],
  whitelabel: ["React", "TypeScript", "White-label"],
};

const covers: Record<
  string,
  { kind: "device" | "photo" | "cover"; src?: string; tone: string }
> = {
  alento: { kind: "photo", src: "/comercial/alento.jpg", tone: "" },
  mytribe: { kind: "photo", src: "/comercial/mytribe.jpg", tone: "" },
  cards: { kind: "device", src: "/comercial/cards-today.png", tone: "" },
  bot: { kind: "photo", src: "/comercial/bot.jpg", tone: "" },
  simulation: { kind: "photo", src: "/comercial/backtest.jpg", tone: "" },
  automatize: { kind: "photo", src: "/comercial/automatize.jpg", tone: "" },
  goalfy: { kind: "photo", src: "/comercial/goalfy.jpg", tone: "" },
  whitelabel: { kind: "cover", tone: "from-slate-800 to-slate-950" },
};

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
};

const springHover = { type: "spring" as const, stiffness: 320, damping: 22 };

export function StudioPage() {
  const { copy } = useI18n();
  const [first, last] = splitName(copy.hero.name);
  const reduce = useReducedMotion();
  const mounted = useClientMounted();
  const [dark, setDark] = useState(false);

  function applyTheme(next: boolean, syncScheme = true) {
    const theme = next ? "dark" : "light";
    const root = document.documentElement;
    root.dataset.theme = theme;
    if (syncScheme) root.style.colorScheme = theme;
    window.localStorage.setItem(THEME_KEY, theme);
    setDark(next);
  }

  useEffect(() => {
    applyTheme(window.localStorage.getItem(THEME_KEY) === "dark");

    let cancelled = false;
    const warm = requestAnimationFrame(() => {
      if (cancelled || typeof document.startViewTransition !== "function") return;
      try {
        document.startViewTransition(() => {}).skipTransition();
      } catch {
        // First real click still works if the browser rejects a no-op transition.
      }
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(warm);
      const root = document.documentElement;
      delete root.dataset.theme;
      root.style.colorScheme = "";
    };
  }, []);

  function toggleTheme(event: MouseEvent<HTMLButtonElement>) {
    const next = document.documentElement.dataset.theme !== "dark";
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!document.startViewTransition || prefersReducedMotion || reduce) {
      applyTheme(next);
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const root = document.documentElement;
    root.classList.add("theme-switching");

    const finish = () => {
      root.style.colorScheme = next ? "dark" : "light";
      root.classList.remove("theme-switching");
    };

    try {
      const transition = document.startViewTransition(() => {
        flushSync(() => applyTheme(next, false));
      });

      void transition.ready
        .then(() => {
          root.animate(
            [
              { clipPath: `circle(0px at ${x}px ${y}px)` },
              { clipPath: `circle(${radius}px at ${x}px ${y}px)` },
            ],
            {
              duration: 640,
              easing: "ease-in",
              fill: "both",
              pseudoElement: "::view-transition-new(root)",
            },
          );
        })
        .catch(() => {});

      void transition.finished.finally(finish);
    } catch {
      finish();
      applyTheme(next);
    }
  }

  return (
    <HackEggProvider>
    <div className="studio-shell min-h-svh font-sans">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:bg-[var(--s-btn)] focus:px-3 focus:py-2 focus:text-sm focus:text-[var(--s-btn-fg)]"
      >
        {copy.skip}
      </a>
      <motion.header
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease }}
        className="studio-header sticky top-0 z-40 border-b border-[var(--s-line)] bg-[var(--s-header)] backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-3">
          <p className="text-sm font-semibold tracking-tight">
            <a href="#topo" className="transition-colors hover:text-[var(--s-accent)]">
              {first}
            </a>{" "}
            <HackTrigger className="hack-trigger inline">{last}</HackTrigger>
          </p>
          <nav aria-label={copy.nav.sections} className="flex items-center gap-4 text-sm text-[var(--s-muted)]">
            <a href="#sobre" className="link-underline hidden cursor-pointer sm:inline">
              {copy.studio.navAbout}
            </a>
            <a href="#portfolio" className="link-underline cursor-pointer">
              {copy.studio.navWork}
            </a>
            <a href="#experiencia" className="link-underline hidden cursor-pointer sm:inline">
              {copy.studio.navExperience}
            </a>
            <motion.a
              href="#contato"
              whileHover={reduce ? undefined : { y: -1 }}
              whileTap={reduce ? undefined : { scale: 0.97 }}
              className="cursor-pointer rounded-md bg-[var(--s-btn)] px-3 py-1.5 text-[var(--s-btn-fg)]"
            >
              {copy.studio.navContact}
            </motion.a>
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle
              dark={dark}
              mounted={mounted}
              label={dark ? copy.studio.themeToLight : copy.studio.themeToDark}
              onToggle={toggleTheme}
            />
            <LangSwitch className="text-[11px] font-medium uppercase tracking-[0.12em] [&_button]:cursor-pointer [&_button[aria-pressed=true]]:text-[var(--s-accent)]" />
          </div>
        </div>
      </motion.header>

      <main id="conteudo">
        <section id="topo" className="relative scroll-mt-20 overflow-hidden">
          {reduce ? null : (
            <>
              <motion.div
                aria-hidden
                className="pointer-events-none absolute -top-24 right-[8%] size-[28rem] rounded-full bg-[var(--s-accent)]/15 blur-3xl"
                animate={{ x: [0, 24, 0], y: [0, 16, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                aria-hidden
                className="pointer-events-none absolute bottom-0 left-[-6%] size-72 rounded-full bg-[var(--s-accent)]/10 blur-3xl"
                animate={{ x: [0, -16, 0], y: [0, 12, 0] }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
              />
            </>
          )}
          <div className="relative mx-auto grid max-w-5xl items-center gap-12 px-5 py-16 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:py-24">
            <motion.div initial={reduce ? false : "hidden"} animate="show" variants={stagger}>
              <motion.p variants={fadeUp} className="text-sm font-medium text-[var(--s-accent)]">
                {copy.studio.hello}
              </motion.p>
              <motion.h1
                variants={fadeUp}
                className="mt-2 text-[clamp(2.6rem,6vw,4.4rem)] font-semibold leading-[1.05] tracking-tight"
              >
                {first}{" "}
                <HackTrigger className="hack-trigger inline text-left">{last}</HackTrigger>
              </motion.h1>
              <motion.p variants={fadeUp} className="mt-3 text-lg text-[var(--s-muted)]">
                {copy.studio.role}
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="mt-3 max-w-md text-[1.05rem] leading-relaxed text-[var(--s-muted)]"
              >
                {copy.studio.headline}
              </motion.p>
              <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
                <motion.a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={reduce ? undefined : { y: -2 }}
                  whileTap={reduce ? undefined : { scale: 0.97 }}
                  transition={springHover}
                  className="cursor-pointer rounded-md bg-[var(--s-btn)] px-4 py-2.5 text-sm font-medium text-[var(--s-btn-fg)]"
                >
                  {copy.studio.calendly}
                </motion.a>
                <motion.a
                  href="#portfolio"
                  whileHover={reduce ? undefined : { y: -2 }}
                  whileTap={reduce ? undefined : { scale: 0.97 }}
                  transition={springHover}
                  className="cursor-pointer rounded-md border border-[var(--s-line)] bg-[var(--s-bg-2)] px-4 py-2.5 text-sm font-medium"
                >
                  {copy.studio.ctaWork}
                </motion.a>
              </motion.div>
              <motion.p variants={fadeUp} className="mt-5 text-sm text-[var(--s-soft)]">
                {copy.socials.map((social, index) => (
                  <span key={social.href}>
                    {index > 0 ? <span className="mx-2 text-[var(--s-line)]">·</span> : null}
                    <a
                      href={social.href}
                      target="_blank"
                      rel={SOCIAL_REL}
                      className="link-underline hover:text-[var(--s-fg)]"
                    >
                      {social.label}
                    </a>
                  </span>
                ))}
              </motion.p>
            </motion.div>

            <PhotoTilt src="/vinicius.jpg" alt={copy.studio.photoAlt} reduce={!!reduce}>
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 16, x: -8 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ delay: 0.55, duration: 0.5, ease }}
                className="absolute -bottom-4 left-3 z-10 min-w-[13.5rem] rounded-xl border border-[var(--s-line)] bg-[var(--s-bg-2)] px-3.5 py-2.5 shadow-lg"
              >
                <p className="flex items-center gap-2 text-sm font-medium">
                  <span className="relative flex size-2" aria-hidden>
                    {reduce ? null : (
                      <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/70" />
                    )}
                    <span className="relative size-2 rounded-full bg-emerald-500" />
                  </span>
                  {copy.studio.photoCard}
                </p>
                <p className="mt-0.5 pl-4 text-xs text-[var(--s-muted)]">{copy.hero.location}</p>
              </motion.div>
            </PhotoTilt>
          </div>
        </section>

        <section
          id="sobre"
          className="scroll-mt-20 border-t border-[var(--s-line)] bg-[var(--s-bg-2)] py-20"
        >
          <div className="mx-auto grid max-w-5xl gap-12 px-5 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <Reveal>
              <p className="text-sm font-medium text-[var(--s-accent)]">{copy.studio.aboutEyebrow}</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">{copy.studio.aboutTitle}</h2>
              <p className="mt-4 max-w-xl leading-relaxed text-[var(--s-muted)]">{copy.studio.aboutBody}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="text-sm font-medium text-[var(--s-accent)]">{copy.studio.skillsTitle}</p>
              <div className="mt-5 space-y-5">
                {copy.studio.skills.map((group) => (
                  <div key={group.group}>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--s-soft)]">
                      {group.group}
                    </p>
                    <motion.ul
                      className="mt-2 flex flex-wrap gap-2"
                      initial={reduce ? false : "hidden"}
                      whileInView="show"
                      viewport={{ once: true, margin: "-40px" }}
                      variants={stagger}
                    >
                      {group.items.map((item) => (
                        <motion.li
                          key={item}
                          variants={fadeUp}
                          whileHover={reduce ? undefined : { y: -2, scale: 1.04 }}
                          className="rounded-md border border-[var(--s-line)] bg-[var(--s-chip)] px-2.5 py-1 text-sm"
                        >
                          {item}
                        </motion.li>
                      ))}
                    </motion.ul>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="portfolio" className="scroll-mt-20 py-20">
          <div className="mx-auto max-w-5xl px-5">
            <Reveal>
              <p className="text-sm font-medium text-[var(--s-accent)]">{copy.studio.workEyebrow}</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">{copy.studio.workTitle}</h2>
              <p className="mt-3 max-w-xl text-[var(--s-muted)]">{copy.studio.workLead}</p>
            </Reveal>
            <ProjectShowcase items={copy.work.items} linkLabel={copy.studio.projectLink} reduce={!!reduce} />
          </div>
        </section>

        <section
          id="experiencia"
          className="scroll-mt-20 border-t border-[var(--s-line)] bg-[var(--s-bg-2)] py-20"
        >
          <div className="mx-auto max-w-5xl px-5">
            <Reveal>
              <p className="text-sm font-medium text-[var(--s-accent)]">{copy.studio.experienceEyebrow}</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">{copy.studio.experienceTitle}</h2>
            </Reveal>
            <ol className="relative mt-10">
              <motion.span
                aria-hidden
                className="absolute left-0 top-0 hidden h-full w-px origin-top bg-[var(--s-line)] md:left-[11rem] md:block"
                initial={reduce ? false : { scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease }}
              />
              {copy.studio.jobs.map((job, index) => (
                <Reveal key={job.company} delay={index * 0.08}>
                  <li className="grid gap-3 border-t border-[var(--s-line)] py-8 md:grid-cols-[11rem_minmax(0,1fr)]">
                    <p className="text-sm text-[var(--s-soft)]">{job.period}</p>
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight">
                        {job.role}
                        <span className="text-[var(--s-soft)]"> · {job.company}</span>
                      </h3>
                      <p className="mt-2 max-w-2xl leading-relaxed text-[var(--s-muted)]">{job.body}</p>
                    </div>
                    <span className="sr-only">{index + 1}</span>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        <section id="contato" className="scroll-mt-20 px-5 py-20">
          <Reveal>
            <motion.div
              whileHover={reduce ? undefined : { y: -4 }}
              transition={springHover}
              className="mx-auto max-w-5xl rounded-2xl border border-[var(--s-line)] bg-[var(--s-bg-2)] px-6 py-12 shadow-sm md:px-12"
            >
              <p className="text-sm font-medium text-[var(--s-accent)]">
                {copy.talk.index.replace(/^\d+ \/ /, "")}
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">{copy.talk.title}</h2>
              <p className="mt-4 max-w-xl text-[var(--s-muted)]">{copy.talk.body}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <motion.a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={reduce ? undefined : { y: -2 }}
                  whileTap={reduce ? undefined : { scale: 0.97 }}
                  className="cursor-pointer rounded-md bg-[var(--s-btn)] px-4 py-2.5 text-sm font-medium text-[var(--s-btn-fg)]"
                >
                  {copy.studio.calendly}
                </motion.a>
                <motion.a
                  href={`mailto:${copy.talk.email}`}
                  whileHover={reduce ? undefined : { y: -2 }}
                  className="cursor-pointer rounded-md border border-[var(--s-line)] px-4 py-2.5 text-sm"
                >
                  {copy.talk.email}
                </motion.a>
                {copy.socials.map((social) => (
                  <motion.a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel={SOCIAL_REL}
                    whileHover={reduce ? undefined : { y: -2 }}
                    className="cursor-pointer rounded-md border border-[var(--s-line)] px-4 py-2.5 text-sm"
                  >
                    {social.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </Reveal>
        </section>
      </main>

      <footer className="border-t border-[var(--s-line)] px-5 py-6">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 text-xs text-[var(--s-soft)]">
          <p>{copy.footer.rights}</p>
          <VersionSwitch current="studio" />
          <p>{copy.footer.place}</p>
        </div>
      </footer>
    </div>
    </HackEggProvider>
  );
}

function splitName(name: string) {
  const parts = name.split(" ");
  return [parts[0] ?? name, parts.slice(1).join(" ")] as const;
}

function ThemeToggle({
  dark,
  mounted,
  label,
  onToggle,
}: {
  dark: boolean;
  mounted: boolean;
  label: string;
  onToggle: (event: MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={mounted ? label : undefined}
      title={mounted ? label : undefined}
      className="studio-theme-toggle grid size-8 cursor-pointer place-items-center rounded-full border border-[var(--s-line)] bg-[var(--s-bg-2)]"
    >
      {mounted && dark ? (
        <svg
          viewBox="0 0 24 24"
          className="size-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      ) : mounted ? (
        <svg
          viewBox="0 0 24 24"
          className="size-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      ) : null}
    </button>
  );
}

function ProjectShowcase({
  items,
  linkLabel,
  reduce,
}: {
  items: WorkItem[];
  linkLabel: string;
  reduce: boolean;
}) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.4 });
  const active = items.find((item) => item.id === activeId) ?? items[0];
  const tags = stacks[active?.id ?? ""] ?? [];
  const cover = covers[active?.id ?? ""];

  useEffect(() => {
    progressRef.current = 0;
    setProgress(0);
  }, [activeId]);

  useEffect(() => {
    if (reduce || paused || !inView || items.length < 2) return;

    const startedAt = Date.now() - (progressRef.current / 100) * PROJECT_CYCLE_MS;
    let stepped = false;
    const id = window.setInterval(() => {
      const nextProgress = Math.min(100, ((Date.now() - startedAt) / PROJECT_CYCLE_MS) * 100);
      progressRef.current = nextProgress;
      setProgress(nextProgress);
      if (nextProgress < 100 || stepped) return;
      stepped = true;
      setActiveId((current) => {
        const index = items.findIndex((item) => item.id === current);
        return items[(index < 0 ? 0 : index + 1) % items.length]?.id ?? current;
      });
    }, 50);

    return () => window.clearInterval(id);
  }, [activeId, inView, items, paused, reduce]);

  if (!active) return null;

  return (
    <div
      ref={rootRef}
      className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(16rem,0.85fr)_minmax(0,1.15fr)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <ol className="divide-y divide-[var(--s-line)] border-y border-[var(--s-line)]">
        {items.map((item, index) => {
          const selected = item.id === active.id;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => setActiveId(item.id)}
                aria-current={selected ? "true" : undefined}
                className={`relative flex w-full cursor-pointer items-baseline gap-3 border-l-2 py-3.5 pl-3 text-left transition-colors ${
                  selected
                    ? "border-[var(--s-accent)] font-medium text-[var(--s-fg)]"
                    : "border-transparent text-[var(--s-soft)] hover:text-[var(--s-fg)]"
                }`}
              >
                <span className="w-6 shrink-0 font-mono text-[11px] text-[var(--s-soft)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1 text-[15px] font-medium tracking-tight">{item.title}</span>
                <span className="hidden shrink-0 text-[11px] text-[var(--s-accent)] sm:inline">
                  {item.metric}
                </span>
                {selected && !reduce ? (
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-px bg-[var(--s-accent)]"
                    style={{ transform: `scaleX(${progress / 100})`, transformOrigin: "left" }}
                  />
                ) : null}
              </button>
            </li>
          );
        })}
      </ol>

      <motion.article
        key={active.id}
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease }}
        className="relative overflow-hidden rounded-2xl border border-[var(--s-line)] bg-[var(--s-bg-2)]"
      >
        {reduce || items.length < 2 ? null : (
          <div className="absolute inset-x-0 top-0 z-10 h-0.5 bg-[var(--s-line)]/70" aria-hidden>
            <div className="h-full bg-[var(--s-accent)]" style={{ width: `${progress}%` }} />
          </div>
        )}
          <ProjectMedia title={active.title} metric={active.metric} cover={cover} reduce={reduce} />
          <div className="p-5 md:p-6">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-xl font-semibold tracking-tight">{active.title}</h3>
              <p className="shrink-0 text-xs font-medium text-[var(--s-accent)]">{active.metric}</p>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[var(--s-muted)]">{active.body}</p>
            {tags.length ? (
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded bg-[var(--s-chip)] px-2 py-0.5 font-mono text-[11px] text-[var(--s-muted)]"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            ) : null}
            {active.href ? (
              <a
                href={active.href}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex cursor-pointer items-center gap-1 text-sm font-medium text-[var(--s-accent)]"
              >
                {linkLabel}
                <span aria-hidden>→</span>
              </a>
            ) : null}
          </div>
      </motion.article>
    </div>
  );
}

function PhotoTilt({
  src,
  alt,
  reduce,
  children,
}: {
  src: string;
  alt: string;
  reduce: boolean;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spring = { stiffness: 180, damping: 16, mass: 0.4 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [14, -14]), spring);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-14, 14]), spring);
  const glareX = useTransform(x, [-0.5, 0.5], ["12%", "88%"]);
  const glareY = useTransform(y, [-0.5, 0.5], ["12%", "88%"]);
  const glare = useMotionTemplate`radial-gradient(420px circle at ${glareX} ${glareY}, rgba(255,255,255,0.38), transparent 55%)`;

  function handleMove(event: MouseEvent<HTMLDivElement>) {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return;
    x.set((event.clientX - bounds.left) / bounds.width - 0.5);
    y.set((event.clientY - bounds.top) / bounds.height - 0.5);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 28, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.22, duration: 0.7, ease }}
      className="relative mx-auto w-full max-w-sm pb-5"
      style={{ perspective: 1100 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={reduce ? undefined : handleMove}
        onMouseLeave={reduce ? undefined : handleLeave}
        style={reduce ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative will-change-transform"
      >
        <div className="relative overflow-hidden rounded-2xl bg-[var(--s-chip)] shadow-xl ring-1 ring-[var(--s-line)]">
          <img
            src={src}
            alt={alt}
            width={1024}
            height={1024}
            fetchPriority="high"
            decoding="async"
            className="aspect-square w-full object-cover object-[center_20%]"
          />
          {reduce ? null : (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 mix-blend-soft-light"
              style={{ background: glare }}
            />
          )}
        </div>
        {children}
      </motion.div>
    </motion.div>
  );
}

function ProjectMedia({
  title,
  metric,
  cover,
  reduce,
}: {
  title: string;
  metric: string;
  cover?: (typeof covers)[string];
  reduce: boolean;
}) {
  if (cover?.kind === "device" && cover.src) {
    return (
      <div className="flex aspect-[16/10] items-center justify-center overflow-hidden bg-slate-950 p-8">
        <motion.img
          src={cover.src}
          alt={title}
          className="h-full rounded-[1.4rem] object-cover shadow-xl"
          whileHover={reduce ? undefined : { y: -6, rotate: -2 }}
          transition={{ duration: 0.4, ease }}
        />
      </div>
    );
  }

  if (cover?.kind === "photo" && cover.src) {
    return (
      <div className="overflow-hidden bg-[var(--s-chip)]">
        <img src={cover.src} alt={title} className="aspect-[16/10] w-full object-cover object-top" />
      </div>
    );
  }

  return (
    <div className={`aspect-[16/10] bg-gradient-to-br p-4 ${cover?.tone ?? "from-slate-800 to-slate-950"}`}>
      <div className="flex h-full flex-col rounded-lg border border-white/10 bg-black/25 p-4">
        <div className="flex gap-1.5">
          <span className="size-2 rounded-full bg-white/25" />
          <span className="size-2 rounded-full bg-white/25" />
          <span className="size-2 rounded-full bg-white/25" />
        </div>
        <p className="mt-6 font-mono text-[11px] text-white/45">{title}</p>
        <p className="mt-auto text-2xl font-semibold text-white">{metric}</p>
      </div>
    </div>
  );
}

function Reveal({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.01, margin: "160px 0px" });
  const [shown, setShown] = useState(!!reduce);

  useEffect(() => {
    if (reduce || inView) setShown(true);
  }, [inView, reduce]);

  useEffect(() => {
    const id = window.setTimeout(() => setShown(true), 1400);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial={reduce ? "show" : "hidden"}
      animate={shown ? "show" : "hidden"}
      transition={{ duration: 0.6, delay: shown ? delay : 0, ease }}
    >
      {children}
    </motion.div>
  );
}
