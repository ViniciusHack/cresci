import { SITE_HOST, SITE_URL, isLocalHost } from "./site";
import type { Locale } from "./copy";

export const INDEXED_PATHS = new Set(["/", "/versoes"]);

export function stripLocalePrefix(pathname: string): string {
  return pathname.replace(/^\/en(?=\/|$)/, "") || "/";
}

export function localeFromPathname(pathname: string): Locale | null {
  if (pathname === "/en" || pathname.startsWith("/en/")) return "en";
  return null;
}

export function localizedPath(pathname: string, locale: Locale): string {
  const rest = stripLocalePrefix(pathname);
  if (locale !== "en" || !INDEXED_PATHS.has(rest)) return rest;
  return rest === "/" ? "/en" : `/en${rest}`;
}

export function isIndexedPath(pathname: string): boolean {
  return INDEXED_PATHS.has(stripLocalePrefix(pathname));
}

export function readLangParam(search: unknown): string | null {
  if (!search) return null;
  if (typeof search === "string") {
    const params = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
    return params.get("lang");
  }
  if (typeof search === "object" && "lang" in search) {
    const value = (search as { lang?: unknown }).lang;
    return typeof value === "string" ? value : null;
  }
  return null;
}

export function localeFromSearch(search: unknown): Locale | null {
  const lang = readLangParam(search);
  if (lang === "en" || lang === "en-US") return "en";
  if (lang === "pt" || lang === "pt-BR") return "pt-BR";
  return null;
}

export function localeFromLocation(pathname: string, search?: unknown): Locale {
  return localeFromPathname(pathname) ?? localeFromSearch(search) ?? "pt-BR";
}

export function canonicalRequestUrl(url: URL): string | null {
  const next = new URL(url.toString());
  let changed = false;

  if (!isLocalHost(next.hostname) && next.hostname !== SITE_HOST) {
    next.protocol = "https:";
    next.hostname = SITE_HOST;
    next.port = "";
    changed = true;
  }

  const lang = next.searchParams.get("lang");
  const rest = stripLocalePrefix(next.pathname);
  const indexed = INDEXED_PATHS.has(rest);

  if (indexed && (lang === "en" || lang === "en-US")) {
    next.searchParams.delete("lang");
    next.pathname = localizedPath(rest, "en");
    changed = true;
  } else if (indexed && (lang === "pt" || lang === "pt-BR")) {
    next.searchParams.delete("lang");
    next.pathname = rest;
    changed = true;
  }

  if (!changed) return null;
  if (next.toString() === url.toString()) return null;
  return next.toString();
}

export function absoluteLocalizedUrl(pathname: string, locale: Locale): string {
  const path = localizedPath(pathname, locale);
  return path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}
