import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  const images = await prisma.galleryImage.findMany();
  return NextResponse.json(images);
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const image = await prisma.galleryImage.create({
      data: json,
    });
    return NextResponse.json(image);
  } catch (error) {
    return NextResponse.json({ error: 'Error creating image' }, { status: 500 });
  }
}
