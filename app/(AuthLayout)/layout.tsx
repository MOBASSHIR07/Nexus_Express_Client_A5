import React from "react";

/**
 * AuthLayout - handles the layout for sign-in and sign-up pages.
 * It provides a consistent background and structure for all auth-related routes.
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#06060b] selection:bg-[#00F5A0]/30 selection:text-[#00F5A0]">
      {/* Shared Navbar for Auth pages (Optional) 
          If you want a different navbar or no navbar at all, you can manage it here.
      */}
      <main>{children}</main>
    </div>
  );
}