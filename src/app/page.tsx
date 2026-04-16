"use client";

import Link from "next/link";
import { ArrowRight, Star, Smartphone, BarChart3, Users, CheckCircle2 } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Smartphone className="w-6 h-6 text-blue-600" />
              <span className="text-xl font-bold text-gray-900 tracking-tight">SmartlyTap</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link href="/how-it-works" className="text-gray-600 hover:text-blue-600 font-medium">How it Works</Link>
              <Link href="/shop" className="text-gray-600 hover:text-blue-600 font-medium">Shop</Link>
              <Link href="/pricing" className="text-gray-600 hover:text-blue-600 font-medium">Pricing</Link>
              <Link href="/contact" className="text-gray-600 hover:text-blue-600 font-medium">Contact</Link>
            </div>
            <div className="flex space-x-4">
              <Link href="/login" className="text-gray-600 hover:text-blue-600 font-medium px-4 py-2">Log in</Link>
              <Link href="/shop" className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-700 transition-colors shadow-sm">
                Get Your Card
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight max-w-4xl mx-auto">
            Grow Your Business with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Smart NFC Cards</span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Get more Google reviews, leads, and engagement instantly. Just one tap connects your customers to your digital world.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/shop" className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center">
              View Plans <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link href="/how-it-works" className="px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-full font-bold text-lg hover:bg-gray-50 transition-all flex items-center justify-center">
              Watch Demo
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-lg text-gray-600">Three simple steps to digitize your business presence.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Smartphone className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">1. Tap NFC Card</h3>
              <p className="text-gray-600">Customer simply taps their smartphone on your SmartlyTap card or scans the QR code.</p>
            </div>
            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">2. Smart Profile Opens</h3>
              <p className="text-gray-600">Your customized digital profile opens instantly without any app installation required.</p>
            </div>
            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">3. Customer Takes Action</h3>
              <p className="text-gray-600">They leave a Google review, save your contact, or follow your social media in one click.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose SmartlyTap?</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Google Review Boost", desc: "Direct link to your review page", icon: Star },
              { title: "WhatsApp Integration", desc: "Instant chat connection", icon: MessageCircle },
              { title: "Digital Profile", desc: "Your modern business card", icon: Smartphone },
              { title: "Analytics Dashboard", desc: "Track taps and engagement", icon: BarChart3 }
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-start text-left">
                  <Icon className="w-10 h-10 text-blue-600 mb-4" />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Smartphone className="w-6 h-6 text-blue-400" />
              <span className="text-xl font-bold tracking-tight">SmartlyTap</span>
            </div>
            <p className="text-gray-400 max-w-sm">The modern way to network, gather reviews, and grow your business digitally.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/shop" className="hover:text-white">Shop Cards</Link></li>
              <li><Link href="/how-it-works" className="hover:text-white">How it Works</Link></li>
              <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© {new Date().getFullYear()} SmartlyTap Technologies. All rights reserved.</p>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a href="https://wa.me/919000090000" target="_blank" rel="noreferrer" className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:bg-[#128C7E] hover:scale-110 transition-all z-50 flex items-center justify-center">
        <MessageCircle className="w-8 h-8" />
      </a>
    </div>
  );
}

// Dummy icon to fix missing import locally
function MessageCircle(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}