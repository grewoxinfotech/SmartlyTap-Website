"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/apiClient";
import { ShoppingCart, Star, Smartphone, Search, Wifi } from "lucide-react";

export default function ShopPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await apiClient.get("/products");
        setProducts(response.data.data);
      } catch (error) {
        console.error("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

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
              <Link href="/shop" className="text-primary-dark font-bold hover:text-accent transition-colors">Shop</Link>
              <Link href="/dashboard" className="text-gray-600 font-semibold hover:text-accent transition-colors">My Account</Link>
              <Link href="/#contact" className="text-gray-600 font-semibold hover:text-accent transition-colors">Contact Us</Link>
            </div>

            {/* Right: Icons */}
            <div className="flex items-center space-x-5">
              <button className="text-gray-500 hover:text-primary-dark transition-colors">
                <Search className="w-5 h-5" />
              </button>
              <Link href="/cart" className="relative text-gray-500 hover:text-primary-dark transition-colors group">
                <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  0
                </span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Shop Header */}
      <section className="pt-36 pb-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-primary-light rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-sm text-gray-500 font-medium mb-6">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link> <span className="mx-2">/</span>{" "}
            <span className="text-primary-dark font-bold">Shop</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-primary-dark tracking-tight">
                Premium NFC Cards
              </h1>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl font-medium leading-relaxed">
                Elevate your networking with our collection of smart, contactless digital business cards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 flex-1">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
              {products.length > 0 ? products.map((product) => (
                <div key={product.id} className="bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] hover:border-primary/20 transition-all duration-300 group flex flex-col hover:-translate-y-1">
                  <Link href={`/shop/${product.id}`} className="block relative aspect-square bg-background overflow-hidden p-8 flex items-center justify-center">
                    {product.image_url ? (
                      <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-primary-dark/10 group-hover:scale-105 transition-transform duration-500">
                        <Wifi className="w-24 h-24" />
                      </div>
                    )}
                  </Link>
                  <div className="p-8 flex flex-col flex-1 border-t border-gray-50">
                    <div className="flex items-center gap-1 mb-3 text-accent text-sm">
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-gray-400 font-medium ml-2">(4.9)</span>
                    </div>
                    <Link href={`/shop/${product.id}`}>
                      <h3 className="text-xl font-bold text-primary-dark mb-2 hover:text-primary transition-colors">{product.name}</h3>
                    </Link>
                    <p className="text-gray-500 font-medium text-sm mb-6 line-clamp-2 flex-1 leading-relaxed">
                      {product.description || "Premium NFC smart card with dynamic digital profile."}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-50">
                      <span className="text-2xl font-extrabold text-primary">₹{product.price}</span>
                      <button className="px-5 py-2.5 bg-white border-2 border-primary text-primary rounded-xl text-sm font-bold hover:bg-primary hover:text-white transition-all shadow-sm">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="col-span-full text-center py-20 bg-white rounded-3xl border border-gray-100">
                  <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-primary-dark">No products found</h3>
                  <p className="text-gray-500 font-medium mt-2">We are restocking soon. Check back later.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}