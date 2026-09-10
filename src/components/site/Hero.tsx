import { HackTrigger } from "./HackEgg";
import { useI18n } from "../../lib/i18n";
import { CALENDLY_URL, SOCIAL_REL } from "../../lib/site";

export function Hero() {
  const { copy } = useI18n();
  const [first, last] = splitName(copy.hero.name);

  return (
    <section id="topo" className="border-b border-line">
      <div className="mx-auto grid min-h-[calc(100svh-4.25rem)] max-w-[1400px] lg:grid-cols-12">
        <div className="flex flex-col justify-end px-5 py-16 md:px-8 md:py-20 lg:col-span-7 lg:py-24">
          <p className="font-mono text-[11px] tracking-[0.18em] text-gold uppercase">
            {copy.studio.hello}
          </p>
          <h1 className="mt-8 font-display text-[clamp(4.4rem,13vw,9.5rem)] leading-[0.82] tracking-[-0.03em] text-ink">
            <span className="block">{first}</span>
            <HackTrigger className="hack-trigger block text-left">
              {last}
            </HackTrigger>
          </h1>
          <p className="mt-6 text-[1.05rem] text-ink-soft md:text-[1.2rem]">{copy.studio.role}</p>
          <p className="mt-4 max-w-[38rem] text-[1.05rem] leading-relaxed text-ink-soft md:text-[1.2rem]">
            {copy.studio.headline}
          </p>
          <p className="mt-6 max-w-[38rem] text-[1.02rem] leading-relaxed text-ink-soft">
            {copy.hero.thesis}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-ink px-4 py-2.5 text-[14px] text-paper transition-colors hover:bg-gold"
            >
              {copy.studio.calendly}
            </a>
            <a
              href="#produtos"
              className="inline-flex items-center gap-2 text-[15px] text-ink transition-colors hover:text-gold"
            >
              <span aria-hidden>→</span>
              {copy.studio.ctaWork}
            </a>
          </div>
          <p className="mt-6 text-[14px] text-muted">
            {copy.socials.map((social, index) => (
              <span key={social.href}>
                {index > 0 ? <span className="mx-2">·</span> : null}
                <a
                  href={social.href}
                  target="_blank"
                  rel={SOCIAL_REL}
                  className="transition-colors hover:text-ink"
                >
                  {social.label}
                </a>
              </span>
            ))}
          </p>
        </div>
        <aside className="flex flex-col justify-between border-t border-line bg-paper-2 px-5 py-12 md:px-8 lg:col-span-5 lg:border-t-0 lg:border-l">
          <div className="flex items-start justify-between gap-6 font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
            <p>{copy.hero.location}</p>
            <p>{copy.hero.year}</p>
          </div>
          <div className="relative mx-auto mt-10 w-full max-w-sm lg:mt-0">
            <img
              src="/vinicius.jpg"
              alt={copy.studio.photoAlt}
              width={1024}
              height={1024}
              fetchPriority="high"
              decoding="async"
              className="aspect-square w-full object-cover object-[center_20%] ring-1 ring-line"
            />
            <div className="absolute -bottom-4 left-3 min-w-[13.5rem] border border-line bg-paper px-3.5 py-2.5">
              <p className="flex items-center gap-2 text-sm">
                <span className="size-2 rounded-full bg-emerald-600" aria-hidden />
                {copy.studio.photoCard}
              </p>
              <p className="mt-0.5 pl-4 text-xs text-muted">{copy.hero.location}</p>
            </div>
          </div>
          <div className="mt-12 lg:mt-10">
            <p className="font-mono text-[11px] tracking-[0.18em] text-gold uppercase">
              {copy.hero.nowLabel}
            </p>
            <ul className="mt-4 space-y-2">
              {copy.hero.now.map((item) => (
                <li key={item} className="font-display text-[1.65rem] leading-tight text-ink md:text-[2rem]">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}

function splitName(name: string) {
  const parts = name.split(" ");
  return [parts[0] ?? name, parts.slice(1).join(" ")] as const;
}
