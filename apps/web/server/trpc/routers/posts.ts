import { z } from "zod";
import { db } from "@k2/db";
import { posts } from "@k2/db/schema";
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
      return await db.query.posts.findMany({
        columns: { id: true, content: true, createdAt: true },
        with: { author: { columns: { id: true, image: true, name: true } } },
        where: (posts, { eq }) =>
          input?.authorId ? eq(posts.authorId, input?.authorId) : undefined,
        orderBy: (posts, { desc }) => [desc(posts.createdAt)],
      });
    }),

  create: protectedProcedure
    .input(createPostSchema)
    .mutation(async ({ ctx, input }) => {
      const post = (
        await db
          .insert(posts)
          .values({
            ...input,
            authorId: ctx.user.id,
          })
          .returning()
      )[0];

      return {
        id: post.id,
        content: post.content,
        createdAt: post.createdAt,
        author: { id: ctx.user.id, image: ctx.user.image, name: ctx.user.name },
      };
    }),
});
