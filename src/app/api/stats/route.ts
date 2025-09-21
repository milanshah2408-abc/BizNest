import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const [posts, services, messages, users] = await Promise.all([
    prisma.post.count(),
    prisma.service.count(),
    prisma.message.count(),
    prisma.user.count(),
  ]);
  return NextResponse.json({ posts, services, messages, users });
}
