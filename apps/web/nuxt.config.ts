// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'node:path'

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxt/image',
    '@hebilicious/authjs-nuxt',
  ],

  alias: {
    cookie: resolve(__dirname, '../../node_modules/cookie'),
  },

  build: {
    transpile: ['trpc-nuxt', '@nuxt/ui-edge', 'valibot'],
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
      link: [{ rel: 'icon', type: 'image/jpeg', href: '/icon.jpg' }],
    },
  },

  // typescript: {
  //   tsConfig: {
  //     extends: '@k2/tsconfig/base.json',
  //   },
  // },

  runtimeConfig: {
    authJs: {
      origin: process.env.AUTH_ORIGIN,
      secret: process.env.AUTH_SECRET, // You can generate one with `openssl rand -base64 32`
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
    public: {
      authJs: {
        baseUrl: process.env.AUTH_URL, // The URL of your deployed app (used for origin Check in production)
        verifyClientOnEveryRequest: true, // whether to hit the /auth/session endpoint on every client request
      },
    },
  },
})
