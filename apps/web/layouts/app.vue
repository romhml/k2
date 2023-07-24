<template>
  <div class="relative w-screen">
    <TheNavBar class="sticky top-0 z-50 bg-white" />
    <div class="top-0 h-[calc(100vh-4rem)] w-screen">
      <slot />
    </div>
  </div>
</template>
