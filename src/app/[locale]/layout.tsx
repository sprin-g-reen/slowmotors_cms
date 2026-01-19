import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Navigation from '@/components/Navigation';
import '../globals.css';
import { Inter, Outfit } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

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
    <html lang={locale} className={`${inter.variable} ${outfit.variable}`}>
      <body className="bg-background text-foreground min-h-screen flex flex-col font-sans">
        <NextIntlClientProvider messages={messages}>
          <Navigation />
          <main className="flex-grow">
            {children}
          </main>
          <footer className="bg-accent text-gray-400 p-8 text-center border-t border-secondary mt-12">
            <div className="container mx-auto">
                <p>&copy; {new Date().getFullYear()} Slow Motors. All rights reserved.</p>
                <p className="text-sm mt-2">Adventure awaits.</p>
            </div>
          </footer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
