"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, UserPlus } from "lucide-react";
import { toast } from "sonner";

import { delay, users as seedUsers, type AdminUser } from "@/lib/admin/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { EmptyState, PageHeader, Pagination } from "@/components/admin/page-kit";
import { Skeleton } from "@/components/ui/skeleton";

function PlanBadge({ plan }: { plan: AdminUser["plan"] }) {
  if (plan === "Business") return <Badge variant="info">Business</Badge>;
  if (plan === "Pro") return <Badge variant="success">Pro</Badge>;
  return <Badge variant="neutral">Free</Badge>;
}

export default function AdminUsersPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "users"],
    queryFn: async () => delay(seedUsers, 700),
  });

  const [query, setQuery] = React.useState("");
  const [page, setPage] = React.useState(1);
  const pageSize = 7;

  const filtered = (data ?? []).filter((u) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.id.toLowerCase().includes(q);
  });

  React.useEffect(() => setPage(1), [query]);

  const start = (page - 1) * pageSize;
  const pageRows = filtered.slice(start, start + pageSize);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Users"
        description="Manage plans and view account activity."
        actions={
          <Button
            onClick={() => toast.success("Invite sent", { description: "UI-only demo action." })}
          >
            <UserPlus className="h-4 w-4" />
            Invite user
          </Button>
        }
      />

      <Card>
        <CardHeader className="p-6 pb-0">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="min-w-0">
              <CardTitle>User list</CardTitle>
              <div className="mt-1 text-sm text-[#6B7280]">
                Plans are shown as badges for quick scanning.
              </div>
            </div>
            <div className="relative w-full md:w-[320px]">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
              <Input
                placeholder="Search name, email, ID..."
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
                title="No users match your search"
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
                    <TableHead>User</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="w-[160px]">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pageRows.map((u) => (
                    <TableRow key={u.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#EEF2FF] text-sm font-semibold text-[#4F46E5]">
                            {u.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                          </div>
                          <div className="min-w-0">
                            <div className="truncate text-sm font-medium text-[#111827]">{u.name}</div>
                            <div className="truncate text-xs text-[#9CA3AF]">{u.email}</div>
                            <div className="mt-1 text-xs text-[#9CA3AF]">{u.id}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <PlanBadge plan={u.plan} />
                      </TableCell>
                      <TableCell className="text-sm text-[#374151]">{u.createdAt}</TableCell>
                      <TableCell>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() =>
                            toast.message("User actions", {
                              description: `Open user detail for ${u.name} (UI-only).`,
                            })
                          }
                        >
                          View details
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

