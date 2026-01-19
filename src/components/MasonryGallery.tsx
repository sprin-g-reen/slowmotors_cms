'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Image from 'next/image';

interface ImageItem {
    id: string;
    url: string;
    caption?: string | null;
}

export default function MasonryGallery({ images }: { images: ImageItem[] }) {
    const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);

    return (
        <>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4 p-4">
                {images.map((img, index) => (
                    <motion.div
                        key={img.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-lg"
                        onClick={() => setSelectedImage(img)}
                    >
                        <Image
                            src={img.url}
                            alt={img.caption || 'Gallery Image'}
                            width={600}
                            height={400}
                            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-white font-bold uppercase tracking-widest text-sm border border-white px-4 py-2">View</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button className="absolute top-4 right-4 text-white hover:text-primary">
                            <X size={40} />
                        </button>
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            className="max-w-5xl max-h-[90vh] relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={selectedImage.url}
                                alt={selectedImage.caption || ''}
                                className="max-h-[85vh] w-auto shadow-2xl rounded-sm border border-gray-800"
                            />
                            {selectedImage.caption && (
                                <p className="text-white text-center mt-4 text-lg font-light italic">{selectedImage.caption}</p>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
