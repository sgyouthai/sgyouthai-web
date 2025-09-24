import { createTRPCRouter } from "@/server/api/trpc";
import { authRouter } from "@/server/api/routers/auth";
import { profileRouter } from "@/server/api/routers/profile";
import { postRouter } from "@/server/api/routers/post";
import { linkinbioRouter } from "@/server/api/routers/linkinbio";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  profile: profileRouter,
  post: postRouter,
  linkinbio: linkinbioRouter,
});

export type AppRouter = typeof appRouter;
