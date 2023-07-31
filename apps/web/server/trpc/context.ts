import { inferAsyncReturnType } from "@trpc/server";
import { H3Event } from "h3";
import { getServerSession } from "#auth";
import { prisma } from "@k2/database";

export async function createContext(event: H3Event) {
  const session = await getServerSession(event);

  if (session?.user?.email) {
    const user = await prisma.user.findUniqueOrThrow({
      where: { email: session.user.email },
    });
    return { user: user };
  }

  return {};
}

export type Context = inferAsyncReturnType<typeof createContext>;
