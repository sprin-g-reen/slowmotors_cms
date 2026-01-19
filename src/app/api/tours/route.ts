import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  const tours = await prisma.tour.findMany({
    include: { images: true }
  });
  return NextResponse.json(tours);
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const tour = await prisma.tour.create({
      data: json,
    });
    return NextResponse.json(tour);
  } catch (error) {
    return NextResponse.json({ error: 'Error creating tour' }, { status: 500 });
  }
}
