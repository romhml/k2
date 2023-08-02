// https://nuxt.com/docs/api/configuration/nuxt-config

const baseURL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.BASE_URL;

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
    baseURL,
    globalAppMiddleware: true,

    provider: {
      type: "authjs",
      defaultProvider: "github",
    },
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
      baseURL,
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
