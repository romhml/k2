import { router, protectedProcedure } from '../trpc';
import { prisma } from 'database';
import { updateUserSchema } from '../../types/user';

export const userRouter = router({
  get: protectedProcedure.query(async ({ ctx }) => {
    return ctx.user;
  }),

  update: protectedProcedure
    .input(updateUserSchema)
    .mutation(async ({ ctx, input }) => {
      await prisma.user.update({
        where: { id: ctx.user.id },
        data: input,
      });
      return ctx.user;
    }),
});
