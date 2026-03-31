"use client"; 

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
   
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
        <AlertCircle className="w-10 h-10 text-red-500" />
      </div>

      <h2 className="text-3xl font-black text-white tracking-tighter mb-2 italic">
        SOMETHING WENT WRONG
      </h2>
      <p className="text-white/40 max-w-md mb-8 font-medium">
        An unexpected error occurred while processing your request. Our team has been notified.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={() => reset()}
          className="bg-gradient-to-r from-[#00F5A0] to-[#00D9F5] text-[#06060b] font-black h-12 px-8 rounded-xl active:scale-95 transition-all"
        >
          <RefreshCcw className="mr-2 h-4 w-4" /> Try Again
        </Button>

        <Button
          asChild
          variant="outline"
          className="border-white/10 bg-white/5 text-white hover:bg-white/10 h-12 px-8 rounded-xl"
        >
          <Link href="/">
            <Home className="mr-2 h-4 w-4" /> Go Home
          </Link>
        </Button>
      </div>

      {error.digest && (
        <p className="mt-8 text-[10px] text-white/20 font-mono uppercase tracking-widest">
          Error Digest: {error.digest}
        </p>
      )}
    </div>
  );
}