import { NuxtAuthHandler } from '#auth';
import GithubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { Adapter } from 'next-auth/adapters';

import { PrismaClient } from '@k2/database';

const prisma = new PrismaClient();
const runtimeConfig = useRuntimeConfig();

export default NuxtAuthHandler({
  secret: runtimeConfig.auth.secret,
  adapter: PrismaAdapter(prisma) as Adapter,

  session: {
    strategy: 'jwt',
  },

  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GithubProvider.default({
      clientId: runtimeConfig.auth.github.clientId,
      clientSecret: runtimeConfig.auth.github.clientSecret,
    }),
  ],
});
