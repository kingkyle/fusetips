import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "~/server/db";
import bcrypt from "bcryptjs";
import type { User } from "@prisma/client";

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
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    // session: ({ session, user }) => {
    //   return {
    //   ...session,
    //   user: {
    //     ...session.user,
    //     id: user.id,
    //   },
    // }},
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as User;
        return {
          ...token,
          name: u.username,
          id: u.id,
        };
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Email",
      credentials: {
        email: {
          label: "Email Address",
          type: "email",
          placeholder: "jsmith@email.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, _) {
        try {
          const user = await prisma.user.findFirstOrThrow({
            where: { email: credentials?.email },
          });
          if (user != null) {
            const isMatch = await bcrypt.compare(
              credentials?.password ?? "",
              user.password
            );
            if (isMatch) {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const { password, ...newUser } = user;
              return newUser;
            }
          }
          return null;
        } catch (error) {
          return null;
        }
      },
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
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
