<script setup lang="ts">
definePageMeta({
  auth: false,
});
</script>

<template>
  <div>
    <div
      class="mx-auto max-w-xl space-y-8 px-4 pb-32 pt-20 text-center sm:px-6 lg:px-8 lg:pb-40 lg:pt-28"
    >
      <img
        src="/icon.svg"
        class="mx-auto w-40"
      />
      <p align="center">
        A <a href="https://nuxt.com">Nuxt</a> starter kit based on
        <a href="https://turbo.build">Turborepo</a>,
        <a href="https://trpc.io">TRPC</a> and
        <a href="https://prisma.io">Prisma</a>, providing a powerful combination
        for building Nuxt applications.
      </p>
    </div>
  </div>
</template>
