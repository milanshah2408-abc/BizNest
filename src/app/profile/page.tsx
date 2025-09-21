import Layout from '../../components/Layout';
import { useSession, signOut } from 'next-auth/react';

export default function ProfilePage() {
  const { data: session } = useSession();
  if (!session?.user) {
    return (
      <Layout>
        <div className="max-w-md mx-auto mt-16 bg-gray-900 rounded-xl shadow-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-6">Profile</h2>
          <div className="mb-4">You are not logged in.</div>
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      <div className="max-w-md mx-auto mt-16 bg-gray-900 rounded-xl shadow-lg p-8 text-white">
        <h2 className="text-2xl font-bold mb-6">Profile</h2>
        <div className="mb-4">
          <span className="font-semibold">Username:</span> {session.user.name || session.user.email}
        </div>
        <div className="mb-4">
          <span className="font-semibold">Email:</span> {session.user.email}
        </div>
        <button className="bg-red-600 px-6 py-2 rounded hover:bg-red-700" onClick={() => signOut({ callbackUrl: '/' })}>Logout</button>
      </div>
    </Layout>
  );
}
