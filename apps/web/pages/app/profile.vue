<script setup lang="ts">
import { Form } from '@/components/base/form/BaseForm';
import { UpdateUser, updateUserSchema } from '@k2/api/server/types/user';

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const form = ref<Form<UpdateUser>>();
const state = ref({
  name: user.value?.name ?? '',
});

const onSubmit = async () => {
  const data = form.value!.validate(state.value);
  await userStore.update(data);
  state.value = data;
};
</script>
<template>
  <div
    ref="container"
    class="h-full overflow-y-scroll"
  >
    <div
      class="mx-auto flex w-full max-w-xl flex-col rounded-b-lg border-b border-l border-r border-slate-200"
    >
      <div
        class="flex flex-col items-center justify-center space-y-2 py-8 text-center"
      >
        <UAvatar
          class="flex-none"
          size="lg"
          :src="user?.image ?? undefined"
        />
        <BaseForm
          ref="form"
          :schema="updateUserSchema"
          @submit="onSubmit()"
        >
          <BaseFormItem path="name">
            <UInput
              v-model="state.name"
              class="text-center font-semibold"
              size="md"
              placeholder="Enter username..."
              variant="none"
              @blur="onSubmit()"
            />
          </BaseFormItem>
        </BaseForm>
        <p class="text-sm text-neutral-600">
          {{ user?.email }}
        </p>
      </div>
    </div>
  </div>
</template>
