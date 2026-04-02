/* eslint-disable @typescript-eslint/no-explicit-any */
import { adminService } from "@/service/admin.service";
import { 
  Users, Truck, Package, Banknote, 
  TrendingUp, AlertCircle, Clock, ArrowUpRight, Wallet,
  DollarSign, BarChart3, PieChart, Activity,
  CheckCircle2, XCircle, Timer, RefreshCw,
  Target, Award, Zap
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const response = await adminService.getAdminDashboard();
  
  if (!response?.success) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4 p-10 rounded-3xl bg-red-500/5 border border-red-500/20">
          <AlertCircle className="mx-auto text-red-500" size={48} />
          <p className="text-xs font-black uppercase tracking-widest text-red-500/50">
            {response?.message || "System Error: Statistics unreachable."}
          </p>
          <RefreshCw className="mx-auto text-gray-500 animate-spin" size={20} />
        </div>
      </div>
    );
  }

  const { summary, parcelStats, pendingActions } = response.data;

  // Calculate status distribution
  const totalParcels = summary.totalParcels;
  const deliveredParcels = parcelStats.find((s: any) => s.deliveryStatus === "DELIVERED")?._count.id || 0;
  const pendingParcels = parcelStats.find((s: any) => s.deliveryStatus === "PENDING")?._count.id || 0;
  const pickedUpParcels = parcelStats.find((s: any) => s.deliveryStatus === "PICKED_UP")?._count.id || 0;
  const riderAssignedParcels = parcelStats.find((s: any) => s.deliveryStatus === "RIDER_ASSIGNED")?._count.id || 0;
  
  const deliveryRate = totalParcels > 0 ? ((deliveredParcels / totalParcels) * 100).toFixed(1) : 0;
  const profitMargin = summary.totalRevenue > 0 
    ? ((summary.netProfit / summary.totalRevenue) * 100).toFixed(1) 
    : 0;

  const mainStats = [
    { 
      label: "Total Revenue", 
      value: `$${summary.totalRevenue.toLocaleString()}`, 
      icon: DollarSign, 
      color: "text-blue-400", 
      bg: "bg-blue-500/10",
      border: "border-blue-500/20"
    },
    { 
      label: "Net Profit", 
      value: `$${summary.netProfit.toLocaleString()}`, 
      icon: TrendingUp, 
      color: "text-emerald-400", 
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20"
    },
    { 
      label: "Total Parcels", 
      value: summary.totalParcels.toLocaleString(), 
      icon: Package, 
      color: "text-purple-400", 
      bg: "bg-purple-500/10",
      border: "border-purple-500/20"
    },
    { 
      label: "Active Riders", 
      value: summary.totalRiders, 
      icon: Truck, 
      color: "text-orange-400", 
      bg: "bg-orange-500/10",
      border: "border-orange-500/20"
    },
  ];

  const parcelStatusCards = [
    { 
      status: "DELIVERED", 
      count: deliveredParcels, 
      label: "Delivered",
      icon: CheckCircle2,
      color: "emerald",
      percentage: totalParcels > 0 ? ((deliveredParcels / totalParcels) * 100).toFixed(1) : 0
    },
    { 
      status: "PICKED_UP", 
      count: pickedUpParcels, 
      label: "Picked Up",
      icon: Truck,
      color: "blue",
      percentage: totalParcels > 0 ? ((pickedUpParcels / totalParcels) * 100).toFixed(1) : 0
    },
    { 
      status: "RIDER_ASSIGNED", 
      count: riderAssignedParcels, 
      label: "Rider Assigned",
      icon: Users,
      color: "amber",
      percentage: totalParcels > 0 ? ((riderAssignedParcels / totalParcels) * 100).toFixed(1) : 0
    },
    { 
      status: "PENDING", 
      count: pendingParcels, 
      label: "Pending",
      icon: Clock,
      color: "gray",
      percentage: totalParcels > 0 ? ((pendingParcels / totalParcels) * 100).toFixed(1) : 0
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      <div className="max-w-7xl mx-auto p-6 md:p-10 space-y-8">
        
        {/* Header Section */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <Activity className="w-3 h-3 text-emerald-400" />
            <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400">
              System Intelligence
            </span>
          </div>
          <div className="flex justify-between items-end flex-wrap gap-4">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Nexus <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">Control</span>
              </h1>
              <p className="text-sm text-gray-400 max-w-2xl mt-2">
                Real-time platform analytics, financial metrics, and operational overview.
              </p>
            </div>
            <div className="text-right">
              <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse mr-2" />
                All Systems Nominal
              </Badge>
              <p className="text-[10px] text-gray-500 mt-2">Last updated: {new Date().toLocaleTimeString()}</p>
            </div>
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {mainStats.map((stat) => (
            <div 
              key={stat.label} 
              className={`group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border ${stat.border} hover:border-white/30 transition-all duration-300`}
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${stat.bg} rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity`} />
              <div className="relative p-6">
                <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <stat.icon className={stat.color} size={24} />
                </div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">{stat.label}</p>
                <h3 className="text-3xl font-bold text-white tracking-tight">{stat.value}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Key Metrics Row */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-emerald-500/10">
                <Target className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="text-xs text-gray-500 uppercase tracking-wider">Delivery Rate</span>
            </div>
            <p className="text-3xl font-bold text-white">{deliveryRate}%</p>
            <div className="mt-3 h-1.5 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500 rounded-full transition-all"
                style={{ width: `${deliveryRate}%` }}
              />
            </div>
          </div>

          <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Award className="w-4 h-4 text-blue-400" />
              </div>
              <span className="text-xs text-gray-500 uppercase tracking-wider">Profit Margin</span>
            </div>
            <p className="text-3xl font-bold text-white">{profitMargin}%</p>
            <p className="text-xs text-gray-500 mt-2">
              Net profit margin on total revenue
            </p>
          </div>

          <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-amber-500/10">
                <AlertCircle className="w-4 h-4 text-amber-400" />
              </div>
              <span className="text-xs text-gray-500 uppercase tracking-wider">Pending Actions</span>
            </div>
            <p className="text-3xl font-bold text-amber-400">{pendingActions.withdrawRequests}</p>
            <p className="text-xs text-gray-500 mt-2">
              Withdrawal requests to process
            </p>
          </div>
        </div>

        {/* Parcel Status Distribution */}
        <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-semibold text-white">Parcel Status Distribution</h3>
            </div>
            <Badge variant="outline" className="border-white/20 text-gray-400">
              Total: {totalParcels} parcels
            </Badge>
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {parcelStatusCards.map((stat) => {
              const Icon = stat.icon;
              const colorClasses = {
                emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
                blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
                amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
                gray: "bg-gray-500/10 text-gray-400 border-gray-500/20"
              };
              
              return (
                <div key={stat.status} className="p-4 rounded-xl bg-black/30 border border-white/5 hover:border-white/10 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 rounded-lg ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                      <Icon className="w-3 h-3" />
                    </div>
                    <span className="text-xs font-bold text-white">{stat.count}</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">{stat.label}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-600">{stat.percentage}%</span>
                    <div className="flex-1 ml-2 h-1 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-${stat.color}-500 rounded-full transition-all`}
                        style={{ width: `${stat.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Financial Summary Section */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Revenue Breakdown */}
          <div className="rounded-2xl bg-gradient-to-br from-emerald-500/5 to-transparent backdrop-blur-sm border border-emerald-500/20 p-6">
            <div className="flex items-center gap-2 mb-6">
              <Wallet className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-semibold text-white">Financial Summary</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <span className="text-xs text-gray-400">Total Revenue</span>
                <span className="text-lg font-bold text-white">${summary.totalRevenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <span className="text-xs text-gray-400">Rider Cost</span>
                <span className="text-lg font-bold text-red-400">-${summary.totalRiderCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-sm font-semibold text-emerald-400">Net Profit</span>
                <span className="text-2xl font-bold text-emerald-400">${summary.netProfit.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6">
            <div className="flex items-center gap-2 mb-6">
              <Zap className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-semibold text-white">Quick Actions</h3>
            </div>
            
<div className="space-y-4 ">
  <Link href="/admin-dashboard/withdraw-requests">
    <button className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all group">
      <span className="text-sm text-gray-300">View Withdrawal Requests</span>
      <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-emerald-400 transition-colors" />
    </button>
  </Link>
  
  <Link href="/admin-dashboard/rider-applications">
    <button className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all group">
      <span className="text-sm text-gray-300">Manage Riders</span>
      <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-emerald-400 transition-colors" />
    </button>
  </Link>
  
  <Link href="/admin-dashboard/all-parcels">
    <button className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all group">
      <span className="text-sm text-gray-300">View All Parcels</span>
      <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-emerald-400 transition-colors" />
    </button>
  </Link>
  

</div>
          </div>
        </div>
      </div>
    </div>
  );
}