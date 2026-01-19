import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const posts = await prisma.post.findMany();
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const post = await prisma.post.create({
      data: json,
    });
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: 'Error creating post' }, { status: 500 });
  }
}
