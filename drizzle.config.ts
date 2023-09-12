import type { Config } from "drizzle-kit";

export default {
  schema: "./packages/db/schema.ts",
  out: "./packages/db/drizzle",
  driver: "turso",
  dbCredentials: {
    url: process.env.DATABASE_URL || "",
    authToken: process.env.DATABASE_AUTH_TOKEN || "",
  },
} satisfies Config;
