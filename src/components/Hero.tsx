'use client';

import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';

export default function Hero() {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/60 z-10" />

        {/* Background Image */}
        <div
            className="absolute inset-0 z-0 bg-cover bg-center grayscale-[30%] contrast-125"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2070&auto=format&fit=crop')" }}
        />

        <div className="container relative z-20 px-4">
            <div className="max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="border-l-4 border-primary pl-6 mb-8"
                >
                     <h2 className="text-xl md:text-2xl font-bold text-gray-200 uppercase tracking-[0.2em] mb-2">
                        Premium Motorcycle Tours
                    </h2>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-6xl md:text-8xl font-bold text-white mb-8 font-outfit uppercase tracking-tighter leading-[0.9]"
                >
                    Raw. Rugged.<br/><span className="text-primary">Unforgettable.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="text-lg md:text-xl text-gray-300 mb-12 max-w-xl leading-relaxed"
                >
                    Experience the world&apos;s most challenging roads on two wheels. Guided motorcycle expeditions for those who seek the extraordinary.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="flex flex-col sm:flex-row gap-6"
                >
                    <Link
                        href="/tours"
                        className="bg-primary hover:bg-white hover:text-black text-black px-10 py-4 font-bold uppercase tracking-widest transition-all clip-path-slant"
                    >
                        Find Your Ride
                    </Link>
                    <Link
                        href="/stories"
                        className="bg-transparent border border-white hover:bg-white hover:text-black text-white px-10 py-4 font-bold uppercase tracking-widest transition-all"
                    >
                        Read Stories
                    </Link>
                </motion.div>
            </div>
        </div>
    </div>
  );
}
