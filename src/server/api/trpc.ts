import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";
import { createClient } from "@/lib/supabase/server";
import { checkRateLimit } from "@/lib/rate-limit-memory";

export const createTRPCContext = async (opts?: { headers?: Headers }) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return {
    supabase,
    user,
    headers: opts?.headers,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

const rateLimitMiddleware = t.middleware(async ({ ctx, path, next }) => {
  const exemptPaths = ["auth.getSession"];

  if (exemptPaths.includes(path)) {
    return next();
  }

  const identifier =
    ctx.user?.id ||
    ctx.headers?.get("x-forwarded-for")?.split(",")[0] ||
    ctx.headers?.get("x-real-ip") ||
    "anonymous";

  let maxAttempts: number;
  let windowMs: number;

  if (path.startsWith("auth.") && path !== "auth.getSession") {
    maxAttempts = 5;
    windowMs = 60000;
  } else if (
    path.includes("create") ||
    path.includes("update") ||
    path.includes("delete")
  ) {
    maxAttempts = 20;
    windowMs = 60000;
  } else {
    maxAttempts = 100;
    windowMs = 60000;
  }

  const rateLimitKey = `${identifier}:${path}`;
  const allowed = checkRateLimit(rateLimitKey, maxAttempts, windowMs);

  if (!allowed) {
    console.warn(`Rate limit exceeded for ${identifier} on ${path}`);
    throw new TRPCError({
      code: "TOO_MANY_REQUESTS",
      message: "Too many requests. Please slow down and try again.",
    });
  }

  return next();
});

const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
    },
  });
});

export const createCallerFactory = t.createCallerFactory;
export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure.use(rateLimitMiddleware);
export const protectedProcedure = t.procedure
  .use(rateLimitMiddleware)
  .use(enforceUserIsAuthed);
