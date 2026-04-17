"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import {
  ArrowRight,
  BarChart3,
  Check,
  MessageCircle,
  Smartphone,
  Star,
  Users,
  Wifi,
  RefreshCw,
  Link as LinkIcon,
  ShieldCheck,
  Zap
} from "lucide-react";

export default function Home() {
  const words = ["Networking", "Connection", "Branding", "Growth"];
  const heroVisuals = [
    "/images/hero-laptop.png",
    "/images/hero-card-1.png",
    "/images/hero-card-2.png",
  ];
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [activeVisualIndex, setActiveVisualIndex] = useState(0);
  const [typedWord, setTypedWord] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[activeWordIndex];
    const typingSpeed = isDeleting ? 50 : 110;
    const wordCompleted = typedWord === currentWord;
    const wordCleared = typedWord === "";
    const pauseDuration = wordCompleted ? 1200 : 0;

    const timeout = setTimeout(() => {
      if (!isDeleting && !wordCompleted) {
        setTypedWord(currentWord.slice(0, typedWord.length + 1));
        return;
      }

      if (!isDeleting && wordCompleted) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting && !wordCleared) {
        setTypedWord(currentWord.slice(0, typedWord.length - 1));
        return;
      }

      if (isDeleting && wordCleared) {
        setIsDeleting(false);
        setActiveWordIndex((prev) => (prev + 1) % words.length);
      }
    }, wordCompleted && !isDeleting ? pauseDuration : typingSpeed);

    return () => clearTimeout(timeout);
  }, [activeWordIndex, isDeleting, typedWord, words]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveVisualIndex((prev) => (prev + 1) % heroVisuals.length);
    }, 2600);

    return () => clearInterval(interval);
  }, [heroVisuals.length]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <SiteHeader cartCount={0} />

      {/* Premium Light Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 animate-mesh opacity-20"></div>
        <div className="absolute inset-0 bg-noise opacity-[0.015] pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[45%] h-[45%] bg-primary/5 rounded-full blur-[100px] -mr-24 -mt-16 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[35%] h-[35%] bg-accent/5 rounded-full blur-[100px] -ml-24 -mb-24"></div>

        <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="hero-title-animate flex flex-wrap justify-center lg:justify-start gap-3 mb-8">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-[12px] font-bold text-primary tracking-wider uppercase">
                <Zap className="w-3.5 h-3.5 fill-primary" />
                V4.0 Live Now
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card border border-border text-[12px] font-bold text-foreground/70 tracking-wider uppercase">
                Trusted by 10k+ Professionals
              </span>
            </div>

            <h1 className="hero-title-animate stagger-1 text-[38px] sm:text-[44px] md:text-[50px] lg:text-[56px] font-black tracking-tighter leading-[1.18] text-primary-dark pt-1 pb-3 overflow-visible">
              The Future of <br />
              <span className="inline-flex items-end min-h-[1.28em] min-w-[11ch] align-top pb-1 text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary animate-gradient-x">
                <span>{typedWord}</span>
                <span className="ml-1 h-[0.9em] w-[3px] bg-accent animate-pulse rounded-full"></span>
              </span>
            </h1>

            <p className="hero-title-animate stagger-2 mt-8 sm:mt-10 text-[16px] sm:text-[17px] lg:text-[19px] text-foreground/80 font-medium leading-relaxed max-w-[640px] mx-auto lg:mx-0">
              Modernize your professional identity. One tap to share contacts, social links, and capture leads instantly with our premium NFC ecosystem.
            </p>

            <div className="hero-title-animate stagger-3 mt-12 flex flex-col sm:flex-row justify-center lg:justify-start gap-5">
              <Link href="/shop" className="group relative w-full sm:w-[160px] h-[50px] overflow-hidden rounded-2xl bg-primary px-6 text-[16px] font-bold text-white shadow-md shadow-primary/15 transition-all hover:bg-primary-dark active:scale-95 flex items-center justify-center gap-2">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                Shop Now <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="#how-it-works" className="w-full sm:w-[160px] h-[50px] rounded-2xl bg-card border border-border px-6 text-[16px] font-bold text-primary-dark shadow-sm hover:bg-background transition-all active:scale-95 flex items-center justify-center">
                How We Work
              </Link>
            </div>

            <div className="hero-title-animate stagger-4 mt-10 grid grid-cols-2 sm:grid-cols-3 gap-8 lg:max-w-[640px] pt-8">
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-baseline gap-1">
                  <span className="text-[34px] sm:text-[38px] lg:text-[42px] font-black text-primary-dark tracking-tighter">10</span>
                  <span className="text-[20px] sm:text-[22px] lg:text-2xl font-black text-primary">k+</span>
                </div>
                <span className="text-[12px] sm:text-[13px] lg:text-[14px] font-bold text-foreground/60 uppercase tracking-widest mt-1">Card Users</span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-baseline gap-1">
                  <span className="text-[34px] sm:text-[38px] lg:text-[42px] font-black text-primary-dark tracking-tighter">928</span>
                  <span className="text-[18px] sm:text-[19px] lg:text-xl font-black text-primary">k+</span>
                </div>
                <span className="text-[12px] sm:text-[13px] lg:text-[14px] font-bold text-foreground/60 uppercase tracking-widest mt-1">Links Visitors</span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-baseline gap-1">
                  <span className="text-[34px] sm:text-[38px] lg:text-[42px] font-black text-primary-dark tracking-tighter">5</span>
                  <span className="text-[18px] sm:text-[19px] lg:text-xl font-black text-primary">k+</span>
                </div>
                <span className="text-[12px] sm:text-[13px] lg:text-[14px] font-bold text-foreground/60 uppercase tracking-widest mt-1">Leads Captured</span>
              </div>
            </div>
          </div>

          {/* Right Visual Slideshow */}
          <div className="hero-title-animate stagger-2 mt-8 lg:mt-0 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[520px] aspect-[4/3] rounded-[2rem] bg-gradient-to-br from-primary/5 via-white to-accent/5 border border-primary/10 shadow-xl p-6 sm:p-8 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none"></div>
              <img
                key={heroVisuals[activeVisualIndex]}
                src={heroVisuals[activeVisualIndex]}
                alt="SmartlyTap product preview"
                className="relative z-10 max-h-full max-w-full object-contain transition-opacity duration-500"
                onError={(e) => {
                  e.currentTarget.src = "/next.svg";
                }}
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
                {heroVisuals.map((_, index) => (
                  <span
                    key={index}
                    className={`h-2.5 rounded-full transition-all ${
                      index === activeVisualIndex ? "w-6 bg-primary" : "w-2.5 bg-primary/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      <Link
        href="https://wa.me/919662643079"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[60] w-14 h-14 rounded-full bg-accent text-white shadow-2xl flex items-center justify-center whatsapp-pulse hover:scale-105 transition-transform"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </Link>
      {/* How It Works */}
      <section className="py-16 md:py-20 bg-primary-light/35">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-black text-[16px] tracking-[0.22em] text-accent mb-3">How It Works</h2>
            <h2 className="h2-std">From Tap To Connection In 3 Steps</h2>
            <p className="subtitle-std max-w-2xl mx-auto mt-3">A simple workflow designed for fast networking and better lead capture.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 text-center">
            
            <div className="card-hover-std p-8 group bg-white border-primary/10 shadow-md">
              <div className="w-16 h-16 bg-primary/5 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner border border-primary/10">
                <Wifi className="w-8 h-8" />
              </div>
              <h3 className="font-black text-[18px] tracking-normal text-primary-dark mb-3">01. Tap or Scan</h3>
              <p className="subtitle-std opacity-75">Your client taps your NFC card or scans the QR to open your profile instantly.</p>
            </div>
            
            <div className="card-hover-std p-8 group bg-white border-primary/10 shadow-md">
              <div className="w-16 h-16 bg-primary/5 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner border border-primary/10">
                <Smartphone className="w-8 h-8" />
              </div>
              <h3 className="font-black text-[18px] tracking-normal text-primary-dark mb-3">02. Profile Opens</h3>
              <p className="subtitle-std opacity-75">Your digital card opens in-browser with contact details, links, and call-to-action buttons.</p>
            </div>
            
            <div className="card-hover-std p-8 group bg-white border-primary/10 shadow-md">
              <div className="w-16 h-16 bg-primary/5 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner border border-primary/10">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="font-black text-[18px] tracking-normal text-primary-dark mb-3">03. Capture Leads</h3>
              <p className="subtitle-std opacity-75">Collect real leads and follow-up faster with a cleaner, smarter networking flow.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-20 bg-background relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-[100px] -ml-20 -mb-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-24">
            <h2 className="font-black text-[18px] tracking-[0.2em] text-accent mb-3">Enterprise Capabilities</h2>
            <h2 className="h2-std">Premium SaaS Features</h2>
            <p className="mt-4 subtitle-std opacity-70">High-performance tools for professional engagement.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Node Synchronization", desc: "Share credentials in milliseconds with native NFC protocols.", icon: Wifi },
              { title: "Cross-Platform Sync", desc: "Native support across modern iOS and Android environments.", icon: Smartphone },
              { title: "Dynamic Firmware", desc: "Update your target profile in real-time. Hubs refactor instantly.", icon: RefreshCw },
              { title: "Social Aggregator", desc: "Unified matrix for WhatsApp, LinkedIn, and social nodes.", icon: LinkIcon },
              { title: "Telemetry Hub", desc: "Track interaction frequency and conversion metrics live.", icon: BarChart3 },
              { title: "Fleet Management", desc: "Provision and manage nodes for entire corporate divisions.", icon: Users }
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div key={i} className="bg-white p-10 rounded-3xl border border-white/50 shadow-xl flex flex-col items-start text-left transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-primary/20 group">
                  <div className="w-14 h-14 rounded-2xl bg-primary/5 text-primary flex items-center justify-center mb-10 group-hover:bg-primary group-hover:text-white shadow-inner border border-primary/10 transition-all duration-500">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-black text-[18px] tracking-wide text-primary-dark mb-4">{feature.title}</h3>
                  <p className="subtitle-std opacity-70">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-16 md:py-20 bg-primary-light/25 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="font-black text-[18px] tracking-[0.2em] text-accent mb-3">Hardware Inventory</h2>
            <h2 className="h2-std">Select Your Smart Node</h2>
            <p className="mt-4 subtitle-std opacity-70">Premium materials. Precise engineering. Infinite connectivity.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { name: "PVC Classic", price: "₹999", desc: "Durable, high-grade hybrid PVC with custom full-spectrum thermal printing.", img: "bg-gray-100/50 text-gray-300" },
              { name: "Executive Metal", price: "₹2,499", desc: "Weight-balanced laser-engraved steel card for high-level executives.", img: "bg-gradient-to-br from-primary-dark to-primary-dark/80 text-white/20" },
              { name: "Eco Bamboo", price: "₹1,499", desc: "Sustainably harvested bamboo with organic texture and refined edging.", img: "bg-[#D4B895]/20 text-[#D4B895]" }
            ].map((prod, i) => (
              <div key={i} className="card-hover-std p-10 bg-background border-white shadow-2xl flex flex-col items-center text-center group">
                <div className={`w-56 h-36 rounded-[2rem] ${prod.img} mb-10 shadow-inner flex items-center justify-center transform group-hover:scale-[1.03] transition-all duration-700 relative overflow-hidden border border-white/10`}>
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <Wifi className="w-14 h-14 opacity-40 group-hover:scale-110 transition-transform duration-700" />
                </div>
                <h3 className="font-black text-[18px] tracking-wide text-primary-dark mb-4 group-hover:text-primary transition-colors">{prod.name}</h3>
                <p className="subtitle-std opacity-70 mb-8 flex-1">{prod.desc}</p>
                <div className="text-3xl font-black text-primary mb-10 tracking-tighter">
                  {prod.price}
                  <span className="text-[16px] font-black text-gray-300 ml-1">INR</span>
                </div>
                <Link href="/shop" className="w-full btn-secondary-std py-4 text-[17px] shadow-lg active:scale-95">
                  Initialize Purchase
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-primary-dark via-primary-dark/90 to-primary text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="h2-std text-white">SaaS Platform Pricing</h2>
            <p className="mt-2 subtitle-std text-primary-light/80">Choose the software plan that powers your smart cards.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { name: "Basic", price: "Free", period: "forever", features: ["1 Smart Card Link", "Basic Digital Profile", "Contact Sharing", "Standard Support"] },
              { name: "Business", price: "₹99", period: "/month", popular: true, features: ["Everything in Basic", "Advanced Analytics", "Lead Capture Form", "Custom Branding", "Priority Support"] },
              { name: "Enterprise", price: "Custom", period: "", features: ["Everything in Business", "Bulk Card Management", "API Access", "Dedicated Account Manager", "Custom Integrations"] }
            ].map((plan, i) => (
              <div key={i} className={`rounded-2xl p-6 ${plan.popular ? 'bg-primary border-primary shadow-lg' : 'bg-primary-dark border-white/10'} border-2 flex flex-col`}>
                {plan.popular && <div className="text-white bg-accent px-3 py-1.5 rounded-full text-[16px] font-black tracking-wide mb-4 w-max">Most Popular</div>}
                <h3 className="h3-std text-white text-xl mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-white/10">
                  <span className="text-3xl font-black">{plan.price}</span>
                  <span className={plan.popular ? "text-primary-light text-[16px] font-bold" : "text-white/60 font-bold text-[16px]"}>{plan.period}</span>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2.5">
                      <Star className={`w-3.5 h-3.5 ${plan.popular ? 'text-accent fill-accent' : 'text-primary fill-primary'}`} />
                      <span className="text-white/90 font-bold text-[17px]">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/shop" className={`w-full py-3 rounded-xl font-black text-center text-[17px] transition-all active:scale-95 ${plan.popular ? 'bg-white text-primary hover:bg-background shadow-md' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* Testimonials */}
      <section className="py-16 md:py-20 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-[100px] -mr-40 -mt-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-24">
            <h2 className="font-black text-[18px] tracking-[0.2em] text-accent mb-3">User Feedback</h2>
            <h2 className="h2-std">Trusted by Professionals</h2>
            <p className="mt-4 subtitle-std opacity-70 text-center">Real protocols from modern teams using SmartlyTap.</p>
          </div>
 
          <div className="grid gap-10 md:grid-cols-3">
            {[
              { name: "Vishal M.", role: "Managing Director", text: "Sensor proximity is immediate. Clients sync contact info effortlessly. Telemetry hub is a game-changer.", rating: 5 },
              { name: "Dr. Yogesh", role: "Medical Professional", text: "Total elimination of legacy paper. Patients initiate WhatsApp sync in exactly one click. Professional density is high.", rating: 5 },
              { name: "Rajat S.", role: "Founding Partner", text: "Interaction telemetry allows us to measure outreach with surgical precision. Every node leaves a lasting memory.", rating: 5 },
            ].map((t) => (
              <div key={t.name} className="card-hover-std p-10 bg-white border-white/50 shadow-2xl group">
                <div className="flex items-center gap-1 mb-10 opacity-40 group-hover:opacity-100 transition-opacity">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="subtitle-std italic opacity-75 mb-10 text-left">"{t.text}"</p>
                <div className="flex items-center gap-5 border-t border-border pt-8">
                  <div className="h-12 w-12 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary font-black text-lg shadow-inner">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-black text-[18px] tracking-wide text-primary-dark">{t.name}</div>
                    <div className="text-[16px] font-black tracking-wide text-accent opacity-60 mt-0.5">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* FAQ */}
      <section className="py-16 md:py-20 bg-primary-light/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 space-y-4">
            <h2 className="font-black text-[18px] tracking-[0.2em] text-accent">Knowledge Base</h2>
            <h2 className="h2-std font-black tracking-tighter">Frequently Queried Nodes</h2>
          </div>
 
          <div className="grid gap-6">
            {[
              { q: "Hardware Compatibility Matrix?", a: "NFC protocols are supported across all modern mobile environments (iOS 13+ / Android 10+). Legacy nodes can utilize the secondary QR matrix." },
              { q: "Dynamic Profile Refactoring?", a: "User-defined data can be refactored anytime via the secure dashboard. Connected hardware updates instantly to reflect new configuration." },
              { q: "Third-party Node Injection?", a: "No client-side software is required. Data transmission occurs via native browser protocols upon sensor proximity." },
              { q: "Logistics Fleet Coverage?", a: "Global dispatch is active. Standardized delivery protocols ensure hardware arrival within 3-5 business solar cycles." },
            ].map((f) => (
              <div key={f.q} className="card-hover-std p-10 bg-background border-border shadow-xl group">
                <div className="font-black text-[16px] tracking-wide text-primary group-hover:text-primary-dark transition-colors flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></div>
                  {f.q}
                </div>
                <div className="mt-5 subtitle-std opacity-70">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* CTA Banner */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-background to-primary-light/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary rounded-[3rem] p-0 relative overflow-hidden shadow-2xl border border-transparent">
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-accent rounded-full blur-[100px] opacity-40 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-primary-dark rounded-full blur-[100px] opacity-40 pointer-events-none"></div>
            
            <div className="relative z-10 px-10 py-16 md:py-24 md:px-20 text-center flex flex-col items-center">
              <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-full bg-white/10 text-white font-black text-[16px] mb-8 border border-white/10 tracking-wide backdrop-blur-md">
                Join the Elite Network • 10,000+ Nodes Active
              </div>
              <h3 className="h1-std text-white mb-8 leading-tight tracking-tight">Commence Systemic <br className="hidden md:block" /> Connectivity</h3>
              <p className="subtitle-std text-white/80 mb-12 max-w-3xl">
                Synchronization awaits. Finalize your profile and deploy your high-performance NFC hardware today.
              </p>
              <div className="flex flex-col sm:flex-row gap-5">
                <Link href="/shop" className="btn-primary-std bg-white text-primary px-12 py-5 text-[17px] shadow-2xl hover:bg-gray-50 active:scale-95">
                  Initialize Acquisition
                </Link>
                <Link href="/login" className="btn-secondary-std border-white/20 bg-white/5 text-white px-12 py-5 text-[17px] shadow-xl hover:bg-white/10 active:scale-95">
                  User Terminal
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}