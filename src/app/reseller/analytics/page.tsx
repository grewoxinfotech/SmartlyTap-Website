"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";

import { apiClient } from "@/lib/apiClient";
import { PageHeader } from "@/components/admin/page-kit";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ResellerAnalyticsPage() {
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
        title="Analytics"
        description="Reseller-level metrics (from backend)."
      />

      <Card>
        <CardHeader>
          <CardTitle>Raw reseller record</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="overflow-auto rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] p-4 text-xs text-[#111827]">
            {isLoading ? "Loading..." : JSON.stringify(data, null, 2)}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}

