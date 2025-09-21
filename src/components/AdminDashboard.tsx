import type { Session } from 'next-auth';
import Link from 'next/link';

export default function AdminDashboard({ session }: { session: Session }) {
  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Admin Dashboard</h1>
      <div className="mb-8 text-gray-700 dark:text-gray-300">
        Welcome, {session?.user?.name || session?.user?.email}!
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Link href="/admin/services" className="bg-blue-600 text-white rounded-lg p-6 shadow hover:bg-blue-700 transition">Manage Services</Link>
        <Link href="/admin/blog" className="bg-green-600 text-white rounded-lg p-6 shadow hover:bg-green-700 transition">Manage Blog</Link>
        <Link href="/admin/stats" className="bg-purple-600 text-white rounded-lg p-6 shadow hover:bg-purple-700 transition">View Stats</Link>
      </div>
      <Link href="/api/auth/signout" className="text-red-600 hover:underline">Logout</Link>
    </div>
  );
}
