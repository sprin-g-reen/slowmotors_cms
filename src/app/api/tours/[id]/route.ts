import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const json = await request.json();
    const tour = await prisma.tour.update({
      where: { id },
      data: json,
    });
    return NextResponse.json(tour);
  } catch (error) {
    return NextResponse.json({ error: 'Error updating tour' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    await prisma.tour.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Tour deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting tour' }, { status: 500 });
  }
}
