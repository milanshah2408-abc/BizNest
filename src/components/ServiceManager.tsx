"use client";
import type { Session } from 'next-auth';
import { useEffect, useState } from 'react';

type Service = {
  id: string;
  name: string;
  description: string;
};

export default function ServiceManager({ session }: { session: Session }) {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', description: '' });
  const [editId, setEditId] = useState<string | null>(null);
  const [error, setError] = useState('');

  async function fetchServices() {
    setLoading(true);
    const res = await fetch('/api/services');
    const data = await res.json();
    setServices(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchServices();
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!form.name || !form.description) {
      setError('All fields required');
      return;
    }
    const res = await fetch('/api/services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (!res.ok) {
      setError('Failed to add service');
      return;
    }
    setForm({ name: '', description: '' });
    fetchServices();
  }

  async function handleEdit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!form.name || !form.description || !editId) {
      setError('All fields required');
      return;
    }
    const res = await fetch(`/api/services/${editId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (!res.ok) {
      setError('Failed to update service');
      return;
    }
    setForm({ name: '', description: '' });
    setEditId(null);
    fetchServices();
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this service?')) return;
    await fetch(`/api/services/${id}`, { method: 'DELETE' });
    fetchServices();
  }

  function startEdit(service: Service) {
    setEditId(service.id);
    setForm({ name: service.name, description: service.description });
  }

  function cancelEdit() {
    setEditId(null);
    setForm({ name: '', description: '' });
  }

  return (
    <div className="max-w-4xl mx-auto py-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Manage Services</h2>
      <form className="mb-8 space-y-4" onSubmit={editId ? handleEdit : handleAdd}>
        <div>
          <input
            type="text"
            placeholder="Service Name"
            className="w-full px-4 py-2 rounded bg-gray-800 text-white mb-2"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          />
          <textarea
            placeholder="Description"
            className="w-full px-4 py-2 rounded bg-gray-800 text-white"
            value={form.description}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
          />
        </div>
        {error && <div className="text-red-400">{error}</div>}
        <div className="flex gap-2">
          <button type="submit" className="bg-blue-600 px-4 py-2 rounded text-white">
            {editId ? 'Update Service' : 'Add Service'}
          </button>
          {editId && (
            <button type="button" className="bg-gray-600 px-4 py-2 rounded text-white" onClick={cancelEdit}>
              Cancel
            </button>
          )}
        </div>
      </form>
      {loading ? (
        <div className="text-gray-400">Loading...</div>
      ) : (
        <table className="w-full text-white">
          <thead>
            <tr className="bg-gray-800">
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Description</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map(service => (
              <tr key={service.id} className="border-b border-gray-700">
                <td className="p-2">{service.name}</td>
                <td className="p-2">{service.description}</td>
                <td className="p-2 flex gap-2">
                  <button className="bg-yellow-500 px-3 py-1 rounded" onClick={() => startEdit(service)}>Edit</button>
                  <button className="bg-red-600 px-3 py-1 rounded" onClick={() => handleDelete(service.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
