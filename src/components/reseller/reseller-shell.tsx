"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  ChevronDown,
  LayoutDashboard,
  Menu,
  ReceiptIndianRupee,
  Search,
  ShoppingBag,
  Store,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type NavItem = {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

const NAV: NavItem[] = [
  { name: "Dashboard", href: "/reseller/dashboard", icon: LayoutDashboard },
  { name: "Orders", href: "/reseller/orders", icon: ShoppingBag },
  { name: "Commission", href: "/reseller/commission", icon: ReceiptIndianRupee },
  { name: "Analytics", href: "/reseller/analytics", icon: BarChart3 },
];

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(href + "/");
}

export function ResellerShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="relative mx-auto max-w-[1440px]">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-[#EEF2FF] blur-3xl" />
          <div className="absolute -right-40 -top-32 h-[520px] w-[520px] rounded-full bg-[#ECFDF5] blur-3xl opacity-70" />
        </div>

        <div className="flex">
          <aside className="sticky top-0 hidden h-screen w-[240px] shrink-0 border-r border-[#E5E7EB] bg-white/90 px-3 py-4 backdrop-blur supports-[backdrop-filter]:bg-white/80 lg:block">
            <div className="flex items-center gap-2 px-1">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[#4F46E5] via-[#3B82F6] to-[#22C55E] text-white shadow-[0_10px_24px_rgba(79,70,229,0.18)]">
                <Store className="h-5 w-5" />
              </div>
              <div className="leading-tight">
                <div className="text-sm font-semibold text-[#111827]">SmartlyTap</div>
                <div className="text-xs text-[#9CA3AF]">Reseller</div>
              </div>
            </div>

            <nav className="mt-6 space-y-1">
              {NAV.map((n) => {
                const Icon = n.icon;
                const active = isActive(pathname, n.href);
                return (
                  <Link
                    key={n.href}
                    href={n.href}
                    className={cn(
                      "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 active:scale-[0.99]",
                      active
                        ? "bg-gradient-to-r from-[#4F46E5] to-[#3B82F6] text-white shadow-[0_14px_30px_rgba(79,70,229,0.18)]"
                        : "text-[#374151] hover:bg-[#F9FAFB] hover:text-[#111827]"
                    )}
                  >
                    <div
                      className={cn(
                        "grid h-9 w-9 place-items-center rounded-xl transition-colors",
                        active
                          ? "bg-white/15 text-white ring-1 ring-white/20"
                          : "bg-[#F9FAFB] text-[#6B7280] ring-1 ring-[#E5E7EB] group-hover:bg-[#EEF2FF] group-hover:text-[#4F46E5] group-hover:ring-[#C7D2FE]"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="truncate">{n.name}</span>
                  </Link>
                );
              })}
            </nav>
          </aside>

          <div className="min-w-0 flex-1">
            <header className="sticky top-0 z-40 border-b border-[#E5E7EB] bg-white/85 backdrop-blur supports-[backdrop-filter]:bg-white/75">
              <div className="flex h-16 items-center gap-3 px-4 lg:px-6">
                <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                  <SheetTrigger asChild>
                    <Button variant="secondary" size="icon" className="lg:hidden" aria-label="Open navigation">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[#4F46E5] via-[#3B82F6] to-[#22C55E] text-white">
                        <Store className="h-5 w-5" />
                      </div>
                      <div className="leading-tight">
                        <div className="text-sm font-semibold text-[#111827]">SmartlyTap</div>
                        <div className="text-xs text-[#9CA3AF]">Reseller</div>
                      </div>
                    </div>
                    <nav className="mt-6 space-y-1">
                      {NAV.map((n) => {
                        const Icon = n.icon;
                        const active = isActive(pathname, n.href);
                        return (
                          <Link
                            key={n.href}
                            href={n.href}
                            onClick={() => setMobileOpen(false)}
                            className={cn(
                              "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                              active
                                ? "bg-[#EEF2FF] text-[#4F46E5]"
                                : "text-[#374151] hover:bg-[#F9FAFB] hover:text-[#111827]"
                            )}
                          >
                            <div className={cn("grid h-9 w-9 place-items-center rounded-xl", active ? "bg-[#4F46E5] text-white" : "bg-[#F9FAFB] text-[#6B7280]")}>
                              <Icon className="h-5 w-5" />
                            </div>
                            <span className="truncate">{n.name}</span>
                          </Link>
                        );
                      })}
                    </nav>
                  </SheetContent>
                </Sheet>

                <div className="relative hidden w-[520px] max-w-full md:block">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
                  <Input placeholder="Search orders..." className="pl-10" />
                </div>

                <div className="ml-auto">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-3 py-2 text-sm font-medium text-[#111827] shadow-sm transition-all hover:-translate-y-[0.5px] hover:bg-[#F9FAFB] hover:shadow-[0_10px_24px_rgba(0,0,0,0.06)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]/20">
                        <span className="grid h-7 w-7 place-items-center rounded-lg bg-[#EEF2FF] text-xs font-semibold text-[#4F46E5]">
                          RS
                        </span>
                        <span className="hidden sm:block">Reseller</span>
                        <ChevronDown className="h-4 w-4 text-[#9CA3AF]" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href="/reseller/dashboard">Dashboard</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => {
                          localStorage.removeItem("user_token");
                          localStorage.removeItem("user_data");
                          window.location.href = "/login";
                        }}
                        className="text-[#EF4444] focus:text-[#EF4444]"
                      >
                        Sign out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </header>

            <main className="px-4 py-6 lg:px-6">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
}

