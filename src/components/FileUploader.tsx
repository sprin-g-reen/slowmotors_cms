'use client';

import { useState } from 'react';
import { Upload, X } from 'lucide-react';

interface FileUploaderProps {
  onUploadComplete: (url: string) => void;
}

export default function FileUploader({ onUploadComplete }: FileUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');

      const data = await res.json();
      onUploadComplete(data.url);
    } catch (err) {
      setError('Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors">
      <label className="cursor-pointer block">
        <div className="flex flex-col items-center">
          <Upload className="w-8 h-8 text-gray-400 mb-2" />
          <span className="text-sm text-gray-500">
            {uploading ? 'Uploading...' : 'Click to upload or drag and drop'}
          </span>
        </div>
        <input
          type="file"
          className="hidden"
          onChange={handleFileChange}
          disabled={uploading}
        />
      </label>
      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
    </div>
  );
}
