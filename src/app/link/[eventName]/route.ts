export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { isCrawler } from "@/lib/is-crawler";
import { api } from "@/server/api/server";
import crypto from "crypto";
import { captureAndFlush } from "@/lib/posthog-server";

function getIp(req: Request) {
  const xff = req.headers.get("x-forwarded-for");
  return xff?.split(",")[0]?.trim() ?? null;
}

function distinctIdFromReq(req: Request) {
  // Stable-ish per user without cookies. Hash to avoid storing raw info.
  const ip = getIp(req) ?? "noip";
  const ua = req.headers.get("user-agent") ?? "noua";
  return crypto.createHash("sha256").update(`${ip}|${ua}`).digest("hex");
}

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(req: Request, context: any) {
  const code = context.params.eventName as string;

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

  const distinctId = distinctIdFromReq(req);
  const ref = req.headers.get("referer") ?? undefined;

  await captureAndFlush({
    distinctId,
    event: "shortlink_click",
    properties: {
      code,
      long_url: link.long_url,
      referrer: ref,
      $current_url: shortUrl,
      ...(getIp(req) ? { $ip: getIp(req) } : {}),
    },
  });

  return NextResponse.redirect(link.long_url, { status: 302 });
}
