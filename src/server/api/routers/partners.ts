import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const partnersRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const query = ctx.supabase
      .from("partners")
      .select("*")
      .order("id", { ascending: true })
      .order("display_order", { ascending: true });

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
