import { usePageTheme } from "../../hooks/page-theme";
import { useI18n } from "../../lib/i18n";
import { versions } from "../../lib/versions";
import { LangSwitch } from "./VersionChrome";

const skins: Record<string, string> = {
  editorial: "bg-[#f6f1e8] text-[#14110e] font-display",
  studio: "bg-slate-50 text-blue-700 font-sans",
  noir: "bg-[#0a192f] text-[#64ffda] font-sans",
  brutal:
    "bg-[#fff46a] text-black [font-family:'Space_Grotesk',sans-serif] font-bold uppercase border-[3px] border-black shadow-[6px_6px_0_#111]",
};

export function VersoesPage() {
  const { copy } = useI18n();
  usePageTheme("#111111", "#f4f4f4");

  return (
    <div className="min-h-svh bg-[#111] px-5 py-10 text-[#f4f4f4]">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#888]">
              {copy.nav.versions}
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-6xl">{copy.versions.title}</h1>
            <p className="mt-4 max-w-xl text-[#bdbdbd]">{copy.versions.lead}</p>
          </div>
          <LangSwitch className="font-mono text-[12px] [&_button[aria-pressed=true]]:text-white" />
        </div>

        <ul className="mt-12 grid gap-4 md:grid-cols-2">
          {versions.map((version) => {
            const item = copy.versions[version.id];
            return (
              <li key={version.id}>
                <a href={version.href} className={`block min-h-[180px] p-6 transition-transform hover:-translate-y-0.5 ${skins[version.id]}`}>
                  <p className="text-[11px] uppercase tracking-[0.16em] opacity-70">{version.id}</p>
                  <h2 className="mt-3 text-3xl leading-none">{item.name}</h2>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed opacity-80">{item.tag}</p>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
