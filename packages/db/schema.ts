import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import {
  sqliteTable,
  uniqueIndex,
  text,
  integer,
  primaryKey,
} from "drizzle-orm/sqlite-core";

export const verificationTokens = sqliteTable(
  "verification_token",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: integer("expires", { mode: "timestamp" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  }),
);

export const users = sqliteTable(
  "user",
  {
    id: text("id").primaryKey().notNull().$defaultFn(createId),
    name: text("name"),
    email: text("email"),
    emailVerified: integer("emailVerified", {
      mode: "timestamp",
    }),
    image: text("image"),
  },
  (table) => {
    return {
      emailKey: uniqueIndex("users_email_key").on(table.email),
    };
  },
);

export const accounts = sqliteTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
    type: text("type").notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refreshToken: text("refresh_token"),
    accessToken: text("access_token"),
    expiresAt: integer("expires_at"),
    tokenType: text("token_type"),
    scope: text("scope"),
    idToken: text("id_token"),
    sessionState: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
  }),
);

export const session = sqliteTable("session", {
  id: text("id").primaryKey().notNull().$defaultFn(createId),
  sessionToken: text("sessionToken").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
  expires: integer("expires", { mode: "timestamp" }).notNull(),
});

export const posts = sqliteTable("post", {
  id: text("id").primaryKey().notNull().$defaultFn(createId),
  content: text("content").notNull(),
  authorId: text("author_id")
    .notNull()
    .references(() => users.id, { onDelete: "restrict", onUpdate: "cascade" }),
  createdAt: integer("createdAt", { mode: "timestamp" })
    .defaultNow()
    .notNull()
    .defaultNow(),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull().defaultNow(),
});

export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
}));
