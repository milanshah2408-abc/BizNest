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
      async authorize(
        credentials: Record<'email' | 'password', string> | undefined
      ): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({ where: { email: credentials.email } });
        if (!user || !user.password) return null;

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) return null;

        return user;
      },
    }),
  ],
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/api/auth/signin',
    signOut: '/api/auth/signout',
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User | AdapterUser }): Promise<JWT> {
      if (user && 'admin' in user) {
        (token as JWT & { admin?: boolean }).admin = (user as User & { admin?: boolean }).admin;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }): Promise<Session> {
      if (session.user) {
        (session.user as Session['user'] & { id: string }).id = token.sub ?? '';
        (session.user as Session['user'] & { admin: boolean }).admin =
          (token as JWT & { admin?: boolean }).admin ?? false;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
