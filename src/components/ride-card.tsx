import Link from "next/link";
import Image from "next/image";
import { Ride } from "@prisma/client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Clock, TrendingUp } from "lucide-react";

interface RideCardProps {
  ride: Ride;
}

export function RideCard({ ride }: RideCardProps) {
  // Use a placeholder if routeMapUrl is treated as the main image,
  // or add a coverImage field to the Ride model later.
  // For now, I'll use a placeholder or routeMapUrl if available.
  const imageUrl = ride.routeMapUrl || "/placeholder-ride.jpg";

  return (
    <Link href={`/rides/${ride.slug}`}>
      <Card className="h-full overflow-hidden transition-all hover:shadow-lg">
        <div className="w-full">
          <AspectRatio ratio={16 / 9}>
            <Image
              src={imageUrl}
              alt={ride.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </AspectRatio>
        </div>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="mb-2">
              {ride.difficulty}
            </Badge>
          </div>
          <CardTitle className="line-clamp-1">{ride.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              {ride.duration}
            </div>
            <div className="flex items-center">
              <TrendingUp className="mr-1 h-4 w-4" />
              {ride.difficulty}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between border-t p-4">
          <span className="text-sm text-muted-foreground">Starting from</span>
          <span className="text-lg font-bold">
            ${Number(ride.price).toLocaleString()}
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
