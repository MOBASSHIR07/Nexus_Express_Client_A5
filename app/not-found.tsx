import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoveLeft, PackageSearch } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      {/* Icon with Glow */}
      <div className="relative mb-6">
        <div className="absolute inset-0 -z-10 h-24 w-24 translate-x-4 bg-primary/20 blur-2xl rounded-full" />
        <PackageSearch className="h-24 w-24 text-primary" />
      </div>

      {/* Content */}
      <h1 className="text-7xl font-extrabold tracking-tight text-foreground sm:text-9xl">
        404
      </h1>
      <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        Lost in Transit?
      </h2>
      <p className="mt-4 max-w-md text-muted-foreground">
        The parcel you are looking for doesn&apos;t seem to exist or has been moved 
        to a different route. Let&apos;s get you back on track.
      </p>

      {/* Action Buttons */}
      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
        <Link href="/">
          <Button className="h-12 px-8 font-bold shadow-lg shadow-primary/20">
            <MoveLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        <Link href="/track/1">
          <Button variant="ghost" className="h-12 px-8 font-semibold">
            Track a Parcel
          </Button>
        </Link>
      </div>

      {/* Decorative Text */}
      <p className="mt-12 text-sm font-medium text-muted-foreground/50 uppercase tracking-widest">
        Nexus Express Logistics System
      </p>
    </div>
  );
}