"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { ReceiptIndianRupee } from "lucide-react";

import { apiClient } from "@/lib/apiClient";
import { PageHeader } from "@/components/admin/page-kit";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ResellerCommissionPage() {
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
        title="Commission"
        description="Overview of commission earned from reseller orders."
      />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Commission summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#EEF2FF] text-[#4F46E5] ring-1 ring-[#C7D2FE]">
                <ReceiptIndianRupee className="h-6 w-6" />
              </div>
              <div>
                <div className="text-sm text-[#6B7280]">Total earned</div>
                <div className="text-2xl font-semibold text-[#111827]">
                  {isLoading ? "—" : `₹${Number(data?.commission_earned || 0).toLocaleString("en-IN")}`}
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-3">
              <div className="flex items-center justify-between rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] px-4 py-3">
                <div className="text-sm font-medium text-[#111827]">Commission rate</div>
                <div className="text-sm text-[#6B7280]">{isLoading ? "—" : `${Number(data?.commission_pct || 0)}%`}</div>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] px-4 py-3">
                <div className="text-sm font-medium text-[#111827]">Total sales</div>
                <div className="text-sm text-[#6B7280]">{isLoading ? "—" : `₹${Number(data?.total_sales || 0).toLocaleString("en-IN")}`}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payouts</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-[#6B7280]">
            Payout ledger UI can be added when backend exposes payout records.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

