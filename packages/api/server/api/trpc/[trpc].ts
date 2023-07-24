import { createNuxtApiHandler } from 'trpc-nuxt';
import { appRouter } from '../../trpc/routers';
import { createContext } from '../../trpc/context';

export default createNuxtApiHandler({
  router: appRouter,
  createContext,
});
