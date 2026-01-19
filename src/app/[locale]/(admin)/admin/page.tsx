import { prisma } from '@/lib/prisma';
import { Link } from '@/i18n/navigation';

export default async function AdminDashboard() {
  const upcomingTours = await prisma.tour.findMany({
    take: 5,
    include: { dates: true },
    orderBy: { createdAt: 'desc' }, // Order by creation since dates are now a relation
  });

  const recentPosts = await prisma.post.findMany({
    take: 5,
    orderBy: { updatedAt: 'desc' }
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-white font-outfit uppercase tracking-tight">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Upcoming Tours Card */}
        <div className="bg-secondary p-6 rounded-xl border border-gray-800 shadow-lg">
          <div className="flex justify-between items-center mb-6">
             <h2 className="text-xl font-bold text-gray-200">Upcoming Tours</h2>
             <Link href="/admin/tours" className="text-primary hover:text-primary-hover text-sm font-semibold uppercase tracking-wider">Manage &rarr;</Link>
          </div>

          <div className="space-y-3">
            {upcomingTours.map(tour => {
                // Find next upcoming date
                const nextDate = tour.dates.find(d => new Date(d.startDate) >= new Date()) || tour.dates[0];

                return (
                  <div key={tour.id} className="flex justify-between items-center p-3 rounded bg-accent/50 border border-gray-700/50 hover:border-primary/50 transition-colors">
                    <div>
                        <div className="font-semibold text-gray-200">{tour.title_en}</div>
                        <div className="text-xs text-gray-400">
                        {nextDate ? new Date(nextDate.startDate).toLocaleDateString() : 'No dates'}
                        </div>
                    </div>
                    {nextDate && (
                        <span className={`text-xs font-bold px-2 py-1 rounded text-white ${nextDate.status === 'Available' ? 'bg-green-600' : 'bg-red-600'}`}>
                            {nextDate.status}
                        </span>
                    )}
                  </div>
                )
            })}
            {upcomingTours.length === 0 && <p className="text-gray-500 italic text-center py-4">No upcoming tours scheduled.</p>}
          </div>
        </div>

        {/* Recent Stories Card */}
        <div className="bg-secondary p-6 rounded-xl border border-gray-800 shadow-lg">
           <div className="flex justify-between items-center mb-6">
             <h2 className="text-xl font-bold text-gray-200">Recent Stories</h2>
             <Link href="/admin/stories" className="text-primary hover:text-primary-hover text-sm font-semibold uppercase tracking-wider">Manage &rarr;</Link>
          </div>
           <div className="space-y-3">
            {recentPosts.map(post => (
              <div key={post.id} className="flex justify-between items-center p-3 rounded bg-accent/50 border border-gray-700/50 hover:border-primary/50 transition-colors">
                <div className="font-semibold text-gray-200 truncate pr-4">{post.title_en}</div>
                 <div className="text-xs text-gray-400 whitespace-nowrap">
                  {post.published ? 'Published' : 'Draft'}
                </div>
              </div>
            ))}
            {recentPosts.length === 0 && <p className="text-gray-500 italic text-center py-4">No stories drafted yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
