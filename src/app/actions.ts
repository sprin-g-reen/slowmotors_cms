'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { tourSchema } from '@/lib/schemas';

// --- Tours ---

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createTour(prevState: any, formData: FormData) {
  const rawData = {
    slug: formData.get('slug'),
    title_en: formData.get('title_en'),
    title_de: formData.get('title_de'),
    description_en: formData.get('description_en'),
    description_de: formData.get('description_de'),
    startDate: formData.get('startDate'),
    endDate: formData.get('endDate'),
    difficulty: formData.get('difficulty'),
    priceEur: Number(formData.get('priceEur')),
    priceInr: Number(formData.get('priceInr')),
    status: formData.get('status'),
  };

  try {
    const validatedData = tourSchema.parse(rawData);

    await prisma.tour.create({
      data: {
        ...validatedData,
        startDate: new Date(validatedData.startDate),
        endDate: new Date(validatedData.endDate),
      },
    });

    revalidatePath('/[locale]/admin/tours');
    revalidatePath('/[locale]/tours');
    return { message: 'Tour created successfully', success: true };
  } catch (e) {
    if (e instanceof z.ZodError) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return { message: 'Validation error', errors: (e as any).errors, success: false };
    }
    console.error(e);
    return { message: 'Database error', success: false };
  }
}

// --- Stories ---

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createStory(prevState: any, formData: FormData) {
    const title_en = formData.get('title_en') as string;
    const content_en = formData.get('content_en') as string; // Rich text HTML

    // Simple mock logic for DE and Slug for now
    const title_de = title_en;
    const content_de = content_en;
    const slug = title_en.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

    if (!title_en || !content_en) {
        return { message: 'Title and Content required', success: false };
    }

    try {
        await prisma.post.create({
            data: {
                slug,
                title_en,
                title_de,
                content_en,
                content_de,
                published: true
            }
        });

        revalidatePath('/[locale]/admin/stories');
        return { message: 'Story published', success: true };
    } catch (e) {
        return { message: 'Error publishing story', success: false };
    }
}
