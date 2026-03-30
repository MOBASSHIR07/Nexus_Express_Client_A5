"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { 
  Package, 
  Menu, 
  X, 
  User, 
  Truck, 
  MapPin, 
  Info 
} from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll for glassmorphism effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/", icon: Truck },
    { name: "Track Parcel", href: "/track/1", icon: MapPin },
    { name: "Services", href: "/services", icon: Package },
    { name: "About Us", href: "/about", icon: Info },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300 px-4 py-3 md:px-8",
        scrolled 
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50 py-2" 
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
            <Package className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-black tracking-tighter">
            NEXUS <span className="text-primary">EXPRESS</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-secondary/30 p-1 rounded-full border border-border/50">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "relative px-5 py-2 text-sm font-semibold transition-all rounded-full",
                  isActive 
                    ? "text-primary-foreground bg-primary shadow-md" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <Link href="/sign-in">
            <Button variant="ghost" className="font-bold hover:bg-primary/10">
              Sign In
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button className="font-bold shadow-xl shadow-primary/20">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile/Tablet Menu Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={cn(
          "fixed inset-0 top-[64px] z-40 bg-background/95 backdrop-blur-lg transition-transform lg:hidden",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col p-6 gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "flex items-center gap-4 p-4 rounded-2xl text-lg font-bold transition-all",
                pathname === link.href
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "bg-secondary/50 text-foreground hover:bg-secondary"
              )}
            >
              <link.icon className="h-5 w-5" />
              {link.name}
            </Link>
          ))}
          <hr className="border-border/50 my-2" />
          <div className="flex flex-col gap-3">
            <Link href="/sign-in" onClick={() => setIsOpen(false)}>
              <Button variant="outline" className="w-full h-12 font-bold rounded-xl">
                Sign In
              </Button>
            </Link>
            <Link href="/sign-up" onClick={() => setIsOpen(false)}>
              <Button className="w-full h-12 font-bold rounded-xl shadow-lg">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;