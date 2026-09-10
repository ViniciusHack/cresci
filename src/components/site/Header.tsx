import { HackTrigger } from "./HackEgg";
import { useI18n } from "../../lib/i18n";
import { localizedPath } from "../../lib/locale";
import { LangSwitch } from "../versions/VersionChrome";

export function Header() {
  const { copy, locale } = useI18n();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:bg-ink focus:px-3 focus:py-2 focus:text-sm focus:text-paper"
      >
        {copy.skip}
      </a>
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-4 md:px-8">
        <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink">
          <a href="#topo" className="transition-colors hover:text-gold">
            Vinícius
          </a>{" "}
          <HackTrigger className="hack-trigger inline">Hack</HackTrigger>
        </p>
        <div className="flex items-center gap-5 md:gap-8">
          <nav aria-label={copy.nav.sections} className="hidden items-center gap-5 sm:flex">
            <a className="text-[13px] text-ink-soft transition-colors hover:text-ink" href="#sobre">
              {copy.studio.navAbout}
            </a>
            <a
              className="hidden text-[13px] text-ink-soft transition-colors hover:text-ink lg:inline"
              href="#oficio"
            >
              {copy.nav.thinking}
            </a>
            <a className="text-[13px] text-ink-soft transition-colors hover:text-ink" href="#produtos">
              {copy.studio.navWork}
            </a>
            <a
              className="hidden text-[13px] text-ink-soft transition-colors hover:text-ink lg:inline"
              href="#experiencia"
            >
              {copy.studio.navExperience}
            </a>
            <a className="text-[13px] text-ink-soft transition-colors hover:text-ink" href="#conversar">
              {copy.studio.navContact}
            </a>
            <a
              className="hidden text-[13px] text-ink-soft transition-colors hover:text-ink lg:inline"
              href={localizedPath("/versoes", locale)}
            >
              {copy.nav.versions}
            </a>
          </nav>
          <LangSwitch className="font-mono text-[11px] tracking-[0.14em] [&_a[aria-current=true]]:text-ink" />
        </div>
      </div>
    </header>
  );
}
