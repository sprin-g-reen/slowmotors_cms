import { prisma } from '@/lib/prisma';
import TourCard from '@/components/TourCard';
import { Link } from '@/i18n/navigation';

export default async function ToursPage() {
  const tours = await prisma.tour.findMany({
    include: { images: true },
    where: { status: { not: 'Hidden' } }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Our Tours</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tours.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>

      {tours.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No tours available at the moment.</p>
          <Link href="/admin/tours" className="text-blue-600 underline">
            Go to Admin to create one
          </Link>
        </div>
      )}
    </div>
  );
}
