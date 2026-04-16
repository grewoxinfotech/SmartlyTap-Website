"use client";

import * as React from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { apiClient } from "@/lib/apiClient";
import { PageHeader } from "@/components/admin/page-kit";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ResellerOrdersPage() {
  const [items, setItems] = React.useState<Array<{ productId: string; qty: number }>>([
    { productId: "", qty: 10 },
  ]);

  const orderMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        items: items.filter((i) => i.productId.trim() && i.qty > 0),
      };
      const res = await apiClient.post("/reseller/order", payload);
      return res.data.data;
    },
    onSuccess: (data) => {
      toast.success("Reseller order created", {
        description: `Order ${data?.order?.id} created.`,
      });
    },
    onError: (e: any) => toast.error(e?.response?.data?.message || "Order failed"),
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reseller Orders"
        description="Place bulk orders with reseller discount applied."
      />

      <Card>
        <CardHeader>
          <CardTitle>Create bulk order</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-[#6B7280]">
            Enter product IDs (from Products table) and quantities.
          </div>

          <div className="space-y-3">
            {items.map((it, idx) => (
              <div key={idx} className="grid gap-3 sm:grid-cols-5">
                <div className="sm:col-span-3">
                  <Input
                    placeholder="Product ID (e.g. PRD-...)"
                    value={it.productId}
                    onChange={(e) => {
                      const v = e.target.value;
                      setItems((prev) =>
                        prev.map((p, i) => (i === idx ? { ...p, productId: v } : p))
                      );
                    }}
                  />
                </div>
                <div className="sm:col-span-1">
                  <Input
                    type="number"
                    min={1}
                    value={it.qty}
                    onChange={(e) => {
                      const v = Number(e.target.value || 1);
                      setItems((prev) =>
                        prev.map((p, i) => (i === idx ? { ...p, qty: v } : p))
                      );
                    }}
                  />
                </div>
                <div className="sm:col-span-1 flex gap-2">
                  <Button
                    variant="secondary"
                    onClick={() =>
                      setItems((prev) => prev.filter((_, i) => i !== idx))
                    }
                    disabled={items.length === 1}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Button
              variant="secondary"
              onClick={() => setItems((prev) => [...prev, { productId: "", qty: 10 }])}
            >
              Add item
            </Button>
            <Button
              onClick={() => orderMutation.mutate()}
              disabled={orderMutation.isPending}
            >
              {orderMutation.isPending ? "Placing..." : "Place order"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

