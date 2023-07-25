import { faker } from "@faker-js/faker";
import { Post } from "@prisma/client";
import { prisma } from "..";
import { userFactory } from "./user";

export const postFactory = async (overrides?: Partial<Post>): Promise<Post> => {
  const authorId = overrides?.authorId ?? (await userFactory()).id;
  return await prisma.post.create({
    data: {
      content: faker.lorem.paragraphs(3),
      authorId,
      ...overrides,
    },
    include: { author: true },
  });
};
