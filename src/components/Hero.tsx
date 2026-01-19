'use client';

import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';

export default function Hero() {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-black/60 z-10" />

        {/* Background Image (In real app, use next/image with priority or video) */}
        <div
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2070&auto=format&fit=crop')" }}
        />

        <div className="container relative z-20 px-4 text-center">
            <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-7xl font-bold text-white mb-6 font-outfit uppercase tracking-tight"
            >
                Raw. Rugged. <span className="text-primary">Real.</span>
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto"
            >
                Experience the world&apos;s most challenging roads on two wheels. Guided motorcycle tours for the brave.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="flex flex-col md:flex-row gap-4 justify-center"
            >
                <Link
                    href="/tours"
                    className="bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded font-bold uppercase tracking-wider transition-all transform hover:scale-105"
                >
                    Find Your Ride
                </Link>
                <Link
                    href="/stories"
                    className="bg-transparent border-2 border-white hover:bg-white hover:text-black text-white px-8 py-4 rounded font-bold uppercase tracking-wider transition-all"
                >
                    Read Stories
                </Link>
            </motion.div>
        </div>
    </div>
  );
}
