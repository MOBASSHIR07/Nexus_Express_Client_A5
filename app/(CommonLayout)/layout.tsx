import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { getServerSessionAction } from "@/actions/auth.action";

export default async function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 
  const session = await getServerSessionAction();

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#06060b]">
     
      <Navbar session={session} />
      
      <main className="flex-1 pt-20 md:pt-24">
        {children}
      </main>
      
      <Footer />
    </div>
  );
}