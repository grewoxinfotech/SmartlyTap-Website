"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/apiClient";
import { ArrowLeft, ArrowRight, MapPin, Smartphone } from "lucide-react";

type CartItem = { id: string; name: string; price: number; qty: number };

export default function CheckoutPage() {
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    line1: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    // Use same mock cart as /cart for now; can be replaced by /cart/:userId later.
    setItems([{ id: "mock-prod-1", name: "Premium NFC Smart Card", price: 999, qty: 1 }]);
  }, []);

  const total = useMemo(
    () => items.reduce((acc, i) => acc + i.price * i.qty, 0),
    [items]
  );

  const pay = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("user_token");
      const userStr = localStorage.getItem("user_data");
      if (!token || !userStr) {
        localStorage.setItem("redirect_after_login", "/checkout");
        router.push("/login");
        return;
      }
      const user = JSON.parse(userStr);

      const orderPayload = {
        userId: user.id,
        items: items.map((i) => ({ productId: i.id, qty: i.qty })),
      };
      const orderRes = await apiClient.post("/orders/create", orderPayload);
      const orderId = orderRes.data.data.id;

      const payRes = await apiClient.post("/payments/create-order", { orderId });
      const { razorpay_order_id } = payRes.data.data;

      // This project currently uses a mock Razorpay order id in backend.
      // We redirect to a success page (verification can be wired when real Razorpay is integrated).
      router.push(`/payment/success?orderId=${encodeURIComponent(orderId)}&razorpay_order_id=${encodeURIComponent(razorpay_order_id)}`);
    } catch (e: any) {
      setError(e?.response?.data?.message || "Checkout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <Smartphone className="w-6 h-6 text-[#4F46E5]" />
              <span className="text-xl font-bold text-gray-900 tracking-tight">SmartlyTap</span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-5xl px-4 pt-28 pb-16 sm:px-6 lg:px-8">
        <Link href="/cart" className="inline-flex items-center text-gray-500 hover:text-[#4F46E5] mb-6 font-medium transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to cart
        </Link>

        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Checkout</h1>
        <p className="text-gray-500 mt-1">Confirm shipping details and pay securely.</p>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#EEF2FF] text-[#4F46E5] ring-1 ring-[#C7D2FE]">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900">Shipping address</div>
                <div className="text-sm text-gray-500">UI-ready form (wire to user profile later).</div>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                ["name", "Full name"],
                ["phone", "Phone"],
                ["line1", "Address line"],
                ["city", "City"],
                ["state", "State"],
                ["pincode", "Pincode"],
              ].map(([key, label]) => (
                <div key={key} className={key === "line1" ? "sm:col-span-2" : ""}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <input
                    value={(address as any)[key]}
                    onChange={(e) => setAddress((p) => ({ ...p, [key]: e.target.value }))}
                    className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/15"
                  />
                </div>
              ))}
            </div>

            {error ? (
              <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            ) : null}
          </div>

          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm h-fit">
            <div className="text-lg font-bold text-gray-900">Order summary</div>
            <div className="mt-4 space-y-3">
              {items.map((i) => (
                <div key={i.id} className="flex items-center justify-between text-sm">
                  <div className="text-gray-700">{i.name} × {i.qty}</div>
                  <div className="font-semibold text-gray-900">₹{(i.price * i.qty).toLocaleString("en-IN")}</div>
                </div>
              ))}
              <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
                <div className="font-bold text-gray-900">Total</div>
                <div className="text-xl font-extrabold text-[#4F46E5]">₹{total.toLocaleString("en-IN")}</div>
              </div>
            </div>

            <button
              onClick={pay}
              disabled={loading}
              className="mt-6 w-full py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-[#4F46E5] via-[#3B82F6] to-[#22C55E] hover:opacity-95 transition-all shadow-lg disabled:bg-gray-400 flex items-center justify-center gap-2"
            >
              {loading ? "Processing..." : "Pay with Razorpay"} <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-xs text-center text-gray-400 mt-3">Secure payments via Razorpay</p>
          </div>
        </div>
      </div>
    </div>
  );
}

