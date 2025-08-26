import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const profileRouter = createTRPCRouter({
  get: protectedProcedure.query(async ({ ctx }) => {
    const { data, error } = await ctx.supabase
      .from("profiles")
      .select("*")
      .eq("id", ctx.user.id)
      .single();

    if (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error.message,
      });
    }

    return data;
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const { data, error } = await ctx.supabase
        .from("profiles")
        .select("*")
        .eq("id", input.id)
        .single();

      if (error) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Profile not found",
        });
      }

      return data;
    }),

  update: protectedProcedure
    .input(
      z.object({
        fullName: z.string().min(2).optional(),
        avatarUrl: z.string().url().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { data, error } = await ctx.supabase
        .from("profiles")
        .update({
          full_name: input.fullName,
          avatar_url: input.avatarUrl,
        })
        .eq("id", ctx.user.id)
        .select()
        .single();

      if (error) {
        console.error("Database error:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred while processing your request",
        });
      }

      return data;
    }),
});
