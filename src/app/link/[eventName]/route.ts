export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { isCrawler } from "@/lib/is-crawler";
import { api } from "@/server/api/server";

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll(`"`, "&quot;")
    .replaceAll("'", "&#039;");
}

function ogHtml(opts: {
  shortUrl: string;
  longUrl: string;
  title?: string | null;
  desc?: string | null;
  image?: string | null;
}) {
  const { shortUrl, longUrl, title, desc, image } = opts;

  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>${escapeHtml(title || "Redirecting…")}</title>

    <meta property="og:type" content="website" />
    <meta property="og:url" content="${escapeHtml(shortUrl)}" />
    ${
      title ? `<meta property="og:title" content="${escapeHtml(title)}" />` : ""
    }
    ${
      desc
        ? `<meta property="og:description" content="${escapeHtml(desc)}" />`
        : ""
    }
    ${
      image ? `<meta property="og:image" content="${escapeHtml(image)}" />` : ""
    }

    <meta name="twitter:card" content="summary_large_image" />
    <meta http-equiv="refresh" content="0;url=${escapeHtml(longUrl)}" />
  </head>
  <body>
    Redirecting to <a href="${escapeHtml(longUrl)}">${escapeHtml(longUrl)}</a>…
  </body>
</html>`;
}

export async function GET(
  req: Request,
  context: { params: { eventName: string } }
) {
  const code = context.params.eventName;

  const t = await api();

  let link: {
    code: string;
    long_url: string;
    og_title: string | null;
    og_desc: string | null;
    og_image: string | null;
  };

  try {
    link = await t.shortLinks.getByCode({ code });
  } catch (e) {
    return new NextResponse("Not found", { status: 404 });
  }

  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  const shortUrl = base
    ? `${base.replace(/\/$/, "")}/link/${code}`
    : `/link/${code}`;

  const wantsPreview = isCrawler(req.headers.get("user-agent"));

  if (wantsPreview) {
    return new NextResponse(
      ogHtml({
        shortUrl,
        longUrl: link.long_url,
        title: link.og_title,
        desc: link.og_desc,
        image: link.og_image,
      }),
      {
        headers: {
          "content-type": "text/html; charset=utf-8",
          "cache-control": "public, max-age=300",
        },
      }
    );
  }

  return NextResponse.redirect(link.long_url, { status: 302 });
}
