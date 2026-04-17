"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/apiClient";
import { ShoppingCart, Smartphone, Trash2, ArrowRight, ArrowLeft, Wifi, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchCart = async () => {
      const userStr = localStorage.getItem("user_data");
      if (!userStr) return;
      const user = JSON.parse(userStr);

      try {
        const res = await apiClient.get(`/cart/${user.id}`);
        const items = res.data.data.items.map((i: any) => ({
          id: i.product_id,
          name: i.Product?.name || "Product",
          price: i.Product?.price || 0,
          qty: i.qty,
          image_url: i.Product?.image_url || "",
        }));
        setCartItems(items);
        calculateTotal(items);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCart();
  }, []);

  const calculateTotal = (items: any[]) => {
    const sum = items.reduce((acc, item) => acc + item.price * item.qty, 0);
    setTotal(sum);
  };

  const handleRemove = async (id: string) => {
    try {
      const userStr = localStorage.getItem("user_data");
      if (!userStr) return;
      const user = JSON.parse(userStr);
      await apiClient.post("/cart/remove", { userId: user.id, productId: id });
      const updated = cartItems.filter(item => item.id !== id);
      setCartItems(updated);
      calculateTotal(updated);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCheckout = () => {
    router.push("/checkout");
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <SiteHeader cartCount={cartItems.length} />

      <section className="header-std relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-primary-light rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <Link href="/shop" className="inline-flex items-center text-xs font-bold text-gray-400 hover:text-primary mb-6 transition-colors uppercase tracking-widest">
            <ArrowLeft className="w-3.5 h-3.5 mr-2" /> Continue Shopping
          </Link>
          
          <h1 className="h1-std mb-1 mt-4 leading-tight">Your Selection</h1>
          <p className="p-std text-[12px] font-black uppercase tracking-widest opacity-60 mb-8">Review items before finalizing the acquisition.</p>
 
          {cartItems.length === 0 ? (
            <div className="card-std p-16 text-center mt-8 bg-white/50 border-dashed border-2">
              <div className="w-20 h-20 bg-gray-50 text-gray-300 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner">
                <ShoppingCart className="w-10 h-10" />
              </div>
              <h2 className="font-black text-xs uppercase tracking-widest text-primary-dark mb-2">Cart Vacant</h2>
              <p className="p-std text-[12px] font-bold uppercase tracking-tighter opacity-60 mb-8 max-w-xs mx-auto">No hardware components have been assigned to your session.</p>
              <Link href="/shop" className="btn-primary-std mx-auto !py-3 !px-8 !text-[12px]">
                BROWSE INVENTORY
              </Link>
            </div>
          ) : (
            <div className="flex flex-col lg:grid lg:grid-cols-[1fr_380px] gap-10 mt-8">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="card-hover-std p-5 flex items-center gap-6 bg-white border-white/40 shadow-xl">
                    <div className="w-24 h-24 bg-gray-50 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-inner overflow-hidden border border-gray-100">
                      {item.image_url ? (
                        <img src={item.image_url} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" />
                      ) : (
                        <Wifi className="w-8 h-8 text-primary-dark/10" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] text-accent font-black uppercase tracking-[0.2em] mb-1">Hardware ID: {item.id.slice(0, 8)}</div>
                      <h3 className="font-black text-xs text-primary-dark uppercase tracking-wide truncate mb-1.5">{item.name}</h3>
                      <div className="flex items-center gap-3">
                        <span className="text-[12px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-2 py-0.5 rounded-lg border border-gray-100">PRO SERIES x {item.qty}</span>
                        <div className="h-4 w-px bg-gray-100"></div>
                        <span className="text-[12px] font-black text-primary uppercase tracking-widest">READY TO DISPATCH</span>
                      </div>
                      <div className="text-xl font-black text-primary-dark mt-3 tracking-tighter">₹{item.price.toLocaleString()}</div>
                    </div>
                    <button 
                      onClick={() => handleRemove(item.id)}
                      className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all shadow-sm border border-transparent hover:border-red-100"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="relative">
                <div className="card-std sticky top-28 bg-white border-white/50 shadow-2xl p-8">
                  <h3 className="font-black text-xs uppercase tracking-widest text-primary-dark mb-8 flex items-center gap-2">
                    <div className="w-1 h-3 bg-accent rounded-full"></div>
                    Order Summary
                  </h3>
                  <div className="space-y-5 mb-10">
                    <div className="flex justify-between items-center group">
                      <span className="text-[12px] font-black text-gray-400 uppercase tracking-widest">Subtotal Assets</span>
                      <span className="text-sm font-black text-primary-dark tracking-tighter">₹{total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[12px] font-black text-gray-400 uppercase tracking-widest">Global Logistics</span>
                      <span className="text-[12px] font-black text-accent uppercase tracking-[0.2em] bg-accent/5 px-2.5 py-1 rounded-full border border-accent/10 shadow-inner">COMPLIMENTARY</span>
                    </div>
                    <div className="pt-6 border-t border-gray-100 mt-6 flex justify-between items-center">
                      <span className="font-black text-xs uppercase tracking-widest text-primary-dark">TOTAL ACQUISITION</span>
                      <span className="text-3xl font-black text-primary tracking-tighter">₹{total.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={handleCheckout}
                    disabled={loading}
                    className="w-full btn-primary-std !py-4 !text-[12px] !shadow-xl active:scale-95 flex items-center justify-center gap-2"
                  >
                    {loading ? "PROCESSING..." : "COMMIT TO CHECKOUT"} <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-[11px] font-black text-center text-gray-300 mt-8 flex items-center justify-center gap-2 uppercase tracking-[0.3em]">
                    <Lock className="w-3.5 h-3.5 opacity-40" /> SECURE TUNNEL ACTIVE
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}