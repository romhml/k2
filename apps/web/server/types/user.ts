import { z } from 'zod';

export const updateUserSchema = z.object({
  name: z.string().trim().min(1).max(32),
});

export type UpdateUser = z.infer<typeof updateUserSchema>;
