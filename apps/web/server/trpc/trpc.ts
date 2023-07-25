import { TRPCError, initTRPC } from "@trpc/server";
import superjson from "superjson";
import { Context } from "@/server/trpc/context";

const t = initTRPC.context<Context>().create({ transformer: superjson });

export const publicProcedure = t.procedure;
export const router = t.router;
export const middleware = t.middleware;

export const isAuthenticated = middleware(async ({ next, ctx }) => {
  if (!ctx?.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx,
  });
});

export const protectedProcedure = t.procedure.use(isAuthenticated);
