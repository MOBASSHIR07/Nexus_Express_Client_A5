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
};