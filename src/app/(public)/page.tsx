import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RideCard } from "@/components/ride-card";
import prisma from "@/lib/db";
import { ArrowRight, MapPin, Calendar, Star } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function Homepage() {
  const latestRides = await prisma.ride.findMany({
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full overflow-hidden bg-zinc-900 text-white">
        {/* Abstract/Placeholder Background - In real app, use a high-res image/video */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />

        <div className="container relative z-10 flex h-full flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-7xl lg:text-8xl drop-shadow-md">
            Slow Motors
          </h1>
          <p className="mt-6 max-w-2xl text-lg sm:text-xl text-zinc-200 drop-shadow-sm">
            Rediscover the art of driving. Curated vintage rallies and leisure tours through the world&apos;s most beautiful landscapes.
          </p>
          <div className="mt-8 flex gap-4">
            <Button asChild size="lg" className="h-12 px-8 text-lg">
              <Link href="/rides">
                Explore Rides <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-8 text-lg bg-white/10 text-white hover:bg-white/20 border-white/20">
              <Link href="/journal">Read Our Stories</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features/Values Section */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4">
          <div className="grid gap-12 sm:grid-cols-3 text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <MapPin className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">Curated Routes</h3>
              <p className="text-muted-foreground">
                Meticulously planned itineraries taking you through scenic backroads and hidden gems.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Calendar className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">Exclusive Events</h3>
              <p className="text-muted-foreground">
                Limited participation ensures a personal and high-quality experience for every driver.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Star className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">Premium Service</h3>
              <p className="text-muted-foreground">
                From luxury accommodation to mechanical support, we handle the details so you can drive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Rides Section */}
      <section className="py-20">
        <div className="container px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Featured Rides</h2>
            <Button asChild variant="ghost" className="hidden sm:flex">
              <Link href="/rides">View all <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>

          {latestRides.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {latestRides.map((ride) => (
                <RideCard key={ride.id} ride={ride} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              No rides available at the moment.
            </div>
          )}

          <Button asChild variant="outline" className="mt-8 w-full sm:hidden">
            <Link href="/rides">View all rides</Link>
          </Button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-zinc-900 text-white">
        <div className="container px-4 text-center">
           <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">Ready to start your engine?</h2>
           <p className="text-zinc-400 max-w-2xl mx-auto mb-8 text-lg">
             Join our community of enthusiasts and get exclusive access to new route announcements and event bookings.
           </p>
           <Button asChild size="lg" variant="default" className="bg-white text-zinc-900 hover:bg-zinc-200">
             <Link href="/contact">Get in Touch</Link>
           </Button>
        </div>
      </section>
    </>
  );
}
