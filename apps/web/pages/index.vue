<script setup lang="ts">
definePageMeta({
  auth: false,
})
</script>

<template>
  <div>
    <div
      class="mx-auto max-w-xl space-y-8 px-4 pb-32 pt-20 text-center sm:px-6 lg:px-8 lg:pb-40 lg:pt-28"
    >
      <nuxt-img
        src="/icon.svg"
        class="mx-auto w-40"
      />
      <p align="center">
        A <a href="https://nuxt.com">Nuxt</a> powered by
        <a href="https://bun.sh">Bun</a>,
        <a href="https://turbo.build">Turborepo</a>,
        <a href="https://trpc.io">TRPC</a> and
        <a href="https://orm.drizzle.team">Drizzle</a>.
      </p>
    </div>
  </div>
</template>
