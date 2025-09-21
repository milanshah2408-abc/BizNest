import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import ServiceManager from '../../../components/ServiceManager';
import { authOptions } from '../../../lib/auth';

export default async function AdminServicesPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/api/auth/signin');
  }
  return <ServiceManager session={session} />;
}
