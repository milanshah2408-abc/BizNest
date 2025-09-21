import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';

const prisma = new PrismaClient();

export async function GET() {
  const services = await prisma.service.findMany();
  return NextResponse.json(services);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { name, description } = await req.json();
  if (!name || !description) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }
  const service = await prisma.service.create({ data: { name, description, userId: session.user.id } });
  return NextResponse.json(service, { status: 201 });
}
