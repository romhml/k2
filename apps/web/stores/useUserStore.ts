import type { RouterOutput } from '@/server/trpc/routers';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as RouterOutput['user']['get'] | null,
  }),

  actions: {
    async get() {
      const { $trpc } = useNuxtApp();
      this.user = await $trpc.user.get.query();
    },
  },
});
