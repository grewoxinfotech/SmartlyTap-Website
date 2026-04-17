"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, FileText, ShoppingBag } from "lucide-react";

export default function PaymentSuccessPage() {
  const sp = useSearchParams();
  const orderId = sp.get("orderId");
  const razorpayOrderId = sp.get("razorpay_order_id");

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none"></div>
      
      <div className="card-std w-full max-w-lg bg-white border-white/40 shadow-2xl p-12 text-center relative z-10">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-green-50 text-green-500 shadow-inner border border-green-100 mb-8 animate-in zoom-in duration-500">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        
        <h1 className="h1-std mb-2 items-center justify-center">
          Transaction Initialized
        </h1>
        <p className="p-std text-[12px] font-black uppercase tracking-widest opacity-60 mb-10 max-w-sm mx-auto leading-relaxed">
          Your order protocol has been established. Synchronization with the secure payment gateway is active.
        </p>

        <div className="space-y-4 rounded-3xl border border-gray-50 bg-gray-50/50 p-6 text-left shadow-inner mb-10">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <span className="text-[12px] font-black text-gray-400 uppercase tracking-widest">Internal Order ID</span>
            <span className="text-[11px] font-black text-primary-dark uppercase tracking-tight">{orderId || "SYNC_PENDING"}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-black text-gray-400 uppercase tracking-widest">Network Transaction</span>
            <span className="text-[11px] font-black text-accent uppercase tracking-tight">{razorpayOrderId || "LINKING..."}</span>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/dashboard/orders"
            className="btn-primary-std !py-4 !text-[12px] !shadow-lg active:scale-95 flex items-center justify-center gap-2"
          >
            <ShoppingBag className="h-4 w-4" />
            VIEW COMMAND CENTER
          </Link>
          <Link
            href="/"
            className="btn-secondary-std !py-4 !text-[12px] !shadow-lg active:scale-95 flex items-center justify-center gap-2"
          >
            <FileText className="h-4 w-4" />
            DOWNLOAD ARCHIVE
          </Link>
        </div>
      </div>
    </div>
  );
}

