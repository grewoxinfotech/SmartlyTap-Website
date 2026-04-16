"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Bell,
  Boxes,
  ChevronDown,
  CreditCard,
  LayoutDashboard,
  Menu,
  Package,
  ReceiptIndianRupee,
  Search,
  Settings,
  ShoppingBag,
  Store,
  Users,
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
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Cards", href: "/admin/cards", icon: CreditCard },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Templates", href: "/admin/templates", icon: Boxes },
  { name: "Payments", href: "/admin/payments", icon: ReceiptIndianRupee },
  { name: "Resellers", href: "/admin/resellers", icon: Store },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(href + "/");
}

function Brand({ collapsed }: { collapsed: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#EEF2FF] text-[#4F46E5]">
        <LayoutDashboard className="h-5 w-5" />
      </div>
      {!collapsed && (
        <div className="leading-tight">
          <div className="text-sm font-semibold text-[#111827]">SmartlyTap</div>
          <div className="text-xs text-[#9CA3AF]">Admin</div>
        </div>
      )}
    </div>
  );
}

function SidebarNav({
  collapsed,
  onNavigate,
}: {
  collapsed: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <nav className="mt-6 space-y-1">
      {NAV.map((item) => {
        const Icon = item.icon;
        const active = isActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 active:scale-[0.99]",
              active
                ? "bg-[#4F46E5] text-white shadow-[0_10px_24px_rgba(79,70,229,0.18)]"
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
            {!collapsed && <span className="truncate">{item.name}</span>}
          </Link>
        );
      })}
    </nav>
  );
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const saved = window.localStorage.getItem("admin_sidebar_collapsed");
    if (saved === "1") setCollapsed(true);
  }, []);

  React.useEffect(() => {
    window.localStorage.setItem("admin_sidebar_collapsed", collapsed ? "1" : "0");
  }, [collapsed]);

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="relative mx-auto max-w-[1440px]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-[#EEF2FF] blur-3xl" />
          <div className="absolute -right-40 -top-32 h-[520px] w-[520px] rounded-full bg-[#EFF6FF] blur-3xl" />
        </div>

        <div className="flex">
          <aside
            className={cn(
              "sticky top-0 hidden h-screen shrink-0 border-r border-[#E5E7EB] bg-white/90 px-3 py-4 backdrop-blur supports-[backdrop-filter]:bg-white/80 lg:block",
              collapsed ? "w-[70px]" : "w-[240px]"
            )}
          >
            <div className="flex items-center justify-between gap-2 px-1">
              <Brand collapsed={collapsed} />
              <button
                className="grid h-9 w-9 place-items-center rounded-xl text-[#9CA3AF] transition-colors hover:bg-[#F9FAFB] hover:text-[#374151]"
                onClick={() => setCollapsed((v) => !v)}
                aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>

            <SidebarNav collapsed={collapsed} />

            <div className="mt-auto px-1 pt-6">
              <div className={cn("rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] p-3", collapsed && "p-2")}>
                {!collapsed ? (
                  <div className="flex items-center gap-3">
                    <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#EEF2FF] text-[#4F46E5]">
                      <Users className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-[#111827]">
                        Admin Team
                      </div>
                      <div className="truncate text-xs text-[#9CA3AF]">
                        admin@smartlytap.com
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#EEF2FF] text-[#4F46E5]">
                    <Users className="h-5 w-5" />
                  </div>
                )}
              </div>
            </div>
          </aside>

          <div className="min-w-0 flex-1">
            <header className="sticky top-0 z-40 border-b border-[#E5E7EB] bg-white/85 backdrop-blur supports-[backdrop-filter]:bg-white/75">
              <div className="flex h-16 items-center gap-3 px-4 lg:px-6">
                <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="lg:hidden"
                      aria-label="Open navigation"
                    >
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="p-4">
                    <Brand collapsed={false} />
                    <SidebarNav
                      collapsed={false}
                      onNavigate={() => setMobileOpen(false)}
                    />
                  </SheetContent>
                </Sheet>

                <div className="relative hidden w-[520px] max-w-full md:block">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
                  <Input
                    placeholder="Search orders, users, cards..."
                    className="pl-10"
                  />
                </div>

                <div className="ml-auto flex items-center gap-2">
                  <Button
                    variant="secondary"
                    size="icon"
                    aria-label="Notifications"
                  >
                    <Bell className="h-5 w-5" />
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-3 py-2 text-sm font-medium text-[#111827] shadow-sm transition-all hover:-translate-y-[0.5px] hover:bg-[#F9FAFB] hover:shadow-[0_10px_24px_rgba(0,0,0,0.06)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]/20">
                        <span className="grid h-7 w-7 place-items-center rounded-lg bg-[#EEF2FF] text-xs font-semibold text-[#4F46E5]">
                          ST
                        </span>
                        <span className="hidden sm:block">Super Admin</span>
                        <ChevronDown className="h-4 w-4 text-[#9CA3AF]" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href="/admin/settings">Account settings</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/admin/settings?tab=security">Security</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => {
                          // Hook to real auth later
                          console.log("Sign out");
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

