import { notFound } from "next/navigation";
import Image from "next/image";
import { Itinerary } from "@/components/itinerary";
import { BookingDialog } from "@/components/booking-dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormDefinition } from "@/types/form";
import { Clock, TrendingUp, Users } from "lucide-react";
import prisma from "@/lib/db";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function RideDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const ride = await prisma.ride.findUnique({
    where: { slug },
  });

  if (!ride) {
    notFound();
  }

  // Fetch the dynamic form for bookings.
  // In a real app, this might be linked to the Ride or a global setting.
  // For now, we look for "Dynamic Enquiry" or take the first active one.
  const bookingForm = await prisma.dynamicForm.findFirst({
    where: { name: "Dynamic Enquiry", isActive: true },
  });

  const imageUrl = ride.routeMapUrl || "/placeholder-ride.jpg";

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full">
        <Image
          src={imageUrl}
          alt={ride.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 py-12">
          <Badge className="mb-4 text-base px-4 py-1">{ride.difficulty}</Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground drop-shadow-sm">
            {ride.title}
          </h1>
        </div>
      </div>

      <div className="container mx-auto mt-12 grid gap-12 px-4 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-12">

          {/* Description */}
          <section className="prose prose-lg dark:prose-invert max-w-none">
            <h2 className="text-3xl font-bold">About the Ride</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
               {(JSON.parse(ride.content) as { description?: string })?.description || "No description available."}
            </p>
          </section>

          {/* Itinerary */}
          <section>
            <Itinerary content={ride.content} />
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="sticky top-24 overflow-hidden shadow-lg border-primary/20">
            <CardHeader className="bg-primary/5 pb-4">
              <CardTitle className="text-xl">Trip Details</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6 p-6">
              <div className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                <div className="flex items-center text-muted-foreground">
                  <Clock className="mr-2 h-5 w-5" />
                  <span>Duration</span>
                </div>
                <span className="font-medium">{ride.duration}</span>
              </div>

              <div className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                <div className="flex items-center text-muted-foreground">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  <span>Difficulty</span>
                </div>
                <span className="font-medium">{ride.difficulty}</span>
              </div>

              <div className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                <div className="flex items-center text-muted-foreground">
                  <Users className="mr-2 h-5 w-5" />
                  <span>Max Participants</span>
                </div>
                <span className="font-medium">{ride.maxParticipants}</span>
              </div>

              <div className="mt-4">
                <div className="mb-2 text-sm text-muted-foreground">Starting from</div>
                <div className="text-3xl font-bold text-primary">
                  ${Number(ride.price).toLocaleString()}
                </div>
              </div>

              {bookingForm ? (
                <div className="mt-4">
                  <BookingDialog
                    formId={bookingForm.id}
                    definition={JSON.parse(bookingForm.schema) as FormDefinition}
                    rideTitle={ride.title}
                  />
                </div>
              ) : (
                 <div className="rounded-md bg-muted p-3 text-center text-sm text-muted-foreground">
                   Booking unavailable
                 </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
