'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Tour, GalleryImage, TourDate } from '@prisma/client';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { motion } from 'framer-motion';
import { Calendar, Gauge, MapPin, ArrowRight } from 'lucide-react';

interface TourWithRelations extends Tour {
  images: GalleryImage[];
  dates: TourDate[];
}

export default function TourCard({ tour }: { tour: TourWithRelations }) {
  const t = useTranslations('TourCard');
  const locale = useLocale();

  const title = locale === 'de' ? tour.title_de : tour.title_en;
  const mainImage = tour.images && tour.images.length > 0 ? tour.images[0].url : '/placeholder.jpg';

  const upcomingDates = tour.dates
    .filter(d => new Date(d.startDate) >= new Date())
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

  const nextDate = upcomingDates[0];
  const displayStatus = nextDate ? nextDate.status : 'Sold Out';
  const displayDate = nextDate ? new Date(nextDate.startDate).toLocaleDateString() : 'TBA';

  const statusColors = {
      'Available': 'bg-green-600',
      'LastSeats': 'bg-orange-600',
      'SoldOut': 'bg-red-600',
      'Hidden': 'bg-gray-600'
  };

  return (
    <motion.div
        whileHover={{ y: -10 }}
        className="group bg-secondary border border-gray-800 flex flex-col h-full hover:border-primary/50 transition-colors"
    >
      <div className="relative h-72 w-full overflow-hidden">
         <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
         <Image
           src={mainImage}
           alt={title}
           fill
           className="object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale-[20%] group-hover:grayscale-0"
         />
         <div className="absolute top-0 left-0 z-20">
            <span className={`text-[10px] font-bold px-4 py-2 text-white uppercase tracking-widest inline-block ${statusColors[displayStatus as keyof typeof statusColors] || 'bg-gray-500'}`}>
                {displayStatus}
            </span>
         </div>
         <div className="absolute bottom-0 right-0 z-20 bg-background/90 px-4 py-2 border-t border-l border-gray-800">
             <span className="text-xl font-bold text-primary">€{tour.priceEur}</span>
         </div>
      </div>

      <div className="p-8 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold mb-4 text-white font-outfit uppercase leading-tight group-hover:text-primary transition-colors">{title}</h3>

        <div className="space-y-3 mb-8">
            <div className="flex items-center gap-3 text-sm text-gray-400">
                <Calendar size={14} className="text-primary" />
                <span className="uppercase tracking-wide font-medium">Next: {displayDate}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-400">
                <Gauge size={14} className="text-primary" />
                <span className="uppercase tracking-wide font-medium">{tour.difficulty}</span>
            </div>
             <div className="flex items-center gap-3 text-sm text-gray-400">
                <MapPin size={14} className="text-primary" />
                <span className="uppercase tracking-wide font-medium">Route Map Included</span>
            </div>
        </div>

        <div className="mt-auto">
          <Link
            href={`/tours/${tour.id}`}
            className="w-full block bg-white hover:bg-primary text-black hover:text-white py-4 text-center font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 group-hover:gap-4"
          >
            View Expedition <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
