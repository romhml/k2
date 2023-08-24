import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { Adapter } from "next-auth/adapters";
import GithubProvider from "next-auth/providers/github";
import { NuxtAuthHandler } from "#auth";
import { db } from "@k2/db";

const runtimeConfig = useRuntimeConfig();

export default NuxtAuthHandler({
  secret: runtimeConfig.auth.secret,
  adapter: DrizzleAdapter(db) as Adapter,

  session: {
    strategy: "jwt",
  },

  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GithubProvider.default({
      clientId: runtimeConfig.auth.github.clientId,
      clientSecret: runtimeConfig.auth.github.clientSecret,
    }),
  ],
});
