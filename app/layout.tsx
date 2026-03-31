import { Outfit } from "next/font/google"; 
import "./globals.css";
import { Toaster } from "sonner";

const outfit = Outfit({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={outfit.variable} suppressHydrationWarning>
      <body  className={`${outfit.className} antialiased`} suppressHydrationWarning>
        {children}
           <Toaster
          position="top-center"
          richColors
          theme="dark"
        />
      </body>
    </html>
  );
}