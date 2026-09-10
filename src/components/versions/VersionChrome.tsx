import { useI18n } from "../../lib/i18n";
import { versions, type VersionId } from "../../lib/versions";

export function LangSwitch({ className = "" }: { className?: string }) {
  const { copy, locale, setLocale } = useI18n();

  return (
    <div
      role="group"
      aria-label={copy.lang.label}
      className={`flex items-center gap-2 ${className}`}
    >
      <button
        type="button"
        aria-pressed={locale === "pt-BR"}
        onClick={() => setLocale("pt-BR")}
      >
        {copy.lang.pt}
      </button>
      <span aria-hidden>/</span>
      <button type="button" aria-pressed={locale === "en"} onClick={() => setLocale("en")}>
        {copy.lang.en}
      </button>
    </div>
  );
}

export function VersionSwitch({ current }: { current: VersionId }) {
  const { copy } = useI18n();

  return (
    <nav aria-label={copy.nav.versions} className="flex flex-wrap items-center gap-x-3 gap-y-1">
      {versions.map((version) => {
        const label = copy.versions[version.id].name;
        const active = version.id === current;
        return (
          <a
            key={version.id}
            href={version.href}
            aria-current={active ? "page" : undefined}
            className={active ? "underline underline-offset-4" : "opacity-60 hover:opacity-100"}
          >
            {label}
          </a>
        );
      })}
    </nav>
  );
}
