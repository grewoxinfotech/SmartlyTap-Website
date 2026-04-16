"use client";

import Link from "next/link";
import { CheckCircle2, Smartphone, ArrowRight } from "lucide-react";

export default function PricingPage() {
  const plans = [
    {
      name: "Basic",
      price: "Free",
      period: "Forever",
      description: "Essential digital profile features for individuals.",
      features: [
        "1 Digital Business Card Profile",
        "Basic Contact Info",
        "Up to 5 Social Links",
        "Standard QR Code",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: "₹499",
      period: "/year",
      description: "Advanced features to grow your business & gather reviews.",
      features: [
        "Direct Google Review Link",
        "Custom NFC Card included",
        "Unlimited Social Links",
        "WhatsApp Direct Chat",
        "Basic Tap Analytics",
        "Premium Templates",
      ],
      cta: "Buy Pro Plan",
      popular: true,
    },
    {
      name: "Business",
      price: "₹1,499",
      period: "/year",
      description: "Full suite of tools for teams and power networkers.",
      features: [
        "Everything in Pro",
        "Up to 5 NFC Cards included",
        "Custom Domain for Profile",
        "Advanced Click Analytics",
        "Lead Capture Form",
        "Priority Support",
      ],
      cta: "Contact Sales",
      popular: false,
    }
  ];

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
            <div className="hidden md:flex space-x-8">
              <Link href="/how-it-works" className="text-gray-600 hover:text-blue-600 font-medium">How it Works</Link>
              <Link href="/shop" className="text-gray-600 hover:text-blue-600 font-medium">Shop</Link>
              <Link href="/pricing" className="text-blue-600 font-medium">Pricing</Link>
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

      {/* Pricing Header */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Simple, Transparent Pricing
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan for your networking needs. Upgrade or downgrade at any time.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 flex-1">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, i) => (
              <div 
                key={i} 
                className={`relative flex flex-col p-8 rounded-3xl border ${plan.popular ? 'bg-blue-600 border-blue-600 shadow-xl scale-105 z-10' : 'bg-white border-gray-200 shadow-sm'}`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-sm">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <h3 className={`text-xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h3>
                <p className={`text-sm mb-6 ${plan.popular ? 'text-blue-100' : 'text-gray-500'}`}>{plan.description}</p>
                
                <div className="mb-6 flex items-baseline">
                  <span className={`text-4xl font-extrabold tracking-tight ${plan.popular ? 'text-white' : 'text-gray-900'}`}>{plan.price}</span>
                  <span className={`ml-2 text-sm font-medium ${plan.popular ? 'text-blue-200' : 'text-gray-500'}`}>{plan.period}</span>
                </div>
                
                <ul className="space-y-4 mb-8 flex-1">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start">
                      <CheckCircle2 className={`w-5 h-5 mr-3 flex-shrink-0 ${plan.popular ? 'text-blue-200' : 'text-green-500'}`} />
                      <span className={plan.popular ? 'text-white' : 'text-gray-700'}>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link 
                  href={plan.name === 'Basic' ? '/signup' : '/shop'} 
                  className={`w-full py-4 rounded-xl font-bold text-center transition-all flex items-center justify-center ${
                    plan.popular 
                      ? 'bg-white text-blue-600 hover:bg-gray-50' 
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  {plan.cta} <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}