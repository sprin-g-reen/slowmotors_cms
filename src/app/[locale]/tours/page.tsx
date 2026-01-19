import { prisma } from '@/lib/prisma';
import TourCard from '@/components/TourCard';

export default async function ToursPage() {
  const tours = await prisma.tour.findMany({
    include: { images: true },
    where: { status: { not: 'Hidden' } } // Example filter
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Our Tours</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tours.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
      {tours.length === 0 && (
        <p className="text-gray-500 text-center">No tours available at the moment.</p>
      )}
    </div>
  );
}
