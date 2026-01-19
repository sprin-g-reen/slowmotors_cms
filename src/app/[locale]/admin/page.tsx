import { prisma } from '@/lib/prisma';
import { Link } from '@/i18n/navigation';

export default async function AdminDashboard() {
  const upcomingTours = await prisma.tour.findMany({
    take: 5,
    orderBy: { startDate: 'asc' },
    where: { startDate: { gte: new Date() } }
  });

  const recentPosts = await prisma.post.findMany({
    take: 5,
    orderBy: { updatedAt: 'desc' }
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Upcoming Tours</h2>
          <div className="space-y-4">
            {upcomingTours.map(tour => (
              <div key={tour.id} className="border p-3 rounded hover:bg-gray-50">
                <div className="font-medium">{tour.title_en}</div>
                <div className="text-sm text-gray-500">
                  {new Date(tour.startDate).toLocaleDateString()} - {tour.status}
                </div>
              </div>
            ))}
            {upcomingTours.length === 0 && <p className="text-gray-500">No upcoming tours.</p>}
          </div>
          <Link href="/admin/tours" className="text-blue-600 text-sm mt-2 inline-block">Manage Tours &rarr;</Link>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Blog Drafts</h2>
           <div className="space-y-4">
            {recentPosts.map(post => (
              <div key={post.id} className="border p-3 rounded hover:bg-gray-50">
                <div className="font-medium">{post.title_en}</div>
                 <div className="text-sm text-gray-500">
                  {post.published ? 'Published' : 'Draft'} - {new Date(post.updatedAt).toLocaleDateString()}
                </div>
              </div>
            ))}
            {recentPosts.length === 0 && <p className="text-gray-500">No recent posts.</p>}
          </div>
           <Link href="/admin/stories" className="text-blue-600 text-sm mt-2 inline-block">Manage Stories &rarr;</Link>
        </div>
      </div>
    </div>
  );
}
