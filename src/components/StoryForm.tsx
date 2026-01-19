'use client';

import { useActionState, useState } from 'react';
import { createStory } from '@/app/actions';
import { useFormStatus } from 'react-dom';
import RichTextEditor from '@/components/RichTextEditor';

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
      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded font-bold uppercase tracking-wider disabled:bg-gray-500 w-full md:w-auto transition-colors"
    >
      {pending ? 'Publishing...' : 'Publish Story'}
    </button>
  );
}

export default function StoryForm() {
  const [state, formAction] = useActionState(createStory, initialState);
  const [content, setContent] = useState('');

  return (
    <form action={formAction} className="space-y-6 max-w-4xl bg-secondary p-8 rounded-xl border border-gray-800 text-gray-200 shadow-xl">
        {state.message && (
            <div className={`p-4 rounded ${state.success ? 'bg-green-900/50 text-green-200' : 'bg-red-900/50 text-red-200'}`}>
                {state.message}
            </div>
        )}

        <div>
            <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-400">Title (EN)</label>
            <input
                name="title_en"
                className="w-full bg-accent border border-gray-700 p-3 rounded text-white focus:border-primary focus:outline-none"
                required
            />
        </div>

        <div>
            <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-400">Content (EN)</label>
            <div className="bg-white text-black rounded overflow-hidden min-h-[200px]">
                <RichTextEditor content={content} onChange={setContent} />
            </div>
            {/* Hidden input to pass content to Server Action */}
            <input type="hidden" name="content_en" value={content} />
        </div>

        <div className="pt-4">
            <SubmitButton />
        </div>
    </form>
  );
}
