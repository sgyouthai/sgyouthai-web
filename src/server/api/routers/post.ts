import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const postRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1).max(200),
        content: z.string().optional(),
        published: z.boolean().default(false),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { data, error } = await ctx.supabase
        .from("posts")
        .insert({
          title: input.title,
          content: input.content,
          published: input.published,
          author_id: ctx.user.id,
        })
        .select()
        .single();

      if (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }

      return data;
    }),

  getAll: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(10),
        offset: z.number().default(0),
        onlyPublished: z.boolean().default(true),
      })
    )
    .query(async ({ ctx, input }) => {
      let query = ctx.supabase
        .from("posts")
        .select(
          `
          *,
          profiles!inner(
            id,
            full_name,
            email,
            avatar_url
          )
        `
        )
        .order("created_at", { ascending: false })
        .range(input.offset, input.offset + input.limit - 1);

      if (input.onlyPublished) {
        query = query.eq("published", true);
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

  getMyPosts: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(10),
        offset: z.number().default(0),
      })
    )
    .query(async ({ ctx, input }) => {
      const { data, error } = await ctx.supabase
        .from("posts")
        .select("*")
        .eq("author_id", ctx.user.id)
        .order("created_at", { ascending: false })
        .range(input.offset, input.offset + input.limit - 1);

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
        .from("posts")
        .select(
          `
          *,
          profiles!inner(
            id,
            full_name,
            email,
            avatar_url
          )
        `
        )
        .eq("id", input.id)
        .single();

      if (error) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Post not found",
        });
      }

      return data;
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        title: z.string().min(1).max(200).optional(),
        content: z.string().optional(),
        published: z.boolean().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...updateData } = input;

      const { data, error } = await ctx.supabase
        .from("posts")
        .update(updateData)
        .eq("id", id)
        .eq("author_id", ctx.user.id)
        .select()
        .single();

      if (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }

      if (!data) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You can only update your own posts",
        });
      }

      return data;
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const { error } = await ctx.supabase
        .from("posts")
        .delete()
        .eq("id", input.id)
        .eq("author_id", ctx.user.id);

      if (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }

      return { success: true };
    }),

  togglePublish: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      // First, get the current status
      const { data: post, error: fetchError } = await ctx.supabase
        .from("posts")
        .select("published")
        .eq("id", input.id)
        .eq("author_id", ctx.user.id)
        .single();

      if (fetchError || !post) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Post not found or you do not have permission",
        });
      }

      // Toggle the status
      const { data, error } = await ctx.supabase
        .from("posts")
        .update({ published: !post.published })
        .eq("id", input.id)
        .eq("author_id", ctx.user.id)
        .select()
        .single();

      if (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }

      return data;
    }),
});
