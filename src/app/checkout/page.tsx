"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/apiClient";
import { 
  ArrowLeft, 
  MapPin, 
  Smartphone, 
  Tag as TagIcon, 
  CreditCard, 
  ChevronDown, 
  ShieldCheck,
  CheckCircle2
} from "lucide-react";

type CartItem = { id: string; name: string; price: number; qty: number };

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  const initialQty = parseInt(searchParams.get("qty") || "1");

  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchingProduct, setFetchingProduct] = useState(!!productId);
  const [showCoupon, setShowCoupon] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    country: "India",
    address: "",
    apartment: "",
    city: "",
    state: "Gujarat",
    pincode: "",
    phone: "",
    email: "",
    notes: "",
  });

  useEffect(() => {
    async function getProduct() {
      if (!productId) {
        // Mock default if no productId (e.g. from general cart)
        setItems([{ id: "PRD-1776335927234-6KIKES", name: "3 QR pinky style NFC stand Premium", price: 1499, qty: 1 }]);
        return;
      }
      
      try {
        setFetchingProduct(true);
        const response = await apiClient.get("/products");
        const found = response.data.data.find((p: any) => p.id === productId);
        if (found) {
          setItems([{ id: found.id, name: found.name, price: found.price, qty: initialQty }]);
        }
      } catch (err) {
        console.error("Failed to fetch product for checkout");
      } finally {
        setFetchingProduct(false);
      }
    }
    getProduct();
  }, [productId, initialQty]);

  const subtotal = useMemo(
    () => items.reduce((acc, i) => acc + Number(i.price) * i.qty, 0),
    [items]
  );
  
  const total = subtotal; // Handle tax/shipping if needed later

  const handlePlaceOrder = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("user_token");
      if (!token) {
        localStorage.setItem("redirect_after_login", "/checkout");
        router.replace("/login");
        return;
      }

      // 1. Create Order
      const orderPayload = {
        userId: JSON.parse(localStorage.getItem("user_data") || "{}").id,
        items: items.map((i) => ({ productId: i.id, qty: i.qty })),
        shippingAddress: formData,
      };
      const orderRes = await apiClient.post("/orders/create", orderPayload);
      const orderId = orderRes.data.data.id;

      // 2. Initiate Payment
      const payRes = await apiClient.post("/payments/create-order", { orderId });
      const { razorpay_order_id, amount, currency } = payRes.data.data;

      // 3. Open Razorpay Modal (Simplified for UI task)
      alert("Order placed! Proceeding to Payment gateway...");
      router.push(`/payment/success?orderId=${orderId}`);
    } catch (e: any) {
      setError(e?.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header / Breadcrumbs */}
      <nav className="bg-white border-b border-gray-100 py-10 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="h1-std mb-1">Secure Terminal</h1>
          <div className="flex justify-center items-center gap-3 text-[12px] font-black text-gray-400 uppercase tracking-widest">
            <Link href="/" className="hover:text-primary transition-colors">Digital Home</Link>
            <ChevronDown className="w-3 h-3 -rotate-90 opacity-20" />
            <Link href="/cart" className="hover:text-primary transition-colors">Session Cart</Link>
            <ChevronDown className="w-3 h-3 -rotate-90 opacity-20" />
            <span className="text-primary-dark">Final Acquisition</span>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Left Column: Billing & Coupons */}
          <div className="space-y-10">
            {/* Coupon Section */}
            <div className="card-std bg-primary/5 border-primary/10 shadow-inner p-8">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm border border-primary/10 shrink-0">
                  <TagIcon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-primary-dark font-black text-xs uppercase tracking-widest mb-1.5 leading-none">Promotional Voucher</p>
                  <p className="p-std text-[12px] font-bold uppercase tracking-tighter opacity-50 mb-3">Do you hold an authorized discount credential?</p>
                  <button 
                    onClick={() => setShowCoupon(!showCoupon)}
                    className="text-primary font-black text-[12px] hover:text-primary-dark transition-all underline underline-offset-4 decoration-2 uppercase tracking-widest"
                  >
                    {showCoupon ? "CLOSE TERMINAL" : "INPUT COUPON CODE"}
                  </button>
                  
                  {showCoupon && (
                    <div className="mt-6 flex gap-3 animate-in fade-in slide-in-from-top-4">
                      <input 
                        type="text"
                        placeholder="VOUCHER_CODE"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="input-std flex-1 !text-[12px] !font-black !uppercase !tracking-widest"
                      />
                      <button className="btn-primary-std !py-3 !px-6 !text-[12px]">
                        VALIDATE
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Billing Details Form */}
            <section className="space-y-8">
              <h2 className="font-black text-xs uppercase tracking-widest text-primary-dark flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-primary text-white text-xs flex items-center justify-center font-black shadow-lg">01</span>
                Billing Configuration
              </h2>
              
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="label-std">Legal First Name *</label>
                  <input 
                    type="text" required
                    className="input-std"
                    placeholder="e.g. Lewis"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="label-std">Legal Last Name *</label>
                  <input 
                    type="text" required
                    className="input-std"
                    placeholder="e.g. Hamilton"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  />
                </div>
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="label-std">Corporate Identity (Optional)</label>
                  <input 
                    type="text"
                    className="input-std"
                    placeholder="e.g. Mercedes-AMG F1"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                  />
                </div>
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="label-std">Geographic Region *</label>
                  <div className="relative">
                    <select 
                      className="input-std appearance-none !text-[12px] !font-black !uppercase !tracking-widest"
                      value={formData.country}
                      onChange={(e) => setFormData({...formData, country: e.target.value})}
                    >
                      <option>India</option>
                      <option>USA</option>
                      <option>UK</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="label-std">Dispatch Address *</label>
                  <input 
                    type="text" required
                    placeholder="Physical address line 1"
                    className="input-std mb-3"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                  <input 
                    type="text"
                    placeholder="Physical address line 2 (Optional)"
                    className="input-std"
                    value={formData.apartment}
                    onChange={(e) => setFormData({...formData, apartment: e.target.value})}
                  />
                </div>
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="label-std">Metropolitan City *</label>
                  <input 
                    type="text" required
                    className="input-std"
                    placeholder="City Name"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="label-std">Federal State *</label>
                  <div className="relative">
                    <select 
                      className="input-std appearance-none !text-[12px] !font-black !uppercase !tracking-widest"
                      value={formData.state}
                      onChange={(e) => setFormData({...formData, state: e.target.value})}
                    >
                      <option>Gujarat</option>
                      <option>Maharashtra</option>
                      <option>Delhi</option>
                      <option>Karnataka</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="label-std">Zip / PIN Code *</label>
                  <input 
                    type="text" required
                    className="input-std"
                    placeholder="000 000"
                    value={formData.pincode}
                    onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="label-std">Terminal Number *</label>
                  <input 
                    type="tel" required
                    className="input-std"
                    placeholder="+91 00000 00000"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="label-std">Sync Email *</label>
                  <input 
                    type="email" required
                    className="input-std"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                <div className="sm:col-span-2 pt-4">
                  <p className="text-xs text-gray-400 font-medium leading-relaxed">
                    Your email address will help us support your shopping experience throughout the site. Please check our{" "}
                    <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link> to see how we use your personal data. 
                    <label className="inline-flex items-center ml-2 cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                      <span className="ms-2 text-[12px] font-bold text-gray-400 uppercase tracking-tighter">No thanks</span>
                    </label>
                  </p>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <h3 className="h3-std !text-base">Additional information</h3>
                <div className="space-y-1.5">
                  <label className="label-std">Order notes (optional)</label>
                  <textarea 
                    placeholder="Notes about your order, e.g. special notes for delivery."
                    rows={3}
                    className="input-std !h-auto resize-none"
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  ></textarea>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Order Summary & Payment */}
          <div>
            <div className="card-std sticky top-28 bg-white border-white/50 shadow-2xl p-10">
              <h2 className="font-black text-xs uppercase tracking-widest text-primary-dark mb-10 flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-primary text-white text-xs flex items-center justify-center font-black shadow-lg">02</span>
                Order Acquisition
              </h2>
              
              <div className="space-y-5 mb-10">
                  <div className="flex justify-between text-[12px] font-black text-gray-400 uppercase tracking-widest pb-3 border-b border-gray-100">
                  <span>Product</span>
                  <span>Subtotal</span>
                </div>
                
                <div className="space-y-4">
                  {fetchingProduct ? (
                    <div className="py-2 animate-pulse flex flex-col gap-3">
                      <div className="h-4 bg-gray-50 rounded w-full"></div>
                    </div>
                  ) : items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center gap-4">
                      <div className="min-w-0">
                        <p className="text-primary-dark font-bold text-sm truncate">{item.name}</p>
                        <p className="text-[12px] font-black text-primary uppercase tracking-widest">Qty: {item.qty}</p>
                      </div>
                      <span className="text-primary-dark font-black text-sm whitespace-nowrap">₹{(item.price * item.qty).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 space-y-3 border-t border-gray-100">
                  <div className="flex justify-between items-center p-std text-xs">
                    <span>Subtotal</span>
                    <span className="text-primary-dark font-bold">₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="font-black text-primary-dark text-lg">Total</span>
                    <span className="text-2xl font-black text-primary">₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Payment Section */}
              <div className="bg-primary/5 rounded-2xl p-6 mb-8 border border-primary/10 shadow-inner">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-11 h-11 bg-white rounded-2xl shadow-sm flex items-center justify-center border border-primary/10">
                    <CreditCard className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-black text-primary-dark flex items-center gap-2 text-xs uppercase tracking-tight">
                      Razorpay Secure Gateway
                      <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
                    </p>
                    <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mt-0.5">CARDS / UPI / SECURE BANKING</p>
                  </div>
                </div>
                <p className="p-std text-[12px] leading-relaxed font-bold uppercase tracking-tighter opacity-60">
                  Transaction encrypted via 256-bit SSL protocol. SmartlyTap does not archive sensitive hardware payment details.
                </p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-bold border border-red-100">
                  {error}
                </div>
              )}

              <button 
                onClick={handlePlaceOrder}
                disabled={loading || fetchingProduct || items.length === 0}
                className="w-full btn-primary-std !py-4 !text-[12px] !shadow-xl active:scale-95 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    AUTHORIZE & COMMIT ACQUISITION
                    <CheckCircle2 className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="mt-8 flex items-center justify-center gap-2 text-[12px] font-bold text-gray-400 uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                Guaranteed Safe & Secure Checkout
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>}>
      <CheckoutContent />
    </Suspense>
  );
}
