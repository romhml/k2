import type { inferAsyncReturnType } from '@trpc/server'
import { eq } from 'drizzle-orm'
import type { H3Event } from 'h3'
import { getServerSession } from '#auth'
import { db } from '@k2/db'
import { users } from '@k2/db/schema'
import { authOptions } from '../api/auth/[...]'

export async function createContext(event: H3Event) {
  const session = await getServerSession(event, authOptions)
  let user

  if (session?.user?.email) {
    user = await db.query.users.findFirst({
      where: eq(users.email, session.user.email),
    })
  }

  return { user }
}

export type Context = inferAsyncReturnType<typeof createContext>
