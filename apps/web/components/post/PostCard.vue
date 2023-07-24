<script setup lang="ts">
defineProps<{
  content: string;
  createdAt: Date;
  author: { image: string | null; name: string | null };
}>();
</script>

<template>
  <div class="flex space-x-2">
    <UAvatar
      class="flex-none"
      size="md"
      :src="author?.image ?? undefined"
    />
    <div class="mt-2 w-full space-y-2">
      <div class="flex w-full items-baseline justify-between">
        <p class="text-sm font-semibold">
          {{ author?.name ?? 'Anon' }}
        </p>
        <p class="text-xs text-neutral-400">
          {{ $moment(createdAt).fromNow() }}
        </p>
      </div>
      <p class="mt-1.5">
        {{ content }}
      </p>
    </div>
  </div>
</template>
