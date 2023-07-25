import { faker } from "@faker-js/faker";
import { User } from "@prisma/client";
import { prisma } from "..";

export const userFactory = async (overrides?: Partial<User>): Promise<User> => {
  return await prisma.user.create({
    data: {
      email: faker.internet.email(),
      image: faker.image.avatar(),
      name: faker.internet.userName(),
      ...overrides,
    },
  });
};
