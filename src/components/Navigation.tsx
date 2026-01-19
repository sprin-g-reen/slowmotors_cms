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
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">Slow Motors</Link>
        <div className="flex gap-4 items-center">
          <Link href="/tours" className="hover:text-blue-600">{t('tours')}</Link>
          <Link href="/admin" className="hover:text-blue-600">{t('admin')}</Link>
          <select
            value={locale}
            onChange={(e) => handleLocaleChange(e.target.value)}
            className="border rounded p-1"
          >
            <option value="en">EN</option>
            <option value="de">DE</option>
          </select>
        </div>
      </div>
    </nav>
  );
}
