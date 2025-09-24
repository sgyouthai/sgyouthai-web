// lib/scrapeMeta.ts
// Node runtime only (parsing HTML). No client imports here.

type Meta = {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  siteName?: string;
};

const getAttr = (html: string, name: string) => {
  // Matches: <meta property="og:title" content="...">
  const re = new RegExp(
    `<meta[^>]+(?:property|name)=["']${name}["'][^>]+content=["']([^"']+)["']`,
    "i"
  );
  const m = html.match(re);
  return m?.[1];
};

const getTitleTag = (html: string) => {
  const m = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  return m?.[1]?.trim();
};

const absolutize = (maybeUrl: string | undefined, base: string) => {
  if (!maybeUrl) return undefined;
  try {
    return new URL(maybeUrl, base).toString();
  } catch {
    return undefined;
  }
};

export async function scrapeMeta(
  targetUrl: string,
  opts?: { timeoutMs?: number }
): Promise<Meta> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), opts?.timeoutMs ?? 5000);

  let html = "";
  try {
    const res = await fetch(targetUrl, {
      signal: ctrl.signal,
      // cache externally but let Next control ISR above:
      next: { revalidate: 60 * 60 }, // 1 hour
      headers: {
        "user-agent":
          "Mozilla/5.0 (compatible; MetaFetcher/1.0; +https://example.com/bot)",
        accept: "text/html,application/xhtml+xml",
      },
    });
    html = await res.text();
  } finally {
    clearTimeout(t);
  }

  // Prefer OG, then Twitter, then plain tags
  const ogTitle = getAttr(html, "og:title");
  const twTitle = getAttr(html, "twitter:title");
  const title = ogTitle || twTitle || getTitleTag(html);

  const ogDesc = getAttr(html, "og:description");
  const twDesc = getAttr(html, "twitter:description");
  const desc = ogDesc || twDesc || getAttr(html, "description") || undefined;

  const ogImg = getAttr(html, "og:image") || getAttr(html, "twitter:image");
  const image = absolutize(ogImg, targetUrl);

  const siteName = getAttr(html, "og:site_name") || undefined;

  return {
    title,
    description: desc,
    image,
    url: targetUrl,
    siteName,
  };
}
