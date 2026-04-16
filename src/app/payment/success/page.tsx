"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, FileText, ShoppingBag } from "lucide-react";

export default function PaymentSuccessPage() {
  const sp = useSearchParams();
  const orderId = sp.get("orderId");
  const razorpayOrderId = sp.get("razorpay_order_id");

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center p-6">
      <div className="w-full max-w-lg rounded-3xl border border-gray-100 bg-white p-10 shadow-xl">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#ECFDF5] text-[#22C55E] ring-1 ring-[#BBF7D0]">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h1 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
          Payment initiated
        </h1>
        <p className="mt-2 text-center text-sm text-gray-600">
          Your order is created. When Razorpay capture/verify is connected, this page will confirm payment and show invoice.
        </p>

        <div className="mt-6 space-y-3 rounded-2xl border border-gray-100 bg-[#F9FAFB] p-4 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Order ID</span>
            <span className="font-semibold text-gray-900">{orderId || "—"}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Razorpay Order</span>
            <span className="font-semibold text-gray-900">{razorpayOrderId || "—"}</span>
          </div>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <Link
            href="/dashboard/orders"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#4F46E5] px-5 py-3 text-sm font-bold text-white hover:bg-[#4338CA]"
          >
            <ShoppingBag className="h-4 w-4" />
            View orders
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-bold text-gray-900 hover:bg-gray-50"
          >
            <FileText className="h-4 w-4" />
            Download invoice
          </Link>
        </div>
      </div>
    </div>
  );
}

