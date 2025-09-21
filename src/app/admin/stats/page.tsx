import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import StatsDashboard from '../../../components/StatsDashboard';
import { authOptions } from '../../../lib/auth';

export default async function AdminStatsPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/api/auth/signin');
  }
  return <StatsDashboard session={session} />;
}
