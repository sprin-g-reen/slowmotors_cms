import { RideCard } from "@/components/ride-card";
import prisma from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function RidesPage() {
  const rides = await prisma.ride.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Our Rides</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Explore our exclusive collection of curated driving experiences.
        </p>
      </div>

      {rides.length === 0 ? (
        <div className="flex h-64 flex-col items-center justify-center rounded-lg border border-dashed bg-muted/50 p-8 text-center">
          <h3 className="text-xl font-semibold">No rides found</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Check back later for upcoming adventures.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rides.map((ride) => (
            <RideCard key={ride.id} ride={ride} />
          ))}
        </div>
      )}
    </div>
  );
}
