"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ShoppingCart, Wifi, Menu, X, Rocket } from "lucide-react";
import { usePathname } from "next/navigation";

export default function SiteHeader({ cartCount = 0 }: { cartCount?: number }) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getNavClass = (href: string) => {
    const isActive =
      href === "/"
        ? pathname === "/"
        : pathname === href || pathname.startsWith(`${href}/`);

    return isActive
      ? "text-primary font-black"
      : "text-foreground/80 font-black hover:text-primary transition-colors";
  };

  return (
    <>
      <nav 
        className={`fixed w-full z-[100] transition-all duration-500 py-3 bg-gradient-to-r from-background/95 to-primary-light/40 backdrop-blur-md ${
          isScrolled ? "shadow-xl" : "shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center transition-all">
            {/* Left: Brand */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Wifi className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-[22px] lg:text-[28px] font-black text-primary-dark tracking-tighter leading-none">
                  SmartlyTap
                </span>
                <span className="hidden sm:block text-[10px] font-bold text-accent tracking-[.2em] uppercase mt-1 opacity-80">
                  Premium NFC Solutions
                </span>
              </div>
            </Link>

            {/* Middle: Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {[
                { name: "Home", href: "/" },
                { name: "Shop", href: "/shop" },
                { name: "Dashboard", href: "/dashboard" },
                { name: "Contact", href: "/contact" },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-[15px] tracking-wide relative group ${getNavClass(item.href)}`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Right: Actions */}
            <div className="flex items-center space-x-3 sm:space-x-5">
              <button
                type="button"
                className="p-2 text-primary-dark/40 hover:text-primary-dark transition-colors hidden sm:block"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              <Link
                href="/cart"
                className="p-2 relative text-primary-dark/70 hover:text-primary-dark transition-colors group"
                aria-label="Cart"
              >
                <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-accent text-white text-[10px] font-bold min-w-[16px] h-[16px] rounded-full flex items-center justify-center px-1 shadow-sm">
                    {cartCount}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-primary-dark hover:text-accent transition-colors"
                aria-label="Toggle Menu"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              <Link 
                href="/shop" 
                className="hidden lg:flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary-dark transition-all active:scale-95 shadow-lg shadow-primary/20"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-[90] md:hidden transition-all duration-500 ease-in-out ${
          isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-primary-dark/20 backdrop-blur-3xl" onClick={() => setIsMenuOpen(false)}></div>
        <div className="absolute right-0 top-0 h-full w-[80%] max-w-[320px] bg-card p-8 flex flex-col shadow-2xl">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Rocket className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-black text-primary-dark">Menu</span>
          </div>

          <div className="flex flex-col space-y-6">
            {[
              { name: "Home", href: "/" },
              { name: "Shop", href: "/shop" },
              { name: "Dashboard", href: "/dashboard" },
              { name: "Contact Us", href: "/contact" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`text-[20px] font-bold ${pathname === item.href ? 'text-accent' : 'text-primary-dark/60'}`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="mt-auto space-y-4">
            <Link 
              href="/signup" 
              onClick={() => setIsMenuOpen(false)}
              className="w-full flex items-center justify-center py-4 rounded-2xl bg-primary text-white font-bold transition-all active:scale-95 shadow-lg shadow-primary/20"
            >
              Get Started
            </Link>
            <Link 
              href="/login" 
              onClick={() => setIsMenuOpen(false)}
              className="w-full flex items-center justify-center py-4 rounded-2xl bg-background border border-border text-primary-dark font-bold transition-all active:scale-95"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

