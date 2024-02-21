<script setup lang="ts">
import { createPostSchema } from '@/server/schemas/posts'

const { user } = useAuth()
const postStore = usePostStore()

const state = reactive({
  content: '',
})

const onSubmit = async () => {
  await postStore.create(state)
  state.content = ''
}

await useAsyncData('posts', () => postStore.list())
</script>
<template>
  <div>
    <div
      class="mx-auto max-w-xl rounded-b-lg border-b border-l border-r border-slate-100 dark:border-slate-800"
    >
      <UForm
        class="p-4"
        :schema="createPostSchema"
        :state="state"
        @submit="onSubmit()"
      >
        <div class="space-x-2 flex">
          <div class="flex-none">
            <UAvatar
              size="md"
              :src="user?.image ?? false"
            />
          </div>
          <UFormGroup
            class="w-full inline"
            name="content"
          >
            <UTextarea
              v-model="state.content"
              size="xl"
              placeholder="Write your post here..."
              variant="none"
              :rows="5"
              :min="1"
              :max="280"
              autoresize
            />
          </UFormGroup>
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
      </UForm>

      <div
        v-for="post in postStore.posts"
        :key="post.id"
      >
        <hr class="border-slate-100 dark:border-slate-800" />
        <PostCard
          :created-at="post.createdAt"
          :content="post.content"
          :author="post.author"
          class="p-4"
        />
      </div>
    </div>
  </div>
</template>
