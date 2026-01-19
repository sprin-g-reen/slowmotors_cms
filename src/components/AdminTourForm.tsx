'use client';

import { useActionState, useState } from 'react';
import { createTour } from '@/app/actions';
import { useFormStatus } from 'react-dom';
import { Plus, Trash } from 'lucide-react';

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
      className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded font-bold uppercase tracking-wider disabled:bg-gray-500 w-full md:w-auto transition-all shadow-lg shadow-primary/20"
    >
      {pending ? 'Creating...' : 'Create Tour'}
    </button>
  );
}

export default function AdminTourForm() {
  const [state, formAction] = useActionState(createTour, initialState);
  const [dates, setDates] = useState<{ startDate: string, endDate: string, status: string }[]>([]);

  const addDate = () => {
      setDates([...dates, { startDate: '', endDate: '', status: 'Available' }]);
  };

  const removeDate = (index: number) => {
      const newDates = [...dates];
      newDates.splice(index, 1);
      setDates(newDates);
  };

  const updateDate = (index: number, field: string, value: string) => {
      const newDates = [...dates];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (newDates[index] as any)[field] = value;
      setDates(newDates);
  };

  return (
    <form action={formAction} className="space-y-8 max-w-5xl bg-secondary/50 p-8 rounded-xl border border-gray-800 text-gray-200 shadow-2xl backdrop-blur-sm">
      <div className="border-b border-gray-700 pb-4 mb-4">
        <h2 className="text-2xl font-bold text-white uppercase tracking-tight">New Tour Details</h2>
        <p className="text-gray-400 text-sm">Create a new adventure.</p>
      </div>

      {state.message && (
        <div className={`p-4 rounded border ${state.success ? 'bg-green-900/20 border-green-800 text-green-200' : 'bg-red-900/20 border-red-800 text-red-200'}`}>
            {state.message}
        </div>
      )}

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="col-span-1 md:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-primary">Slug</label>
            <input name="slug" className="w-full bg-background border border-gray-700 p-3 rounded text-white focus:border-primary focus:outline-none transition-colors" placeholder="e.g. himalayan-adventure-2024" required />
        </div>

        {/* Side-by-Side English / German */}
        <div className="space-y-4">
           <h3 className="text-sm font-semibold text-gray-400 border-b border-gray-700 pb-2">English Content</h3>
           <div>
               <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-gray-500">Title</label>
               <input name="title_en" className="w-full bg-background border border-gray-700 p-3 rounded text-white focus:border-primary focus:outline-none" required />
           </div>
           <div>
               <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-gray-500">Description</label>
               <textarea name="description_en" rows={4} className="w-full bg-background border border-gray-700 p-3 rounded text-white focus:border-primary focus:outline-none" required />
           </div>
        </div>

        <div className="space-y-4">
           <h3 className="text-sm font-semibold text-gray-400 border-b border-gray-700 pb-2">German Content</h3>
           <div>
               <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-gray-500">Title</label>
               <input name="title_de" className="w-full bg-background border border-gray-700 p-3 rounded text-white focus:border-primary focus:outline-none" required />
           </div>
           <div>
               <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-gray-500">Description</label>
               <textarea name="description_de" rows={4} className="w-full bg-background border border-gray-700 p-3 rounded text-white focus:border-primary focus:outline-none" required />
           </div>
        </div>
      </div>

      {/* Meta & Pricing */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-700">
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-primary">Difficulty</label>
          <select name="difficulty" className="w-full bg-background border border-gray-700 p-3 rounded text-white focus:border-primary focus:outline-none">
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
            <option value="Expert">Expert</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-primary">Price (EUR)</label>
          <input type="number" name="priceEur" className="w-full bg-background border border-gray-700 p-3 rounded text-white focus:border-primary focus:outline-none" required />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-primary">Price (INR)</label>
          <input type="number" name="priceInr" className="w-full bg-background border border-gray-700 p-3 rounded text-white focus:border-primary focus:outline-none" required />
        </div>
      </div>

      {/* Dynamic Dates */}
      <div className="pt-4 border-t border-gray-700">
          <div className="flex justify-between items-center mb-4">
              <label className="block text-xs font-bold uppercase tracking-widest text-primary">Tour Dates</label>
              <button type="button" onClick={addDate} className="text-xs bg-accent hover:bg-gray-600 text-white px-3 py-1 rounded flex items-center gap-1 transition-colors">
                  <Plus size={14} /> Add Date
              </button>
          </div>

          <input type="hidden" name="dates" value={JSON.stringify(dates)} />

          <div className="space-y-3">
              {dates.map((date, index) => (
                  <div key={index} className="flex flex-wrap md:flex-nowrap gap-4 items-end bg-background p-3 rounded border border-gray-700">
                      <div className="flex-1">
                          <label className="block text-[10px] uppercase text-gray-500 mb-1">Start</label>
                          <input type="date" value={date.startDate} onChange={(e) => updateDate(index, 'startDate', e.target.value)} className="w-full bg-secondary border border-gray-600 p-2 rounded text-sm text-white" />
                      </div>
                      <div className="flex-1">
                          <label className="block text-[10px] uppercase text-gray-500 mb-1">End</label>
                          <input type="date" value={date.endDate} onChange={(e) => updateDate(index, 'endDate', e.target.value)} className="w-full bg-secondary border border-gray-600 p-2 rounded text-sm text-white" />
                      </div>
                      <div className="flex-1">
                           <label className="block text-[10px] uppercase text-gray-500 mb-1">Status</label>
                           <select value={date.status} onChange={(e) => updateDate(index, 'status', e.target.value)} className="w-full bg-secondary border border-gray-600 p-2 rounded text-sm text-white">
                                <option value="Available">Available</option>
                                <option value="LastSeats">Last Seats</option>
                                <option value="SoldOut">Sold Out</option>
                           </select>
                      </div>
                      <button type="button" onClick={() => removeDate(index)} className="p-2 text-red-500 hover:text-red-400">
                          <Trash size={18} />
                      </button>
                  </div>
              ))}
              {dates.length === 0 && <p className="text-sm text-gray-500 italic">No dates added yet.</p>}
          </div>
      </div>

      <div className="pt-6 border-t border-gray-700 flex justify-end">
        <SubmitButton />
      </div>
    </form>
  );
}
