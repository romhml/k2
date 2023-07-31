import { z } from "zod";
import { prisma } from "@k2/database";
import { createPostSchema } from "@/server/schemas/posts";
import { protectedProcedure, router } from "../trpc";

export const postsRouter = router({
  list: protectedProcedure
    .input(
      z.object({
        offset: z.number().default(0).nullish(),
        limit: z.number().default(10),
        authorId: z.string().optional().nullish(),
      }),
    )
    .query(async ({ input }) => {
      return await prisma.post.findMany({
        where: { authorId: input?.authorId ?? undefined },
        include: { author: true },
        orderBy: { createdAt: "desc" },
        skip: input?.offset ?? undefined,
        take: input?.limit,
      });
    }),

  create: protectedProcedure
    .input(createPostSchema)
    .mutation(async ({ ctx, input }) => {
      const post = await prisma.post.create({
        data: {
          ...input,
          authorId: ctx.user.id,
        },
        include: { author: true },
      });

      return post;
    }),
});