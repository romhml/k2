// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxthq/ui-edge",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@sidebase/nuxt-auth",
  ],
  css: ["@/assets/css/main.css"],

  auth: {
    globalAppMiddleware: true,

    provider: {
      type: "authjs",
      defaultProvider: "github",
    },
  },

  ui: {
    safelistColors: ["red"],
  },

  pinia: {
    autoImports: ["defineStore", "storeToRefs"],
  },

  imports: {
    dirs: ["stores/**", "composables/**"],
  },

  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      link: [{ rel: "icon", type: "image/png", href: "/icon.png" }],
    },
  },

  typescript: {
    tsConfig: {
      extends: "@k2/tsconfig/base.json",
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
