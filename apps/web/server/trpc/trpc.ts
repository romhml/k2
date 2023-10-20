import { TRPCError, initTRPC } from '@trpc/server'
import superjson from 'superjson'
import type { Context } from '@/server/trpc/context'

const t = initTRPC.context<Context>().create({ transformer: superjson })

export const publicProcedure = t.procedure
export const router = t.router
export const middleware = t.middleware

export const isAuthenticated = middleware(async ({ next, ctx }) => {
  if (!ctx?.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }

  return next({
    ctx: { ...ctx, user: ctx.user },
  })
})

export const protectedProcedure = publicProcedure.use(isAuthenticated)
