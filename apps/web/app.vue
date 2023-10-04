<script setup lang="ts">
useServerSeoMeta({
  title: 'k2',
})

const { status } = useAuth()
const userStore = useUserStore()

if (process.client) {
  watch(
    () => status.value,
    async (value) => {
      if (value === 'authenticated' && process.client) {
        await userStore.get()
      }
    },
    { immediate: true }
  )
}
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.15s ease;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 100ms;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
