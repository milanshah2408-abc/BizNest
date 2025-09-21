"use client";
import { useState } from 'react';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to send message');
      setSuccess(true);
      setForm({ name: '', email: '', message: '' });
    } catch (err: any) {
      setError(err.message || 'Error occurred');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="space-y-6 text-white" onSubmit={handleSubmit}>
      <div>
        <label className="block mb-1 font-medium text-white" htmlFor="name">Name</label>
        <input id="name" name="name" type="text" required className="w-full px-4 py-2 border rounded bg-gray-900 text-white" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
      </div>
      <div>
        <label className="block mb-1 font-medium text-white" htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required className="w-full px-4 py-2 border rounded bg-gray-900 text-white" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
      </div>
      <div>
        <label className="block mb-1 font-medium text-white" htmlFor="message">Message</label>
        <textarea id="message" name="message" required className="w-full px-4 py-2 border rounded bg-gray-900 text-white" rows={5} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded" disabled={loading}>{loading ? 'Sending...' : 'Send Message'}</button>
      {success && <div className="text-green-400">Message sent successfully!</div>}
      {error && <div className="text-red-400">{error}</div>}
    </form>
  );
}
