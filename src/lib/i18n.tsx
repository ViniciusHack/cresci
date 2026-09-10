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

import { copies, isLocale, type Copy, type Locale } from "./copy";
import { localeFromSearch } from "./seo";
import { SITE_URL } from "./site";

const STORAGE_KEY = "vh-lang";

type I18nContextValue = {
  locale: Locale;
  copy: Copy;
  setLocale: (locale: Locale) => void;
};

const I18nContext = createContext<I18nContextValue | null>(null);

function localeFromStorage(): Locale | null {
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return isLocale(stored) ? stored : null;
}

function upsertMeta(selector: string, attr: "name" | "property", key: string, content: string) {
  let element = document.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function applyMeta(copy: Copy, locale: Locale) {
  const url = locale === "en" ? `${SITE_URL}/?lang=en` : `${SITE_URL}/`;

  document.title = copy.meta.title;
  document.documentElement.lang = locale;

  upsertMeta('meta[name="description"]', "name", "description", copy.meta.description);
  upsertMeta('meta[property="og:title"]', "property", "og:title", copy.meta.title);
  upsertMeta('meta[property="og:description"]', "property", "og:description", copy.meta.description);
  upsertMeta('meta[property="og:locale"]', "property", "og:locale", locale === "en" ? "en_US" : "pt_BR");
  upsertMeta('meta[property="og:url"]', "property", "og:url", url);
  upsertMeta('meta[name="twitter:title"]', "name", "twitter:title", copy.meta.title);
  upsertMeta('meta[name="twitter:description"]', "name", "twitter:description", copy.meta.description);

  const canonical = document.querySelector('link[rel="canonical"]');
  canonical?.setAttribute("href", url);
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const urlLocale = useRouterState({
    select: (state) => localeFromSearch(state.location.search),
  });
  const [locale, setLocaleState] = useState<Locale>(() => urlLocale ?? "pt-BR");

  useEffect(() => {
    if (urlLocale) {
      setLocaleState(urlLocale);
      return;
    }
    const stored = localeFromStorage();
    if (stored) setLocaleState(stored);
  }, [urlLocale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    const url = new URL(window.location.href);
    if (next === "pt-BR") url.searchParams.delete("lang");
    else url.searchParams.set("lang", next);
    window.history.replaceState({}, "", url);
  }, []);

  useEffect(() => {
    applyMeta(copies[locale], locale);
  }, [locale]);

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
