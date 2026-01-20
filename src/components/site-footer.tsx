import Link from "next/link";
import { Gauge } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto px-4 py-10 md:py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Gauge className="h-6 w-6" />
              <span className="text-xl font-bold tracking-tight">Slow Motors</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Curated driving experiences for the discerning enthusiast.
              Slow down and enjoy the ride.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Explore</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/rides" className="hover:text-foreground">Rides</Link></li>
              <li><Link href="/gallery" className="hover:text-foreground">Gallery</Link></li>
              <li><Link href="/journal" className="hover:text-foreground">Journal</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-foreground">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-foreground">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-foreground">Privacy Policy</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Stay Updated</h4>
            <p className="text-sm text-muted-foreground">
              Subscribe to our newsletter for the latest routes and stories.
            </p>
            {/* Newsletter input placeholder */}
          </div>
        </div>
        <div className="mt-10 border-t pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Slow Motors. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
