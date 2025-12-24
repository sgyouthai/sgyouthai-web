// src/app/api/shorten/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { z } from "zod";
import { nanoid } from "nanoid";
import { createClient } from "@/lib/supabase/server";
import { scrapeMeta } from "@/lib/scrape-meta";

const Body = z.object({
  longUrl: z.string().url(),
  // optional manual overrides
  title: z.string().min(1).max(120).optional(),
  description: z.string().min(1).max(300).optional(),
  image: z.string().url().optional(),
  // optional: custom code/slug
  code: z
    .string()
    .min(3)
    .max(32)
    .regex(/^[a-zA-Z0-9_-]+$/)
    .optional(),
});

export async function POST(req: Request) {
  const body = Body.parse(await req.json());

  const code = body.code ?? nanoid(7);

  // scrape once to cache preview (non-fatal if it fails)
  let meta: { title?: string; description?: string; image?: string } = {};
  try {
    const scraped = await scrapeMeta(body.longUrl, { timeoutMs: 5000 });
    meta = {
      title: scraped.title,
      description: scraped.description,
      image: scraped.image,
    };
  } catch {
    // ignore scrape errors
  }

  const supabase = supabaseAdmin();

  const { error } = await supabase.from("short_links").insert({
    code,
    long_url: body.longUrl,
    og_title: body.title ?? meta.title ?? null,
    og_desc: body.description ?? meta.description ?? null,
    og_image: body.image ?? meta.image ?? null,
  });

  if (error) {
    // common: duplicate code
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const shortBase =
    process.env.NEXT_PUBLIC_SHORT_BASE_URL ?? "http://localhost:3000";

  return NextResponse.json({
    code,
    shortUrl: `${shortBase}/${code}`,
  });
}
