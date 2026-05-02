import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const galleryRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      const { data: files, error } = await ctx.supabase.storage
        .from("syai-web")
        .list("gallery");

      if (error) {
        console.error("Supabase storage.list error:", error);
        return [];
      }

      return (files ?? []).map((f) => {
        const path = `gallery/${f.name}`;
        const { data } = ctx.supabase.storage.from("syai-web").getPublicUrl(path);

        return { ...f, path, publicUrl: data?.publicUrl ?? null };
      });
    } catch (err) {
      console.error("Failed to fetch gallery files:", err);
      return [];
    }
  }),
});
