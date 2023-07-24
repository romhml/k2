import { initTRPC, TRPCError } from '@trpc/server';
import { Context } from '../trpc/context';
import superjson from 'superjson';

const t = initTRPC.context<Context>().create({ transformer: superjson });

export const publicProcedure = t.procedure;
export const router = t.router;
export const middleware = t.middleware;

export const isAuthenticated = middleware(async ({ next, ctx }) => {
  if (!ctx?.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({
    ctx,
  });
});

export const protectedProcedure = t.procedure.use(isAuthenticated);
