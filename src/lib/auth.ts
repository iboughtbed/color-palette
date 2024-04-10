import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
  type User,
} from "next-auth";
import GithubProvider from "next-auth/providers/github";

import { env } from "~/env";
import { kv } from "~/lib/kv";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      collection: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  interface User {
    collection: string;
    // ...other properties
    // role: UserRole;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    collection: string;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  secret: env.NEXTAUTH_SECRET,
  adapter: UpstashRedisAdapter(kv),
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7, // 7days
  },

  callbacks: {
    session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.collection = token.collection;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const user = await kv.get<User>(`user:${token.sub}`);

      if (user) {
        const collection = await kv.get<string>(`collection:user-${user.id}`);

        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;
        token.collection = collection ?? "";
      }

      return token;
    },
  },
  pages: {
    signIn: "/signin",
  },
  providers: [
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
