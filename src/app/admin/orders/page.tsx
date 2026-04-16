"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { Filter, Pencil, Search } from "lucide-react";
import { toast } from "sonner";

import { delay, orders as seedOrders, type AdminOrder, type OrderStatus } from "@/lib/admin/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EmptyState, PageHeader, Pagination, StatusBadge } from "@/components/admin/page-kit";
import { Skeleton } from "@/components/ui/skeleton";

const STATUSES: OrderStatus[] = ["Pending", "Paid", "Processing", "Failed"];

export default function AdminOrdersPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "orders"],
    queryFn: async () => delay(seedOrders, 700),
  });

  const [query, setQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<"All" | OrderStatus>("All");
  const [page, setPage] = React.useState(1);
  const pageSize = 6;

  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<AdminOrder | null>(null);
  const [nextStatus, setNextStatus] = React.useState<OrderStatus>("Pending");

  const filtered = (data ?? [])
    .filter((o) => (statusFilter === "All" ? true : o.status === statusFilter))
    .filter((o) => {
      if (!query.trim()) return true;
      const q = query.toLowerCase();
      return (
        o.id.toLowerCase().includes(q) ||
        o.customer.toLowerCase().includes(q) ||
        o.email.toLowerCase().includes(q)
      );
    });

  React.useEffect(() => setPage(1), [query, statusFilter]);

  const start = (page - 1) * pageSize;
  const pageRows = filtered.slice(start, start + pageSize);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Orders"
        description="Search, filter, and update payment status."
        actions={
          <Button
            variant="secondary"
            onClick={() => toast.message("Filters saved", { description: "This is a UI-only demo hook." })}
          >
            <Filter className="h-4 w-4" />
            Save filters
          </Button>
        }
      />

      <Card>
        <CardHeader className="p-6 pb-0">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="min-w-0">
              <CardTitle>All orders</CardTitle>
              <div className="mt-1 text-sm text-[#6B7280]">
                Manage statuses with a single click.
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative w-full sm:w-[280px]">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
                <Input
                  placeholder="Search order, customer, email..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as "All" | OrderStatus)}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All statuses</SelectItem>
                  {STATUSES.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-6">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="mt-3 h-10 w-full" />
              <Skeleton className="mt-3 h-10 w-full" />
              <Skeleton className="mt-3 h-10 w-full" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-6">
              <EmptyState
                title="No orders found"
                description="Try a different search term or clear filters."
                actionLabel="Clear filters"
                onAction={() => {
                  setQuery("");
                  setStatusFilter("All");
                }}
              />
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[120px]">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pageRows.map((o) => (
                    <TableRow key={o.id}>
                      <TableCell className="font-medium">{o.id}</TableCell>
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
                      <TableCell>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => {
                            setSelected(o);
                            setNextStatus(o.status);
                            setOpen(true);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                          Update
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

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update order status</DialogTitle>
            <DialogDescription>
              Change payment state for{" "}
              <span className="font-medium text-[#111827]">{selected?.id}</span>.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-3">
            <div className="rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] p-4">
              <div className="text-xs font-semibold text-[#6B7280]">Current</div>
              <div className="mt-1">
                {selected ? <StatusBadge status={selected.status} /> : null}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium text-[#111827]">New status</div>
              <Select
                value={nextStatus}
                onValueChange={(v) => setNextStatus(v as OrderStatus)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUSES.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (!selected) return;
                toast.success("Status updated", {
                  description: `${selected.id} → ${nextStatus}`,
                });
                setOpen(false);
              }}
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

