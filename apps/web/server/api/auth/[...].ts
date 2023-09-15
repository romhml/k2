import GithubProvider from 'next-auth/providers/github';
import { NuxtAuthHandler } from '#auth';
import { db } from '@k2/db';
import { SQLiteDrizzleAdapter } from '@/server/utils/auth/drizzleAdapter';

const runtimeConfig = useRuntimeConfig();

export default NuxtAuthHandler({
  secret: runtimeConfig.auth.secret,
  adapter: SQLiteDrizzleAdapter(db),

  pages: {
    signIn: '/signin',
  },

  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GithubProvider.default({
      clientId: runtimeConfig.auth.github.clientId,
      clientSecret: runtimeConfig.auth.github.clientSecret,
    }),
  ],

  callbacks: {
    async redirect({ baseUrl }) {
      return baseUrl;
    },
  },
});
