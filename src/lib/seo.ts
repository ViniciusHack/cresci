import { copies, type Locale } from "./copy";
import {
  absoluteLocalizedUrl,
  localeFromLocation,
  localeFromPathname,
  localeFromSearch,
  localizedPath,
  stripLocalePrefix,
} from "./locale";
import {
  OG_IMAGE_PATH,
  SITE_EMAIL,
  SITE_FULL_NAME,
  SITE_NAME,
  SITE_URL,
  SOCIALS,
  absoluteUrl,
} from "./site";

export { localeFromLocation, localeFromPathname, localeFromSearch, localizedPath };

export type PageHeadInput = {
  title: string;
  description: string;
  path?: string;
  locale?: Locale;
  index?: boolean;
};

export function copyForLocation(pathname: string, search?: unknown) {
  const locale = localeFromLocation(pathname, search);
  return { locale, copy: copies[locale] };
}

export function pageHead({
  title,
  description,
  path = "/",
  locale = "pt-BR",
  index = true,
}: PageHeadInput) {
  const url = absoluteLocalizedUrl(path, locale);
  const ogImage = absoluteUrl(OG_IMAGE_PATH);
  const ogLocale = locale === "en" ? "en_US" : "pt_BR";
  const alternateLocale = locale === "en" ? "pt_BR" : "en_US";

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "author", content: SITE_FULL_NAME },
      {
        name: "robots",
        content: index
          ? "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
          : "noindex, follow",
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
      { property: "og:image:secure_url", content: ogImage },
      { property: "og:image:type", content: "image/jpeg" },
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
      ...(index ? languageAlternates(path) : []),
    ],
  };
}

export function homeJsonLd(locale: Locale) {
  const copy = copies[locale];
  const url = absoluteLocalizedUrl("/", locale);

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
          "@id": `${url.replace(/\/$/, "")}#profile`,
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
          name: SITE_FULL_NAME,
          givenName: "Vinícius",
          additionalName: "Wilbert",
          familyName: "Hack",
          alternateName: [
            SITE_NAME,
            "Vinicius Hack",
            "Vinicius Wilbert Hack",
            "Vinícius W. Hack",
          ],
          url: SITE_URL,
          image: {
            "@type": "ImageObject",
            url: absoluteUrl("/vinicius.jpg"),
            contentUrl: absoluteUrl("/vinicius.jpg"),
          },
          email: SITE_EMAIL,
          jobTitle: copy.studio.role,
          description: copy.meta.description,
          knowsLanguage: ["pt-BR", "en"],
          knowsAbout: [
            "software engineering",
            "product engineering",
            "React",
            "TypeScript",
            "mobile apps",
          ],
          address: {
            "@type": "PostalAddress",
            addressLocality: "Balneário Camboriú",
            addressRegion: "SC",
            addressCountry: "BR",
          },
          worksFor: [
            { "@type": "Organization", "name": "Automatize" },
            { "@type": "Organization", "name": "Layback Trading" },
          ],
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
  const pages = ["/", "/versoes"];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages.map((path) => sitemapEntry(path, today)).join("\n")}
</urlset>
`;
}

function sitemapEntry(path: string, lastmod: string): string {
  const pt = absoluteLocalizedUrl(path, "pt-BR");
  const en = absoluteLocalizedUrl(path, "en");
  const priority = path === "/" ? "1.0" : "0.4";
  const links = `    <xhtml:link rel="alternate" hreflang="pt-BR" href="${pt}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${en}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${pt}"/>`;

  return `  <url>
    <loc>${pt}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
${links}
  </url>
  <url>
    <loc>${en}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${path === "/" ? "0.8" : "0.3"}</priority>
${links}
  </url>`;
}

function languageAlternates(path: string) {
  const rest = stripLocalePrefix(path);
  return [
    { rel: "alternate", hrefLang: "pt-BR", href: absoluteLocalizedUrl(rest, "pt-BR") },
    { rel: "alternate", hrefLang: "en", href: absoluteLocalizedUrl(rest, "en") },
    { rel: "alternate", hrefLang: "x-default", href: absoluteLocalizedUrl(rest, "pt-BR") },
  ];
}
