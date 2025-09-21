import Layout from '../../../components/Layout';
import { PrismaClient, Post } from '@prisma/client';
import { notFound } from 'next/navigation';

const prisma = new PrismaClient();

interface BlogPostPageProps {
  params: { slug: string };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post: Post | null = await prisma.post.findUnique({ where: { slug: params.slug } });
  if (!post) return notFound();
  return (
    <Layout>
      <article className="max-w-3xl mx-auto py-16">
        <img src="/blog-default.jpg" alt="Blog Default" className="mb-10 rounded w-150" />
        <h1 className="text-4xl font-bold mb-4 text-white">{post.title}</h1>
        <div className="text-xs text-gray-400 mb-6">{new Date(post.createdAt).toLocaleDateString()}</div>
        <div className="prose max-w-none text-white">{post.content}</div>
      </article>
    </Layout>
  );
}