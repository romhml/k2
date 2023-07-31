<script setup lang="ts">
const { signOut, status, signIn } = useAuth();
const isSignedIn = computed(() => status.value === "authenticated");
const { user } = useUserStore();

const items = computed(() => [
  [
    {
      label: "Posts",
      icon: "i-heroicons-envelope",
      async click() {
        await navigateTo("/posts");
      },
    },
  ],
  [
    {
      label: "Sign out",
      icon: "i-heroicons-arrow-left-on-rectangle",
      async click() {
        await signOut({ callbackUrl: "/" });
      },
    },
  ],
]);
</script>

<template>
  <header class="h-16 border-b border-slate-300">
    <div
      class="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-8 py-2"
    >
      <BaseLogo />

      <div>
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
          @click="signIn('github')"
        >
          Sign In
        </UButton>
      </div>
    </div>
  </header>
</template>
