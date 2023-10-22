<script setup lang="ts">
useServerSeoMeta({
  title: 'k2',
})
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

:root.dark {
  @apply bg-slate-900;
}
</style>
