"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/apiClient";
import { ShoppingCart, Star, Smartphone, Search, Wifi } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";

export default function ShopPage() {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  async function fetchProducts() {
    setLoading(true);
    setError(false);
    try {
      const response = await apiClient.get("/products");
      setProducts(response.data.data);
    } catch (error) {
      console.error("Failed to fetch products");
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const getBadgeClass = (badgeText: string) => {
    const normalized = badgeText.trim().toLowerCase();
    if (normalized.includes("%") || normalized.includes("off") || normalized.includes("save")) {
      return "bg-primary text-white border border-primary/20";
    }
    if (normalized.includes("new")) {
      return "bg-primary-dark text-white border border-primary-dark/20";
    }
    if (normalized.includes("hot")) {
      return "bg-accent text-white border border-accent/20";
    }
    return "bg-primary-light text-primary-dark border border-border";
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <SiteHeader cartCount={0} />

      {/* Hero / Header Section */}
      <section className="header-std relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-primary-light rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="text-[12px] text-gray-400 font-bold mb-4 uppercase tracking-widest">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link> <span className="mx-2">/</span>{" "}
            <span className="text-primary-dark">Shop</span>
          </div>
          <h1 className="h1-std">Our Products</h1>
          <p className="mt-2 p-std text-base max-w-xl mx-auto">
            Choose the perfect NFC solution for your professional needs. Smart, durable, and stylish.
          </p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="section-std">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="max-w-md mx-auto text-center py-20 bg-white rounded-3xl border border-red-50 shadow-sm px-8">
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Wifi className="w-8 h-8 opacity-50" />
              </div>
              <h3 className="text-xl font-bold text-primary-dark">Connection Error</h3>
              <p className="text-gray-500 font-medium mt-2 mb-8">
                We're having trouble reaching our servers. Please check your internet connection and try again.
              </p>
              <button 
                onClick={() => fetchProducts()}
                className="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-all shadow-md active:scale-95"
              >
                Retry
              </button>
            </div>
          ) : (
            <div className="space-y-10">
              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.length > 0 ? (
                  products.map((product) => (
                    <div
                      key={product.id}
                      className="card-hover-std p-4 flex flex-col group bg-white cursor-pointer"
                      onClick={() => router.push(`/shop/${product.id}`)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          router.push(`/shop/${product.id}`);
                        }
                      }}
                    >
                      {/* Image Container */}
                      <div className="relative aspect-square bg-gray-50 rounded-xl mb-4 overflow-hidden border border-gray-100 shadow-inner flex items-center justify-center">
                        {product.image_url ? (
                          <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        ) : (
                          <Wifi className="w-10 h-10 text-primary-dark/10" />
                        )}
                        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                          <Link
                            href={`/shop/${product.id}`}
                            onClick={(e) => e.stopPropagation()}
                            className="w-9 h-9 bg-white rounded-xl shadow-lg flex items-center justify-center text-primary-dark hover:bg-primary hover:text-white transition-all"
                          >
                            <Search className="w-4 h-4" />
                          </Link>
                        </div>
                        {product.badge && (
                           <div className="absolute top-3 left-3 flex gap-1.5">
                              {product.badge.split(",").map((b: string, i: number) => (
                                <span key={i} className={`px-2.5 py-1 rounded-lg text-[11px] font-black uppercase tracking-widest shadow-sm ${getBadgeClass(b)}`}>
                                  {b.trim()}
                                </span>
                              ))}
                           </div>
                        )}
                      </div>
 
                      {/* Content */}
                      <div className="flex-1 flex flex-col items-center text-center">
                        <div className="text-[11px] text-accent font-black uppercase tracking-widest mb-1.5 py-0.5 px-2 bg-accent/5 border border-accent/10 rounded-full">Pro Series</div>
                        <h3 className="text-xs font-black text-primary-dark uppercase tracking-wide line-clamp-1 mb-2">
                          <Link
                            href={`/shop/${product.id}`}
                            onClick={(e) => e.stopPropagation()}
                            className="hover:text-primary transition-colors"
                          >
                            {product.name}
                          </Link>
                        </h3>
                        
                        <div className="flex items-center gap-2 mb-6">
                          <span className="text-lg font-black text-primary leading-none">₹{Number(product.price).toLocaleString()}</span>
                          {product.original_price && (
                            <span className="text-[11px] text-gray-300 line-through font-bold">₹{Number(product.original_price).toLocaleString()}</span>
                          )}
                        </div>
 
                        <Link 
                          href={`/checkout?productId=${product.id}`}
                          onClick={(e) => e.stopPropagation()}
                          className="w-full btn-primary-std !py-3 !text-[12px] !shadow-lg mt-auto active:scale-95 flex items-center justify-center gap-2"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          PURCHASE NOW
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm px-10 max-w-lg mx-auto">
                    <div className="w-16 h-16 bg-gray-50 text-gray-300 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Search className="w-8 h-8" />
                    </div>
                    <h3 className="h3-std">No products found</h3>
                    <p className="p-std mt-2">
                      It looks like our inventory is currently being updated. We'll have more SmartlyTap cards back in stock soon!
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}