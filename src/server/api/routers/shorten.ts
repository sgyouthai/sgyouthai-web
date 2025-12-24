import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { nanoid } from "nanoid";
import { scrapeMeta } from "@/lib/scrape-meta";

export const shortLinksRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        longUrl: z.string().url(),
        code: z
          .string()
          .min(3)
          .max(32)
          .regex(/^[a-zA-Z0-9_-]+$/)
          .optional(),
        title: z.string().min(1).max(120).optional(),
        description: z.string().min(1).max(300).optional(),
        image: z.string().url().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const code = input.code ?? nanoid(7);

      // Scrape OG tags (best effort)
      let meta: { title?: string; description?: string; image?: string } = {};
      try {
        const m = await scrapeMeta(input.longUrl, { timeoutMs: 5000 });
        meta = { title: m.title, description: m.description, image: m.image };
      } catch {
        // ignore scrape failures
      }

      const { data, error } = await ctx.supabase
        .from("short_links")
        .insert({
          code,
          long_url: input.longUrl,
          og_title: input.title ?? meta.title ?? null,
          og_desc: input.description ?? meta.description ?? null,
          og_image: input.image ?? meta.image ?? null,
        })
        .select("code,long_url,og_title,og_desc,og_image")
        .single();

      if (error) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: error.message,
        });
      }

      const base = process.env.NEXT_PUBLIC_SITE_URL ?? "";
      const shortUrl = base
        ? `${base.replace(/\/$/, "")}/link/${data.code}`
        : `/link/${data.code}`;

      return { ...data, shortUrl };
    }),
  getByCode: publicProcedure
    .input(z.object({ code: z.string().min(1).max(64) }))
    .query(async ({ ctx, input }) => {
      const { data, error } = await ctx.supabase
        .from("short_links")
        .select("code,long_url,og_title,og_desc,og_image,clicks")
        .eq("code", input.code)
        .maybeSingle();

      if (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }
      if (!data) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Short link not found",
        });
      }

      const base = process.env.NEXT_PUBLIC_SITE_URL ?? "";
      const shortUrl = base
        ? `${base.replace(/\/$/, "")}/link/${data.code}`
        : `/link/${data.code}`;

      return { ...data, shortUrl };
    }),
});
