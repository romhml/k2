<template>
  <div class="relative h-screen flex flex-col">
    <TheNavBar class="sticky top-0 z-50" />
    <div class="top-0 grow">
      <slot />
    </div>
    <TheFooter />
  </div>
</template>
