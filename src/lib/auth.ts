import NextAuth, { type NextAuthOptions, type Session, type User } from 'next-auth';
import type { AdapterUser } from 'next-auth/adapters';
import type { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import { compare } from 'bcryptjs';

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const user = await prisma.user.findUnique({ where: { email: credentials.email } });
        if (!user || !user.password) return null;
        const isValid = await compare(credentials.password, user.password);
        if (!isValid) return null;
        return user;
      },
    }),
  ],
  session: { strategy: 'jwt' as const },
  pages: {
    signIn: '/api/auth/signin',
    signOut: '/api/auth/signout',
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User | AdapterUser }) {
      if (user && typeof user === 'object' && 'admin' in user) {
        (token as JWT & { admin?: boolean }).admin = (user as User & { admin?: boolean }).admin;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user && 'sub' in token) {
        (session.user as typeof session.user & { id?: string }).id = token.sub as string;
      }
      if (session.user && 'admin' in token) {
        (session.user as typeof session.user & { admin?: boolean }).admin = (token as JWT & { admin?: boolean }).admin;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
