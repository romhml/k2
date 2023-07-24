// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  modules: ['@sidebase/nuxt-auth'],

  auth: {
    globalAppMiddleware: true,

    provider: {
      type: 'authjs',
      defaultProvider: 'github',
    },
  },

  typescript: {
    tsConfig: {
      extends: '@k2/tsconfig/base.json',
    },
  },

  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL,
    },
    auth: {
      secret: process.env.AUTH_SECRET,

      github: {
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      },
    },
  },
});
