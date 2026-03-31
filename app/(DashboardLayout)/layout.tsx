import { getServerSessionAction } from "@/actions/auth.action";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
  admin,
  rider,
  sender,
}: {
  children: React.ReactNode;
  admin: React.ReactNode;
  rider: React.ReactNode;
  sender: React.ReactNode;
}) {
  const session = await getServerSessionAction();

  if (!session) {
    redirect("/sign-in");
  }

  const role = session.user.role;

  return (
    <div className="flex min-h-screen bg-[#06060b]">
     
      <aside className="fixed left-0 top-0 h-full w-64 border-r border-white/10 bg-[#06060b] p-6 hidden lg:block z-50">
        <h1 className="text-3xl font-black text-[#00F5A0] italic tracking-tighter mb-10">NEXUS</h1>
        {/* Navigation logic based on role */}
      </aside>

      <main className="flex-1 lg:ml-64 p-8 overflow-y-auto">
      
        {role === "ADMIN" && admin}
        {role === "RIDER" && rider}
        {role === "USER" && sender}

        {/* This will render common dashboard content if any */}
        {children}
      </main>
    </div>
  );
}