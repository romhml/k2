import type { RouterInput, RouterOutput } from '@/server/trpc/routers';

export const usePostStore = defineStore('post', {
  state: () => ({
    posts: [] as RouterOutput['posts']['list'],
    offset: 0,
    limit: 10,
    hasMore: false,
  }),

  actions: {
    async list() {
      const { $client } = useNuxtApp();
      const posts = await $client.posts.list.query({
        offset: this.offset,
        limit: this.limit,
      });

      if (posts.length < this.limit) {
        this.hasMore = false;
      }

      this.offset += posts.length;
      this.posts.push(...posts);
      return posts;
    },

    async create(input: RouterInput['posts']['create']) {
      const { $client } = useNuxtApp();
      const post = await $client.posts.create.mutate(input);
      this.posts.unshift(post);
    },
  },
});
