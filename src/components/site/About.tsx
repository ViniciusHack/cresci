import { useReveal } from "../../hooks/reveal";
import { useI18n } from "../../lib/i18n";

export function About() {
  const { copy } = useI18n();
  const { ref, visible } = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="sobre"
      className={`border-b border-line px-5 py-24 md:px-8 md:py-32 ${visible ? "reveal" : ""}`}
    >
      <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="font-mono text-[11px] tracking-[0.18em] text-gold uppercase">
            {copy.studio.aboutEyebrow}
          </p>
          <h2 className="mt-5 max-w-[14ch] font-display text-[clamp(3rem,7vw,6.4rem)] leading-[0.9] tracking-[-0.03em]">
            {copy.studio.aboutTitle}
          </h2>
          <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-ink-soft">
            {copy.studio.aboutBody}
          </p>
        </div>
        <div className="lg:col-span-5">
          <p className="font-mono text-[11px] tracking-[0.18em] text-gold uppercase">
            {copy.studio.skillsTitle}
          </p>
          <div className="mt-6 space-y-8">
            {copy.studio.skills.map((group) => (
              <div key={group.group}>
                <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
                  {group.group}
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="border border-line bg-paper-2 px-2.5 py-1 text-[13px] text-ink-soft"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
