import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function HomePage() {
  const t = useTranslations('Navigation');

  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold mb-6">Welcome to Slow Motors</h1>
      <p className="text-xl text-gray-600 mb-8">Discover the world on two wheels.</p>
      <div className="flex justify-center gap-4">
        <Link
          href="/tours"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          {t('tours')}
        </Link>
      </div>
    </div>
  );
}
