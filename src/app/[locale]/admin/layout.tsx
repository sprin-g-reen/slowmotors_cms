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
      <aside className="w-full md:w-64 bg-white p-4 rounded shadow h-fit">
        <h2 className="font-bold text-lg mb-4 text-gray-800">Admin</h2>
        <nav className="flex flex-col gap-2">
          <Link href="/admin" className="p-2 hover:bg-gray-100 rounded">{t('dashboard')}</Link>
          <Link href="/admin/tours" className="p-2 hover:bg-gray-100 rounded">{t('tours')}</Link>
          <Link href="/admin/stories" className="p-2 hover:bg-gray-100 rounded">{t('stories')}</Link>
        </nav>
      </aside>
      <main className="flex-1 bg-white p-6 rounded shadow">
        {children}
      </main>
    </div>
  );
}
