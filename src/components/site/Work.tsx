import { useState } from "react";

import { useReveal } from "../../hooks/reveal";
import { useI18n } from "../../lib/i18n";

export function Work() {
  const { copy } = useI18n();
  const { ref, visible } = useReveal<HTMLElement>();
  const [openId, setOpenId] = useState(copy.work.items[0]?.id ?? "");
  const items = copy.work.items;

  return (
    <section
      ref={ref}
      id="produtos"
      className={`border-b border-line px-5 py-24 md:px-8 md:py-32 ${visible ? "reveal" : ""}`}
    >
      <div className="mx-auto max-w-[1400px]">
        <p className="font-mono text-[11px] tracking-[0.18em] text-gold uppercase">{copy.work.index}</p>
        <h2 className="mt-5 max-w-[16ch] font-display text-[clamp(3rem,7vw,6.4rem)] leading-[0.9] tracking-[-0.03em]">
          {copy.work.title}
        </h2>
        <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-ink-soft">{copy.work.lead}</p>

        <ol className="mt-16 border-t border-line">
          {items.map((item, index) => {
            const open = openId === item.id;
            return (
              <li key={item.id} className="border-b border-line">
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={`work-${item.id}`}
                  onClick={() => setOpenId(open ? "" : item.id)}
                  className="grid w-full grid-cols-[auto_1fr_auto] items-baseline gap-4 py-6 text-left transition-colors hover:text-gold md:grid-cols-[4rem_1fr_auto] md:gap-8 md:py-7"
                >
                  <span className="font-mono text-[11px] tracking-[0.14em] text-gold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-[clamp(1.45rem,3vw,2.35rem)] leading-[1.05] tracking-[-0.02em]">
                    {item.title}
                  </span>
                  <span className="hidden font-mono text-[11px] tracking-[0.12em] text-muted uppercase sm:block">
                    {item.metric}
                  </span>
                  <span className="sr-only">{open ? copy.work.close : copy.work.open}</span>
                </button>
                <div
                  id={`work-${item.id}`}
                  hidden={!open}
                  className="grid grid-cols-1 pb-8 md:grid-cols-[4rem_minmax(0,40rem)_1fr] md:gap-8"
                >
                  <div className="hidden md:block" />
                  <div>
                    <p className="font-mono text-[11px] tracking-[0.12em] text-muted uppercase sm:hidden">
                      {item.metric}
                    </p>
                    <p className="mt-3 text-[1rem] leading-relaxed text-ink-soft sm:mt-0">{item.body}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-5 inline-flex items-center gap-2 text-[14px] text-ink transition-colors hover:text-gold"
                      >
                        <span aria-hidden>→</span>
                        {copy.work.visit}
                      </a>
                    ) : null}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
