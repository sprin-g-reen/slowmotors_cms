'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { tourSchema, TourFormData } from '@/lib/schemas';
import { useRouter } from '@/i18n/navigation';
import { useState } from 'react';

export default function TourForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<TourFormData>({
    resolver: zodResolver(tourSchema),
    defaultValues: {
      difficulty: 'Medium',
      status: 'Available',
      priceEur: 0,
      priceInr: 0,
    }
  });

  const onSubmit = async (data: TourFormData) => {
    try {
      // Convert string dates to ISO for API if needed, or API handles it.
      // Schema expects string, Prisma expects Date object. API should handle conversion.
      const res = await fetch('/api/tours', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
             ...data,
             startDate: new Date(data.startDate),
             endDate: new Date(data.endDate),
        }),
      });

      if (!res.ok) throw new Error('Failed to create tour');

      router.refresh();
      // Reset form or redirect
      alert('Tour created!');
    } catch (e) {
      setError('Error creating tour');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-2xl bg-gray-50 p-4 rounded">
      {error && <div className="text-red-500">{error}</div>}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Slug</label>
          <input {...register('slug')} className="w-full border p-2 rounded" />
          {errors.slug && <p className="text-red-500 text-xs">{errors.slug.message}</p>}
        </div>
        <div>
            {/* Spacer or other field */}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Title (EN)</label>
          <input {...register('title_en')} className="w-full border p-2 rounded" />
          {errors.title_en && <p className="text-red-500 text-xs">{errors.title_en.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Title (DE)</label>
          <input {...register('title_de')} className="w-full border p-2 rounded" />
          {errors.title_de && <p className="text-red-500 text-xs">{errors.title_de.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Description (EN)</label>
          <textarea {...register('description_en')} className="w-full border p-2 rounded" />
          {errors.description_en && <p className="text-red-500 text-xs">{errors.description_en.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Description (DE)</label>
          <textarea {...register('description_de')} className="w-full border p-2 rounded" />
          {errors.description_de && <p className="text-red-500 text-xs">{errors.description_de.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Start Date</label>
          <input type="date" {...register('startDate')} className="w-full border p-2 rounded" />
          {errors.startDate && <p className="text-red-500 text-xs">{errors.startDate.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">End Date</label>
          <input type="date" {...register('endDate')} className="w-full border p-2 rounded" />
          {errors.endDate && <p className="text-red-500 text-xs">{errors.endDate.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Price (EUR)</label>
          <input
            type="number"
            {...register('priceEur', { valueAsNumber: true })}
            className="w-full border p-2 rounded"
          />
          {errors.priceEur && <p className="text-red-500 text-xs">{errors.priceEur.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Price (INR)</label>
          <input
            type="number"
            {...register('priceInr', { valueAsNumber: true })}
            className="w-full border p-2 rounded"
          />
          {errors.priceInr && <p className="text-red-500 text-xs">{errors.priceInr.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Difficulty</label>
          <select {...register('difficulty')} className="w-full border p-2 rounded">
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
            <option value="Expert">Expert</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Status</label>
           <select {...register('status')} className="w-full border p-2 rounded">
            <option value="Available">Available</option>
            <option value="Last Seats">Last Seats</option>
            <option value="Sold Out">Sold Out</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isSubmitting ? 'Creating...' : 'Create Tour'}
      </button>
    </form>
  );
}
