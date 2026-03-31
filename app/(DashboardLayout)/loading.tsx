import { Loader2 } from "lucide-react";

export default function DashboardGlobalLoading() {
  return (
    <div className="min-h-screen w-full bg-[#06060b] flex flex-col items-center justify-center space-y-6">
      <div className="relative">
        {/* Outer Glow Effect */}
        <div className="absolute inset-0 h-16 w-16 animate-pulse rounded-full bg-[#00F5A0]/20 blur-xl" />
        <Loader2 className="h-12 w-12 animate-spin text-[#00F5A0] relative z-10" />
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-2xl font-black italic tracking-tighter text-white uppercase animate-pulse">
          NEXUS <span className="text-[#00F5A0]">EXPRESS</span>
        </h2>
        <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.5em]">
          Syncing Dashboard Data
        </p>
      </div>

      {/* Progress bar animation */}
      <div className="h-[2px] w-48 bg-white/5 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-[#00F5A0] to-[#00D9F5] w-1/3 animate-[loading_1.5s_infinite_ease-in-out]" />
      </div>
    </div>
  );
}