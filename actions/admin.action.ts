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