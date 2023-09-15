import { loggerLink } from '@trpc/client';
import superjson from 'superjson';
import { createTRPCNuxtClient, httpBatchLink } from 'trpc-nuxt/client';
import type { AppRouter } from '@/server/trpc/routers';

export default defineNuxtPlugin(async () => {
  const trpc = createTRPCNuxtClient<AppRouter>({
    links: [
      loggerLink({
        enabled: (opts) =>
          opts.direction === 'down' && opts.result instanceof Error,
      }),
      httpBatchLink({
        url: '/api/trpc',
      }),
    ],
    transformer: superjson,
  });

  return {
    provide: {
      trpc,
    },
  };
});
