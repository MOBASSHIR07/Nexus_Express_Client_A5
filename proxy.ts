import { NextRequest, NextResponse } from "next/server";
import { userService } from "./service/user.service";

function getRoleDashboard(role?: string) {
  if (role === "ADMIN") return "/admin-dashboard";
  if (role === "RIDER") return "/rider-dashboard";
  return "/sender-dashboard";
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
 
  const session = await userService.getSession();
  const role = session?.user?.role; 

  const isAuthPage = pathname === "/sign-in" || pathname === "/sign-up";
  const isDashboard =
    pathname === "/dashboard" ||
    pathname.startsWith("/admin-dashboard") ||
    pathname.startsWith("/rider-dashboard") ||
    pathname.startsWith("/sender-dashboard");

  if (!session && isDashboard) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }


  if (session && isAuthPage) {
    return NextResponse.redirect(new URL(getRoleDashboard(role), request.url));
  }


  if (pathname === "/dashboard" && session) {
    return NextResponse.redirect(new URL(getRoleDashboard(role), request.url));
  }


  if (isDashboard && session) {
    if (pathname.startsWith("/admin-dashboard") && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    if (pathname.startsWith("/rider-dashboard") && role !== "RIDER") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin-dashboard/:path*",
    "/rider-dashboard/:path*",
    "/sender-dashboard/:path*",
    "/sign-in",
    "/sign-up",
  ],
};