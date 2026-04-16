"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Wallet } from "lucide-react";
import { toast } from "sonner";

import { delay, resellers as seedResellers } from "@/lib/admin/mock-data";
import { PageHeader, Pagination } from "@/components/admin/page-kit";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/admin/page-kit";
import { Badge } from "@/components/ui/badge";

export default function AdminResellersPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "resellers"],
    queryFn: async () => delay(seedResellers, 700),
  });

  const [query, setQuery] = React.useState("");
  const [page, setPage] = React.useState(1);
  const pageSize = 7;

  const filtered = (data ?? []).filter((r) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      r.name.toLowerCase().includes(q) ||
      r.email.toLowerCase().includes(q) ||
      r.id.toLowerCase().includes(q)
    );
  });

  React.useEffect(() => setPage(1), [query]);

  const start = (page - 1) * pageSize;
  const pageRows = filtered.slice(start, start + pageSize);

  const totalDue = (data ?? []).reduce((acc, r) => acc + r.payoutDue, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Resellers"
        description="Commission tracking and payout readiness."
        actions={
          <Button
            variant="secondary"
            onClick={() =>
              toast.success("Payout batch queued", {
                description: `₹${totalDue.toLocaleString("en-IN")} scheduled (UI-only).`,
              })
            }
          >
            <Wallet className="h-4 w-4" />
            Run payouts
          </Button>
        }
      />

      <Card>
        <CardHeader className="p-6 pb-0">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Commission table</CardTitle>
              <div className="mt-1 text-sm text-[#6B7280]">
                Clean rows, hover highlight, and quick payout visibility.
              </div>
            </div>
            <div className="relative w-full md:w-[320px]">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
              <Input
                placeholder="Search reseller..."
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
                title="No resellers found"
                description="Try a different keyword."
                actionLabel="Clear search"
                onAction={() => setQuery("")}
              />
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Reseller</TableHead>
                    <TableHead>Commission</TableHead>
                    <TableHead>Total sales</TableHead>
                    <TableHead>Payout due</TableHead>
                    <TableHead className="w-[160px]">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pageRows.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell>
                        <div className="text-sm font-medium text-[#111827]">{r.name}</div>
                        <div className="text-xs text-[#9CA3AF]">{r.email}</div>
                        <div className="mt-1 text-xs text-[#9CA3AF]">{r.id}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="info">{r.commissionRate}%</Badge>
                      </TableCell>
                      <TableCell className="text-sm text-[#374151]">
                        ₹{r.totalSales.toLocaleString("en-IN")}
                      </TableCell>
                      <TableCell className="text-sm font-medium text-[#111827]">
                        ₹{r.payoutDue.toLocaleString("en-IN")}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() =>
                            toast.message("Payout details", {
                              description: `Open payout ledger for ${r.name} (UI-only).`,
                            })
                          }
                        >
                          View ledger
                        </Button>
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

