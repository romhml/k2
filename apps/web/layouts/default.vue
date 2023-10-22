<template>
  <div class="relative h-screen flex flex-col">
    <TheNavBar class="fixed w-full top-0 z-50" />
    <div class="top-0 grow mt-16">
      <slot />
    </div>
    <TheFooter />
  </div>
</template>
