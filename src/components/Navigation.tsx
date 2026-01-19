'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Bike } from 'lucide-react';

export default function Navigation() {
  const t = useTranslations('Navigation');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLocaleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setIsOpen(false);
  };

  const navLinks = [
    { href: '/tours', label: t('tours') },
    { href: '/admin', label: t('admin') },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-background/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold font-outfit flex items-center gap-2 text-foreground">
            <Bike className="text-primary" size={32} />
            <span className="tracking-tighter">SLOW MOTORS</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold uppercase tracking-wider hover:text-primary transition-colors"
            >
                {link.label}
            </Link>
          ))}
          <div className="border-l border-gray-600 pl-4 ml-2">
            <div className="flex gap-2">
                <button
                    onClick={() => handleLocaleChange('en')}
                    className={`text-xs font-bold px-2 py-1 rounded ${locale === 'en' ? 'bg-primary text-white' : 'text-gray-400 hover:text-white'}`}
                >
                    EN
                </button>
                <button
                    onClick={() => handleLocaleChange('de')}
                    className={`text-xs font-bold px-2 py-1 rounded ${locale === 'de' ? 'bg-primary text-white' : 'text-gray-400 hover:text-white'}`}
                >
                    DE
                </button>
            </div>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-full left-0 w-full bg-background border-b border-secondary p-4 md:hidden shadow-xl"
            >
                <div className="flex flex-col gap-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="text-lg font-semibold block py-2 border-b border-secondary/30"
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className="flex gap-4 mt-4">
                        <button
                            onClick={() => handleLocaleChange('en')}
                            className={`flex-1 py-2 text-center rounded border border-secondary ${locale === 'en' ? 'bg-primary border-primary' : ''}`}
                        >
                            English
                        </button>
                        <button
                            onClick={() => handleLocaleChange('de')}
                            className={`flex-1 py-2 text-center rounded border border-secondary ${locale === 'de' ? 'bg-primary border-primary' : ''}`}
                        >
                            Deutsch
                        </button>
                    </div>
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
