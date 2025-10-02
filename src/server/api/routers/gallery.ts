import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const galleryRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const { data: files, error } = await ctx.supabase.storage
      .from("syai-web")
      .list("gallery");

    if (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error.message,
      });
    }

    return (files ?? []).map((f) => {
      const path = `gallery/${f.name}`;
      const { data } = ctx.supabase.storage.from("syai-web").getPublicUrl(path);
      return { ...f, path, publicUrl: data.publicUrl };
    });
  }),
});
