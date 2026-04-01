import { trackParcelAction } from "@/actions/parcel.action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IParcelTrackingDetail } from "@/types/parcel";
import { Package, MapPin, User, ArrowLeft, Clock, CircleCheck, Truck, Calendar } from "lucide-react";

type PageProps = {
  params: Promise<{ id: string }>;
};

function formatDate(timestamp: string) {
  return new Date(timestamp).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function TrackPage({ params }: PageProps) {
  const { id } = await params;
  const trackingCode = decodeURIComponent(id).trim();

  const response = await trackParcelAction(trackingCode);
  const parcel = response?.data as IParcelTrackingDetail;
  const success = response?.success;

  if (!success || !parcel) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-6 text-white">
        <div className="max-w-md w-full text-center space-y-4 bg-white/5 p-8 rounded-3xl border border-white/10 shadow-xl">
          <Package className="text-red-500 mx-auto" size={40} />
          <h2 className="text-xl font-bold uppercase tracking-tight">Parcel Not Found</h2>
          <p className="text-white/40 text-xs">Tracking ID <span className="text-white/60">[{trackingCode}]</span> is not in our system.</p>
          <Link href="/" className="block pt-4">
            <Button variant="outline" className="w-full rounded-xl border-white/10 text-xs uppercase font-bold">
              <ArrowLeft className="mr-2" size={14} /> Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const steps = parcel.tracking?.steps ?? [];

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-10 space-y-6 animate-in fade-in duration-500 py-16">
      
      {/* 🧾 Header Card: Summary */}
      <div className="bg-[#0b0b11] border border-white/10 rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-[#00F5A0] uppercase tracking-widest">Tracking Number</p>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">{parcel.trackingCode}</h1>
            <div className="flex items-center gap-2 text-white/40 text-[11px] font-medium pt-1">
                <Package size={12} /> {parcel.title}
                <span className="h-1 w-1 rounded-full bg-white/20" />
                <Calendar size={12} /> {new Date(parcel.createdAt).toLocaleDateString()}
            </div>
          </div>
          
          <div className="flex gap-2">
             <Badge className="bg-[#00F5A0]/10 text-[#00F5A0] border border-[#00F5A0]/20 px-4 py-1.5 rounded-lg font-bold uppercase text-[10px]">
                {parcel.deliveryStatus}
             </Badge>
             <Badge variant="outline" className="text-white/40 border-white/10 px-4 py-1.5 rounded-lg font-bold uppercase text-[10px]">
                {parcel.paymentStatus}
             </Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 📟 Main Timeline */}
        <div className="lg:col-span-2">
           <div className="bg-[#0b0b11] border border-white/10 rounded-2xl p-6 md:p-8">
              <h2 className="text-sm font-bold text-white uppercase tracking-widest mb-8 flex items-center gap-2 border-b border-white/5 pb-4">
                <Clock size={16} className="text-[#00F5A0]" /> Journey Updates
              </h2>

              <div className="relative space-y-8 ml-2 border-l border-white/10 pb-2">
                {steps.length > 0 ? (
                  steps.map((step, index) => (
                    <div key={step.id} className="relative pl-8 group">
                      {/* Dot */}
                      <div className={`absolute -left-[6px] top-1 h-3 w-3 rounded-full z-10 ${
                        index === steps.length - 1 ? "bg-[#00F5A0] shadow-[0_0_10px_#00F5A0]" : "bg-white/20"
                      }`} />
                      
                      <div className={`rounded-xl p-4 transition-all ${
                        index === steps.length - 1 ? "bg-white/5 border border-white/10" : "opacity-60"
                      }`}>
                        <div className="flex items-center justify-between mb-1">
                           <span className={`text-[11px] font-black uppercase tracking-wider ${index === steps.length - 1 ? "text-[#00F5A0]" : "text-white/50"}`}>
                             {step.status.replace(/_/g, ' ')}
                           </span>
                           <span className="text-[10px] text-white/30 font-medium italic">
                             {formatDate(step.timestamp)}
                           </span>
                        </div>
                        {step.location && (
                            <div className="flex items-center gap-1.5 text-[10px] text-[#00D9F5] font-bold uppercase mb-2">
                                <MapPin size={10} /> {step.location}
                            </div>
                        )}
                        <p className="text-sm text-white/60 leading-relaxed">
                            {step.message || "Status updated."}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="pl-8 text-white/20 text-xs italic py-4 tracking-wider uppercase">
                    Order confirmed. Waiting for rider pickup...
                  </div>
                )}
              </div>
           </div>
        </div>

        {/* 📦 Parcel Details Sidebar */}
        <div className="space-y-6">
            <div className="bg-[#0b0b11] border border-white/10 rounded-2xl p-6 space-y-6">
                <h3 className="text-[11px] font-bold text-white/30 uppercase tracking-widest border-b border-white/5 pb-3">Shipment Details</h3>
                
                <div className="space-y-5">
                    {/* Rider */}
                    <div className="flex items-start gap-4">
                        <div className="h-9 w-9 rounded-lg bg-white/5 flex items-center justify-center text-white/30 shrink-0 border border-white/5">
                          <Truck size={16}/>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[9px] font-bold text-white/20 uppercase tracking-wider">Courier</p>
                            <p className="text-xs font-bold text-white/80 uppercase tracking-tighter">
                                {parcel.rider?.user?.name ?? "Assigning soon"}
                            </p>
                        </div>
                    </div>

                    {/* Delivery Address */}
                    <div className="flex items-start gap-4">
                        <div className="h-9 w-9 rounded-lg bg-white/5 flex items-center justify-center text-white/30 shrink-0 border border-white/5">
                          <MapPin size={16}/>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[9px] font-bold text-white/20 uppercase tracking-wider">Destination</p>
                            <p className="text-xs font-medium text-white/70 leading-relaxed">{parcel.deliveryAddress}</p>
                        </div>
                    </div>

                    {/* Pricing */}
                    <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                        <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Total cost</span>
                        <span className="text-xl font-black text-[#00F5A0] italic tracking-tighter">${parcel.price}</span>
                    </div>
                </div>
            </div>

            <Link href="/" className="block">
                <Button className="w-full h-12 bg-white/5 hover:bg-white/10 text-white/40 hover:text-white rounded-xl border border-white/10 transition-all font-bold uppercase text-[10px] tracking-widest">
                   Exit Tracking
                </Button>
            </Link>
        </div>
      </div>
    </div>
  );
}