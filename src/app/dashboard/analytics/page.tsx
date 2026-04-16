"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Activity, MousePointerClick, TrendingUp } from "lucide-react";

import { apiClient } from "@/lib/apiClient";

type AnalyticsResponse = {
  totalTaps: number;
  clicksByPlatform: Record<string, number>;
};

const series = [
  { day: "Mon", taps: 32, clicks: 9 },
  { day: "Tue", taps: 45, clicks: 12 },
  { day: "Wed", taps: 38, clicks: 10 },
  { day: "Thu", taps: 52, clicks: 16 },
  { day: "Fri", taps: 61, clicks: 20 },
  { day: "Sat", taps: 57, clicks: 18 },
  { day: "Sun", taps: 68, clicks: 24 },
];

function Stat({
  label,
  value,
  icon,
  tone,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  tone: "indigo" | "blue" | "green";
}) {
  const toneClass =
    tone === "indigo"
      ? "from-[#EEF2FF] to-white text-[#4F46E5] ring-[#C7D2FE]"
      : tone === "blue"
        ? "from-[#EFF6FF] to-white text-[#3B82F6] ring-[#BFDBFE]"
        : "from-[#ECFDF5] to-white text-[#22C55E] ring-[#BBF7D0]";

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-center gap-3">
        <div
          className={`grid h-12 w-12 place-items-center rounded-full border border-gray-100 bg-gradient-to-br ${toneClass} ring-1`}
        >
          {icon}
        </div>
        <div>
          <div className="text-sm text-gray-500">{label}</div>
          <div className="text-2xl font-extrabold text-gray-900">{value}</div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardAnalyticsPage() {
  const { data: me } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const stored = localStorage.getItem("user_data");
      return stored ? JSON.parse(stored) : null;
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ["dashboard", "analytics", me?.id],
    enabled: Boolean(me?.id),
    queryFn: async () => {
      const res = await apiClient.get(`/analytics/${me.id}`);
      return res.data.data as AnalyticsResponse;
    },
  });

  const totalClicks = Object.values(data?.clicksByPlatform ?? {}).reduce(
    (a, v) => a + v,
    0
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Analytics
        </h1>
        <p className="text-gray-500 mt-1">Track taps and link clicks.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Stat
          label="Total taps"
          value={isLoading ? "—" : String(data?.totalTaps ?? 0)}
          icon={<Activity className="h-6 w-6" />}
          tone="indigo"
        />
        <Stat
          label="Total clicks"
          value={isLoading ? "—" : String(totalClicks)}
          icon={<MousePointerClick className="h-6 w-6" />}
          tone="blue"
        />
        <Stat
          label="Growth (7d)"
          value="12.4%"
          icon={<TrendingUp className="h-6 w-6" />}
          tone="green"
        />
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Last 7 days</h2>
            <p className="text-sm text-gray-500 mt-1">
              Sample daily graph (wire to real daily aggregation later).
            </p>
          </div>
        </div>

        <div className="mt-6 h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={series} margin={{ left: 8, right: 12, top: 8, bottom: 8 }}>
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
                dataKey="taps"
                stroke="#4F46E5"
                fill="#EEF2FF"
                strokeWidth={2.5}
              />
              <Area
                type="monotone"
                dataKey="clicks"
                stroke="#3B82F6"
                fill="#EFF6FF"
                strokeWidth={2.5}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900">Clicks by platform</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {Object.entries(data?.clicksByPlatform ?? {}).length ? (
            Object.entries(data?.clicksByPlatform ?? {}).map(([k, v]) => (
              <div
                key={k}
                className="flex items-center justify-between rounded-2xl border border-gray-100 bg-[#F9FAFB] px-4 py-3"
              >
                <div className="text-sm font-semibold text-gray-900">{k}</div>
                <div className="text-sm text-gray-600">{v}</div>
              </div>
            ))
          ) : (
            <div className="text-sm text-gray-500">
              No click data yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

