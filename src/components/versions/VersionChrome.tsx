import { useRouterState } from "@tanstack/react-router";

import { useI18n } from "../../lib/i18n";
import { isIndexedPath, localizedPath } from "../../lib/locale";
import { versions, type VersionId } from "../../lib/versions";

function langClass(active: boolean) {
  return active
    ? "inline-flex min-h-11 min-w-9 items-center justify-center whitespace-nowrap opacity-100 underline decoration-current/55 underline-offset-[5px] sm:min-h-0 sm:min-w-0"
    : "inline-flex min-h-11 min-w-9 items-center justify-center whitespace-nowrap opacity-40 transition-opacity hover:opacity-75 sm:min-h-0 sm:min-w-0";
}

export function LangSwitch({ className = "" }: { className?: string }) {
  const { copy, locale, setLocale } = useI18n();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const indexed = isIndexedPath(pathname);

  return (
    <div
      role="group"
      aria-label={copy.lang.label}
      className={`flex items-center gap-0.5 sm:gap-2 ${className}`}
    >
      {indexed ? (
        <>
          <a
            href={localizedPath(pathname, "pt-BR")}
            aria-current={locale === "pt-BR" ? "true" : undefined}
            className={langClass(locale === "pt-BR")}
          >
            <LangText label={copy.lang.pt} />
          </a>
          <span aria-hidden className="opacity-30">
            /
          </span>
          <a
            href={localizedPath(pathname, "en")}
            aria-current={locale === "en" ? "true" : undefined}
            className={langClass(locale === "en")}
          >
            {copy.lang.en}
          </a>
        </>
      ) : (
        <>
          <button
            type="button"
            aria-pressed={locale === "pt-BR"}
            onClick={() => setLocale("pt-BR")}
            className={langClass(locale === "pt-BR")}
          >
            <LangText label={copy.lang.pt} />
          </button>
          <span aria-hidden className="opacity-30">
            /
          </span>
          <button
            type="button"
            aria-pressed={locale === "en"}
            onClick={() => setLocale("en")}
            className={langClass(locale === "en")}
          >
            {copy.lang.en}
          </button>
        </>
      )}
    </div>
  );
}

function LangText({ label }: { label: string }) {
  if (label !== "PT-BR") return label;
  return (
    <>
      <span className="sm:hidden">PT</span>
      <span className="hidden sm:inline">PT-BR</span>
    </>
  );
}

export function VersionSwitch({ current }: { current: VersionId }) {
  const { copy, locale } = useI18n();

  return (
    <nav aria-label={copy.nav.versions} className="flex flex-wrap items-center gap-x-3 gap-y-1">
      {versions.map((version) => {
        const label = copy.versions[version.id].name;
        const active = version.id === current;
        const href = version.id === "studio" ? localizedPath("/", locale) : version.href;
        return (
          <a
            key={version.id}
            href={href}
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
