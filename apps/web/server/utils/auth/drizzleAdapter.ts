import type { Adapter, AdapterAccount } from '@auth/core/adapters';
import { eq, and } from 'drizzle-orm';
import type { db } from '@k2/db';
import { users, sessions, accounts, verificationTokens } from '@k2/db/schema';

// This adapter is based on nuxt-auth's Drizzle adapter implementation
// and implements better naming conventions.
export function SQLiteDrizzleAdapter(client: typeof db): Adapter {
  return {
    async createUser(data) {
      return (
        (await client.insert(users).values(data).returning().get()) ?? null
      );
    },

    async getUser(id) {
      return (
        (await client.select().from(users).where(eq(users.id, id)).get()) ??
        null
      );
    },

    async getUserByEmail(email) {
      return (
        (await client.select().from(users).where(eq(users.id, email)).get()) ??
        null
      );
    },

    async createSession(data) {
      return await client.insert(sessions).values(data).returning().get();
    },

    async getSessionAndUser(data) {
      return (
        (await client
          .select({
            session: sessions,
            user: users,
          })
          .from(sessions)
          .where(eq(sessions.sessionToken, data))
          .innerJoin(users, eq(users.id, sessions.userId))
          .get()) ?? null
      );
    },

    async updateUser(data) {
      if (!data.id) {
        throw new Error('No user id.');
      }

      return await client
        .update(users)
        .set(data)
        .where(eq(users.id, data.id))
        .returning()
        .get();
    },

    async updateSession(data) {
      return await client
        .update(sessions)
        .set(data)
        .where(eq(sessions.sessionToken, data.sessionToken))
        .returning()
        .get();
    },

    async linkAccount(rawAccount) {
      const updatedAccount = await client
        .insert(accounts)
        .values(rawAccount)
        .returning()
        .get();

      const account: AdapterAccount = {
        ...updatedAccount,
        type: updatedAccount.type,
        accessToken: updatedAccount.accessToken ?? undefined,
        tokenType: updatedAccount.tokenType ?? undefined,
        idToken: updatedAccount.idToken ?? undefined,
        refreshToken: updatedAccount.refreshToken ?? undefined,
        scope: updatedAccount.scope ?? undefined,
        expiresAt: updatedAccount.expiresAt ?? undefined,
        sessionState: updatedAccount.sessionState ?? undefined,
      };

      return account;
    },

    async getUserByAccount(account) {
      const results = await client
        .select()
        .from(accounts)
        .leftJoin(users, eq(users.id, accounts.userId))
        .where(
          and(
            eq(accounts.provider, account.provider),
            eq(accounts.providerAccountId, account.providerAccountId)
          )
        )
        .get();

      return results?.user ?? null;
    },

    async deleteSession(sessionToken) {
      return (
        (await client
          .delete(sessions)
          .where(eq(sessions.sessionToken, sessionToken))
          .returning()
          .get()) ?? null
      );
    },

    async createVerificationToken(token) {
      return await client
        .insert(verificationTokens)
        .values(token)
        .returning()
        .get();
    },

    async useVerificationToken(token) {
      try {
        return (
          (await client
            .delete(verificationTokens)
            .where(
              and(
                eq(verificationTokens.identifier, token.identifier),
                eq(verificationTokens.token, token.token)
              )
            )
            .returning()
            .get()) ?? null
        );
      } catch (err) {
        throw new Error('No verification token found.');
      }
    },

    async deleteUser(id) {
      return await client
        .delete(users)
        .where(eq(users.id, id))
        .returning()
        .get();
    },

    async unlinkAccount(account) {
      await client
        .delete(accounts)
        .where(
          and(
            eq(accounts.providerAccountId, account.providerAccountId),
            eq(accounts.provider, account.provider)
          )
        )
        .run();

      return undefined;
    },
  };
}
