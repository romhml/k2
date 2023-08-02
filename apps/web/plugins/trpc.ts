import { createTRPCProxyClient, httpBatchLink, loggerLink } from "@trpc/client";
import superjson from "superjson";
import type { AppRouter } from "@/server/trpc/routers";

export default defineNuxtPlugin(async () => {
  const runtimeConfig = useRuntimeConfig();

  const trpc = createTRPCProxyClient<AppRouter>({
    links: [
      loggerLink({
        enabled: (opts) =>
          opts.direction === "down" && opts.result instanceof Error,
      }),
      httpBatchLink({
        url: `${runtimeConfig.public.baseURL}/api/trpc`,
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
