import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // 1. Get Session/Token from cookies (Mock logic for now)
  const token = request.cookies.get('auth_token')?.value;
  const userRole = request.cookies.get('user_role')?.value; // admin, sender, rider

  // 2. Define Protected Routes
  const isDashboardRoute = pathname.startsWith('/admin-dashboard') || 
                           pathname.startsWith('/sender-dashboard') || 
                           pathname.startsWith('/rider-dashboard');

  const isAuthRoute = pathname.startsWith('/sign-in') || 
                      pathname.startsWith('/sign-up');

  // 3. Logic: Redirect Unauthenticated users to Sign-In
  if (isDashboardRoute && !token) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  // 4. Logic: Redirect Authenticated users away from Auth pages to their Dashboards
  if (isAuthRoute && token && userRole) {
    if (userRole === 'admin') return NextResponse.redirect(new URL('/admin-dashboard', request.url));
    if (userRole === 'sender') return NextResponse.redirect(new URL('/sender-dashboard', request.url));
    if (userRole === 'rider') return NextResponse.redirect(new URL('/rider-dashboard', request.url));
  }

  // 5. Logic: Role-based access control (Basic)
  if (pathname.startsWith('/admin-dashboard') && userRole !== 'admin') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// Matcher config to specify which routes this proxy should run on
export const config = {
  matcher: [
    '/admin-dashboard/:path*',
    '/sender-dashboard/:path*',
    '/rider-dashboard/:path*',
    '/sign-in',
    '/sign-up',
  ],
};