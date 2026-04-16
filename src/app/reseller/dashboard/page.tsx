"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { BarChart3, ReceiptIndianRupee, ShoppingBag, Tag } from "lucide-react";

import { apiClient } from "@/lib/apiClient";
import { PageHeader, StatCard } from "@/components/admin/page-kit";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ResellerDashboardPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["reseller", "analytics"],
    queryFn: async () => {
      const res = await apiClient.get("/reseller/analytics");
      return res.data.data as any;
    },
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reseller Dashboard"
        description="Track your sales, discounts and commission earnings."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total sales"
          value={isLoading ? "—" : `₹${Number(data?.total_sales || 0).toLocaleString("en-IN")}`}
          deltaLabel="+7.1%"
          deltaTone="up"
          icon={<ShoppingBag className="h-5 w-5" />}
        />
        <StatCard
          title="Commission earned"
          value={isLoading ? "—" : `₹${Number(data?.commission_earned || 0).toLocaleString("en-IN")}`}
          deltaLabel="+4.2%"
          deltaTone="up"
          icon={<ReceiptIndianRupee className="h-5 w-5" />}
        />
        <StatCard
          title="Commission rate"
          value={isLoading ? "—" : `${Number(data?.commission_pct || 0)}%`}
          deltaLabel="flat"
          deltaTone="flat"
          icon={<BarChart3 className="h-5 w-5" />}
        />
        <StatCard
          title="Discount rate"
          value={isLoading ? "—" : `${Number(data?.pricing_discount_pct || 0)}%`}
          deltaLabel="flat"
          deltaTone="flat"
          icon={<Tag className="h-5 w-5" />}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-[#6B7280]">
          <div>• Use bulk orders for better resale efficiency.</div>
          <div>• Share product links with your network.</div>
          <div>• Track commission as orders get paid.</div>
        </CardContent>
      </Card>
    </div>
  );
}

