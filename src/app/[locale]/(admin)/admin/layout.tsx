import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations('Admin');

  return (
    <div className="flex flex-col md:flex-row gap-6 mt-6 container mx-auto px-4 mb-20">
      <aside className="w-full md:w-64 bg-secondary p-6 rounded-xl border border-gray-800 shadow-xl h-fit sticky top-24">
        <h2 className="font-bold text-xl mb-6 text-white border-b border-gray-700 pb-4 tracking-tight uppercase">CMS Admin</h2>
        <nav className="flex flex-col gap-2">
          <Link href="/admin" className="p-3 hover:bg-accent rounded-lg block text-gray-300 hover:text-white hover:pl-4 transition-all duration-300 font-medium">
            {t('dashboard')}
          </Link>
          <Link href="/admin/tours" className="p-3 hover:bg-accent rounded-lg block text-gray-300 hover:text-white hover:pl-4 transition-all duration-300 font-medium">
            {t('tours')}
          </Link>
          <Link href="/admin/stories" className="p-3 hover:bg-accent rounded-lg block text-gray-300 hover:text-white hover:pl-4 transition-all duration-300 font-medium">
            {t('stories')}
          </Link>
          <hr className="my-4 border-gray-700" />
          <Link href="/" target="_blank" className="p-3 hover:bg-green-900/20 rounded-lg block text-sm text-green-400 hover:text-green-300 transition-colors flex items-center gap-2">
            View Live Site ↗
          </Link>
        </nav>
      </aside>
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
