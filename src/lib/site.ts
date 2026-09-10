export const SITE_HOST = "viniciushack.com";
export const SITE_URL = `https://${SITE_HOST}`;
export const SITE_NAME = "Vinícius Hack";
export const SITE_EMAIL = "viniciuswhack@gmail.com";
export const OG_IMAGE_PATH = "/og.jpg";
export const CALENDLY_URL = "https://calendly.com/viniciusvwh1441/30min";

export const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/viniciushack" },
  { label: "GitHub", href: "https://github.com/ViniciusHack" },
] as const;

export const SOCIAL_REL = "me noopener noreferrer";

export function absoluteUrl(path = "/"): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized === "/" ? "/" : normalized}`;
}

export function isLocalHost(hostname: string): boolean {
  return hostname === "localhost" || hostname === "127.0.0.1" || hostname.endsWith(".localhost");
}

export function canonicalLocation(url: URL): string | null {
  if (isLocalHost(url.hostname) || url.hostname === SITE_HOST) return null;
  const next = new URL(url.toString());
  next.protocol = "https:";
  next.hostname = SITE_HOST;
  next.port = "";
  return next.toString();
}
