import { PrismaClient } from "@prisma/client";

export * from "@prisma/client";

const global: { prisma?: PrismaClient } = {};

export const prisma = global.prisma || new PrismaClient();

if (process.env?.NODE_ENV !== "production") global.prisma = prisma;
