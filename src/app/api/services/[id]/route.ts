import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { name, description } = await req.json();
  const { id } = params;

  if (!name || !description) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const service = await prisma.service.update({
    where: { id },
    data: { name, description },
  });

  return NextResponse.json(service);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  await prisma.service.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
