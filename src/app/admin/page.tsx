import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
// Update the import path if AdminDashboard is located elsewhere, for example:
import AdminDashboard from '@/components/AdminDashboard';
// Or create the file at src/components/AdminDashboard.tsx if it does not exist.
import { authOptions } from '../../lib/auth';

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/api/auth/signin');
  }
  if (!session.user.admin) {
    redirect('/');
  }
  return <AdminDashboard session={session} />;
}
