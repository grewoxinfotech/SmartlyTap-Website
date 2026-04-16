"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Activity, MousePointerClick, TrendingUp } from "lucide-react";

import { delay } from "@/lib/admin/mock-data";
import { PageHeader, StatCard } from "@/components/admin/page-kit";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const traffic = [
  { day: "Mon", visits: 920, signups: 54 },
  { day: "Tue", visits: 1040, signups: 61 },
  { day: "Wed", visits: 980, signups: 57 },
  { day: "Thu", visits: 1210, signups: 75 },
  { day: "Fri", visits: 1410, signups: 84 },
  { day: "Sat", visits: 1320, signups: 77 },
  { day: "Sun", visits: 1580, signups: 96 },
];

const sources = [
  { name: "Direct", value: 42 },
  { name: "Instagram", value: 26 },
  { name: "WhatsApp", value: 18 },
  { name: "Referral", value: 14 },
];

export default function AdminAnalyticsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "analytics"],
    queryFn: async () =>
      delay(
        {
          traffic,
          sources,
        },
        800
      ),
  });

  const totalVisits = (data?.traffic ?? []).reduce((a, x) => a + x.visits, 0);
  const totalSignups = (data?.traffic ?? []).reduce((a, x) => a + x.signups, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics"
        description="A graph-heavy view of acquisition and engagement."
      />

      <div className="grid gap-4 md:grid-cols-3">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
            >
              <Skeleton className="h-4 w-24" />
              <Skeleton className="mt-3 h-9 w-20" />
              <Skeleton className="mt-5 h-6 w-40" />
            </div>
          ))
        ) : (
          <>
            <StatCard
              title="Total visits"
              value={totalVisits.toLocaleString("en-IN")}
              deltaLabel="+9.8%"
              deltaTone="up"
              icon={<Activity className="h-5 w-5" />}
            />
            <StatCard
              title="Signups"
              value={totalSignups.toLocaleString("en-IN")}
              deltaLabel="+5.1%"
              deltaTone="up"
              icon={<TrendingUp className="h-5 w-5" />}
            />
            <StatCard
              title="Tap-to-signup rate"
              value="7.2%"
              deltaLabel="-0.4%"
              deltaTone="down"
              icon={<MousePointerClick className="h-5 w-5" />}
            />
          </>
        )}
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="cohorts">Cohorts</TabsTrigger>
          <TabsTrigger value="devices">Devices</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-6 xl:grid-cols-3">
            <Card className="xl:col-span-2">
              <CardHeader>
                <CardTitle>Traffic & signups</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[320px]">
                  {isLoading ? (
                    <Skeleton className="h-full w-full" />
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={data?.traffic ?? []} margin={{ left: 8, right: 12, top: 8, bottom: 8 }}>
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
                        />
                        <Area
                          type="monotone"
                          dataKey="visits"
                          stroke="#4F46E5"
                          fill="#EEF2FF"
                          strokeWidth={2.5}
                        />
                        <Area
                          type="monotone"
                          dataKey="signups"
                          stroke="#22C55E"
                          fill="#F0FDF4"
                          strokeWidth={2.5}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top sources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[320px]">
                  {isLoading ? (
                    <Skeleton className="h-full w-full" />
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={data?.sources ?? []} layout="vertical" margin={{ left: 18, right: 12, top: 8, bottom: 8 }}>
                        <CartesianGrid stroke="#E5E7EB" strokeDasharray="4 4" />
                        <XAxis type="number" stroke="#9CA3AF" tickLine={false} axisLine={false} />
                        <YAxis type="category" dataKey="name" stroke="#9CA3AF" tickLine={false} axisLine={false} width={80} />
                        <Tooltip
                          contentStyle={{
                            background: "#FFFFFF",
                            border: "1px solid #E5E7EB",
                            borderRadius: 12,
                            boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                          }}
                          labelStyle={{ color: "#111827", fontWeight: 600 }}
                        />
                        <Bar dataKey="value" fill="#3B82F6" radius={[8, 8, 8, 8]} />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="cohorts">
          <Card>
            <CardHeader>
              <CardTitle>Cohort retention (sample)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                <div className="text-sm text-[#6B7280]">
                  A compact grid for retention-style insights (UI-only example).
                </div>
                <div className="overflow-hidden rounded-xl border border-[#E5E7EB]">
                  <div className="grid grid-cols-6 bg-[#F9FAFB] text-xs font-semibold text-[#6B7280]">
                    {["Cohort", "W1", "W2", "W3", "W4", "W5"].map((h) => (
                      <div key={h} className="px-4 py-3">
                        {h}
                      </div>
                    ))}
                  </div>
                  {[
                    ["Mar 1", 62, 48, 39, 31, 28],
                    ["Mar 8", 66, 51, 41, 33, 30],
                    ["Mar 15", 60, 46, 36, 29, 25],
                    ["Mar 22", 58, 43, 34, 27, 24],
                  ].map((row) => (
                    <div key={String(row[0])} className="grid grid-cols-6 border-t border-[#E5E7EB] bg-white text-sm">
                      <div className="px-4 py-3 font-medium text-[#111827]">{row[0]}</div>
                      {row.slice(1).map((v, idx) => {
                        const pct = Number(v);
                        const bg =
                          pct >= 55
                            ? "bg-[#EEF2FF]"
                            : pct >= 40
                              ? "bg-[#EFF6FF]"
                              : pct >= 30
                                ? "bg-[#F9FAFB]"
                                : "bg-white";
                        return (
                          <div key={idx} className={cn("px-4 py-3", bg)}>
                            <span className="text-[#374151]">{pct}%</span>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="devices">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Device mix</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    ["Android", 62, "#4F46E5"],
                    ["iOS", 31, "#3B82F6"],
                    ["Desktop", 7, "#22C55E"],
                  ].map(([label, value, color]) => (
                    <div key={String(label)} className="rounded-xl border border-[#E5E7EB] bg-white p-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-[#111827]">{label}</span>
                        <span className="text-[#6B7280]">{value}%</span>
                      </div>
                      <div className="mt-3 h-2 rounded-full bg-[#E5E7EB]">
                        <div
                          className="h-2 rounded-full"
                          style={{ width: `${value}%`, background: String(color) }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Regions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    ["India", "78%"],
                    ["UAE", "9%"],
                    ["US", "7%"],
                    ["Other", "6%"],
                  ].map(([label, value]) => (
                    <div key={String(label)} className="flex items-center justify-between rounded-xl border border-[#E5E7EB] bg-white p-4">
                      <div className="text-sm font-medium text-[#111827]">{label}</div>
                      <div className="text-sm text-[#6B7280]">{value}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

