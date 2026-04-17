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
  icon: Icon,
  tone,
}: {
  label: string;
  value: string;
  icon: any;
  tone: "primary" | "accent" | "green";
}) {
  const toneClass =
    tone === "primary"
      ? "from-primary/10 to-transparent text-primary border-primary/10"
      : tone === "accent"
        ? "from-accent/10 to-transparent text-accent border-accent/10"
        : "from-green-500/10 to-transparent text-green-600 border-green-500/10";
 
  return (
    <div className="card-std p-5 transition-all hover:shadow-md">
      <div className="flex items-center gap-4">
        <div
          className={`grid h-10 w-10 place-items-center rounded-xl border bg-gradient-to-br ${toneClass} shadow-inner`}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <div className="text-[12px] font-black uppercase tracking-widest text-gray-400 leading-none mb-1">{label}</div>
          <div className="text-xl font-black text-primary-dark leading-none">{value}</div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardAnalyticsPage() {
  const { data: me } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      if (typeof window === "undefined") return null;
      const stored = localStorage.getItem("user_data");
      return stored ? JSON.parse(stored) : null;
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ["dashboard", "analytics", me?.id],
    enabled: !!me?.id,
    queryFn: async () => {
      if (!me?.id) return null;
      const res = await apiClient.get(`/analytics/${me.id}`);
      return res.data.data as AnalyticsResponse;
    },
  });

  const totalClicks = React.useMemo(() => {
    if (!data?.clicksByPlatform) return 0;
    return Object.values(data.clicksByPlatform).reduce((a, v) => a + Number(v), 0);
  }, [data?.clicksByPlatform]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="h1-std mb-1">Performance Analytics</h1>
        <p className="p-std text-xs font-bold uppercase tracking-widest opacity-60">Track your NFC taps and digital link interaction metrics.</p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <Stat
          label="Total Taps"
          value={isLoading ? "—" : String(data?.totalTaps ?? 0)}
          icon={Activity}
          tone="primary"
        />
        <Stat
          label="Link Clicks"
          value={isLoading ? "—" : String(totalClicks)}
          icon={MousePointerClick}
          tone="accent"
        />
        <Stat
          label="Engagement"
          value="12.4%"
          icon={TrendingUp}
          tone="green"
        />
      </div>

      <div className="card-std p-6">
        <div className="flex items-end justify-between gap-4 border-b border-gray-100 pb-6 mb-6">
          <div>
            <h2 className="font-black text-xs uppercase tracking-widest text-primary-dark">Activity Trend (7d)</h2>
            <p className="text-[12px] text-gray-400 font-bold uppercase tracking-tighter mt-1">
              Visualizing tap and click frequency across the week.
            </p>
          </div>
        </div>

        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={series} margin={{ left: -20, right: 0, top: 0, bottom: 0 }}>
              <CartesianGrid stroke="#F3F4F6" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="day" stroke="#9CA3AF" tick={{ fontSize: 10, fontWeight: 700 }} tickLine={false} axisLine={false} />
              <YAxis stroke="#9CA3AF" tick={{ fontSize: 10, fontWeight: 700 }} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  background: "#005461",
                  border: "none",
                  borderRadius: 12,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                  padding: "12px"
                }}
                itemStyle={{ color: "#ffffff", fontWeight: 800, fontSize: "10px", textTransform: "uppercase" }}
                labelStyle={{ color: "#018790", fontWeight: 900, fontSize: "12px", marginBottom: "4px" }}
              />
              <Area
                type="monotone"
                dataKey="taps"
                stroke="#018790"
                fill="url(#colorTaps)"
                strokeWidth={3}
              />
              <Area
                type="monotone"
                dataKey="clicks"
                stroke="#eab308"
                fill="url(#colorClicks)"
                strokeWidth={3}
              />
              <defs>
                <linearGradient id="colorTaps" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#018790" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#018790" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#eab308" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#eab308" stopOpacity={0}/>
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card-std p-6">
        <h2 className="font-black text-xs uppercase tracking-widest text-primary-dark mb-4">Engagement by Source</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {Object.entries(data?.clicksByPlatform ?? {}).length > 0 ? (
            Object.entries(data?.clicksByPlatform ?? {}).map(([k, v]) => (
              <div
                key={k}
                className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50/50 px-4 py-3 hover:bg-white hover:shadow-sm transition-all"
              >
                <div className="text-[11px] font-black uppercase tracking-wider text-primary-dark">{k}</div>
                <div className="text-[11px] font-black text-primary bg-primary/5 px-2 py-0.5 rounded-full">{v} CLICKS</div>
              </div>
            ))
          ) : (
            <div className="text-[12px] font-bold uppercase tracking-widest text-gray-400 py-4">
              No click interaction data recorded yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

