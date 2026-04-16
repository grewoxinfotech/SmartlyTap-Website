"use client";

import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import { CreditCard, IndianRupee, ShoppingBag, Users } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHeader, StatCard, StatusBadge } from "@/components/admin/page-kit";
import { delay, orders, users, cards } from "@/lib/admin/mock-data";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const revenueSeries = [
  { day: "Mon", revenue: 12000 },
  { day: "Tue", revenue: 15500 },
  { day: "Wed", revenue: 13800 },
  { day: "Thu", revenue: 18200 },
  { day: "Fri", revenue: 21000 },
  { day: "Sat", revenue: 19600 },
  { day: "Sun", revenue: 23400 },
];

const tapsSeries = [
  { name: "Week 1", taps: 420 },
  { name: "Week 2", taps: 560 },
  { name: "Week 3", taps: 610 },
  { name: "Week 4", taps: 740 },
];

export default function AdminDashboardPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "dashboard"],
    queryFn: async () =>
      delay(
        {
          orders,
          users,
          cards,
        },
        700
      ),
  });

  const paidOrders = (data?.orders ?? []).filter((o) => o.status === "Paid");
  const totalRevenue = paidOrders.reduce((acc, o) => acc + o.amount, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Track revenue, activity, and system health in one place."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
            >
              <Skeleton className="h-4 w-28" />
              <Skeleton className="mt-3 h-9 w-24" />
              <Skeleton className="mt-5 h-6 w-36" />
            </div>
          ))
        ) : (
          <>
            <StatCard
              title="Total revenue"
              value={`₹${totalRevenue.toLocaleString("en-IN")}`}
              deltaLabel="+12.4%"
              deltaTone="up"
              icon={<IndianRupee className="h-5 w-5" />}
            />
            <StatCard
              title="Orders"
              value={`${data?.orders.length ?? 0}`}
              deltaLabel="+6.1%"
              deltaTone="up"
              icon={<ShoppingBag className="h-5 w-5" />}
            />
            <StatCard
              title="Users"
              value={`${data?.users.length ?? 0}`}
              deltaLabel="+3.2%"
              deltaTone="up"
              icon={<Users className="h-5 w-5" />}
            />
            <StatCard
              title="Active cards"
              value={`${(data?.cards ?? []).filter((c) => c.active).length}`}
              deltaLabel="-1.0%"
              deltaTone="down"
              icon={<CreditCard className="h-5 w-5" />}
            />
          </>
        )}
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueSeries} margin={{ left: 8, right: 12, top: 8, bottom: 8 }}>
                  <CartesianGrid stroke="#E5E7EB" strokeDasharray="4 4" />
                  <XAxis dataKey="day" stroke="#9CA3AF" tickLine={false} axisLine={false} />
                  <YAxis stroke="#9CA3AF" tickLine={false} axisLine={false} width={40} />
                  <Tooltip
                    contentStyle={{
                      background: "#FFFFFF",
                      border: "1px solid #E5E7EB",
                      borderRadius: 12,
                      boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                    }}
                    labelStyle={{ color: "#111827", fontWeight: 600 }}
                    itemStyle={{ color: "#111827" }}
                    formatter={((value: unknown) => {
                      const v = Array.isArray(value) ? value[0] : value;
                      return [
                        `₹${Number(v ?? 0).toLocaleString("en-IN")}`,
                        "Revenue",
                      ];
                    }) as any}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#4F46E5"
                    strokeWidth={3}
                    dot={{ r: 3, fill: "#4F46E5" }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Card taps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={tapsSeries} margin={{ left: 8, right: 12, top: 8, bottom: 8 }}>
                  <CartesianGrid stroke="#E5E7EB" strokeDasharray="4 4" />
                  <XAxis dataKey="name" stroke="#9CA3AF" tickLine={false} axisLine={false} />
                  <YAxis stroke="#9CA3AF" tickLine={false} axisLine={false} width={40} />
                  <Tooltip
                    contentStyle={{
                      background: "#FFFFFF",
                      border: "1px solid #E5E7EB",
                      borderRadius: 12,
                      boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                    }}
                    labelStyle={{ color: "#111827", fontWeight: 600 }}
                    itemStyle={{ color: "#111827" }}
                  />
                  <Bar dataKey="taps" fill="#3B82F6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent activity</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-6">
              <Skeleton className="h-5 w-64" />
              <Skeleton className="mt-4 h-10 w-full" />
              <Skeleton className="mt-3 h-10 w-full" />
              <Skeleton className="mt-3 h-10 w-full" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(data?.orders ?? []).slice(0, 5).map((o) => (
                  <TableRow key={o.id}>
                    <TableCell className="font-medium text-[#111827]">{o.id}</TableCell>
                    <TableCell>
                      <div className="text-sm font-medium text-[#111827]">{o.customer}</div>
                      <div className="text-xs text-[#9CA3AF]">{o.email}</div>
                    </TableCell>
                    <TableCell className="text-sm text-[#374151]">{o.createdAt}</TableCell>
                    <TableCell className="text-sm text-[#374151]">
                      ₹{o.amount.toLocaleString("en-IN")}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={o.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

