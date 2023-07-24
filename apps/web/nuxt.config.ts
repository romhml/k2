// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  extends: '../../packages/api',
  modules: ['@nuxthq/ui', '@pinia/nuxt', '@vueuse/nuxt'],

  css: ['@/assets/css/main.css'],

  ui: {
    safelistColors: ['red'],
  },

  pinia: {
    autoImports: ['defineStore', 'storeToRefs'],
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
});
