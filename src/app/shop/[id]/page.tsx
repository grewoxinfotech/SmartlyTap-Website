"use client";

import Link from "next/link";
import { useEffect, useState, use } from "react";
import { apiClient } from "@/lib/apiClient";
import { ShoppingCart, Star, Smartphone, Check, ArrowLeft } from "lucide-react";

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await apiClient.get("/products");
        const found = response.data.data.find((p: any) => p.id === id);
        setProduct(found);
      } catch (error) {
        console.error("Failed to fetch product");
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      const userStr = localStorage.getItem("user_data");
      if (!userStr) {
        alert("Please login to add to cart");
        return;
      }
      const user = JSON.parse(userStr);
      await apiClient.post("/cart/add", { userId: user.id, productId: product.id, qty: quantity });
      alert("Added to cart successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to add to cart");
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;
  }

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center text-xl text-gray-500">Product not found.</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F9FAFB]">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <Smartphone className="w-6 h-6 text-[#4F46E5]" />
              <span className="text-xl font-bold text-gray-900 tracking-tight">SmartlyTap</span>
            </Link>
            <div className="hidden md:flex space-x-8">
              <Link href="/how-it-works" className="text-gray-600 hover:text-[#4F46E5] font-medium">How it Works</Link>
              <Link href="/shop" className="text-[#4F46E5] font-medium">Shop</Link>
              <Link href="/pricing" className="text-gray-600 hover:text-[#4F46E5] font-medium">Pricing</Link>
              <Link href="/contact" className="text-gray-600 hover:text-[#4F46E5] font-medium">Contact</Link>
            </div>
            <div className="flex space-x-4 items-center">
              <Link href="/login" className="hidden sm:inline text-gray-600 hover:text-[#4F46E5] font-medium px-4 py-2">Log in</Link>
              <Link href="/cart" className="p-2 text-gray-600 hover:text-blue-600 relative">
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute top-0 right-0 bg-[#4F46E5] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">0</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Product Detail Section */}
      <section className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 flex-1">
        <div className="max-w-7xl mx-auto">
          <div className="text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-[#4F46E5]">Home</Link> <span className="mx-1">/</span>{" "}
            <Link href="/shop" className="hover:text-[#4F46E5]">Shop</Link> <span className="mx-1">/</span>{" "}
            <span className="text-gray-700">{product.name}</span>
          </div>
          <Link href="/shop" className="inline-flex items-center text-gray-500 hover:text-blue-600 mb-8 font-medium transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Shop
          </Link>
          
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row">
            {/* Product Image */}
            <div className="md:w-1/2 bg-gray-100 relative aspect-square md:aspect-auto">
              {product.image_url ? (
                <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300">
                  <Smartphone className="w-32 h-32 opacity-20" />
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              <div className="flex items-center gap-1 mb-4 text-yellow-400">
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <span className="text-gray-500 ml-2 text-sm font-medium">(124 Reviews)</span>
              </div>

              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
                {product.name}
              </h1>
              
              <div className="text-3xl font-bold text-[#4F46E5] mb-6">
                ₹{product.price}
              </div>

              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {product.description || "The ultimate networking tool. One tap shares your contact info, social links, and gathers Google reviews instantly. No app required for receivers."}
              </p>

              <ul className="space-y-3 mb-10 text-gray-600">
                <li className="flex items-center"><Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" /> Free Digital Profile Included</li>
                <li className="flex items-center"><Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" /> Unlimited Taps & Scans</li>
                <li className="flex items-center"><Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" /> Works on Apple & Android</li>
                <li className="flex items-center"><Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" /> Real-time Analytics Dashboard</li>
              </ul>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center border border-gray-300 rounded-full bg-white">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 text-gray-600 hover:text-black font-medium transition-colors">-</button>
                  <span className="px-4 font-bold text-gray-900">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 text-gray-600 hover:text-black font-medium transition-colors">+</button>
                </div>
                <div className="text-sm text-gray-500 font-medium">
                  {product.stock > 0 ? (
                    <span className="text-green-600">In Stock ({product.stock} left)</span>
                  ) : (
                    <span className="text-red-500">Out of Stock</span>
                  )}
                </div>
              </div>

              <button 
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className="w-full py-4 bg-[#4F46E5] text-white rounded-full font-bold text-lg hover:bg-[#4338CA] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:bg-gray-400 disabled:shadow-none disabled:transform-none flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}