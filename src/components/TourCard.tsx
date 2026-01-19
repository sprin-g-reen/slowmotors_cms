'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Tour, GalleryImage } from '@prisma/client';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { motion } from 'framer-motion';
import { Calendar, Gauge, MapPin } from 'lucide-react';

interface TourWithImages extends Tour {
  images: GalleryImage[];
}

export default function TourCard({ tour }: { tour: TourWithImages }) {
  const t = useTranslations('TourCard');
  const locale = useLocale();

  const title = locale === 'de' ? tour.title_de : tour.title_en;
  //const description = locale === 'de' ? tour.description_de : tour.description_en;

  const mainImage = tour.images && tour.images.length > 0 ? tour.images[0].url : '/placeholder.jpg';

  const statusColors = {
      'Available': 'bg-green-500',
      'Last Seats': 'bg-orange-500',
      'Sold Out': 'bg-red-500',
      'Hidden': 'bg-gray-500'
  };

  return (
    <motion.div
        whileHover={{ y: -5 }}
        className="group bg-secondary rounded-xl overflow-hidden shadow-lg border border-gray-800 flex flex-col h-full"
    >
      <div className="relative h-64 w-full overflow-hidden">
         <Image
           src={mainImage}
           alt={title}
           fill
           className="object-cover transition-transform duration-700 group-hover:scale-110"
         />
         <div className="absolute top-4 right-4">
            <span className={`text-xs font-bold px-3 py-1 rounded-full text-white uppercase tracking-wide shadow-sm ${statusColors[tour.status as keyof typeof statusColors] || 'bg-gray-500'}`}>
                {t(`status.${tour.status}` as "status.Available" | "status.LastSeats" | "status.SoldOut")}
            </span>
         </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold mb-3 text-white font-outfit leading-tight group-hover:text-primary transition-colors">{title}</h3>

        <div className="grid grid-cols-2 gap-4 my-4 text-gray-300 text-sm">
            <div className="flex items-center gap-2">
                <Calendar size={16} className="text-primary" />
                <span>{new Date(tour.startDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
                <Gauge size={16} className="text-primary" />
                <span>{tour.difficulty}</span>
            </div>
            <div className="flex items-center gap-2 col-span-2">
                <MapPin size={16} className="text-primary" />
                <span>Route Map Included</span>
            </div>
        </div>

        <div className="mt-auto pt-6 border-t border-gray-700 flex justify-between items-end">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Starting from</p>
            <span className="text-2xl font-bold text-white">€{tour.priceEur}</span>
          </div>
          <Link
            href={`/tours/${tour.id}`} // Assuming detail page exists or just linking somewhere
            className="bg-primary hover:bg-primary-hover text-white px-5 py-2 rounded font-semibold transition-colors shadow-lg shadow-primary/20"
          >
            Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
