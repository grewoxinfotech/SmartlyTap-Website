"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";

import { apiClient } from "@/lib/apiClient";
import { PageHeader, Pagination, StatusBadge } from "@/components/admin/page-kit";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { EmptyState } from "@/components/admin/page-kit";

type Payment = {
  id: string;
  order_id: string;
  provider: string;
  razorpay_order_id?: string | null;
  razorpay_payment_id?: string | null;
  status: "CREATED" | "CAPTURED" | "FAILED" | "REFUNDED";
  amount: string | number;
  currency: string;
  created_at?: string;
};

export default function AdminPaymentsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "payments"],
    queryFn: async () => {
      const res = await apiClient.get("/admin/payments");
      return res.data.data as Payment[];
    },
  });

  const [query, setQuery] = React.useState("");
  const [page, setPage] = React.useState(1);
  const pageSize = 8;

  const filtered = (data ?? []).filter((p) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      p.id.toLowerCase().includes(q) ||
      p.order_id.toLowerCase().includes(q) ||
      (p.razorpay_order_id || "").toLowerCase().includes(q) ||
      (p.razorpay_payment_id || "").toLowerCase().includes(q)
    );
  });

  React.useEffect(() => setPage(1), [query]);

  const start = (page - 1) * pageSize;
  const pageRows = filtered.slice(start, start + pageSize);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Payments"
        description="Razorpay payment records and current status."
      />

      <Card>
        <CardHeader className="p-6 pb-0">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Payment logs</CardTitle>
              <div className="mt-1 text-sm text-[#6B7280]">
                Created/Captured/Failed/Refunded entries.
              </div>
            </div>
            <div className="relative w-full md:w-[360px]">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
              <Input
                placeholder="Search payment/order/razorpay ids..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-6">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="mt-3 h-10 w-full" />
              <Skeleton className="mt-3 h-10 w-full" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-6">
              <EmptyState
                title="No payments found"
                description="Try a different search."
                actionLabel="Clear search"
                onAction={() => setQuery("")}
              />
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Payment</TableHead>
                    <TableHead>Order</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pageRows.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="font-medium">
                        <div className="text-sm font-medium text-[#111827]">
                          {p.id}
                        </div>
                        <div className="mt-1 text-xs text-[#9CA3AF]">
                          {p.razorpay_payment_id || "—"}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-[#374151]">
                        <div className="text-sm font-medium text-[#111827]">
                          {p.order_id}
                        </div>
                        <div className="mt-1 text-xs text-[#9CA3AF]">
                          {p.razorpay_order_id || "—"}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-[#374151]">
                        {p.provider}
                      </TableCell>
                      <TableCell className="text-sm text-[#374151]">
                        {p.currency} {Number(p.amount).toLocaleString("en-IN")}
                      </TableCell>
                      <TableCell>
                        <StatusBadge
                          status={
                            p.status === "CAPTURED"
                              ? "Paid"
                              : p.status === "CREATED"
                                ? "Processing"
                                : p.status === "FAILED"
                                  ? "Failed"
                                  : "Pending"
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <Pagination
                page={page}
                pageSize={pageSize}
                total={filtered.length}
                onPageChange={setPage}
              />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

