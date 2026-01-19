import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations('Admin');

  return (
    <div className="flex flex-col md:flex-row gap-6 mt-6">
      <aside className="w-full md:w-64 bg-white p-4 rounded shadow h-fit sticky top-24">
        <h2 className="font-bold text-lg mb-4 text-gray-800 border-b pb-2">CMS Admin</h2>
        <nav className="flex flex-col gap-1">
          <Link href="/admin" className="p-2 hover:bg-gray-100 rounded block text-gray-700 hover:text-blue-600 transition">
            {t('dashboard')}
          </Link>
          <Link href="/admin/tours" className="p-2 hover:bg-gray-100 rounded block text-gray-700 hover:text-blue-600 transition">
            {t('tours')}
          </Link>
          <Link href="/admin/stories" className="p-2 hover:bg-gray-100 rounded block text-gray-700 hover:text-blue-600 transition">
            {t('stories')}
          </Link>
          <hr className="my-2" />
          <Link href="/" target="_blank" className="p-2 hover:bg-gray-100 rounded block text-sm text-gray-500 hover:text-green-600 transition flex items-center gap-2">
            View Live Site ↗
          </Link>
        </nav>
      </aside>
      <main className="flex-1 bg-white p-6 rounded shadow">
        {children}
      </main>
    </div>
  );
}
