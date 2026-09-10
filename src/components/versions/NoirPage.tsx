import { usePageTheme } from "../../hooks/page-theme";
import { useI18n } from "../../lib/i18n";
import { CALENDLY_URL, SOCIAL_REL } from "../../lib/site";
import { LangSwitch, VersionSwitch } from "./VersionChrome";

export function NoirPage() {
  const { copy } = useI18n();
  usePageTheme("#0a192f", "#ccd6f6");
  const [first, last] = splitName(copy.hero.name);

  return (
    <div className="min-h-svh bg-[#0a192f] font-sans text-[#ccd6f6]">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-10 lg:grid-cols-[16rem_minmax(0,1fr)] lg:py-16">
        <aside className="lg:sticky lg:top-10 lg:self-start">
          <p className="font-mono text-[13px] text-[#64ffda]">{copy.studio.hello}</p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-[#e6f1ff]">
            {first} {last}
          </h1>
          <p className="mt-3 text-sm text-[#8892b0]">{copy.studio.role}</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#8892b0]">{copy.studio.headline}</p>
          <nav aria-label={copy.nav.sections} className="mt-8 flex flex-col gap-2 font-mono text-[12px]">
            <a className="text-[#8892b0] hover:text-[#64ffda]" href="#sobre">
              01. {copy.studio.navAbout}
            </a>
            <a className="text-[#8892b0] hover:text-[#64ffda]" href="#produtos">
              02. {copy.studio.navWork}
            </a>
            <a className="text-[#8892b0] hover:text-[#64ffda]" href="#experiencia">
              03. {copy.studio.navExperience}
            </a>
            <a className="text-[#8892b0] hover:text-[#64ffda]" href="#conversar">
              04. {copy.studio.navContact}
            </a>
          </nav>
          <div className="mt-8 flex flex-wrap gap-4 font-mono text-[12px] text-[#64ffda]">
            {copy.socials.map((social) => (
              <a key={social.href} href={social.href} target="_blank" rel={SOCIAL_REL}>
                {social.label}
              </a>
            ))}
          </div>
          <div className="mt-10 space-y-4 font-mono text-[11px] text-[#8892b0]">
            <LangSwitch className="text-[#ccd6f6] [&_a[aria-current=true]]:text-[#64ffda] [&_button[aria-pressed=true]]:text-[#64ffda]" />
            <VersionSwitch current="noir" />
          </div>
        </aside>

        <main id="conteudo" className="max-w-2xl pb-20">
          <div className="relative max-w-sm">
            <img
              src="/vinicius.jpg"
              alt={copy.studio.photoAlt}
              width={1024}
              height={1024}
              className="aspect-square w-full rounded object-cover object-[center_20%] ring-1 ring-[#233554]"
            />
            <div className="absolute -bottom-4 left-3 min-w-[13.5rem] rounded border border-[#233554] bg-[#112240] px-3.5 py-2.5">
              <p className="flex items-center gap-2 text-sm text-[#e6f1ff]">
                <span className="size-2 rounded-full bg-[#64ffda]" aria-hidden />
                {copy.studio.photoCard}
              </p>
              <p className="mt-0.5 pl-4 font-mono text-[11px] text-[#8892b0]">{copy.hero.location}</p>
            </div>
          </div>
          <p className="mt-10 font-mono text-[12px] text-[#64ffda]">
            {copy.hero.location} · {copy.hero.year}
          </p>
          <p className="mt-3 text-sm text-[#8892b0]">
            {copy.hero.nowLabel}: {copy.hero.now.join(" · ")}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded border border-[#64ffda] px-4 py-2 font-mono text-[12px] text-[#64ffda] hover:bg-[#64ffda]/10"
            >
              {copy.studio.calendly}
            </a>
            <a
              href="#produtos"
              className="rounded border border-[#233554] px-4 py-2 font-mono text-[12px] text-[#ccd6f6] hover:border-[#64ffda]"
            >
              {copy.studio.ctaWork}
            </a>
          </div>

          <section id="sobre" className="mt-16 scroll-mt-8">
            <h2 className="font-mono text-[13px] text-[#64ffda]">{copy.studio.aboutTitle}</h2>
            <p className="mt-3 text-[#8892b0]">{copy.studio.aboutBody}</p>
            <p className="mt-8 font-mono text-[12px] text-[#64ffda]">{copy.studio.skillsTitle}</p>
            <div className="mt-4 space-y-5">
              {copy.studio.skills.map((group) => (
                <div key={group.group}>
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#8892b0]">
                    {group.group}
                  </p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded border border-[#233554] bg-[#112240] px-2.5 py-1 text-[13px] text-[#ccd6f6]"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section id="oficio" className="mt-16 scroll-mt-8">
            <h2 className="font-mono text-[13px] text-[#64ffda]">{copy.thinking.title}</h2>
            <p className="mt-3 text-[#8892b0]">{copy.thinking.lead}</p>
            <ol className="mt-8 space-y-8">
              {copy.thinking.principles.map((principle, index) => (
                <li key={principle.title}>
                  <p className="font-mono text-[12px] text-[#64ffda]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1 text-xl text-[#e6f1ff]">{principle.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-[#8892b0]">{principle.body}</p>
                </li>
              ))}
            </ol>
          </section>

          <section id="produtos" className="mt-20 scroll-mt-8">
            <h2 className="font-mono text-[13px] text-[#64ffda]">{copy.studio.workTitle}</h2>
            <p className="mt-3 text-[#8892b0]">{copy.studio.workLead}</p>
            <ol className="mt-8">
              {copy.work.items.map((item) => (
                <li
                  key={item.id}
                  className="group border-t border-[#233554] py-5 transition-colors hover:bg-[#112240]"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-3 px-1">
                    <h3 className="text-lg text-[#e6f1ff] group-hover:text-[#64ffda]">{item.title}</h3>
                    <p className="font-mono text-[11px] text-[#64ffda]">{item.metric}</p>
                  </div>
                  <p className="mt-2 px-1 text-[14px] leading-relaxed text-[#8892b0]">{item.body}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-block px-1 font-mono text-[12px] text-[#64ffda]"
                    >
                      {copy.studio.projectLink} ↗
                    </a>
                  ) : null}
                </li>
              ))}
            </ol>
          </section>

          <section id="experiencia" className="mt-20 scroll-mt-8">
            <h2 className="font-mono text-[13px] text-[#64ffda]">{copy.studio.experienceTitle}</h2>
            <ol className="mt-8">
              {copy.studio.jobs.map((job) => (
                <li key={job.company} className="border-t border-[#233554] py-6">
                  <p className="font-mono text-[12px] text-[#64ffda]">{job.period}</p>
                  <h3 className="mt-1 text-xl text-[#e6f1ff]">
                    {job.role}
                    <span className="text-[#8892b0]"> · {job.company}</span>
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-[#8892b0]">{job.body}</p>
                </li>
              ))}
            </ol>
          </section>

          <section id="conversar" className="mt-20 scroll-mt-8">
            <h2 className="font-mono text-[13px] text-[#64ffda]">{copy.talk.title}</h2>
            <p className="mt-3 text-[#8892b0]">{copy.talk.body}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-block rounded border border-[#64ffda] px-5 py-3 font-mono text-[13px] text-[#64ffda] hover:bg-[#64ffda]/10"
              >
                {copy.studio.calendly}
              </a>
              <a
                href={`mailto:${copy.talk.email}`}
                className="inline-block rounded border border-[#233554] px-5 py-3 font-mono text-[13px] text-[#ccd6f6] hover:border-[#64ffda]"
              >
                {copy.talk.email}
              </a>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function splitName(name: string) {
  const parts = name.split(" ");
  return [parts[0] ?? name, parts.slice(1).join(" ")] as const;
}
