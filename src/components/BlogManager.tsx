"use client";
import type { Session } from 'next-auth';
import { useEffect, useState } from 'react';

type Post = {
  id: string;
  title: string;
  content: string;
};

export default function BlogManager({ session }: { session: Session }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: '', content: '' });
  const [editId, setEditId] = useState<string | null>(null);
  const [error, setError] = useState('');

  async function fetchPosts() {
    setLoading(true);
    const res = await fetch('/api/posts');
    const data = await res.json();
    setPosts(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!form.title || !form.content) {
      setError('All fields required');
      return;
    }
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (!res.ok) {
      setError('Failed to add post');
      return;
    }
    setForm({ title: '', content: '' });
    fetchPosts();
  }

  async function handleEdit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!form.title || !form.content || !editId) {
      setError('All fields required');
      return;
    }
    const res = await fetch(`/api/posts/${editId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (!res.ok) {
      setError('Failed to update post');
      return;
    }
    setForm({ title: '', content: '' });
    setEditId(null);
    fetchPosts();
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this post?')) return;
    await fetch(`/api/posts/${id}`, { method: 'DELETE' });
    fetchPosts();
  }

  function startEdit(post: Post) {
    setEditId(post.id);
    setForm({ title: post.title, content: post.content });
  }

  function cancelEdit() {
    setEditId(null);
    setForm({ title: '', content: '' });
  }

  return (
    <div className="max-w-4xl mx-auto py-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Manage Blog Posts</h2>
      <form className="mb-8 space-y-4" onSubmit={editId ? handleEdit : handleAdd}>
        <div>
          <input
            type="text"
            placeholder="Title"
            className="w-full px-4 py-2 rounded bg-gray-800 text-white mb-2"
            value={form.title}
            onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
          />
          <textarea
            placeholder="Content"
            className="w-full px-4 py-2 rounded bg-gray-800 text-white"
            value={form.content}
            onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
          />
        </div>
        {error && <div className="text-red-400">{error}</div>}
        <div className="flex gap-2">
          <button type="submit" className="bg-blue-600 px-4 py-2 rounded text-white">
            {editId ? 'Update Post' : 'Add Post'}
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
              <th className="p-2 text-left">Title</th>
              <th className="p-2 text-left">Content</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => (
              <tr key={post.id} className="border-b border-gray-700">
                <td className="p-2">{post.title}</td>
                <td className="p-2">{post.content}</td>
                <td className="p-2 flex gap-2">
                  <button className="bg-yellow-500 px-3 py-1 rounded" onClick={() => startEdit(post)}>Edit</button>
                  <button className="bg-red-600 px-3 py-1 rounded" onClick={() => handleDelete(post.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
