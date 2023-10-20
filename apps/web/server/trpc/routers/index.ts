import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server'
import { publicProcedure, router } from '../trpc'
import { postsRouter } from './posts'

export const appRouter = router({
  probe: publicProcedure.query(() => 'OK'),
  posts: postsRouter,
})

export type RouterInput = inferRouterInputs<AppRouter>
export type RouterOutput = inferRouterOutputs<AppRouter>

export type AppRouter = typeof appRouter
