"use server";

import { userService } from "@/service/user.service";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export interface RegisterInput {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  profileImage?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export const signUpUserAction = async (values: RegisterInput) => {
  try {
    const { data, ok } = await userService.register(values);
    if (!ok) {
      return {
        success: false,
        message: data?.error?.message || data?.message || "Registration failed",
      };
    }
    return { success: true };
  } catch {
    return { success: false, message: "Server connection failed" };
  }
};

export const signInUserAction = async (values: LoginInput) => {
  try {
    const res = await userService.login(values);
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return { success: false, message: errorData?.message || "Login failed" };
    }
    revalidatePath("/");
    return { success: true };
  } catch {
    return { success: false, message: "Something went wrong during login" };
  }
};

export const logoutUserAction = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("auth_session");
  cookieStore.delete("__Secure-better-auth.session_token");
  return { success: true };
};

export const getServerSessionAction = async () => {
  try {
    const session = await userService.getSession();
    if (!session) return null;
    return session;
  } catch {
    return null;
  }
};