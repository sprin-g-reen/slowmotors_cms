import { prisma } from '@/lib/prisma';
import TourForm from '@/components/TourForm';

export default async function AdminToursPage() {
  const tours = await prisma.tour.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Tours</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Create New Tour</h2>
        <TourForm />
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Existing Tours</h2>
        <div className="bg-white border rounded shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title (EN)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price (EUR)</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tours.map((tour) => (
                <tr key={tour.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{tour.title_en}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(tour.startDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{tour.status}</td>
                   <td className="px-6 py-4 whitespace-nowrap">€{tour.priceEur}</td>
                </tr>
              ))}
              {tours.length === 0 && (
                 <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-gray-500">No tours found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
