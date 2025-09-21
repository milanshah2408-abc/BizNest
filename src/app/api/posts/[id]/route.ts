import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { title, content } = await req.json();
  const { id } = params;
  if (!title || !content) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }
  const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const post = await prisma.post.update({ where: { id }, data: { title, content, slug } });
  return NextResponse.json(post);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  await prisma.post.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
