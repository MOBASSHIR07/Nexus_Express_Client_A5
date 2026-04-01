import { env } from "@/env";
import { cookies } from "next/headers";

export const paymentService = {
  createPaymentSession: async (parcelId: string) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_session")?.value;

    const res = await fetch(`${env.BACKEND_URL}/api/pay/create-payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `__Secure-better-auth.session_token=${token}`,
      },
      body: JSON.stringify({ parcelId }), 
    });
    return res.json();
  },
};