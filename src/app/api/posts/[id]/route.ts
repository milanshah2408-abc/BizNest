import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await req.json();
  const { title, content } = body;

  if (!title || !content) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const post = await prisma.post.update({
    where: { id },
    data: { title, content, slug },
  });

  return NextResponse.json(post);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  await prisma.post.delete({ where: { id } });

  return NextResponse.json({ success: true });
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const post = await prisma.post.findUnique({ where: { id } });

  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  return NextResponse.json(post);
}
