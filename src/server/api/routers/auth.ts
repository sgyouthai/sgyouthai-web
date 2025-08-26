import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const authRouter = createTRPCRouter({
  getSession: publicProcedure.query(({ ctx }) => {
    // Debug logging
    if (!ctx.user) {
      console.log("No user in session");
    }
    return ctx.user;
  }),

  signUp: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z
          .string()
          .min(12)
          .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
            "Password must contain uppercase, lowercase, number and special character"
          ),
        fullName: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { data, error } = await ctx.supabase.auth.signUp({
        email: input.email,
        password: input.password,
        options: {
          data: {
            full_name: input.fullName,
          },
          emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=/dashboard`,
        },
      });

      if (error) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: error.message,
        });
      }

      return { success: true, user: data.user };
    }),

  signIn: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { data, error } = await ctx.supabase.auth.signInWithPassword({
        email: input.email,
        password: input.password,
      });

      if (error) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: error.message,
        });
      }

      return { success: true, user: data.user };
    }),

  signOut: protectedProcedure.mutation(async ({ ctx }) => {
    await ctx.supabase.auth.signOut();
    return { success: true };
  }),
});
