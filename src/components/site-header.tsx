import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Gauge } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Gauge className="h-6 w-6" />
          <span className="text-xl font-bold tracking-tight">Slow Motors</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/rides" className="transition-colors hover:text-foreground/80 text-foreground/60">
            Rides
          </Link>
          <Link href="/gallery" className="transition-colors hover:text-foreground/80 text-foreground/60">
            Gallery
          </Link>
          <Link href="/journal" className="transition-colors hover:text-foreground/80 text-foreground/60">
            Journal
          </Link>
        </nav>
        <div className="flex items-center gap-4">
           {/* Placeholder for future auth or cart */}
           <Button asChild variant="default" size="sm">
             <Link href="/rides">Book a Ride</Link>
           </Button>
        </div>
      </div>
    </header>
  );
}
