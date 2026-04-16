"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { Image as ImageIcon, Search } from "lucide-react";
import { toast } from "sonner";

import { delay, products as seedProducts, type AdminProduct } from "@/lib/admin/mock-data";
import { PageHeader, Pagination, StatusBadge } from "@/components/admin/page-kit";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/admin/page-kit";
import { cn } from "@/lib/utils";

export default function AdminProductsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "products"],
    queryFn: async () => delay(seedProducts, 700),
  });

  const [query, setQuery] = React.useState("");
  const [page, setPage] = React.useState(1);
  const pageSize = 6;

  const [selected, setSelected] = React.useState<AdminProduct | null>(null);
  React.useEffect(() => {
    if (!selected && data?.[0]) setSelected(data[0]);
  }, [data, selected]);

  const filtered = (data ?? []).filter((p) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      p.id.toLowerCase().includes(q)
    );
  });

  React.useEffect(() => setPage(1), [query]);

  const start = (page - 1) * pageSize;
  const pageRows = filtered.slice(start, start + pageSize);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Products"
        description="Browse catalog items and preview product artwork."
        actions={
          <Button
            onClick={() =>
              toast.success("Product created", {
                description: "UI-only demo action.",
              })
            }
          >
            Create product
          </Button>
        }
      />

      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader className="p-6 pb-0">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle>Product table</CardTitle>
                <div className="mt-1 text-sm text-[#6B7280]">
                  Click a row to preview.
                </div>
              </div>
              <div className="relative w-full md:w-[320px]">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
                <Input
                  placeholder="Search product, SKU, ID..."
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
                  title="No products found"
                  description="Try adjusting your search."
                  actionLabel="Clear search"
                  onAction={() => setQuery("")}
                />
              </div>
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>SKU</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pageRows.map((p) => {
                      const active = selected?.id === p.id;
                      return (
                        <TableRow
                          key={p.id}
                          className={cn(active && "bg-[#EEF2FF]/60")}
                          onClick={() => setSelected(p)}
                          style={{ cursor: "pointer" }}
                        >
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#F9FAFB] text-[#9CA3AF]">
                                <ImageIcon className="h-5 w-5" />
                              </div>
                              <div className="min-w-0">
                                <div className="truncate text-sm font-medium text-[#111827]">
                                  {p.name}
                                </div>
                                <div className="text-xs text-[#9CA3AF]">{p.id}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm text-[#374151]">
                            {p.sku}
                          </TableCell>
                          <TableCell className="text-sm text-[#374151]">
                            ₹{p.price.toLocaleString("en-IN")}
                          </TableCell>
                          <TableCell>
                            <StatusBadge status={p.status} />
                          </TableCell>
                        </TableRow>
                      );
                    })}
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

        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            {selected ? (
              <div className="space-y-4">
                <div className="aspect-[4/3] overflow-hidden rounded-xl border border-[#E5E7EB] bg-gradient-to-br from-[#EEF2FF] via-white to-[#EFF6FF] p-4">
                  <div className="flex h-full items-center justify-center">
                    <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-[#4F46E5] shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
                      <ImageIcon className="h-7 w-7" />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-sm font-semibold text-[#111827]">
                    {selected.name}
                  </div>
                  <div className="mt-1 text-sm text-[#6B7280]">
                    SKU: <span className="font-medium text-[#111827]">{selected.sku}</span>
                  </div>
                  <div className="mt-1 text-sm text-[#6B7280]">
                    Price:{" "}
                    <span className="font-medium text-[#111827]">
                      ₹{selected.price.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="mt-3">
                    <StatusBadge status={selected.status} />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Button onClick={() => toast.message("Edit product", { description: "UI-only demo action." })}>
                    Edit product
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() =>
                      toast.message("Duplicate product", { description: "UI-only demo action." })
                    }
                  >
                    Duplicate
                  </Button>
                </div>
              </div>
            ) : (
              <EmptyState
                title="Select a product"
                description="Choose an item from the table to preview."
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

