"use client";

import Link from "next/link";
import { useEffect, useState, use } from "react";
import { apiClient } from "@/lib/apiClient";
import { ShoppingCart, Star, Smartphone, Check, ArrowLeft } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string>("");

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

  useEffect(() => {
    if (product?.image_url) {
      setSelectedImage(product.image_url);
    }
  }, [product]);

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
    return <div className="min-h-screen flex items-center justify-center bg-background"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;
  }
 
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-8">
        <div className="card-std max-w-sm w-full text-center p-12">
          <div className="w-16 h-16 bg-gray-50 text-gray-300 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
            <Smartphone className="w-8 h-8" />
          </div>
          <h2 className="font-black text-xs uppercase tracking-widest text-primary-dark mb-2">Resource Missing</h2>
          <p className="p-std text-xs mb-8 opacity-60 font-bold uppercase tracking-tighter">The requested hardware node could not be located.</p>
          <Link href="/shop" className="btn-primary-std !py-3 !text-[12px]">Return to Inventory</Link>
        </div>
      </div>
    );
  }

  const parsedImages =
    Array.isArray(product.images)
      ? product.images
      : typeof product.images === "string" && product.images.trim().startsWith("[")
        ? (() => {
            try {
              const parsed = JSON.parse(product.images);
              return Array.isArray(parsed) ? parsed : [];
            } catch {
              return [];
            }
          })()
        : [];

  const galleryImages = Array.from(
    new Set(
      [
        product.image_url,
        ...parsedImages,
        ...(Array.isArray(product.gallery_images) ? product.gallery_images : []),
      ].filter((img): img is string => typeof img === "string" && img.trim().length > 0)
    )
  );
  const activeImage = selectedImage || product.image_url;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <SiteHeader cartCount={0} />
      {/* Product Detail Section */}
      <section className="section-std pt-28 flex-1">
        <div className="max-w-7xl mx-auto">
          <div className="text-[12px] text-gray-400 font-black mb-4 uppercase tracking-widest flex items-center gap-1.5">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link> <span className="opacity-30">/</span>{" "}
            <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link> <span className="opacity-30">/</span>{" "}
            <span className="text-primary-dark">{product.name}</span>
          </div>
          <Link href="/shop" className="inline-flex items-center text-[12px] font-black text-gray-400 hover:text-primary mb-8 transition-all group uppercase tracking-widest">
            <ArrowLeft className="w-3 h-3 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Inventory
          </Link>
          
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Product Image Area */}
            <div className="relative flex items-center justify-center p-4 lg:p-6 overflow-hidden rounded-xl bg-white">
              {activeImage ? (
                <div className="relative w-full max-w-md">
                  <img 
                    src={activeImage} 
                    alt={product.name} 
                    className="w-full aspect-square object-cover rounded-lg relative z-10 transition-transform duration-500" 
                  />

                  {galleryImages.length > 1 && (
                    <div className="mt-4 grid grid-cols-4 sm:grid-cols-5 gap-2.5">
                      {galleryImages.map((img, index) => (
                        <button
                          key={`${img}-${index}`}
                          type="button"
                          onClick={() => setSelectedImage(img)}
                          className={`rounded-md overflow-hidden border transition-all ${
                            img === activeImage
                              ? "border-primary ring-2 ring-primary/20"
                              : "border-border hover:border-primary/40"
                          }`}
                          aria-label={`View product image ${index + 1}`}
                        >
                          <img
                            src={img}
                            alt={`${product.name} preview ${index + 1}`}
                            className="w-full h-16 object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-primary-dark/5">
                  <Smartphone className="w-48 h-48" />
                </div>
              )}
            </div>

            {/* Product Info Area */}
            <div className="p-0 md:p-1 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-0.5 text-yellow-500">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                </div>
                <span className="text-[11px] font-black uppercase tracking-widest text-primary bg-primary/5 px-2.5 py-1 rounded-md border border-primary/10">PLATINUM CHOICE</span>
              </div>
 
              <h1 className="h1-std mb-3 !leading-tight">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-black text-primary-dark tracking-tighter">₹{Number(product.price).toLocaleString()}</span>
                {product.original_price && (
                  <div className="flex flex-col">
                    <span className="text-[12px] text-gray-300 line-through font-black uppercase tracking-widest">₹{Number(product.original_price).toLocaleString()}</span>
                    <span className="text-[11px] text-accent font-black uppercase tracking-widest">SAVE {Math.round((1 - product.price/product.original_price) * 100)}%</span>
                  </div>
                )}
              </div>
 
              <div className="mb-6 pb-6">
                <h2 className="text-sm font-black text-primary-dark mb-2 tracking-wide">Overview</h2>
                <p className="p-std text-[14px] leading-relaxed font-medium opacity-90">
                  {product.description || "Transform your networking experience with the world's most advanced digital business card. One tap to share everything instantly."}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2.5 mb-8">
                {[
                  "NFC / QR Sync",
                  "Contactless Data",
                  "Global Dispatch",
                  "Live Analytics"
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-card shadow-sm">
                    <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-bold text-primary-dark text-[11px] uppercase tracking-wide">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-6">
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <div className="flex items-center h-12 bg-background rounded-xl w-full sm:w-auto px-2.5 shadow-sm">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-primary-dark hover:bg-primary/10 transition-all font-black text-lg"
                    >
                      -
                    </button>
                    <span className="px-6 font-black text-base text-primary-dark min-w-[3rem] text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-primary-dark hover:bg-primary/10 transition-all font-black text-lg"
                    >
                      +
                    </button>
                  </div>
                  <div className="w-full sm:w-auto rounded-xl bg-primary/5 px-4 py-2 text-center sm:text-left">
                    <span className="text-[11px] font-bold text-primary-dark/80 uppercase tracking-wide">Total</span>{" "}
                    <span className="text-[15px] font-black text-primary-dark">₹{(Number(product.price) * quantity).toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={product.stock <= 0}
                    className="w-full sm:flex-1 h-12 rounded-xl bg-card text-primary-dark font-bold text-[12px] uppercase tracking-wide hover:bg-background transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Add To Cart
                  </button>

                  <Link
                    href={`/checkout?productId=${product.id}&qty=${quantity}`}
                    className="w-full sm:flex-1 h-12 rounded-xl bg-primary text-white font-bold text-[12px] uppercase tracking-wide hover:bg-primary-dark transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    Buy Now
                  </Link>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-center sm:justify-start gap-2">
                {product.stock > 0 ? (
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-600 rounded-full text-[11px] font-black uppercase tracking-widest shadow-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                    Ready to Ship ({product.stock} Units Left)
                  </div>
                ) : (
                  <div className="px-3 py-1.5 bg-red-50 text-red-500 rounded-full text-[11px] font-black uppercase tracking-widest shadow-sm">
                    Out of Stock - Restocking Soon
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}