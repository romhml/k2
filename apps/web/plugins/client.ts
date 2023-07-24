import superjson from 'superjson';
import type { AppRouter } from '@/server/trpc/routers';
import { createTRPCProxyClient, httpBatchLink, loggerLink } from '@trpc/client';

export default defineNuxtPlugin(async () => {
  const runtimeConfig = useRuntimeConfig();
  const headers = useRequestHeaders(['cookie']);

  const client = createTRPCProxyClient<AppRouter>({
    links: [
      loggerLink({
        enabled: (opts) =>
          opts.direction === 'down' && opts.result instanceof Error,
      }),
      httpBatchLink({
        url: `${runtimeConfig.public.baseUrl}/api/trpc`,
        headers() {
          return headers;
        },
      }),
    ],
    transformer: superjson,
  });

  return {
    provide: {
      client,
    },
  };
});