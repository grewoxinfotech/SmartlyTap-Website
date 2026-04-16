"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/apiClient";
import { ShoppingCart, Smartphone, Trash2, ArrowRight, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const router = useRouter();

  useEffect(() => {
    // In a real app, this might come from a context/store or backend cart API
    // For this demonstration, we'll assume there is a local cart or we fetch one
    // We'll mock a product in the cart to show the checkout flow
    const mockCart = [
      { id: "mock-prod-1", name: "Premium NFC Smart Card", price: 999, qty: 1, image_url: "" }
    ];
    setCartItems(mockCart);
    calculateTotal(mockCart);
  }, []);

  const calculateTotal = (items: any[]) => {
    const sum = items.reduce((acc, item) => acc + item.price * item.qty, 0);
    setTotal(sum);
  };

  const handleRemove = (id: string) => {
    const updated = cartItems.filter(item => item.id !== id);
    setCartItems(updated);
    calculateTotal(updated);
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

      // 3. Open Razorpay Checkout (Simulated here since we don't have the real script loaded)
      alert(`Razorpay checkout opened for Order ${orderId} - Amount: ₹${amount}`);
      
      // Simulate successful payment capture
      setTimeout(() => {
        router.push("/dashboard/orders");
      }, 1500);

    } catch (error: any) {
      console.error("Checkout failed", error.response?.data || error.message);
      alert(error.response?.data?.message || "Checkout failed. Note: mock products might not exist in your DB.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <Smartphone className="w-6 h-6 text-blue-600" />
              <span className="text-xl font-bold text-gray-900 tracking-tight">SmartlyTap</span>
            </Link>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 flex-1">
        <div className="max-w-4xl mx-auto">
          <Link href="/shop" className="inline-flex items-center text-gray-500 hover:text-blue-600 mb-8 font-medium transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Continue Shopping
          </Link>
          
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-8">Shopping Cart</h1>

          {cartItems.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm">
              <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
              <p className="text-gray-500 mb-6">Looks like you haven't added anything yet.</p>
              <Link href="/shop" className="bg-blue-600 text-white px-6 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors">
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-2/3 space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Smartphone className="w-8 h-8 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">{item.name}</h3>
                      <p className="text-gray-500 text-sm">Qty: {item.qty}</p>
                      <div className="font-bold text-blue-600 mt-1">₹{item.price}</div>
                    </div>
                    <button 
                      onClick={() => handleRemove(item.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="md:w-1/3">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm sticky top-32">
                  <h3 className="font-bold text-gray-900 mb-4 text-lg">Order Summary</h3>
                  <div className="space-y-3 mb-6 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-medium text-gray-900">₹{total}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="font-medium text-green-600">Free</span>
                    </div>
                    <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
                      <span className="font-bold text-gray-900">Total</span>
                      <span className="font-bold text-xl text-blue-600">₹{total}</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={handleCheckout}
                    disabled={loading}
                    className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-blue-600 transition-all flex items-center justify-center gap-2 shadow-lg disabled:bg-gray-400"
                  >
                    {loading ? "Processing..." : "Proceed to Checkout"} <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-xs text-center text-gray-400 mt-4">
                    Secure payments via Razorpay
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