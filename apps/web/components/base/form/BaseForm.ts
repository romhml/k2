import { ZodSchema, z, ZodIssue, ZodError } from 'zod';

export interface Form<T> {
  validate(data: Partial<T>): T;
}

export default defineComponent({
  props: {
    schema: {
      type: Object as PropType<ZodSchema>,
      required: true,
    },
  },

  setup(props, { slots, expose }) {
    type Schema = z.infer<typeof props.schema>;
    const errors = ref<ZodIssue[]>([]);

    provide('form-errors', errors);

    expose({
      validate: (data: Partial<Schema>): Schema => {
        try {
          const result = props.schema.parse(data);
          errors.value = [];
          return result;
        } catch (error) {
          if (error instanceof ZodError) {
            errors.value = error.issues;
          }
          throw error;
        }
      },
    });

    return () => h('form', slots.default?.());
  },
});
