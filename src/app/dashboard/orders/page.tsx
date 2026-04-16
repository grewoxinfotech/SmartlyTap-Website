"use client";

import { useEffect, useMemo, useState } from "react";
import { apiClient } from "@/lib/apiClient";
import { Clock, PackageCheck, ReceiptIndianRupee, XCircle } from "lucide-react";

function StatusPill({ status }: { status: string }) {
  const cls =
    status === "PAID"
      ? "bg-green-50 text-green-700 border-green-200"
      : status === "PENDING"
        ? "bg-yellow-50 text-yellow-700 border-yellow-200"
        : status === "FAILED"
          ? "bg-red-50 text-red-700 border-red-200"
          : "bg-blue-50 text-blue-700 border-blue-200";
  return (
    <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${cls}`}>
      {status}
    </span>
  );
}

export default function DashboardOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user_data");
    if (!storedUser) return;
    const user = JSON.parse(storedUser);

    apiClient
      .get(`/orders/${user.id}`)
      .then((res) => setOrders(res.data.data || []))
      .finally(() => setLoading(false));
  }, []);

  const totals = useMemo(() => {
    const paid = orders.filter((o) => o.status === "PAID").length;
    const pending = orders.filter((o) => o.status === "PENDING").length;
    const failed = orders.filter((o) => o.status === "FAILED").length;
    const amount = orders.reduce((acc, o) => acc + (Number(o.total_amount) || 0), 0);
    return { paid, pending, failed, amount };
  }, [orders]);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 animate-pulse">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Orders
        </h1>
        <p className="text-gray-500 mt-1">Your recent purchases and statuses.</p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center">
              <ReceiptIndianRupee className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Total amount</div>
              <div className="text-2xl font-extrabold text-gray-900">
                ₹{totals.amount.toLocaleString("en-IN")}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center">
              <PackageCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Paid</div>
              <div className="text-2xl font-extrabold text-gray-900">{totals.paid}</div>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-yellow-100 text-yellow-800 rounded-full flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Pending</div>
              <div className="text-2xl font-extrabold text-gray-900">{totals.pending}</div>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-100 text-red-700 rounded-full flex items-center justify-center">
              <XCircle className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Failed</div>
              <div className="text-2xl font-extrabold text-gray-900">{totals.failed}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Order history</h2>
          <p className="text-sm text-gray-500 mt-1">
            This list is loaded from the backend.
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="p-10 text-center text-gray-500">No orders yet.</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {orders.map((o) => (
              <div key={o.id} className="p-6 flex items-center justify-between gap-6">
                <div className="min-w-0">
                  <div className="flex items-center gap-3">
                    <div className="font-bold text-gray-900">{o.id}</div>
                    <StatusPill status={o.status || "PROCESSING"} />
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    Created: {String(o.created_at || o.createdAt || "")}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Total</div>
                  <div className="text-xl font-extrabold text-gray-900">
                    ₹{Number(o.total_amount || 0).toLocaleString("en-IN")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

