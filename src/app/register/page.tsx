"use client";
import Layout from '../../components/Layout';
import { useState } from 'react';

export default function RegisterPage() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Registration failed');
      setSuccess(true);
      setForm({ username: '', email: '', password: '' });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <div className="max-w-md mx-auto mt-16 bg-gray-900 rounded-xl shadow-lg p-8 text-white">
        <h2 className="text-2xl font-bold mb-6">Register</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 font-medium" htmlFor="username">Username</label>
            <input id="username" name="username" type="text" required className="w-full px-4 py-2 border rounded bg-gray-800 text-white" value={form.username} onChange={e => setForm(f => ({ ...f, username: e.target.value }))} />
          </div>
          <div>
            <label className="block mb-1 font-medium" htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required className="w-full px-4 py-2 border rounded bg-gray-800 text-white" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
          </div>
          <div>
            <label className="block mb-1 font-medium" htmlFor="password">Password</label>
            <input id="password" name="password" type="password" required className="w-full px-4 py-2 border rounded bg-gray-800 text-white" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />
          </div>
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
          {success && <div className="text-green-400">Registration successful!</div>}
          {error && <div className="text-red-400">{error}</div>}
        </form>
      </div>
    </Layout>
  );
}
