import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      <Navbar />
     
      <main className="flex-1 pt-20 md:pt-24">{children}</main>
      <Footer/>
    </div>
    
  );
}