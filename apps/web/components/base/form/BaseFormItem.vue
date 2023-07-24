<script setup lang="ts">
import { z } from 'zod';

const props = defineProps<{
  path: string;
}>();

const errors = inject<Readonly<Ref<z.ZodIssue[]> | null>>('form-errors', null);
const error = computed(() => {
  return errors?.value?.find((error) => error.path.includes(props.path));
});
</script>

<template>
  <UFormGroup :error="error?.message">
    <slot />
  </UFormGroup>
</template>
