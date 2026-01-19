import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Clean filename to avoid issues
  const filename = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const uploadDir = path.join(process.cwd(), 'public/uploads');
  const filepath = path.join(uploadDir, filename);

  try {
    await writeFile(filepath, buffer);
    const url = `/uploads/${filename}`;
    return NextResponse.json({ url });
  } catch (error) {
    console.error('Error saving file:', error);
    return NextResponse.json({ error: 'Error saving file' }, { status: 500 });
  }
}
