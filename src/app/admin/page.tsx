import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import type { Session } from 'next-auth';
// Update the import path if AdminDashboard is located elsewhere, for example:
import AdminDashboard from '@/components/AdminDashboard';
// Or create the file at src/components/AdminDashboard.tsx if it does not exist.
import { authOptions } from '../../lib/auth';

// Extend the Session user type to include 'admin'
declare module 'next-auth' {
  interface Session {
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      admin?: boolean;
    };
  }
}

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/api/auth/signin');
  }
  if (!session.user || !session.user.admin) {
    redirect('/');
  }
  return <AdminDashboard session={session} />;
}
