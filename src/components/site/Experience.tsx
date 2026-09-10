import { useReveal } from "../../hooks/reveal";
import { useI18n } from "../../lib/i18n";

export function Experience() {
  const { copy } = useI18n();
  const { ref, visible } = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="experiencia"
      className={`border-b border-line px-5 py-24 md:px-8 md:py-32 ${visible ? "reveal" : ""}`}
    >
      <div className="mx-auto max-w-[1400px]">
        <p className="font-mono text-[11px] tracking-[0.18em] text-gold uppercase">
          {copy.studio.experienceEyebrow}
        </p>
        <h2 className="mt-5 max-w-[16ch] font-display text-[clamp(3rem,7vw,6.4rem)] leading-[0.9] tracking-[-0.03em]">
          {copy.studio.experienceTitle}
        </h2>
        <ol className="mt-16 border-t border-line">
          {copy.studio.jobs.map((job) => (
            <li
              key={job.company}
              className="grid gap-3 border-b border-line py-8 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-10"
            >
              <p className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
                {job.period}
              </p>
              <div>
                <h3 className="font-display text-[clamp(1.45rem,3vw,2.35rem)] leading-[1.05] tracking-[-0.02em]">
                  {job.role}
                  <span className="text-muted"> · {job.company}</span>
                </h3>
                <p className="mt-3 max-w-2xl text-[1rem] leading-relaxed text-ink-soft">{job.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
