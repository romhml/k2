<script setup lang="ts">
definePageMeta({
  layout: 'none',
  middleware: 'guest-only',
  auth: { authenticatedRedirectTo: '/' },
})
const { signIn } = useAuth()
</script>

<template>
  <div class="flex justify-center h-full items-center">
    <UButton
      size="lg"
      color="black"
      icon="i-ri-github-fill"
      @click="signIn('github')"
    >
      Sign in with Github
    </UButton>
  </div>
</template>
