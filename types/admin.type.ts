export interface IAdminDashboardResponse {
  success: boolean;
  message: string;
  data: {
    summary: {
      totalUsers: number;
      totalRiders: number;
      totalParcels: number;
      totalRevenue: number;
      totalRiderCost: number;
      netProfit: number;
    };
    parcelStats: {
      _count: { id: number };
      deliveryStatus: string;
    }[];
    pendingActions: {
      withdrawRequests: number;
    };
  };
}