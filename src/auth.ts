import { connectDB } from "@/lib/mongodb";
import User from "@/models/user.model";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        await connectDB();
        const user = await User.findOne({
          email: credentials?.email,
        }).select("+password");

        if (!user) throw new Error("Wrong Email");

        if (
          !credentials?.password ||
          typeof credentials.password !== "string"
        ) {
          throw new Error("Invalid password");
        }
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!passwordMatch) throw new Error("Wrong Password");

        console.log(user);

        return {
          id: user._id,
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },
    async jwt({ token, user }) {
      if (user && user.email) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      return session;
    },
  },
  pages: {
    signIn: "/login", // Optional: Your custom sign-in page
  },
  session: {
    strategy: "jwt",
  },
});
