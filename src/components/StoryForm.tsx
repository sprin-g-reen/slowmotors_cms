'use client';

import { useState } from 'react';
import { useRouter } from '@/i18n/navigation';
import RichTextEditor from '@/components/RichTextEditor';

export default function StoryForm() {
  const router = useRouter();
  const [titleEn, setTitleEn] = useState('');
  const [contentEn, setContentEn] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title_en: titleEn,
            title_de: titleEn, // Fallback for demo
            content_en: contentEn,
            content_de: contentEn, // Fallback for demo
            slug: titleEn.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
            published: true
        }),
      });

      if (!res.ok) throw new Error('Failed to create story');

      router.refresh();
      setTitleEn('');
      setContentEn('');
      alert('Story created!');
    } catch (error) {
      alert('Error creating story');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-4xl bg-gray-50 p-4 rounded">
        <div>
            <label className="block text-sm font-medium mb-1">Title (EN)</label>
            <input
                type="text"
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
                className="w-full border p-2 rounded"
                required
            />
        </div>

        <div>
            <label className="block text-sm font-medium mb-1">Content (EN)</label>
            <RichTextEditor content={contentEn} onChange={setContentEn} />
        </div>

        <button
            type="submit"
            disabled={isSubmitting}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-gray-400"
        >
            {isSubmitting ? 'Publishing...' : 'Publish Story'}
        </button>
    </form>
  );
}
