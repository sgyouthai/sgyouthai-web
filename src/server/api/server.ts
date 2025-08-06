import "server-only";

import { headers } from "next/headers";
import { cache } from "react";

import { createCallerFactory, createTRPCContext } from "@/server/api/trpc";
import { appRouter } from "@/server/api/root";

const createContext = cache(async () => {
  const heads = await headers();

  return createTRPCContext({
    headers: heads,
  });
});

const createCaller = createCallerFactory(appRouter);

export const api = cache(async () => {
  const context = await createContext();
  return createCaller(context);
});
