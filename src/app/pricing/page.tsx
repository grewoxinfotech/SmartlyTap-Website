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
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-md">
                <Smartphone className="w-4 h-4 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-extrabold text-primary-dark tracking-tight leading-none">SmartlyTap</span>
                <span className="text-[12px] font-semibold text-primary uppercase tracking-widest mt-0.5">SaaS Platform</span>
              </div>
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-gray-600 font-semibold text-sm hover:text-primary transition-colors">Home</Link>
              <Link href="/shop" className="text-gray-600 font-semibold text-sm hover:text-primary transition-colors">Shop</Link>
              <Link href="/pricing" className="text-primary font-bold text-sm">Pricing</Link>
              <Link href="/contact" className="text-gray-600 font-semibold text-sm hover:text-primary transition-colors">Contact</Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-gray-600 font-semibold text-sm hover:text-primary transition-colors">Log in</Link>
              <Link href="/shop" className="btn-primary-std !py-2 !px-4 !text-xs !shadow-none">
                Get Your Card
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Pricing Header */}
      <section className="header-std bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="h1-std mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="p-std text-base max-w-2xl mx-auto">
            Choose the perfect plan for your networking needs. Upgrade or downgrade at any time. No hidden fees.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="section-std flex-1">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
            {plans.map((plan, i) => (
              <div 
                key={i} 
                className={`relative flex flex-col p-8 rounded-3xl border-2 transition-all duration-300 ${plan.popular ? 'bg-primary border-primary shadow-xl scale-105 z-10' : 'bg-white border-gray-100/50 shadow-sm hover:border-primary/20 hover:shadow-md'}`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-accent text-white text-[12px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-md">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <h3 className={`h3-std mb-1 ${plan.popular ? 'text-white' : ''}`}>{plan.name}</h3>
                <p className={`text-xs font-bold mb-6 ${plan.popular ? 'text-primary-light/80' : 'text-gray-400'}`}>{plan.description}</p>
                
                <div className="mb-8 flex items-baseline gap-1.5 pb-6 border-b border-white/10">
                  <span className={`text-4xl font-black tracking-tight ${plan.popular ? 'text-white' : 'text-primary-dark'}`}>{plan.price}</span>
                  <span className={`text-[12px] font-bold uppercase tracking-widest ${plan.popular ? 'text-primary-light/60' : 'text-gray-400'}`}>{plan.period}</span>
                </div>
                
                <ul className="space-y-4 mb-10 flex-1">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.popular ? 'text-accent fill-accent' : 'text-primary'}`} />
                      <span className={`text-[13px] font-bold ${plan.popular ? 'text-white' : 'text-gray-600'}`}>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link 
                  href={plan.name === 'Basic' ? '/signup' : '/shop'} 
                  className={`w-full py-3.5 rounded-xl font-black text-xs uppercase tracking-widest text-center transition-all flex items-center justify-center gap-2 active:scale-95 ${
                    plan.popular 
                      ? 'bg-white text-primary hover:bg-background shadow-md' 
                      : 'bg-primary-dark text-white hover:bg-primary shadow-sm'
                  }`}
                >
                  {plan.cta} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}