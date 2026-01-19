'use client';

import { useActionState } from 'react';
import { createTour } from '@/app/actions';
import { useFormStatus } from 'react-dom';

const initialState = {
  message: '',
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded font-bold uppercase tracking-wider disabled:bg-gray-500 w-full md:w-auto"
    >
      {pending ? 'Creating...' : 'Create Tour'}
    </button>
  );
}

export default function TourForm() {
  const [state, formAction] = useActionState(createTour, initialState);

  return (
    <form action={formAction} className="space-y-6 max-w-3xl bg-secondary p-8 rounded-xl border border-gray-800 text-gray-200 shadow-xl">
      {state.message && (
        <div className={`p-4 rounded ${state.success ? 'bg-green-900/50 text-green-200' : 'bg-red-900/50 text-red-200'}`}>
            {state.message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-400">Slug</label>
          <input name="slug" className="w-full bg-accent border border-gray-700 p-3 rounded text-white focus:border-primary focus:outline-none" required />
        </div>

        {/* EN/DE Titles */}
        <div>
           <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-400">Title (EN)</label>
           <input name="title_en" className="w-full bg-accent border border-gray-700 p-3 rounded text-white focus:border-primary focus:outline-none" required />
        </div>
        <div>
           <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-400">Title (DE)</label>
           <input name="title_de" className="w-full bg-accent border border-gray-700 p-3 rounded text-white focus:border-primary focus:outline-none" required />
        </div>

         {/* Descriptions */}
        <div className="md:col-span-2">
           <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-400">Description (EN)</label>
           <textarea name="description_en" rows={3} className="w-full bg-accent border border-gray-700 p-3 rounded text-white focus:border-primary focus:outline-none" required />
        </div>
        <div className="md:col-span-2">
           <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-400">Description (DE)</label>
           <textarea name="description_de" rows={3} className="w-full bg-accent border border-gray-700 p-3 rounded text-white focus:border-primary focus:outline-none" required />
        </div>

        {/* Dates */}
        <div>
          <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-400">Start Date</label>
          <input type="date" name="startDate" className="w-full bg-accent border border-gray-700 p-3 rounded text-white focus:border-primary focus:outline-none" required />
        </div>
        <div>
          <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-400">End Date</label>
          <input type="date" name="endDate" className="w-full bg-accent border border-gray-700 p-3 rounded text-white focus:border-primary focus:outline-none" required />
        </div>

        {/* Pricing */}
        <div>
          <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-400">Price (EUR)</label>
          <input type="number" name="priceEur" className="w-full bg-accent border border-gray-700 p-3 rounded text-white focus:border-primary focus:outline-none" required />
        </div>
        <div>
          <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-400">Price (INR)</label>
          <input type="number" name="priceInr" className="w-full bg-accent border border-gray-700 p-3 rounded text-white focus:border-primary focus:outline-none" required />
        </div>

        {/* Meta */}
        <div>
          <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-400">Difficulty</label>
          <select name="difficulty" className="w-full bg-accent border border-gray-700 p-3 rounded text-white focus:border-primary focus:outline-none">
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
            <option value="Expert">Expert</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-400">Status</label>
           <select name="status" className="w-full bg-accent border border-gray-700 p-3 rounded text-white focus:border-primary focus:outline-none">
            <option value="Available">Available</option>
            <option value="Last Seats">Last Seats</option>
            <option value="Sold Out">Sold Out</option>
          </select>
        </div>
      </div>

      <div className="pt-4">
        <SubmitButton />
      </div>
    </form>
  );
}
