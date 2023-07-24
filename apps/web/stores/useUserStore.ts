import type { RouterOutput, RouterInput } from '@k2/api/server/trpc/routers';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as RouterOutput['user']['get'] | null,
  }),

  actions: {
    async get() {
      const trpc = useTRPC();
      console.log('trpc', trpc);
      this.user = await trpc.user.get.query();
    },

    async update(input: RouterInput['user']['update']) {
      const trpc = useTRPC();
      this.user = await trpc.user.update.mutate(input);
    },
  },
});
