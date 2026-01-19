import { prisma } from '@/lib/prisma';
import AdminTourForm from '@/components/AdminTourForm';

export default async function AdminToursPage() {
  const tours = await prisma.tour.findMany({
    orderBy: { createdAt: 'desc' },
    include: { dates: true }
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-white font-outfit uppercase tracking-tight">Manage Tours</h1>

      <div className="mb-12">
        <AdminTourForm />
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-bold mb-4 text-white uppercase tracking-wider border-b border-gray-800 pb-2">Existing Inventory</h2>
        <div className="bg-secondary border border-gray-800 rounded-xl overflow-hidden shadow-xl">
          <table className="min-w-full divide-y divide-gray-800">
            <thead className="bg-accent">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-widest">Title (EN)</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-widest">Upcoming Dates</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-widest">Price (EUR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {tours.map((tour) => (
                <tr key={tour.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-white font-medium">{tour.title_en}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-400">
                      {tour.dates.length > 0 ? (
                          <div className="flex flex-col gap-1">
                              {tour.dates.map(d => (
                                  <span key={d.id} className="text-xs">
                                      {new Date(d.startDate).toLocaleDateString()} <span className={`ml-1 text-[10px] uppercase px-1 rounded ${d.status === 'Available' ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>{d.status}</span>
                                  </span>
                              ))}
                          </div>
                      ) : (
                          <span className="italic text-gray-600">No dates</span>
                      )}
                  </td>
                   <td className="px-6 py-4 whitespace-nowrap text-primary font-bold">€{tour.priceEur}</td>
                </tr>
              ))}
              {tours.length === 0 && (
                 <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-gray-500 italic">No tours found in database.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
