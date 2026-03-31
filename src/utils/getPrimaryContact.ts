import { normalizeUrl } from "./normalizeUrl";

export type ContactLink = { href: string; label: string };

export function getPrimaryContact(
  email?: string | null,
  blog?: string | null,
  twitter?: string | null,
): ContactLink[] {
  const links: ContactLink[] = [];

  if (email) links.push({ href: `mailto:${email}`, label: "contact" });
  if (blog) links.push({ href: normalizeUrl(blog), label: "visit_site" });
  if (twitter)
    links.push({ href: `https://x.com/${twitter}`, label: "twitter" });

  return links;
}
