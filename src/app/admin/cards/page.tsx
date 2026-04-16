"use client";

import * as React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Search, Upload, UserPlus } from "lucide-react";
import { toast } from "sonner";

import { apiClient } from "@/lib/apiClient";
import { PageHeader, Pagination } from "@/components/admin/page-kit";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/admin/page-kit";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type BackendCard = {
  id: string;
  card_uid: string;
  user_id: string | null;
  is_active: boolean;
  tap_count: number;
  created_at?: string;
};

export default function AdminCardsPage() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "cards"],
    queryFn: async () => {
      const res = await apiClient.get("/admin/cards");
      return res.data.data as BackendCard[];
    },
  });

  const [query, setQuery] = React.useState("");
  const [page, setPage] = React.useState(1);
  const pageSize = 7;

  const filtered = (data ?? []).filter((c) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      c.card_uid.toLowerCase().includes(q) ||
      (c.user_id || "").toLowerCase().includes(q) ||
      c.id.toLowerCase().includes(q)
    );
  });

  React.useEffect(() => setPage(1), [query]);

  const start = (page - 1) * pageSize;
  const pageRows = filtered.slice(start, start + pageSize);

  const [assignOpen, setAssignOpen] = React.useState(false);
  const [bulkOpen, setBulkOpen] = React.useState(false);
  const [assignCardUid, setAssignCardUid] = React.useState("");
  const [assignUserId, setAssignUserId] = React.useState("");
  const [bulkFile, setBulkFile] = React.useState<File | null>(null);

  const assignMutation = useMutation({
    mutationFn: async () => {
      await apiClient.post("/cards/assign", { cardUid: assignCardUid, userId: assignUserId });
    },
    onSuccess: async () => {
      toast.success("Card assigned");
      setAssignOpen(false);
      setAssignCardUid("");
      setAssignUserId("");
      await qc.invalidateQueries({ queryKey: ["admin", "cards"] });
    },
    onError: (e: any) => toast.error(e?.response?.data?.message || "Assign failed"),
  });

  const bulkMutation = useMutation({
    mutationFn: async () => {
      if (!bulkFile) throw new Error("CSV required");
      const fd = new FormData();
      fd.append("file", bulkFile);
      await apiClient.post("/cards/bulk-upload", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    onSuccess: async () => {
      toast.success("CSV imported");
      setBulkOpen(false);
      setBulkFile(null);
      await qc.invalidateQueries({ queryKey: ["admin", "cards"] });
    },
    onError: (e: any) => toast.error(e?.response?.data?.message || "Import failed"),
  });

  const statusMutation = useMutation({
    mutationFn: async ({ cardUid, isActive }: { cardUid: string; isActive: boolean }) => {
      await apiClient.patch(`/cards/${encodeURIComponent(cardUid)}/status`, { isActive });
    },
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["admin", "cards"] });
    },
    onError: (e: any) => toast.error(e?.response?.data?.message || "Update failed"),
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Cards"
        description="Monitor active status and tap performance."
        actions={
          <>
            <Button variant="secondary" onClick={() => setBulkOpen(true)}>
              <Upload className="h-4 w-4" />
              Bulk upload
            </Button>
            <Button onClick={() => setAssignOpen(true)}>
              <UserPlus className="h-4 w-4" />
              Assign card
            </Button>
          </>
        }
      />

      <Card>
        <CardHeader className="p-6 pb-0">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Card registry</CardTitle>
              <div className="mt-1 text-sm text-[#6B7280]">
                Toggle status, assign cards, or import CSV.
              </div>
            </div>
            <div className="relative w-full md:w-[320px]">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
              <Input
                placeholder="Search card UID / user id..."
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
                title="No cards found"
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
                    <TableHead>Card UID</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Tap count</TableHead>
                    <TableHead className="w-[140px]">Active</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pageRows.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell className="font-medium">{c.card_uid}</TableCell>
                      <TableCell className="text-sm text-[#374151]">{c.user_id || "—"}</TableCell>
                      <TableCell className="text-sm text-[#374151]">
                        {Number(c.tap_count || 0).toLocaleString("en-IN")}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={Boolean(c.is_active)}
                            onCheckedChange={(checked) => {
                              toast.success("Card status updated", {
                                description: `${c.card_uid} is now ${checked ? "Active" : "Inactive"}.`,
                              });
                              statusMutation.mutate({ cardUid: c.card_uid, isActive: checked });
                            }}
                          />
                          <span className="text-xs text-[#6B7280]">
                            {c.is_active ? "Active" : "Inactive"}
                          </span>
                        </div>
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

      <Dialog open={assignOpen} onOpenChange={setAssignOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign card</DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-3">
            <div>
              <div className="text-sm font-medium text-[#111827]">Card UID</div>
              <Input value={assignCardUid} onChange={(e) => setAssignCardUid(e.target.value)} placeholder="NFC-XXXXXXX" />
            </div>
            <div>
              <div className="text-sm font-medium text-[#111827]">User ID</div>
              <Input value={assignUserId} onChange={(e) => setAssignUserId(e.target.value)} placeholder="USR-..." />
            </div>
            <div className="text-xs text-[#6B7280]">
              Uses backend: <span className="font-medium">POST /api/v1/cards/assign</span>
            </div>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setAssignOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => assignMutation.mutate()} disabled={assignMutation.isPending}>
              {assignMutation.isPending ? "Assigning..." : "Assign"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={bulkOpen} onOpenChange={setBulkOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bulk upload cards (CSV)</DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-3">
            <input
              type="file"
              accept=".csv"
              onChange={(e) => setBulkFile(e.target.files?.[0] || null)}
            />
            <div className="text-xs text-[#6B7280]">
              CSV headers supported: <span className="font-medium">cardUid</span> (or <span className="font-medium">card_uid</span> / <span className="font-medium">UID</span>), optional <span className="font-medium">userId</span>, optional <span className="font-medium">isActive</span>.
            </div>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setBulkOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => bulkMutation.mutate()} disabled={bulkMutation.isPending || !bulkFile}>
              {bulkMutation.isPending ? "Uploading..." : "Upload"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

