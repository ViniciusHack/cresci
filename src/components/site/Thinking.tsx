import { useState } from "react";

import { useReveal } from "../../hooks/reveal";
import { useI18n } from "../../lib/i18n";

export function Thinking() {
  const { copy } = useI18n();
  const { ref, visible } = useReveal<HTMLElement>();
  const [cardIndex, setCardIndex] = useState(0);
  const cards = copy.thinking.cards;
  const card = cards[cardIndex] ?? cards[0]!;

  return (
    <section
      ref={ref}
      id="oficio"
      className={`border-b border-line px-5 py-24 md:px-8 md:py-32 ${visible ? "reveal" : ""}`}
    >
      <div className="mx-auto max-w-[1400px]">
        <p className="font-mono text-[11px] tracking-[0.18em] text-gold uppercase">
          {copy.thinking.index}
        </p>
        <h2 className="mt-5 max-w-[14ch] font-display text-[clamp(3rem,7vw,6.4rem)] leading-[0.9] tracking-[-0.03em]">
          {copy.thinking.title}
        </h2>
        <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-ink-soft">
          {copy.thinking.lead}
        </p>

        <ol className="mt-16 grid gap-x-16 gap-y-12 md:grid-cols-2">
          {copy.thinking.principles.map((principle, index) => (
            <li key={principle.title} className="max-w-md">
              <p className="font-mono text-[11px] tracking-[0.16em] text-gold">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 font-display text-[1.85rem] leading-tight">{principle.title}</h3>
              <p className="mt-3 text-[0.98rem] leading-relaxed text-ink-soft">{principle.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-20 border-t border-line pt-10 md:grid md:grid-cols-12 md:gap-10">
          <div className="md:col-span-4">
            <p className="font-mono text-[11px] tracking-[0.18em] text-gold uppercase">
              {copy.thinking.cardLabel}
            </p>
            <p className="mt-3 font-mono text-[11px] text-muted">
              {String(cardIndex + 1).padStart(2, "0")} / {String(cards.length).padStart(2, "0")}
            </p>
          </div>
          <div className="mt-6 md:col-span-8 md:mt-0">
            <p className="font-display text-[clamp(1.8rem,4vw,3rem)] leading-[1.05] tracking-[-0.02em]">
              {card.title}
            </p>
            <p className="mt-4 max-w-2xl text-[1.02rem] leading-relaxed text-ink-soft">{card.body}</p>
            <button
              type="button"
              onClick={() => setCardIndex((current) => (current + 1) % cards.length)}
              className="mt-8 inline-flex items-center gap-2 text-[14px] text-ink transition-colors hover:text-gold"
            >
              <span aria-hidden>→</span>
              {copy.thinking.cardNext}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
