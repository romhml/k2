<script setup lang="ts">
defineProps<{
  content: string
  createdAt: Date
  author: { image: string | null; name: string | null }
}>()
</script>

<template>
  <div class="flex space-x-3">
    <UAvatar
      class="flex-none"
      size="md"
      :src="author?.image ?? undefined"
    />
    <div class="mt-2.5 w-full space-y-2 overflow-hidden">
      <div class="flex items-baseline justify-between">
        <p class="text-sm font-semibold truncate">
          {{ author?.name ?? 'Anon' }}
        </p>
        <p class="text-xs text-slate-400">
          {{ $moment(createdAt).fromNow() }}
        </p>
      </div>
      <p class="mt-1.5 break-words hyphens-auto">
        {{ content }}
      </p>
    </div>
  </div>
</template>
