// This file handles authentication using NextAuth.js
import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import db from "@/lib/db";

// Define the user type
interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  role?: string;
}

// Define the session type
interface Session {
  user: User;
}

export const authOptions: NextAuthOptions = {
  // Use Prisma as the database adapter
  adapter: PrismaAdapter(db),
  
  // Configure authentication providers
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      // Custom authentication logic
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        // Find user in database
        const user = await db.user.findUnique({
          where: {
            email: credentials.email
          }
        });

        if (!user || !user?.password) {
          throw new Error("Invalid credentials");
        }

        // Verify password
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }

        return user;
      }
    })
  ],
  
  // Use JWT for session management
  session: {
    strategy: "jwt"
  },
  
  // Custom pages
  pages: {
    signIn: "/login",
  },
  
  // Callbacks for session and JWT handling
  callbacks: {
    // Add user info to session
    async session({ token, session }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.role = token.role as string;
      }
      return session;
    },
    // Add user info to JWT
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      });

      if (!dbUser) {
        if (user) {
          token.id = user.id;
        }
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        role: dbUser.role,
      };
    }
  }
};

// Export the NextAuth handler
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 