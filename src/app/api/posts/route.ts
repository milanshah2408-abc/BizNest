// src/app/api/posts/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET all posts
export async function GET(_req: NextRequest) {
  const posts = await prisma.post.findMany();
  return NextResponse.json(posts);
}

// POST a new post
export async function POST(req: NextRequest) {
  const { title, content } = await req.json();
  if (!title || !content) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

  const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const post = await prisma.post.create({ data: { title, content, slug } });
  return NextResponse.json(post);
}
