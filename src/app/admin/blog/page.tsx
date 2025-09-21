import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import BlogManager from '../../../components/BlogManager';
import { authOptions } from '../../../lib/auth';

export default async function AdminBlogPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/api/auth/signin');
  }
  return <BlogManager session={session} />;
}
