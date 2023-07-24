<script setup lang="ts">
import { createPostSchema, CreatePost } from '@k2/api/server/types/posts';
import { Form } from '@/components/base/form/BaseForm';

const { user } = useUserStore();
const postStore = usePostStore();
await useAsyncData('posts', () => postStore.list());

const form = ref<Form<CreatePost>>();
const state = ref({
  content: '',
});

const onSubmit = async () => {
  const data = form.value!.validate(state.value);
  await postStore.create(data);
  state.value.content = '';
};

const container = ref();
useInfiniteScroll(
  container,
  async () => {
    await postStore.list();
  },
  {
    interval: 500,
  }
);

await useAsyncData('posts', () => postStore.list());
</script>
<template>
  <div
    ref="container"
    class="h-full overflow-y-scroll"
  >
    <div
      class="mx-auto w-full max-w-xl rounded-b-lg border-b border-l border-r border-slate-200"
    >
      <BaseForm
        ref="form"
        class="p-4"
        :schema="createPostSchema"
        @submit.prevent="onSubmit()"
      >
        <div class="flex space-x-2">
          <UAvatar
            class="flex-none"
            size="md"
            :src="user?.image ?? false"
          />

          <BaseFormItem
            class="w-full"
            path="content"
          >
            <UTextarea
              v-model="state.content"
              size="xl"
              placeholder="Write your post here..."
              variant="none"
              :rows="1"
              autoresize
            />
          </BaseFormItem>
        </div>

        <div class="flex justify-end">
          <UButton
            type="submit"
            color="black"
            icon="i-heroicons-arrow-right-20-solid"
            variant="link"
            trailing
          >
            Post
          </UButton>
        </div>
      </BaseForm>

      <div
        v-for="post in postStore.posts"
        :key="post.id"
      >
        <hr class="border-slate-200" />
        <PostCard
          v-bind="post"
          class="p-4"
        />
      </div>
    </div>
  </div>
</template>
