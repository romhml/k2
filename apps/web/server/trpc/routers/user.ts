import { protectedProcedure, router } from "../trpc";

export const userRouter = router({
  get: protectedProcedure.query(async ({ ctx }) => {
    return ctx.user;
  }),
});
