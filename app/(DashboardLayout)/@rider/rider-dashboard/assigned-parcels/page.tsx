/* eslint-disable @typescript-eslint/no-explicit-any */
import { getMyParcelsAction } from "@/actions/parcel.action";
import { 
  Package, 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  User, 
  Phone, 
  DollarSign,
  CheckCircle2,
  Clock,
  Truck,
  PackageCheck,
  AlertCircle,
  Navigation,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ParcelSearchBar from "@/components/dashboard/ParcelSearchBar";

const getStatusConfig = (status: string) => {
  const configs = {
    DELIVERED: {
      icon: CheckCircle2,
      label: "Delivered",
      color: "emerald",
      bgClass: "bg-emerald-500/10",
      textClass: "text-emerald-400",
      borderClass: "border-emerald-500/20"
    },
    PICKED_UP: {
      icon: PackageCheck,
      label: "Picked Up",
      color: "sky",
      bgClass: "bg-sky-500/10",
      textClass: "text-sky-400",
      borderClass: "border-sky-500/20"
    },
    IN_TRANSIT: {
      icon: Truck,
      label: "In Transit",
      color: "blue",
      bgClass: "bg-blue-500/10",
      textClass: "text-blue-400",
      borderClass: "border-blue-500/20"
    },
    PENDING: {
      icon: Clock,
      label: "Pending Pickup",
      color: "amber",
      bgClass: "bg-amber-500/10",
      textClass: "text-amber-400",
      borderClass: "border-amber-500/20"
    }
  };
  return configs[status as keyof typeof configs] || configs.PENDING;
};

const getPaymentStatusBadge = (status: string) => {
  if (status === "PAID") {
    return {
      icon: CheckCircle2,
      label: "Paid",
      color: "emerald"
    };
  }
  return {
    icon: AlertCircle,
    label: "Unpaid",
    color: "amber"
  };
};

export default async function AssignedParcelsPage({
  searchParams,
}: {
  searchParams?: { searchTerm?: string; page?: string };
}) {
  const rawSearchTerm = searchParams?.searchTerm || "";
  const searchTerm = rawSearchTerm.trim();
  const currentPage = Number(searchParams?.page) || 1;
  const limit = 10;

  const query: Record<string, string | number> = { page: currentPage, limit };
  if (searchTerm) query.searchTerm = searchTerm;

  const result = await getMyParcelsAction(query);
  const parcels = Array.isArray(result?.data) ? result.data : [];
  const meta = result?.meta;
  const assignedCount = meta?.total ?? parcels.length;
  const deliveredCount = parcels.filter((parcel: any) => parcel.deliveryStatus === "DELIVERED").length;
  const inProgressCount = parcels.filter((parcel: any) => 
    parcel.deliveryStatus === "PICKED_UP" || parcel.deliveryStatus === "IN_TRANSIT"
  ).length;
  const pendingCount = parcels.filter((parcel: any) => 
    parcel.deliveryStatus === "PENDING"
  ).length;
  const totalEarnings = parcels
    .filter((parcel: any) => parcel.deliveryStatus === "DELIVERED" && parcel.paymentStatus === "PAID")
    .reduce((sum: number, parcel: any) => sum + parseFloat(parcel.price), 0);
  
  const totalPages = Math.max(1, Math.ceil((meta?.total ?? parcels.length) / limit));

  const makeHref = (page: number) => {
    const params = new URLSearchParams();
    if (searchTerm) params.set("searchTerm", searchTerm);
    params.set("page", String(page));
    return `?${params.toString()}`;
  };

  const prevHref = currentPage > 1 ? makeHref(currentPage - 1) : undefined;
  const nextHref = currentPage < totalPages ? makeHref(currentPage + 1) : undefined;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <div className="max-w-7xl mx-auto p-6 md:p-10 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <Truck className="w-3 h-3 text-emerald-400" />
              <p className="text-[10px] font-mono uppercase tracking-wider text-emerald-400">
                Rider Dashboard
              </p>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
              Assigned Parcels
            </h1>
            <p className="text-sm text-gray-400 max-w-2xl">
              Manage your deliveries, track progress, and update parcel statuses in real-time.
            </p>
          </div>
          <ParcelSearchBar initialSearchTerm={searchTerm} />
        </div>

        {/* Stats Grid - Rider Focused */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="group relative overflow-hidden rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 p-5 hover:border-gray-700 transition-all">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl" />
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-emerald-500/10">
                  <Package className="w-4 h-4 text-emerald-400" />
                </div>
                <span className="text-2xl font-bold text-emerald-400">{assignedCount}</span>
              </div>
              <p className="text-xs text-gray-400 uppercase tracking-wider">Total Assigned</p>
              <p className="text-xl font-bold text-white mt-1">{assignedCount}</p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 p-5 hover:border-gray-700 transition-all">
            <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/5 rounded-full blur-2xl" />
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-sky-500/10">
                  <Truck className="w-4 h-4 text-sky-400" />
                </div>
                <span className="text-2xl font-bold text-sky-400">{inProgressCount}</span>
              </div>
              <p className="text-xs text-gray-400 uppercase tracking-wider">In Progress</p>
              <p className="text-xl font-bold text-white mt-1">{inProgressCount}</p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 p-5 hover:border-gray-700 transition-all">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl" />
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-amber-500/10">
                  <Clock className="w-4 h-4 text-amber-400" />
                </div>
                <span className="text-2xl font-bold text-amber-400">{pendingCount}</span>
              </div>
              <p className="text-xs text-gray-400 uppercase tracking-wider">Pending Pickup</p>
              <p className="text-xl font-bold text-white mt-1">{pendingCount}</p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 p-5 hover:border-gray-700 transition-all">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl" />
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-emerald-500/10">
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                </div>
                <span className="text-2xl font-bold text-emerald-400">${totalEarnings}</span>
              </div>
              <p className="text-xs text-gray-400 uppercase tracking-wider">Earned (Paid)</p>
              <p className="text-xl font-bold text-white mt-1">${totalEarnings}</p>
            </div>
          </div>
        </div>

        {/* Parcels List */}
        <div className="space-y-4">
          {parcels.length === 0 ? (
            <div className="rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 p-16 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-800 mb-4">
                <Package className="w-10 h-10 text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">No assigned parcels</h3>
              <p className="text-sm text-gray-400">
                {searchTerm ? "No parcels match your search criteria." : "You don't have any assigned parcels at the moment."}
              </p>
            </div>
          ) : (
            parcels.map((parcel: any) => {
              const StatusIcon = getStatusConfig(parcel.deliveryStatus).icon;
              const statusConfig = getStatusConfig(parcel.deliveryStatus);
              const paymentStatus = getPaymentStatusBadge(parcel.paymentStatus);
              const PaymentIcon = paymentStatus.icon;
              
              return (
                <div 
                  key={parcel.id} 
                  className="group relative overflow-hidden rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-gray-700 transition-all duration-300"
                >
                  <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-emerald-500/5 to-transparent rounded-full blur-2xl" />
                  
                  <div className="relative p-6">
                    {/* Header Section */}
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-gray-800/50">
                          <Package className="w-6 h-6 text-emerald-400" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 flex-wrap mb-2">
                            <h3 className="text-xl font-bold text-white">{parcel.title || "Untitled Parcel"}</h3>
                            <span className="text-xs font-mono text-gray-500 bg-gray-800/50 px-2 py-1 rounded">
                              {parcel.trackingCode}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-gray-400">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(parcel.createdAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric'
                              })}
                            </span>
                            <span className="text-gray-600">•</span>
                            <span className="flex items-center gap-1">
                              <Package className="w-3 h-3" />
                              {parcel.weight} kg
                            </span>
                            <span className="text-gray-600">•</span>
                            <span className="flex items-center gap-1">
                              <DollarSign className="w-3 h-3" />
                              ${parcel.price}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${statusConfig.bgClass} ${statusConfig.borderClass} border`}>
                          <StatusIcon className={`w-3 h-3 ${statusConfig.textClass}`} />
                          <span className={`text-xs font-medium ${statusConfig.textClass}`}>
                            {statusConfig.label}
                          </span>
                        </div>
                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${
                          parcel.paymentStatus === "PAID" 
                            ? "bg-emerald-500/10 border border-emerald-500/20" 
                            : "bg-amber-500/10 border border-amber-500/20"
                        }`}>
                          <PaymentIcon className={`w-3 h-3 ${
                            parcel.paymentStatus === "PAID" ? "text-emerald-400" : "text-amber-400"
                          }`} />
                          <span className={`text-xs font-medium ${
                            parcel.paymentStatus === "PAID" ? "text-emerald-400" : "text-amber-400"
                          }`}>
                            {paymentStatus.label}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Location Details */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
                      <div className="space-y-2">
                        <p className="text-[10px] uppercase tracking-wider text-gray-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> Pickup Location
                        </p>
                        <p className="text-sm text-white">{parcel.pickupAddress || "N/A"}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-[10px] uppercase tracking-wider text-gray-500 flex items-center gap-1">
                          <Navigation className="w-3 h-3" /> Delivery Location
                        </p>
                        <p className="text-sm text-white">{parcel.deliveryAddress || "N/A"}</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-4">
                          <div className="flex-1">
                            <p className="text-[10px] uppercase tracking-wider text-gray-500 flex items-center gap-1">
                              <User className="w-3 h-3" /> Receiver
                            </p>
                            <p className="text-sm text-white">{parcel.receiverName}</p>
                          </div>
                          <div className="flex-1">
                            <p className="text-[10px] uppercase tracking-wider text-gray-500 flex items-center gap-1">
                              <Phone className="w-3 h-3" /> Contact
                            </p>
                            <p className="text-sm text-white font-mono">{parcel.receiverPhone}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-800">
                      <Link href={`/track/${encodeURIComponent(parcel.trackingCode)}`}>
                        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20">
                          <Navigation className="w-4 h-4 mr-2" />
                          Track Delivery
                        </Button>
                      </Link>
                      {parcel.deliveryStatus !== "DELIVERED" && (
                        <Button variant="outline" className="border-gray-700 hover:bg-gray-800 text-gray-300">
                          <Truck className="w-4 h-4 mr-2" />
                          Update Status
                        </Button>
                      )}
                      <Button variant="ghost" className="text-gray-400 hover:text-white hover:bg-gray-800">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Pagination */}
        {parcels.length > 0 && (
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between pt-4">
            <div className="text-sm text-gray-400">
              Showing {((currentPage - 1) * limit) + 1} to {Math.min(currentPage * limit, assignedCount)} of {assignedCount} parcels
            </div>
            <div className="flex items-center gap-3">
              {prevHref ? (
                <Link href={prevHref}>
                  <Button variant="outline" className="border-gray-700 hover:bg-gray-800 text-gray-300">
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>
                </Link>
              ) : (
                <Button disabled variant="outline" className="border-gray-800 text-gray-600 cursor-not-allowed">
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
              )}
              <span className="text-sm text-gray-400 px-4">
                Page {currentPage} of {totalPages}
              </span>
              {nextHref ? (
                <Link href={nextHref}>
                  <Button variant="outline" className="border-gray-700 hover:bg-gray-800 text-gray-300">
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              ) : (
                <Button disabled variant="outline" className="border-gray-800 text-gray-600 cursor-not-allowed">
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}