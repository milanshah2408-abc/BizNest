// src/app/api/posts/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(_req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  return NextResponse.json(post);
}

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const { title, content } = await req.json();
  if (!title || !content) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

  const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const updatedPost = await prisma.post.update({ where: { id }, data: { title, content, slug } });
  return NextResponse.json(updatedPost);
}

export async function DELETE(_req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  await prisma.post.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
