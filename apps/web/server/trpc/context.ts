import { inferAsyncReturnType } from '@trpc/server';
import { eq } from 'drizzle-orm';
import { H3Event } from 'h3';
import { getServerSession } from '#auth';
import { db } from '@k2/db';
import { users } from '@k2/db/schema';

export async function createContext(event: H3Event) {
  const session = await getServerSession(event);

  if (session?.user?.email) {
    const user = await db.query.users.findFirst({
      where: eq(users.email, session.user.email),
    });
    return user ? { user } : {};
  }

  return {};
}

export type Context = inferAsyncReturnType<typeof createContext>;
