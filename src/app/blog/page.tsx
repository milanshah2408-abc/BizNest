import Layout from '../../components/Layout';
import Section from '../../components/Section';
import Link from 'next/link';
import { PrismaClient } from '@prisma/client';
import Image from 'next/image';

const prisma = new PrismaClient();

export default async function BlogPage() {
  const posts = await prisma.post.findMany({ orderBy: { createdAt: 'desc' } });
  return (
    <Layout>
      <Section>
        <h2 className="text-3xl font-bold mb-8 text-blue-700 text-center">Latest Blog Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-300">No posts yet.</p>
          ) : (
            posts.map((post: { id: string; title: string; slug: string; content: string; createdAt: Date }) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="block bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 hover:scale-105 transition-transform duration-300 animate-fade-in">
                <Image src="/blog-default.jpg" alt="Blog" width={80} height={60} className="mb-4 rounded" />
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{post.title}</h3>
                <p className="text-gray-700 dark:text-gray-300 line-clamp-2 mb-2">{post.content.slice(0, 120)}...</p>
                <span className="text-xs text-gray-400 dark:text-gray-300">{new Date(post.createdAt).toLocaleDateString()}</span>
              </Link>
            ))
          )}
        </div>
      </Section>
    </Layout>
  );
}
