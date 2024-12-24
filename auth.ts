import bcrypt from "bcryptjs";
import prisma from "@/lib/prismadb";
import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email = credentials.email as string;
        const password = credentials.password as string;

        console.log("Authorize called with email:", email);

        if (!email || !password) {
          console.log("Missing email or password");
          throw new Error("Missing email or password");
        }

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          console.log("No user found with the email:", email);
          throw new Error("No user found with the email");
        }

        const isPasswordValid = await bcrypt.compare(
          password,
          user.hashedPassword
        );
        if (!isPasswordValid) {
          console.log("Invalid password for email:", email);
          throw new Error("Invalid password");
        }

        console.log("User authenticated:", user);
        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
      }
      if (trigger === "update") {
        // Fetch the latest user data from the database
        const updatedUser = await prisma.user.findUnique({
          where: { email: token.email as string },
        });
        if (updatedUser) {
          // Update the token with the latest user data
          token.name = updatedUser.name;
          token.email = updatedUser.email;
          console.log(token.role,token.name,token.email)
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
      }
      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      console.log(
        "signIn callback - user:",
        user,
        "account:",
        account,
        "profile:",
        profile,
        "email:",
        email,
        "credentials:",
        credentials
      );

      if (!account) {
        console.log("signIn callback - no account");
        return false;
      }

      if (account.provider === "credentials") {
        console.log("signIn callback - credentials provider");
        return true;
      }

      if (account.provider === "google" || account.provider === "github") {
        const email = profile?.email as string;
        const name = profile?.name ?? "";
        const phone = (profile?.phone ?? "") as string;

        let existingUser = await prisma.user.findUnique({
          where: { email },
        });

        if (!existingUser) {
          existingUser = await prisma.user.create({
            data: {
              email,
              name,
              hashedPassword: "",
            },
          });
        } else {
          await prisma.user.update({
            where: { email },
            data: {
              name,
            },
          });
        }
      }
      

      console.log("signIn callback - successful");
      return true;
    },
  },
  session: {
    strategy: "jwt",
  },
});