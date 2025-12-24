import { createTRPCRouter } from "@/server/api/trpc";
import { authRouter } from "@/server/api/routers/auth";
import { profileRouter } from "@/server/api/routers/profile";
import { postRouter } from "@/server/api/routers/post";
import { linkinbioRouter } from "@/server/api/routers/linkinbio";
import { galleryRouter } from "@/server/api/routers/gallery";
import { teamRouter } from "@/server/api/routers/team";
import { partnersRouter } from "@/server/api/routers/partners";
import { shortLinksRouter } from "@/server/api/routers/shorten";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  profile: profileRouter,
  post: postRouter,
  linkinbio: linkinbioRouter,
  gallery: galleryRouter,
  team: teamRouter,
  partners: partnersRouter,
  shortLinks: shortLinksRouter,
});

export type AppRouter = typeof appRouter;
