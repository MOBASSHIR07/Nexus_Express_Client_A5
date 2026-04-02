/* eslint-disable @typescript-eslint/no-explicit-any */
import { adminService } from "@/service/admin.service";
import { approveWithdrawAction } from "@/actions/admin.action"; 
import { 
  Wallet, 
  Clock, 
  CheckCircle2, 
  ArrowDownRight, 
  DollarSign,
  User,
  Phone,
  Mail,
  AlertCircle,
  RefreshCw,
  ShieldCheck,
  Banknote,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default async function WithDrawPage() {
  const response = await adminService.getAllWithdrawRequests();
  const requests = response?.data || [];
  
  // Calculate statistics
  const pendingRequests = requests.filter((req: any) => req.status === "PENDING");
  const approvedRequests = requests.filter((req: any) => req.status === "APPROVED");
  const totalPendingAmount = pendingRequests.reduce((sum: number, req: any) => sum + parseFloat(req.amount), 0);
  const totalApprovedAmount = approvedRequests.reduce((sum: number, req: any) => sum + parseFloat(req.amount), 0);

  const getStatusBadge = (status: string) => {
    const statuses: Record<string, any> = {
      PENDING: { label: "Pending", color: "amber", icon: Clock },
      APPROVED: { label: "Approved", color: "emerald", icon: CheckCircle2 },
      REJECTED: { label: "Rejected", color: "red", icon: AlertCircle },
    };
    return statuses[status] || statuses.PENDING;
  };

  const getMethodIcon = (method: string) => {
    switch(method) {
      case "BKASH": return "bKash";
      case "NAGAD": return "Nagad";
      case "ROCKET": return "Rocket";
      default: return method;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      <div className="max-w-7xl mx-auto p-6 md:p-10 space-y-8">
        
        {/* Header Section */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
            <ShieldCheck className="w-3 h-3 text-blue-400" />
            <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400">
              Financial Settlements
            </span>
          </div>
          <div className="flex justify-between items-end flex-wrap gap-4">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Vault <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Outflow</span>
              </h1>
              <p className="text-sm text-gray-400 max-w-2xl mt-2">
                Review and process rider withdrawal requests. Approve or reject payouts securely.
              </p>
            </div>
            <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20">
              <RefreshCw className="w-3 h-3 mr-1" />
              Live Updates
            </Badge>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Wallet className="w-4 h-4 text-blue-400" />
              </div>
              <span className="text-xs text-gray-500 uppercase tracking-wider">Total Requests</span>
            </div>
            <p className="text-3xl font-bold text-white">{requests.length}</p>
            <p className="text-xs text-gray-500 mt-1">Total withdrawal requests</p>
          </div>

          <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-amber-500/10">
                <Clock className="w-4 h-4 text-amber-400" />
              </div>
              <span className="text-xs text-gray-500 uppercase tracking-wider">Pending</span>
            </div>
            <p className="text-3xl font-bold text-amber-400">{pendingRequests.length}</p>
            <p className="text-xs text-gray-500 mt-1">Awaiting approval</p>
          </div>

          <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-emerald-500/10">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="text-xs text-gray-500 uppercase tracking-wider">Approved</span>
            </div>
            <p className="text-3xl font-bold text-emerald-400">{approvedRequests.length}</p>
            <p className="text-xs text-gray-500 mt-1">Successfully processed</p>
          </div>

          <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <DollarSign className="w-4 h-4 text-purple-400" />
              </div>
              <span className="text-xs text-gray-500 uppercase tracking-wider">Pending Amount</span>
            </div>
            <p className="text-3xl font-bold text-purple-400">${totalPendingAmount.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-1">Total to be released</p>
          </div>
        </div>

        {/* Withdrawal Requests List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Withdrawal Requests</h2>
            <Badge variant="outline" className="border-white/20 text-gray-400">
              {pendingRequests.length} pending
            </Badge>
          </div>

          {requests.length === 0 ? (
            <div className="relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 p-20 text-center">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
              <div className="relative">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 mb-6">
                  <Wallet className="w-10 h-10 text-gray-600" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No Withdrawal Requests</h3>
                <p className="text-sm text-gray-400 max-w-md mx-auto">
                  All withdrawal requests have been processed. New requests will appear here when riders initiate withdrawals.
                </p>
              </div>
            </div>
          ) : (
            requests.map((req: any) => {
              const StatusBadge = getStatusBadge(req.status);
              const StatusIcon = StatusBadge.icon;
              const isPending = req.status === "PENDING";
              
              return (
                <div 
                  key={req.id} 
                  className={`group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border transition-all duration-300
                    ${isPending ? 'border-amber-500/20 hover:border-amber-500/40' : 'border-white/10 hover:border-white/20'}`}
                >
                  <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="relative p-6 md:p-8">
                    {/* Header Section */}
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-6">
                      <div className="flex items-start gap-5">
                        <div className={`p-3 rounded-2xl ${isPending ? 'bg-amber-500/10' : 'bg-emerald-500/10'}`}>
                          <Wallet className={`w-6 h-6 ${isPending ? 'text-amber-400' : 'text-emerald-400'}`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 flex-wrap mb-2">
                            <h3 className="text-xl font-bold text-white">
                              {req.rider?.user?.name || "Unknown Rider"}
                            </h3>
                            <Badge className={`bg-${StatusBadge.color}-500/10 text-${StatusBadge.color}-400 border-${StatusBadge.color}-500/20`}>
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {StatusBadge.label}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                            <span className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5" />
                              Requested: {new Date(req.createdAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Banknote className="w-3.5 h-3.5" />
                              Method: {getMethodIcon(req.method)}
                            </span>
                            {req.processedAt && (
                              <span className="flex items-center gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                Processed: {new Date(req.processedAt).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                        <p className="text-[10px] uppercase tracking-wider text-gray-500 flex items-center gap-1 mb-2">
                          <DollarSign className="w-3 h-3" /> Amount
                        </p>
                        <p className="text-2xl font-bold text-emerald-400">
                          ${parseFloat(req.amount).toLocaleString()}
                        </p>
                      </div>
                      
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                        <p className="text-[10px] uppercase tracking-wider text-gray-500 flex items-center gap-1 mb-2">
                          <Wallet className="w-3 h-3" /> Account Number
                        </p>
                        <p className="text-sm text-white/80 font-mono">
                          {req.accountNumber || "N/A"}
                        </p>
                      </div>
                      
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                        <p className="text-[10px] uppercase tracking-wider text-gray-500 flex items-center gap-1 mb-2">
                          <User className="w-3 h-3" /> Rider Contact
                        </p>
                        <div className="space-y-1">
                          <p className="text-sm text-white/80">
                            {req.rider?.user?.email || "No email"}
                          </p>
                          <p className="text-xs text-gray-500">
                            {req.rider?.phone || "No phone"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
                      {isPending ? (
                        <>
                          <form action={async () => {
                            "use server";
                            await approveWithdrawAction(req.id);
                          }}>
                            <Button 
                              type="submit"
                              className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg shadow-emerald-500/20 rounded-xl px-6"
                            >
                              <CheckCircle2 className="w-4 h-4 mr-2" />
                              Approve & Release Funds
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </form>
                          
                          <Button 
                            variant="outline" 
                            className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50 rounded-xl px-6"
                          >
                            <AlertCircle className="w-4 h-4 mr-2" />
                            Reject Request
                          </Button>
                        </>
                      ) : (
                        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                          <CheckCircle2 className="w-4 h-4" />
                          <span className="text-sm font-medium">Withdrawal completed</span>
                        </div>
                      )}
                      
                      <Button 
                        variant="ghost" 
                        className="text-gray-400 hover:text-white rounded-xl"
                      >
                        View Rider Details
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Quick Stats Footer */}
        {requests.length > 0 && (
          <div className="rounded-2xl bg-gradient-to-r from-blue-500/5 to-emerald-500/5 border border-white/10 p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs text-gray-500 mb-1">Total Pending Amount</p>
                <p className="text-2xl font-bold text-amber-400">${totalPendingAmount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Total Processed Amount</p>
                <p className="text-2xl font-bold text-emerald-400">${totalApprovedAmount.toLocaleString()}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}