"use client";
import Layout from '../../components/Layout';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const result = await signIn('credentials', {
      redirect: false,
      email: form.email,
      password: form.password,
    });
    setLoading(false);
    if (result?.error) {
      setError(result.error);
    } else {
      router.push('/');
    }
  }

  return (
    <Layout>
      <div className="max-w-md mx-auto mt-16 bg-gray-900 rounded-xl shadow-lg p-8 text-white">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 font-medium" htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required className="w-full px-4 py-2 border rounded bg-gray-800 text-white" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
          </div>
          <div>
            <label className="block mb-1 font-medium" htmlFor="password">Password</label>
            <input id="password" name="password" type="password" required className="w-full px-4 py-2 border rounded bg-gray-800 text-white" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />
          </div>
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
          {error && <div className="text-red-400">{error}</div>}
        </form>
      </div>
    </Layout>
  );
}
