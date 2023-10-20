import GithubProvider from '@auth/core/providers/github'
import type { AuthConfig } from '@auth/core/types'
import { NuxtAuthHandler } from '#auth'
import { db } from '@k2/db'
import { SQLiteDrizzleAdapter } from '@/server/utils/auth/drizzleAdapter'

// The #auth virtual import comes from this module. You can use it on the client
// and server side, however not every export is universal. For example do not
// use sign-in and sign-out on the server side.

const runtimeConfig = useRuntimeConfig()

export const authOptions: AuthConfig = {
  secret: runtimeConfig.authJs.secret,
  adapter: SQLiteDrizzleAdapter(db),

  pages: {
    signIn: '/signin',
  },

  providers: [
    GithubProvider({
      clientId: runtimeConfig.github.clientId,
      clientSecret: runtimeConfig.github.clientSecret,
    }),
  ],

  callbacks: {
    async redirect({ baseUrl }) {
      return baseUrl
    },
  },
}

export default NuxtAuthHandler(authOptions, runtimeConfig)
