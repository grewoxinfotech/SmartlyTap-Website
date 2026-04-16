"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Smartphone, LayoutDashboard, CreditCard, ShoppingCart, User, Settings, LogOut, BarChart3 } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export default function UserDashboardLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [checking, setChecking] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("user_token");
    const storedUser = localStorage.getItem("user_data");
    if (!token || !storedUser) {
      router.push("/login");
      return;
    }
    setUser(JSON.parse(storedUser));
    setChecking(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user_token");
    localStorage.removeItem("user_data");
    router.push("/login");
  };

  const links = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Cards", href: "/dashboard/cards", icon: CreditCard },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    { name: "Orders", href: "/dashboard/orders", icon: ShoppingCart },
    { name: "Profile", href: "/dashboard/profile", icon: User },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  if (checking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="relative flex flex-col min-h-screen bg-background">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-primary-light blur-3xl opacity-50" />
        <div className="absolute -right-40 -top-32 h-[520px] w-[520px] rounded-full bg-accent blur-3xl opacity-20" />
      </div>
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-dark rounded-xl flex items-center justify-center shadow-md">
                <Smartphone className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold text-primary-dark tracking-tight leading-none">SmartlyTap</span>
                <span className="text-[10px] font-semibold text-primary uppercase tracking-widest mt-0.5">User Dashboard</span>
              </div>
            </Link>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 bg-background px-3 py-1.5 rounded-full border border-gray-100">
                <div className="w-8 h-8 bg-primary-light rounded-full flex items-center justify-center text-primary font-bold">
                  {user.name.charAt(0)}
                </div>
                <span className="font-bold text-primary-dark hidden sm:block pr-2">{user.name}</span>
              </div>
              <button onClick={handleLogout} className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-32 pb-12 flex flex-col md:flex-row gap-10">
        {/* Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <nav className="space-y-3 sticky top-32">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center px-5 py-4 rounded-2xl transition-all font-bold border ${
                    isActive
                      ? "bg-primary text-white shadow-[0_8px_20px_rgba(1,135,144,0.3)] border-transparent"
                      : "bg-white text-gray-500 hover:text-primary-dark hover:border-primary/20 hover:shadow-md border-gray-100"
                  }`}
                >
                  <Icon className={`w-5 h-5 mr-4 ${isActive ? "text-white" : "text-gray-400"}`} />
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}