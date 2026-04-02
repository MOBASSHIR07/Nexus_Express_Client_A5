/* eslint-disable @typescript-eslint/no-explicit-any */
import { env } from "@/env";
import { cookies } from "next/headers";

export const adminService = {

    getAllRiders: async (query: any = {}) => {
        const token = (await cookies()).get("auth_session")?.value;
        const queryString = new URLSearchParams(query).toString();
        const res = await fetch(`${env.BACKEND_URL}/api/admin/riders?${queryString}`, {
            headers: { Cookie: `__Secure-better-auth.session_token=${token}` },
            next: { revalidate: 0 }
        });
        return res.json();
    },


    approveRider: async (riderId: string) => {
        const token = (await cookies()).get("auth_session")?.value;
        const res = await fetch(`${env.BACKEND_URL}/api/admin/approve-rider/${riderId}`, {
            method: "PATCH",
            headers: { Cookie: `__Secure-better-auth.session_token=${token}` }
        });
        return res.json();
    },


    getAllParcels: async (query: any = {}) => {
        const token = (await cookies()).get("auth_session")?.value;
        const queryString = new URLSearchParams(query).toString();

        const res = await fetch(`${env.BACKEND_URL}/api/admin/parcels?${queryString}`, {
            headers: { Cookie: `__Secure-better-auth.session_token=${token}` },
            next: { revalidate: 0 }
        });
        return res.json();
    },

   
assignRider: async (parcelId: string, riderId: string) => {
  const token = (await cookies()).get("auth_session")?.value;
  
  const res = await fetch(`${env.BACKEND_URL}/api/admin/assign-rider`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Cookie: `__Secure-better-auth.session_token=${token}`
    },
    body: JSON.stringify({ parcelId, riderId })
  });
  
  return res.json();
},

getAdminDashboard: async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_session")?.value;

    const res = await fetch(`${process.env.BACKEND_URL}/api/admin/dashboard`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `__Secure-better-auth.session_token=${token}`,
      },
      next: { 
        revalidate: 60, 
        tags: ["admin-stats"] 
      },
    });

    return res.json();
  },


  getAllWithdrawRequests: async () => {
    const token = (await cookies()).get("auth_session")?.value;
    const res = await fetch(`${env.BACKEND_URL}/api/admin/withdraw-requests`, {
      headers: { Cookie: `__Secure-better-auth.session_token=${token}` },
      cache: "no-store",
    });
    return res.json();
  },

  approveWithdraw: async (requestId: string) => {
    const token = (await cookies()).get("auth_session")?.value;
    const res = await fetch(`${env.BACKEND_URL}/api/admin/approve-withdraw/${requestId}`, {
      method: "PATCH",
      headers: { Cookie: `__Secure-better-auth.session_token=${token}` },
    });
    return res.json();
  }
,

getAllUsers: async () => {
  const token = (await cookies()).get("auth_session")?.value;
  const res = await fetch(`${env.BACKEND_URL}/api/admin/users`, {
    headers: { Cookie: `__Secure-better-auth.session_token=${token}` },
    next: { revalidate: 0 }
  });
  return res.json();
},

changeUserRole: async (userId: string, role: string) => {
  const token = (await cookies()).get("auth_session")?.value;

  const res = await fetch(`${env.BACKEND_URL}/api/admin/change-role/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Cookie: `__Secure-better-auth.session_token=${token}`,
    },
    body: JSON.stringify({ role }), 
  });
  return res.json();
}
};