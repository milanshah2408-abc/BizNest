import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// PUT /api/services/[id]
export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const { name, description } = await req.json();

  if (!name || !description) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const updatedService = await prisma.service.update({
    where: { id },
    data: { name, description },
  });

  return NextResponse.json(updatedService);
}

// DELETE /api/services/[id]
export async function DELETE(_req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  await prisma.service.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
