import { copies, type Locale } from "./copy";
import { OG_IMAGE_PATH, SITE_EMAIL, SITE_NAME, SITE_URL, SOCIALS, absoluteUrl } from "./site";

export type PageHeadInput = {
  title: string;
  description: string;
  path?: string;
  locale?: Locale;
  index?: boolean;
};

export function localeFromSearch(search: unknown): Locale | null {
  const lang = readLang(search);
  if (lang === "en" || lang === "en-US") return "en";
  if (lang === "pt" || lang === "pt-BR") return "pt-BR";
  return null;
}

export function copyForSearch(search: unknown) {
  const locale = localeFromSearch(search) ?? "pt-BR";
  return { locale, copy: copies[locale] };
}

export function pageHead({
  title,
  description,
  path = "/",
  locale = "pt-BR",
  index = true,
}: PageHeadInput) {
  const url = pageUrl(path, locale);
  const ogImage = absoluteUrl(OG_IMAGE_PATH);
  const ogLocale = locale === "en" ? "en_US" : "pt_BR";
  const alternateLocale = locale === "en" ? "pt_BR" : "en_US";

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "author", content: SITE_NAME },
      {
        name: "robots",
        content: index ? "index, follow" : "noindex, follow",
      },
      { name: "theme-color", content: "#f8fafc" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:locale", content: ogLocale },
      { property: "og:locale:alternate", content: alternateLocale },
      { property: "og:image", content: ogImage },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: title },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: ogImage },
      { name: "twitter:image:alt", content: title },
    ],
    links: [
      { rel: "canonical", href: url },
      ...(index ? languageAlternates() : []),
    ],
  };
}

export function homeJsonLd(locale: Locale) {
  const copy = copies[locale];
  const url = pageUrl("/", locale);

  return {
    type: "application/ld+json",
    children: JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          url: SITE_URL,
          name: SITE_NAME,
          inLanguage: locale === "en" ? "en" : "pt-BR",
          publisher: { "@id": `${SITE_URL}/#person` },
        },
        {
          "@type": "ProfilePage",
          "@id": `${url}#profile`,
          url,
          name: copy.meta.title,
          description: copy.meta.description,
          inLanguage: locale === "en" ? "en" : "pt-BR",
          isPartOf: { "@id": `${SITE_URL}/#website` },
          mainEntity: { "@id": `${SITE_URL}/#person` },
        },
        {
          "@type": "Person",
          "@id": `${SITE_URL}/#person`,
          name: SITE_NAME,
          url: SITE_URL,
          image: absoluteUrl("/vinicius.jpg"),
          email: SITE_EMAIL,
          jobTitle: copy.studio.role,
          description: copy.meta.description,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Balneário Camboriú",
            addressRegion: "SC",
            addressCountry: "BR",
          },
          sameAs: SOCIALS.map((social) => social.href),
        },
      ],
    }),
  };
}

export function robotsTxt(): string {
  return [
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${absoluteUrl("/sitemap.xml")}`,
    "",
  ].join("\n");
}

export function sitemapXml(): string {
  const today = new Date().toISOString().slice(0, 10);
  const urls = [
    { loc: absoluteUrl("/"), priority: "1.0" },
    { loc: `${absoluteUrl("/")}?lang=en`, priority: "0.8" },
    { loc: absoluteUrl("/versoes"), priority: "0.4" },
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls
  .map(
    (entry) => `  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${entry.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;
}

function languageAlternates() {
  return [
    { rel: "alternate", hrefLang: "pt-BR", href: absoluteUrl("/") },
    { rel: "alternate", hrefLang: "en", href: `${absoluteUrl("/")}?lang=en` },
    { rel: "alternate", hrefLang: "x-default", href: absoluteUrl("/") },
  ];
}

function pageUrl(path: string, locale: Locale): string {
  const url = absoluteUrl(path);
  return locale === "en" ? withLang(url, "en") : url;
}

function withLang(url: string, lang: string): string {
  const next = new URL(url);
  next.searchParams.set("lang", lang);
  return next.toString();
}

function readLang(search: unknown): string | null {
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
