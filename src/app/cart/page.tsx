"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/apiClient";
import { ShoppingCart, Smartphone, Trash2, ArrowRight, ArrowLeft, Wifi, Search, Lock } from "lucide-react";
import { useRouter } from "next/navigation";

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

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("user_token");
      const userStr = localStorage.getItem("user_data");
      
      if (!token || !userStr) {
        // Redirect to login but keep intent
        localStorage.setItem("redirect_after_login", "/cart");
        router.push("/login");
        return;
      }

      const user = JSON.parse(userStr);

      // 1. Create Order in Backend
      const orderPayload = {
        userId: user.id,
        items: cartItems.map(item => ({ productId: item.id, qty: item.qty }))
      };
      
      // We assume order creation works. In reality, mock-prod-1 might not exist in the DB, 
      // so we handle the UI flow mostly.
      const orderRes = await apiClient.post("/orders/create", orderPayload);
      
      const orderId = orderRes.data.data.id;

      // 2. Initialize Razorpay Payment
      const payRes = await apiClient.post("/payments/create-order", { orderId });

      const { razorpay_order_id, amount, currency } = payRes.data.data;

      // 3. Redirect to checkout/success flow
      router.push(`/payment/success?orderId=${encodeURIComponent(orderId)}&razorpay_order_id=${encodeURIComponent(razorpay_order_id)}`);

    } catch (error: any) {
      console.error("Checkout failed", error.response?.data || error.message);
      alert(error.response?.data?.message || "Checkout failed. Note: mock products might not exist in your DB.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Left: Brand */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-dark rounded-xl flex items-center justify-center shadow-md">
                <Wifi className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold text-primary-dark tracking-tight leading-none">SmartlyTap</span>
                <span className="text-[10px] font-semibold text-primary uppercase tracking-widest mt-0.5">World's No1 NFC Digital Business Card</span>
              </div>
            </div>

            {/* Middle: Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-600 font-semibold hover:text-accent transition-colors">Home</Link>
              <Link href="/shop" className="text-gray-600 font-semibold hover:text-accent transition-colors">Shop</Link>
              <Link href="/dashboard" className="text-gray-600 font-semibold hover:text-accent transition-colors">My Account</Link>
              <Link href="/contact" className="text-gray-600 font-semibold hover:text-accent transition-colors">Contact Us</Link>
            </div>

            {/* Right: Icons */}
            <div className="flex items-center space-x-5">
              <button className="text-gray-500 hover:text-primary-dark transition-colors">
                <Search className="w-5 h-5" />
              </button>
              <Link href="/cart" className="relative text-primary-dark hover:text-accent transition-colors group">
                <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartItems.length}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="pt-36 pb-20 px-4 sm:px-6 lg:px-8 flex-1">
        <div className="max-w-4xl mx-auto relative z-10">
          <Link href="/shop" className="inline-flex items-center text-gray-500 hover:text-primary mb-8 font-medium transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Continue Shopping
          </Link>
          
          <h1 className="text-4xl font-extrabold text-primary-dark tracking-tight mb-8">Shopping Cart</h1>

          {cartItems.length === 0 ? (
            <div className="bg-white rounded-3xl p-16 text-center border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.04)] hover:border-primary/20 transition-colors">
              <div className="w-24 h-24 bg-background text-gray-300 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                <ShoppingCart className="w-12 h-12" />
              </div>
              <h2 className="text-2xl font-bold text-primary-dark mb-3">Your cart is empty</h2>
              <p className="text-gray-500 font-medium mb-8">Looks like you haven't added anything yet.</p>
              <Link href="/shop" className="bg-primary text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary-dark transition-all shadow-[0_8px_20px_rgba(1,135,144,0.3)] hover:-translate-y-1 inline-flex">
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row gap-10">
              <div className="md:w-2/3 space-y-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)] flex items-center gap-6 hover:border-primary/20 transition-all">
                    <div className="w-24 h-24 bg-background rounded-2xl flex items-center justify-center flex-shrink-0 shadow-inner overflow-hidden">
                      {item.image_url ? (
                        <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <Wifi className="w-10 h-10 text-gray-300" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-primary-dark mb-1">{item.name}</h3>
                      <p className="text-gray-500 font-medium">Quantity: {item.qty}</p>
                      <div className="text-2xl font-extrabold text-primary mt-2">₹{item.price}</div>
                    </div>
                    <button 
                      onClick={() => handleRemove(item.id)}
                      className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <Trash2 className="w-6 h-6" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="md:w-1/3">
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.04)] sticky top-36">
                  <h3 className="text-2xl font-bold text-primary-dark mb-6">Order Summary</h3>
                  <div className="space-y-4 mb-8 font-medium text-gray-600">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-primary-dark font-bold">₹{total}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="text-accent font-bold">Free</span>
                    </div>
                    <div className="border-t border-gray-100 pt-4 flex justify-between items-center mt-2">
                      <span className="font-bold text-primary-dark text-lg">Total</span>
                      <span className="text-3xl font-extrabold text-primary">₹{total}</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={handleCheckout}
                    disabled={loading}
                    className="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-primary-dark transition-all shadow-[0_8px_20px_rgba(1,135,144,0.3)] hover:shadow-[0_12px_25px_rgba(1,135,144,0.4)] hover:-translate-y-1 flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:shadow-none disabled:transform-none"
                  >
                    {loading ? "Processing..." : "Proceed to Checkout"} <ArrowRight className="w-5 h-5 ml-1" />
                  </button>
                  <p className="text-sm font-medium text-center text-gray-400 mt-6 flex items-center justify-center gap-2">
                    <Lock className="w-4 h-4" /> Secure payments
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