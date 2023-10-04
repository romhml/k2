import { createNuxtApiHandler } from 'trpc-nuxt'
import { createContext } from '../../trpc/context'
import { appRouter } from '../../trpc/routers'

export default createNuxtApiHandler({
  router: appRouter,
  createContext,
})
