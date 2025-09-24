import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const linkinbioRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        showHidden: z.boolean().default(false),
      })
    )
    .query(async ({ ctx, input }) => {
      let query = ctx.supabase
        .from("linkinbio")
        .select("*")
        .order("created_at", { ascending: false })
        .order("order_by", { ascending: true });

      if (input.showHidden) {
        query = query.eq("hide", "FALSE");
      }

      const { data, error } = await query;

      if (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }

      return data;
    }),
});
