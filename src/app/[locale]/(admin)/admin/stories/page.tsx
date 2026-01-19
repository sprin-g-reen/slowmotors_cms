import { prisma } from '@/lib/prisma';
import StoryForm from '@/components/StoryForm';

export default async function AdminStoriesPage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Stories</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Write New Story</h2>
        <StoryForm />
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Stories</h2>
         <ul className="space-y-2">
            {posts.map(post => (
                <li key={post.id} className="border p-4 rounded bg-white shadow-sm flex justify-between items-center">
                    <span>{post.title_en}</span>
                    <span className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</span>
                </li>
            ))}
             {posts.length === 0 && <li className="text-gray-500">No stories yet.</li>}
         </ul>
      </div>
    </div>
  );
}
