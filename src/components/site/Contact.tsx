import { VersionSwitch } from "../versions/VersionChrome";
import { useReveal } from "../../hooks/reveal";
import { useI18n } from "../../lib/i18n";
import { CALENDLY_URL, SOCIAL_REL } from "../../lib/site";

export function Contact() {
  const { copy } = useI18n();
  const { ref, visible } = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="conversar"
      className={`px-5 py-24 md:px-8 md:py-32 ${visible ? "reveal" : ""}`}
    >
      <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="font-mono text-[11px] tracking-[0.18em] text-gold uppercase">{copy.talk.index}</p>
          <h2 className="mt-5 max-w-[12ch] font-display text-[clamp(3rem,7vw,6.4rem)] leading-[0.9] tracking-[-0.03em]">
            {copy.talk.title}
          </h2>
          <p className="mt-6 max-w-xl text-[1.08rem] leading-relaxed text-ink-soft">{copy.talk.body}</p>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex w-fit items-center gap-2 bg-ink px-4 py-2.5 text-[14px] text-paper transition-colors hover:bg-gold"
          >
            {copy.studio.calendly}
          </a>
        </div>
        <div className="flex flex-col justify-end gap-10 lg:col-span-5">
          <div>
            <p className="font-mono text-[11px] tracking-[0.18em] text-gold uppercase">
              {copy.talk.emailLabel}
            </p>
            <a
              href={`mailto:${copy.talk.email}`}
              className="mt-3 inline-block font-display text-[clamp(1.6rem,3vw,2.4rem)] leading-tight text-ink transition-colors hover:text-gold"
            >
              {copy.talk.email}
            </a>
          </div>
          <div>
            <p className="font-mono text-[11px] tracking-[0.18em] text-gold uppercase">
              {copy.talk.linksLabel}
            </p>
            <ul className="mt-3 space-y-2">
              {copy.socials.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel={SOCIAL_REL}
                    className="text-[1.05rem] text-ink-soft transition-colors hover:text-ink"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const { copy } = useI18n();

  return (
    <footer className="border-t border-line px-5 py-6 md:px-8">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
        <p>{copy.footer.rights}</p>
        <VersionSwitch current="editorial" />
        <a href="#topo" className="transition-colors hover:text-ink">
          {copy.footer.place}
        </a>
      </div>
    </footer>
  );
}
