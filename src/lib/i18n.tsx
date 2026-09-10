import { useRouterState } from "@tanstack/react-router";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { copies, type Copy, type Locale } from "./copy";
import { localeFromLocation, localizedPath, stripLocalePrefix } from "./locale";
import { SITE_URL } from "./site";

type I18nContextValue = {
  locale: Locale;
  copy: Copy;
  setLocale: (locale: Locale) => void;
};

const I18nContext = createContext<I18nContextValue | null>(null);

function upsertMeta(selector: string, attr: "name" | "property", key: string, content: string) {
  let element = document.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function pageCopy(copy: Copy, pathname: string) {
  const rest = stripLocalePrefix(pathname);
  if (rest === "/versoes") return copy.versions.meta;
  return copy.meta;
}

function applyMeta(copy: Copy, locale: Locale, pathname: string) {
  const meta = pageCopy(copy, pathname);
  const path = localizedPath(pathname, locale);
  const url = `${SITE_URL}${path === "/" ? "/" : path}`;

  document.title = meta.title;
  document.documentElement.lang = locale;

  upsertMeta('meta[name="description"]', "name", "description", meta.description);
  upsertMeta('meta[property="og:title"]', "property", "og:title", meta.title);
  upsertMeta('meta[property="og:description"]', "property", "og:description", meta.description);
  upsertMeta('meta[property="og:locale"]', "property", "og:locale", locale === "en" ? "en_US" : "pt_BR");
  upsertMeta('meta[property="og:url"]', "property", "og:url", url);
  upsertMeta('meta[name="twitter:title"]', "name", "twitter:title", meta.title);
  upsertMeta('meta[name="twitter:description"]', "name", "twitter:description", meta.description);

  const canonical = document.querySelector('link[rel="canonical"]');
  canonical?.setAttribute("href", url);
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const search = useRouterState({ select: (state) => state.location.search });
  const urlLocale = localeFromLocation(pathname, search);
  const [locale, setLocaleState] = useState<Locale>(() => urlLocale);

  useEffect(() => {
    setLocaleState(urlLocale);
  }, [urlLocale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
  }, []);

  useEffect(() => {
    applyMeta(copies[locale], locale, pathname);
  }, [locale, pathname]);

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      copy: copies[locale],
      setLocale,
    }),
    [locale, setLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return context;
}
