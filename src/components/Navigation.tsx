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
    <nav className={`fixed w-full z-50 transition-all duration-300 border-b border-transparent ${scrolled ? 'bg-background/90 backdrop-blur-md border-gray-800 py-3' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold font-outfit flex items-center gap-2 text-foreground group">
            <div className="bg-primary p-1">
                <Bike className="text-black" size={24} />
            </div>
            <span className="tracking-tighter uppercase group-hover:text-primary transition-colors">Slow Motors</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10 items-center">
          {navLinks.map((link) => (
            <Link
                key={link.href}
                href={link.href}
                className="text-sm font-bold uppercase tracking-widest text-gray-300 hover:text-white transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full"
            >
                {link.label}
            </Link>
          ))}
          <div className="border-l border-gray-700 pl-6 ml-2">
            <div className="flex gap-2">
                <button
                    onClick={() => handleLocaleChange('en')}
                    className={`text-[10px] font-bold px-2 py-1 uppercase tracking-wider ${locale === 'en' ? 'bg-white text-black' : 'text-gray-500 hover:text-white'}`}
                >
                    EN
                </button>
                <button
                    onClick={() => handleLocaleChange('de')}
                    className={`text-[10px] font-bold px-2 py-1 uppercase tracking-wider ${locale === 'de' ? 'bg-white text-black' : 'text-gray-500 hover:text-white'}`}
                >
                    DE
                </button>
            </div>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-foreground hover:text-primary transition-colors" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-full left-0 w-full bg-background border-b border-gray-800 p-6 md:hidden shadow-2xl flex flex-col gap-6"
            >
                {navLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="text-2xl font-bold font-outfit uppercase tracking-tight text-white hover:text-primary transition-colors"
                    >
                        {link.label}
                    </Link>
                ))}
                <div className="flex gap-4 pt-4 border-t border-gray-800">
                    <button
                        onClick={() => handleLocaleChange('en')}
                        className={`flex-1 py-3 text-center uppercase font-bold tracking-wider text-sm border border-gray-800 ${locale === 'en' ? 'bg-primary text-black border-primary' : 'text-gray-400'}`}
                    >
                        English
                    </button>
                    <button
                        onClick={() => handleLocaleChange('de')}
                        className={`flex-1 py-3 text-center uppercase font-bold tracking-wider text-sm border border-gray-800 ${locale === 'de' ? 'bg-primary text-black border-primary' : 'text-gray-400'}`}
                    >
                        Deutsch
                    </button>
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
