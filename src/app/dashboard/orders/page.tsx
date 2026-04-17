"use client";

import { useEffect, useMemo, useState } from "react";
import { apiClient } from "@/lib/apiClient";
import { Clock, PackageCheck, ReceiptIndianRupee, XCircle } from "lucide-react";

function StatusPill({ status }: { status: string }) {
  const cls =
    status === "PAID"
      ? "bg-primary/5 text-primary border-primary/20"
      : status === "PENDING"
        ? "bg-yellow-50 text-yellow-600 border-yellow-200"
        : status === "FAILED"
          ? "bg-red-50 text-red-600 border-red-200"
          : "bg-gray-50 text-gray-500 border-gray-200";
  return (
    <span className={`text-[12px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md border ${cls}`}>
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
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="h1-std mb-1">Transaction History</h1>
        <p className="p-std text-xs font-bold uppercase tracking-widest opacity-60">Manage your purchases, subscription plans, and invoice records.</p>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <div className="card-std p-5 flex items-center gap-4 transition-all hover:border-primary/20">
          <div className="w-10 h-10 bg-primary/5 text-primary rounded-xl flex items-center justify-center border border-primary/10">
            <ReceiptIndianRupee className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[12px] font-black uppercase tracking-widest text-gray-400 leading-none mb-1">Total Spent</div>
            <div className="text-lg font-black text-primary-dark leading-none">
              ₹{totals.amount.toLocaleString("en-IN")}
            </div>
          </div>
        </div>
        <div className="card-std p-5 flex items-center gap-4 transition-all hover:border-green-500/20">
          <div className="w-10 h-10 bg-green-500/5 text-green-600 rounded-xl flex items-center justify-center border border-green-500/10">
            <PackageCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[12px] font-black uppercase tracking-widest text-gray-400 leading-none mb-1">Successful</div>
            <div className="text-lg font-black text-green-600 leading-none">{totals.paid}</div>
          </div>
        </div>
        <div className="card-std p-5 flex items-center gap-4 transition-all hover:border-yellow-500/20">
          <div className="w-10 h-10 bg-yellow-500/5 text-yellow-600 rounded-xl flex items-center justify-center border border-yellow-500/10">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[12px] font-black uppercase tracking-widest text-gray-400 leading-none mb-1">In Process</div>
            <div className="text-lg font-black text-yellow-600 leading-none">{totals.pending}</div>
          </div>
        </div>
        <div className="card-std p-5 flex items-center gap-4 transition-all hover:border-red-500/20">
          <div className="w-10 h-10 bg-red-500/5 text-red-600 rounded-xl flex items-center justify-center border border-red-500/10">
            <XCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[12px] font-black uppercase tracking-widest text-gray-400 leading-none mb-1">Failed</div>
            <div className="text-lg font-black text-red-600 leading-none">{totals.failed}</div>
          </div>
        </div>
      </div>

      <div className="card-std overflow-hidden">
        <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
          <h2 className="font-black text-[12px] uppercase tracking-widest text-primary-dark">Invoices & Logs</h2>
          <div className="text-[12px] text-gray-400 font-bold uppercase tracking-widest bg-white border border-gray-200 px-3 py-1 rounded-lg">Real-time sync</div>
        </div>

        {orders.length === 0 ? (
          <div className="p-10 text-center text-gray-500">No orders yet.</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {orders.map((o) => (
              <div key={o.id} className="p-5 flex items-center justify-between gap-6 hover:bg-gray-50/50 transition-colors">
                <div className="min-w-0 flex items-center gap-4">
                  <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center border border-gray-100 scale-90">
                    <ReceiptIndianRupee className="w-4 h-4 text-gray-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <div className="font-black text-primary-dark text-xs uppercase tracking-tight">{o.id}</div>
                      <StatusPill status={o.status || "PROCESSING"} />
                    </div>
                    <div className="text-[11px] font-black uppercase text-gray-400 tracking-tighter">
                      Registered: {new Date(o.created_at || o.createdAt || Date.now()).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-0.5">Amount</div>
                  <div className="text-lg font-black text-primary-dark leading-none">
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

