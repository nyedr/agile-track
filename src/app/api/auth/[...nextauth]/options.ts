import { NextAuthOptions } from "next-auth";
import prisma from "@/lib/prismadb";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.password || !credentials?.email) {
          throw new Error("Invalid fields: missing email or password.");
        }

        const emailSchema = z
          .string()
          .email()
          .min(3, {
            message: "Email must be at least 3 characters.",
          })
          .max(255, {
            message: "Email must be at most 255 characters.",
          });
        const passwordSchema = z
          .string()
          .min(8, { message: "Password must be at least 8 characters." })
          .max(32, { message: "Password must be at most 32 characters." });

        try {
          emailSchema.parse(credentials.email);
          passwordSchema.parse(credentials.password);
        } catch (error: unknown) {
          if (error instanceof z.ZodError) {
            throw new Error("Invalid fields: " + error.message);
          }
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        const isPasswordMatch = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isPasswordMatch) throw new Error("Incorret password, try again.");

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.SECRET!,
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },
};

export default authOptions;
