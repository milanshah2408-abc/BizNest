"use client";
import type { Session } from 'next-auth';
import { useEffect, useState } from 'react';

type Stats = {
  posts: number;
  services: number;
  messages: number;
  users: number;
};

export default function StatsDashboard({ session }: { session: Session }) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      setError('');
      try {
        const res = await fetch('/api/stats');
        if (!res.ok) throw new Error('Failed to fetch stats');
        const data = await res.json();
        setStats(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Dashboard Stats</h2>
      {loading ? (
        <div className="text-gray-400">Loading...</div>
      ) : error ? (
        <div className="text-red-400">{error}</div>
      ) : stats ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="bg-blue-900 rounded-xl shadow-lg p-8 flex flex-col items-center">
            <span className="text-4xl font-bold text-white">{stats.posts}</span>
            <span className="text-lg text-blue-300 mt-2">Blogs</span>
          </div>
          <div className="bg-yellow-900 rounded-xl shadow-lg p-8 flex flex-col items-center">
            <span className="text-4xl font-bold text-white">{stats.services}</span>
            <span className="text-lg text-yellow-300 mt-2">Services</span>
          </div>
          <div className="bg-green-900 rounded-xl shadow-lg p-8 flex flex-col items-center">
            <span className="text-4xl font-bold text-white">{stats.messages}</span>
            <span className="text-lg text-green-300 mt-2">Inquiries</span>
          </div>
          <div className="bg-purple-900 rounded-xl shadow-lg p-8 flex flex-col items-center">
            <span className="text-4xl font-bold text-white">{stats.users}</span>
            <span className="text-lg text-purple-300 mt-2">Users</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
