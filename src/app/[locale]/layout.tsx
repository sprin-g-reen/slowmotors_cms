import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Navigation from '@/components/Navigation';
import '../globals.css';

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="bg-gray-50 min-h-screen flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <Navigation />
          <main className="flex-grow container mx-auto p-4">
            {children}
          </main>
          <footer className="bg-gray-800 text-white p-4 text-center">
            &copy; {new Date().getFullYear()} Slow Motors
          </footer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
