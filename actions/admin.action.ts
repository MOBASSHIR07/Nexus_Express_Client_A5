"use server";

import { adminService } from "@/service/admin.service";
import { revalidatePath } from "next/cache";

export const approveRiderAction = async (riderId: string) => {
  try {
    const res = await adminService.approveRider(riderId);
    if (res.success) {
    
      revalidatePath("/admin-dashboard/rider-applications");
      return { success: true, message: "Node Synchronized: Rider Approved!" };
    }
    return { success: false, message: res.message || "Approval failed." };
  } catch (error) {
    return { success: false, message: "Nexus Network Error." };
  }
};

export const assignRiderAction = async (parcelId: string, riderId: string) => {
  try {
    const res = await adminService.assignRider(parcelId, riderId);
    
    if (res.success) {
      revalidatePath("/admin-dashboard/all-parcels");
      return { success: true, message: "Rider assigned and node updated!" };
    }
    
    return { success: false, message: res.message || "Failed to assign rider." };
  } catch (error) {
    return { success: false, message: "Network error while assigning rider." };
  }
};

export const getAdminDashboardAction = async () => {
  try {
    const res = await adminService.getAdminDashboard();

    if (res.success) {
      return {
        success: true,
        data: res.data,
        message: res.message,
      };
    }

    return {
      success: false,
      message: res.message || "Failed to synchronize neural stats.",
    };
  } catch (error) {
    console.error("ADMIN_DASHBOARD_ERROR:", error);
    return {
      success: false,
      message: "Neural Link Failure: System metrics unreachable.",
    };
  }
};

export const approveWithdrawAction = async (requestId: string) => {
  try {
    const res = await adminService.approveWithdraw(requestId);
    if (res.success) {
      revalidatePath("/admin-dashboard/withdrawals"); 
      revalidatePath("/admin-dashboard"); 
      return { success: true, message: "Funds Released: Transaction Finalized!" };
    }
    return { success: false, message: res.message || "Failed to release funds." };
  } catch (error) {
    return { success: false, message: "Nexus Financial Link Error." };
  }
};




export const changeUserRoleAction = async (formData: FormData) => {
  const userId = formData.get("userId") as string;
  const role = formData.get("role") as string;

  if (!userId || !role) return { success: false, message: "Missing data." };

  try {
    const res = await adminService.changeUserRole(userId, role);
    
    if (res.success) {
      revalidatePath("/admin-dashboard/all-users");
      revalidatePath("/admin-dashboard");
      return { success: true, message: "Role updated successfully! 🛡️" };
    }
    return { success: false, message: res.message };
  } catch (error) {
    return { success: false, message: "Failed to update role." };
  }
};


export const refreshAdminStats = async () => {
  revalidatePath("/admin-dashboard");
};