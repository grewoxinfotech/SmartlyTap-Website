"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/apiClient";
import { ShoppingCart, Star, Smartphone, Search } from "lucide-react";

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
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <Smartphone className="w-6 h-6 text-blue-600" />
              <span className="text-xl font-bold text-gray-900 tracking-tight">SmartlyTap</span>
            </Link>
            <div className="flex space-x-4 items-center">
              <Link href="/cart" className="p-2 text-gray-600 hover:text-blue-600 relative">
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute top-0 right-0 bg-blue-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">0</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Shop Header */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Shop Smart Cards
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from our premium collection of NFC-enabled smart cards and accessories to elevate your networking.
          </p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 flex-1">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
              {products.length > 0 ? products.map((product) => (
                <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow group flex flex-col">
                  <Link href={`/shop/${product.id}`} className="block relative aspect-square bg-gray-100 overflow-hidden">
                    {product.image_url ? (
                      <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <Smartphone className="w-16 h-16 opacity-20" />
                      </div>
                    )}
                  </Link>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-1 mb-2 text-yellow-400 text-sm">
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-gray-400 ml-1">(4.9)</span>
                    </div>
                    <Link href={`/shop/${product.id}`}>
                      <h3 className="text-lg font-bold text-gray-900 mb-1 hover:text-blue-600 transition-colors">{product.name}</h3>
                    </Link>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-1">
                      {product.description || "Premium NFC smart card with dynamic digital profile."}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
                      <button className="px-4 py-2 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-blue-600 transition-colors">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="col-span-full text-center py-20">
                  <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900">No products found</h3>
                  <p className="text-gray-500">We are restocking soon.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}