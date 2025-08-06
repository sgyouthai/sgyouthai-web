import { createTRPCRouter } from "@/server/api/trpc";
import { authRouter } from "@/server/api/routers/auth";
import { profileRouter } from "@/server/api/routers/profile";
import { postRouter } from "@/server/api/routers/post";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  profile: profileRouter,
  post: postRouter,
});

export type AppRouter = typeof appRouter;
