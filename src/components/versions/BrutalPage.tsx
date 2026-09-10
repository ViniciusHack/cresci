import { useState } from "react";

import { usePageTheme } from "../../hooks/page-theme";
import { useI18n } from "../../lib/i18n";
import { CALENDLY_URL, SOCIAL_REL } from "../../lib/site";
import { LangSwitch, VersionSwitch } from "./VersionChrome";

export function BrutalPage() {
  const { copy } = useI18n();
  usePageTheme("#fff46a", "#111111");
  const [openId, setOpenId] = useState(copy.work.items[0]?.id ?? "");
  const [first, last] = splitName(copy.hero.name);

  return (
    <div className="min-h-svh bg-[#fff46a] text-[#111] [font-family:'Space_Grotesk',ui-sans-serif,sans-serif]">
      <div className="mx-auto max-w-5xl px-4 py-6 md:px-6">
        <header className="flex flex-wrap items-end justify-between gap-4 border-[3px] border-black bg-white p-4 shadow-[6px_6px_0_#111]">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em]">{copy.studio.hello}</p>
            <h1 className="mt-1 text-4xl font-bold uppercase leading-none md:text-6xl">
              {first} {last}
            </h1>
            <p className="mt-2 text-sm font-semibold uppercase">{copy.studio.role}</p>
          </div>
          <LangSwitch className="text-[12px] font-bold uppercase [&_button[aria-pressed=true]]:bg-black [&_button[aria-pressed=true]]:px-2 [&_button[aria-pressed=true]]:text-[#fff46a]" />
        </header>

        <div className="mt-4 border-[3px] border-black bg-white px-4 py-3 shadow-[6px_6px_0_#111]">
          <VersionSwitch current="brutal" />
        </div>

        <section className="mt-6 grid gap-4 md:grid-cols-5">
          <div className="border-[3px] border-black bg-white p-5 shadow-[6px_6px_0_#111] md:col-span-3">
            <p className="text-xl font-semibold leading-snug">{copy.studio.headline}</p>
            <p className="mt-4 font-medium leading-snug">{copy.hero.thesis}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noreferrer"
                className="border-[3px] border-black bg-black px-3 py-2 text-[12px] font-bold uppercase text-[#fff46a]"
              >
                {copy.studio.calendly}
              </a>
              <a
                href="#produtos"
                className="border-[3px] border-black bg-white px-3 py-2 text-[12px] font-bold uppercase"
              >
                {copy.studio.ctaWork}
              </a>
            </div>
            <p className="mt-4 flex flex-wrap gap-3 text-[12px] font-bold uppercase">
              {copy.socials.map((social) => (
                <a key={social.href} href={social.href} target="_blank" rel={SOCIAL_REL}>
                  {social.label}
                </a>
              ))}
            </p>
          </div>
          <div className="border-[3px] border-black bg-black p-3 shadow-[6px_6px_0_#111] md:col-span-2">
            <img
              src="/vinicius.jpg"
              alt={copy.studio.photoAlt}
              width={1024}
              height={1024}
              className="aspect-square w-full object-cover object-[center_20%] grayscale"
            />
            <div className="mt-3 border-[3px] border-[#fff46a] bg-white px-3 py-2">
              <p className="flex items-center gap-2 text-[12px] font-bold uppercase">
                <span className="size-2 bg-emerald-600" aria-hidden />
                {copy.studio.photoCard}
              </p>
            </div>
            <p className="mt-4 text-[12px] font-bold uppercase text-[#fff46a]">
              {copy.hero.location} · {copy.hero.year}
            </p>
            <p className="mt-3 text-[11px] font-bold uppercase text-[#fff46a]">{copy.hero.nowLabel}</p>
            <ul className="mt-2 space-y-1 text-lg font-bold uppercase text-[#fff46a]">
              {copy.hero.now.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section id="sobre" className="mt-6">
          <h2 className="inline-block border-[3px] border-black bg-black px-3 py-1 text-2xl font-bold uppercase text-[#fff46a]">
            {copy.studio.aboutTitle}
          </h2>
          <p className="mt-4 max-w-xl font-medium">{copy.studio.aboutBody}</p>
          <p className="mt-6 text-[11px] font-bold uppercase">{copy.studio.skillsTitle}</p>
          <div className="mt-3 grid gap-4 md:grid-cols-3">
            {copy.studio.skills.map((group) => (
              <article
                key={group.group}
                className="border-[3px] border-black bg-white p-4 shadow-[6px_6px_0_#111]"
              >
                <p className="text-[12px] font-bold uppercase">{group.group}</p>
                <ul className="mt-3 space-y-1 font-medium">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="oficio" className="mt-6">
          <h2 className="inline-block border-[3px] border-black bg-black px-3 py-1 text-2xl font-bold uppercase text-[#fff46a]">
            {copy.thinking.title}
          </h2>
          <p className="mt-4 max-w-xl font-medium">{copy.thinking.lead}</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {copy.thinking.principles.map((principle, index) => (
              <article
                key={principle.title}
                className="border-[3px] border-black bg-white p-4 shadow-[6px_6px_0_#111]"
              >
                <p className="text-[12px] font-bold uppercase">0{index + 1}</p>
                <h3 className="mt-1 text-2xl font-bold uppercase leading-none">{principle.title}</h3>
                <p className="mt-3 font-medium leading-snug">{principle.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="produtos" className="mt-8">
          <h2 className="inline-block border-[3px] border-black bg-black px-3 py-1 text-2xl font-bold uppercase text-[#fff46a]">
            {copy.studio.workTitle}
          </h2>
          <p className="mt-4 max-w-xl font-medium">{copy.studio.workLead}</p>
          <ol className="mt-4 space-y-3">
            {copy.work.items.map((item, index) => {
              const open = openId === item.id;
              return (
                <li key={item.id} className="border-[3px] border-black bg-white shadow-[6px_6px_0_#111]">
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setOpenId(open ? "" : item.id)}
                    className="flex w-full items-center justify-between gap-4 p-4 text-left"
                  >
                    <span className="text-xl font-bold uppercase leading-none md:text-2xl">
                      <span className="mr-3">{String(index + 1).padStart(2, "0")}</span>
                      {item.title}
                    </span>
                    <span className="shrink-0 border-[3px] border-black bg-[#fff46a] px-2 py-1 text-[11px] font-bold uppercase">
                      {item.metric}
                    </span>
                  </button>
                  {open ? (
                    <div className="border-t-[3px] border-black p-4">
                      <p className="font-medium leading-snug">{item.body}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-3 inline-block border-[3px] border-black bg-black px-3 py-1 text-[12px] font-bold uppercase text-[#fff46a]"
                        >
                          {copy.studio.projectLink}
                        </a>
                      ) : null}
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ol>
        </section>

        <section id="experiencia" className="mt-8">
          <h2 className="inline-block border-[3px] border-black bg-black px-3 py-1 text-2xl font-bold uppercase text-[#fff46a]">
            {copy.studio.experienceTitle}
          </h2>
          <ol className="mt-4 space-y-3">
            {copy.studio.jobs.map((job) => (
              <li key={job.company} className="border-[3px] border-black bg-white p-4 shadow-[6px_6px_0_#111]">
                <p className="text-[12px] font-bold uppercase">{job.period}</p>
                <h3 className="mt-1 text-2xl font-bold uppercase leading-none">
                  {job.role}
                  <span className="text-[#555]"> · {job.company}</span>
                </h3>
                <p className="mt-3 font-medium leading-snug">{job.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section
          id="conversar"
          className="mt-8 border-[3px] border-black bg-black p-6 text-[#fff46a] shadow-[6px_6px_0_#111]"
        >
          <h2 className="text-4xl font-bold uppercase leading-none">{copy.talk.title}</h2>
          <p className="mt-4 max-w-xl text-lg font-medium text-white">{copy.talk.body}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-block border-[3px] border-[#fff46a] px-4 py-2 text-xl font-bold uppercase hover:bg-[#fff46a] hover:text-black"
            >
              {copy.studio.calendly}
            </a>
            <a
              href={`mailto:${copy.talk.email}`}
              className="inline-block border-[3px] border-[#fff46a] px-4 py-2 text-xl font-bold uppercase hover:bg-[#fff46a] hover:text-black"
            >
              {copy.talk.email}
            </a>
          </div>
          <div className="mt-4 flex gap-4 font-bold uppercase">
            {copy.socials.map((social) => (
              <a key={social.href} href={social.href} target="_blank" rel={SOCIAL_REL}>
                {social.label}
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function splitName(name: string) {
  const parts = name.split(" ");
  return [parts[0] ?? name, parts.slice(1).join(" ")] as const;
}
