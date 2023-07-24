import type { RouterOutput, RouterInput } from '@/server/trpc/routers';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as RouterOutput['user']['get'] | null,
  }),

  actions: {
    async get() {
      const { $client } = useNuxtApp();
      this.user = await $client.user.get.query();
    },

    async update(input: RouterInput['user']['update']) {
      const { $client } = useNuxtApp();
      this.user = await $client.user.update.mutate(input);
    },
  },
});
