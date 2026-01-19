'use client';

import { useState } from 'react';
import { Upload, X, FileCheck, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FileUploaderProps {
  onUploadComplete: (url: string) => void;
}

export default function FileUploader({ onUploadComplete }: FileUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create preview
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    setUploading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');

      const data = await res.json();
      setSuccess(true);
      onUploadComplete(data.url);
    } catch (err) {
      setError('Failed to upload file');
      setPreview(null);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-accent/50 border-2 border-dashed border-gray-600 rounded-xl p-8 text-center hover:bg-accent hover:border-primary/50 transition-all group">
      <label className="cursor-pointer block relative">
        <div className="flex flex-col items-center">
          <AnimatePresence mode="wait">
            {success ? (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-green-500 mb-2"
                >
                    <FileCheck size={48} />
                </motion.div>
            ) : error ? (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-red-500 mb-2"
                >
                    <AlertCircle size={48} />
                </motion.div>
            ) : (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-gray-400 group-hover:text-primary mb-2 transition-colors"
                >
                    <Upload size={48} />
                </motion.div>
            )}
          </AnimatePresence>

          <span className="text-lg font-medium text-gray-300 group-hover:text-white transition-colors">
            {uploading ? 'Uploading...' : success ? 'Upload Complete!' : 'Drop files here or click to upload'}
          </span>
          <span className="text-xs text-gray-500 mt-2">Max file size: 50MB. Supports JPG, PNG, MP4.</span>
        </div>
        <input
          type="file"
          className="hidden"
          onChange={handleFileChange}
          disabled={uploading}
          accept="image/*,video/*"
        />
      </label>

      {preview && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-6 rounded-lg overflow-hidden border border-gray-700 relative"
          >
              <img src={preview} alt="Preview" className="w-full h-48 object-cover opacity-50" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  {uploading && <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>}
              </div>
          </motion.div>
      )}

      {error && <p className="text-red-400 text-sm mt-4 font-semibold">{error}</p>}
    </div>
  );
}
