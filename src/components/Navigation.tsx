'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { useLocale } from 'next-intl';

export default function Navigation() {
  const t = useTranslations('Navigation');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const handleLocaleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <nav className="bg-white shadow-md p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold flex items-center gap-2">
            <span>🏍️</span> Slow Motors
        </Link>
        <div className="flex gap-4 items-center">
          <Link href="/tours" className="hover:text-blue-600 font-medium">{t('tours')}</Link>
          <Link href="/admin" className="hover:text-blue-600 font-medium">{t('admin')}</Link>
          <div className="border-l pl-4 ml-2">
            <select
                value={locale}
                onChange={(e) => handleLocaleChange(e.target.value)}
                className="bg-transparent text-sm font-semibold focus:outline-none cursor-pointer"
            >
                <option value="en">🇺🇸 EN</option>
                <option value="de">🇩🇪 DE</option>
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
}
