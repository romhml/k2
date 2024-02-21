<script setup lang="ts">
const { signOut, status, signIn, user } = useAuth()
const isSignedIn = computed(() => status.value === 'authenticated')

const items = computed(() => [
  [
    {
      label: 'Posts',
      icon: 'i-heroicons-envelope',
      async click() {
        await navigateTo('/posts')
      },
    },
  ],
  [
    {
      label: 'Sign out',
      icon: 'i-heroicons-arrow-left-on-rectangle',
      async click() {
        await signOut({ callbackUrl: '/' })
      },
    },
  ],
])
</script>

<template>
  <header
    class="h-16 border-b border-slate-100 bg-white dark:bg-slate-900 dark:border-slate-800"
  >
    <div
      class="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-8 py-2"
    >
      <BaseLogo class="h-8 w-8" />

      <div class="flex items-center space-x-4">
        <TheDarkModeButton />

        <UDropdown
          v-if="isSignedIn"
          :items="items"
          mode="hover"
          :popper="{ placement: 'bottom' }"
        >
          <UAvatar :src="user?.image ?? undefined" />
        </UDropdown>
        <UButton
          v-else
          variant="link"
          size="sm"
          color="black"
          @click="signIn()"
        >
          Sign In
        </UButton>
      </div>
    </div>
  </header>
</template>
