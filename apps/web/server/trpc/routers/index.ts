import { publicProcedure, router } from '../trpc';
import { postsRouter } from './posts';
import { userRouter } from './user';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

export const appRouter = router({
  probe: publicProcedure.query(() => 'OK'),
  user: userRouter,
  posts: postsRouter,
});

export type AppRouter = typeof appRouter;
export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;
