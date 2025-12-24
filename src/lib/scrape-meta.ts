// Node runtime only (parsing HTML). No client imports here.
export type Meta = {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  siteName?: string;
};

const MAX_HTML_BYTES = 1_000_000; // 1MB cap

const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const decodeHtmlEntities = (s: string) =>
  s
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");

const getMetaContent = (html: string, key: string) => {
  const k = escapeRegex(key);

  // Match a meta tag that contains property/name=key (content can be before/after)
  const tagRe = new RegExp(
    `<meta\\s+[^>]*(?:property|name)\\s*=\\s*["']${k}["'][^>]*>`,
    "ig"
  );

  const tags = html.match(tagRe);
  if (!tags?.length) return undefined;

  for (const tag of tags) {
    const contentRe = /content\s*=\s*["']([^"']+)["']/i;
    const m = tag.match(contentRe);
    if (m?.[1]) return decodeHtmlEntities(m[1].trim());
  }
  return undefined;
};

const getTitleTag = (html: string) => {
  const m = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const t = m?.[1]?.trim();
  return t ? decodeHtmlEntities(t) : undefined;
};

const absolutize = (maybeUrl: string | undefined, base: string) => {
  if (!maybeUrl) return undefined;
  try {
    return new URL(maybeUrl, base).toString();
  } catch {
    return undefined;
  }
};

const safeUrl = (input: string) => {
  const u = new URL(input);
  if (!["http:", "https:"].includes(u.protocol))
    throw new Error("Invalid protocol");
  const h = u.hostname.toLowerCase();
  if (h === "localhost" || h.endsWith(".local") || h.endsWith(".internal")) {
    throw new Error("Blocked hostname");
  }
  return u;
};

export async function scrapeMeta(
  targetUrl: string,
  opts?: { timeoutMs?: number }
): Promise<Meta> {
  const u = safeUrl(targetUrl);

  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), opts?.timeoutMs ?? 5000);

  try {
    const res = await fetch(u.toString(), {
      signal: ctrl.signal,
      redirect: "follow",
      headers: {
        "user-agent":
          "Mozilla/5.0 (compatible; MetaFetcher/1.0; +https://example.com/bot)",
        accept: "text/html,application/xhtml+xml",
      },
    });

    const finalUrl = res.url || u.toString();

    // Read with size cap
    const buf = await res.arrayBuffer();
    if (buf.byteLength > MAX_HTML_BYTES) throw new Error("HTML too large");

    const html = new TextDecoder("utf-8").decode(buf);

    const title =
      getMetaContent(html, "og:title") ||
      getMetaContent(html, "twitter:title") ||
      getTitleTag(html);

    const description =
      getMetaContent(html, "og:description") ||
      getMetaContent(html, "twitter:description") ||
      getMetaContent(html, "description");

    const imgRaw =
      getMetaContent(html, "og:image") || getMetaContent(html, "twitter:image");

    const image = absolutize(imgRaw, finalUrl);

    const siteName = getMetaContent(html, "og:site_name");

    return { title, description, image, url: finalUrl, siteName };
  } finally {
    clearTimeout(t);
  }
}
