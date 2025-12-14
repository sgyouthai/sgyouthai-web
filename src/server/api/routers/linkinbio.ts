import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const linkinbioRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z
        .object({
          showHidden: z.boolean().optional().default(false),
        })
        .optional()
    )
    .query(async ({ ctx, input }) => {
      const showHidden = input?.showHidden ?? false;
      let query = ctx.supabase
        .from("linkinbio")
        .select("*")
        .order("created_at", { ascending: false })
        .order("order_by", { ascending: true });

      if (!showHidden) query = query.eq("hide", false);

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
