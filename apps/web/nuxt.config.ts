// https://nuxt.com/docs/api/configuration/nuxt-config

const authURL =
  process.env.AUTH_URL ?? process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : undefined;

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@sidebase/nuxt-auth',
    '@nuxt/image',
  ],

  css: ['@/assets/css/main.css'],
  build: {
    transpile: ['trpc-nuxt', '@nuxt/ui-edge', 'valibot'],
  },

  auth: {
    globalAppMiddleware: true,
    baseURL: authURL,
    provider: {
      type: 'authjs',
      addDefaultCallbackUrl: true,
    },
  },

  pinia: {
    autoImports: ['defineStore', 'storeToRefs'],
  },

  ui: {
    icons: ['heroicons', 'ri'],
  },

  imports: {
    dirs: ['stores/**', 'composables/**'],
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      link: [{ rel: 'icon', type: 'image/png', href: '/icon.png' }],
    },
  },

  typescript: {
    tsConfig: {
      extends: '@k2/tsconfig/base.json',
    },
  },

  runtimeConfig: {
    auth: {
      secret: process.env.AUTH_SECRET,
      github: {
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      },
    },
  },
});
