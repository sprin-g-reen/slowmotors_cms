'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Tour, GalleryImage } from '@prisma/client';
import Image from 'next/image';

interface TourWithImages extends Tour {
  images: GalleryImage[];
}

export default function TourCard({ tour }: { tour: TourWithImages }) {
  const t = useTranslations('TourCard');
  const locale = useLocale();

  const title = locale === 'de' ? tour.title_de : tour.title_en;
  const description = locale === 'de' ? tour.description_de : tour.description_en;

  const mainImage = tour.images && tour.images.length > 0 ? tour.images[0].url : '/placeholder.jpg';

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative h-48 w-full">
         <Image
           src={mainImage}
           alt={title}
           fill
           className="object-cover"
         />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 line-clamp-2 mb-4">{description}</p>

        <div className="flex justify-between items-center text-sm">
          <div>
            <span className="font-medium">{t('price')}:</span> €{tour.priceEur}
          </div>
          <div className="px-2 py-1 bg-gray-100 rounded">
            {tour.difficulty}
          </div>
        </div>
         <div className="mt-2 text-sm text-gray-500">
             {t(`status.${tour.status}` as "status.Available" | "status.LastSeats" | "status.SoldOut")}
         </div>
      </div>
    </div>
  );
}
