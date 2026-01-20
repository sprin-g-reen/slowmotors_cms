import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import MasonryGallery from '@/components/MasonryGallery';
import { Calendar, Gauge, MapPin, CheckCircle, ArrowLeft } from 'lucide-react';

export default async function TourDetailPage({
  params
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id, locale } = await params;

  const tour = await prisma.tour.findUnique({
    where: { id },
    include: {
        images: true,
        dates: {
            orderBy: { startDate: 'asc' }
        }
    }
  });

  if (!tour) {
    notFound();
  }

  const title = locale === 'de' ? tour.title_de : tour.title_en;
  const description = locale === 'de' ? tour.description_de : tour.description_en;

  // Transform images for gallery
  const galleryImages = tour.images.map(img => ({
      id: img.id,
      url: img.url,
      caption: img.caption
  }));

  const upcomingDates = tour.dates.filter(d => new Date(d.startDate) >= new Date());

  return (
    <div className="bg-background min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative h-[70vh] w-full">
        <Image
          src={tour.images[0]?.url || '/placeholder.jpg'}
          alt={title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
            <div className="container mx-auto">
                <Link href="/tours" className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-6 uppercase tracking-widest text-xs font-bold transition-colors">
                    <ArrowLeft size={16} /> Back to Tours
                </Link>
                <h1 className="text-4xl md:text-6xl font-bold text-white font-display uppercase leading-tight max-w-4xl">
                    {title}
                </h1>
                <div className="flex flex-wrap gap-6 mt-6 text-gray-200">
                    <div className="flex items-center gap-2">
                        <Gauge className="text-primary" />
                        <span className="uppercase tracking-wide font-bold">{tour.difficulty}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-primary">€{tour.priceEur}</span>
                        <span className="text-sm text-gray-400">/ Rider</span>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-12">
            <section>
                <h2 className="text-2xl font-bold text-white uppercase mb-6 font-display border-l-4 border-primary pl-4">About the Ride</h2>
                <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed">
                    <p>{description}</p>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white uppercase mb-6 font-display border-l-4 border-primary pl-4">Gallery</h2>
                <MasonryGallery images={galleryImages} />
            </section>
        </div>

        {/* Sidebar / Booking */}
        <div className="lg:col-span-1">
            <div className="sticky top-24 bg-secondary border border-gray-800 p-6 rounded-none shadow-2xl">
                <h3 className="text-xl font-bold text-white uppercase mb-6 font-display">Upcoming Dates</h3>

                <div className="space-y-4">
                    {upcomingDates.length > 0 ? (
                        upcomingDates.map((date) => (
                            <div key={date.id} className="border border-gray-700 p-4 hover:border-primary transition-colors bg-background/50">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <div className="font-bold text-white text-lg">
                                            {new Date(date.startDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                            {' - '}
                                            {new Date(date.endDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </div>
                                        <div className="text-sm text-gray-400 mt-1">10 Days</div>
                                    </div>
                                    <span className={`text-[10px] uppercase font-bold px-2 py-1 ${date.status === 'Available' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                                        {date.status}
                                    </span>
                                </div>
                                <button
                                    className="w-full mt-4 bg-primary hover:bg-primary-hover text-white py-3 font-bold uppercase tracking-wider text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={date.status === 'SoldOut'}
                                >
                                    {date.status === 'SoldOut' ? 'Sold Out' : 'Book Now'}
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 italic">No dates available currently.</p>
                    )}
                </div>

                <div className="mt-8 pt-8 border-t border-gray-700">
                    <h4 className="text-sm font-bold text-white uppercase mb-4">Included</h4>
                    <ul className="space-y-2">
                        <li className="flex items-center gap-3 text-sm text-gray-400">
                            <CheckCircle size={16} className="text-primary" /> Royal Enfield Himalayan 450
                        </li>
                        <li className="flex items-center gap-3 text-sm text-gray-400">
                            <CheckCircle size={16} className="text-primary" /> Premium Accommodation
                        </li>
                        <li className="flex items-center gap-3 text-sm text-gray-400">
                            <CheckCircle size={16} className="text-primary" /> Fuel & Mechanics
                        </li>
                         <li className="flex items-center gap-3 text-sm text-gray-400">
                            <CheckCircle size={16} className="text-primary" /> Support Vehicle
                        </li>
                    </ul>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
