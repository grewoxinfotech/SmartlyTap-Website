"use client";

import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Search,
  ShoppingCart,
  Smartphone,
  Star,
  Users,
  Wifi,
  RefreshCw,
  Link as LinkIcon,
  Phone
} from "lucide-react";

export default function Home() {
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
              <Link href="/" className="text-primary-dark font-bold hover:text-accent transition-colors">Home</Link>
              <Link href="/shop" className="text-gray-600 font-semibold hover:text-accent transition-colors">Shop</Link>
              <Link href="/dashboard" className="text-gray-600 font-semibold hover:text-accent transition-colors">My Account</Link>
              <Link href="/contact" className="text-gray-600 font-semibold hover:text-accent transition-colors">Contact Us</Link>
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

      {/* Hero Section */}
      <section className="relative pt-36 pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-background overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-light text-primary font-semibold text-sm mb-8 border border-primary/20">
            <Star className="w-4 h-4 fill-current" />
            The Future of Networking is Here
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-primary-dark tracking-tight leading-[1.1] max-w-4xl mx-auto">
            Upgrade to the Smart <span className="text-primary">NFC Business Card</span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            One tap connects your clients to your contact info, social links, and WhatsApp instantly. Stop printing paper cards. Start networking smartly.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/shop" className="px-8 py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-primary-dark transition-all shadow-[0_8px_20px_rgba(1,135,144,0.3)] hover:shadow-[0_12px_25px_rgba(1,135,144,0.4)] hover:-translate-y-1 flex items-center justify-center">
              Get Your Card <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link href="/login" className="px-8 py-4 bg-white text-primary-dark border-2 border-primary-dark/10 rounded-xl font-bold text-lg hover:border-primary-dark/30 transition-all flex items-center justify-center hover:-translate-y-1">
              Create Profile
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-primary-dark">How It Works</h2>
            <p className="mt-4 text-lg text-gray-500 font-medium">Three simple steps to digitize your presence.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center relative">
            <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-primary/10 via-primary/30 to-primary/10 z-0"></div>
            
            <div className="p-8 rounded-2xl bg-background border border-gray-100 hover:shadow-xl hover:border-primary/20 transition-all relative z-10 group hover:-translate-y-1">
              <div className="w-20 h-20 bg-white text-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md group-hover:scale-110 transition-transform duration-300">
                <Wifi className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-primary-dark mb-3">1. Tap Card</h3>
              <p className="text-gray-600 font-medium leading-relaxed">Customer taps their smartphone on your NFC card or scans the QR code.</p>
            </div>
            
            <div className="p-8 rounded-2xl bg-background border border-gray-100 hover:shadow-xl hover:border-primary/20 transition-all relative z-10 group hover:-translate-y-1">
              <div className="w-20 h-20 bg-white text-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md group-hover:scale-110 transition-transform duration-300">
                <Smartphone className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-primary-dark mb-3">2. Open Profile</h3>
              <p className="text-gray-600 font-medium leading-relaxed">Your digital profile opens instantly on their phone. No app installation required.</p>
            </div>
            
            <div className="p-8 rounded-2xl bg-background border border-gray-100 hover:shadow-xl hover:border-primary/20 transition-all relative z-10 group hover:-translate-y-1">
              <div className="w-20 h-20 bg-white text-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md group-hover:scale-110 transition-transform duration-300">
                <Users className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-primary-dark mb-3">3. Connect Instantly</h3>
              <p className="text-gray-600 font-medium leading-relaxed">They save your contact, WhatsApp you, or follow your social media in one click.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-primary-dark">Premium SaaS Features</h2>
            <p className="mt-4 text-lg text-gray-500 font-medium">Everything you need to network smarter and track engagement.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Instant Tap Sharing", desc: "Share your details in a millisecond with NFC technology.", icon: Wifi },
              { title: "No App Required", desc: "Works natively on all modern iOS and Android smartphones.", icon: Smartphone },
              { title: "Update Anytime", desc: "Change your details in the dashboard. Cards update instantly.", icon: RefreshCw },
              { title: "Multiple Links", desc: "Add WhatsApp, Instagram, LinkedIn, and website links.", icon: LinkIcon },
              { title: "Real-Time Analytics", desc: "Track how many people tapped and clicked your links.", icon: BarChart3 },
              { title: "Team Management", desc: "Manage cards for your entire company from one admin panel.", icon: Users }
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div key={i} className="bg-white p-8 rounded-2xl border border-gray-100 flex flex-col items-start text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] hover:border-primary/30 group">
                  <div className="w-14 h-14 rounded-xl bg-primary-light text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-primary-dark mb-3">{feature.title}</h3>
                  <p className="text-gray-600 font-medium leading-relaxed">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-primary-dark">Choose Your Smart Card</h2>
            <p className="mt-4 text-lg text-gray-500 font-medium">Premium materials. Custom branding. Infinite taps.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "PVC Classic", price: "₹999", desc: "Durable, high-quality PVC card with custom full-color printing.", img: "bg-gray-100 text-gray-400" },
              { name: "Executive Metal", price: "₹2,499", desc: "Premium laser-engraved stainless steel card for true executives.", img: "bg-gradient-to-br from-gray-800 to-gray-900 text-gray-300" },
              { name: "Eco Bamboo", price: "₹1,499", desc: "Sustainable and eco-friendly bamboo card with an elegant finish.", img: "bg-[#D4B895] text-white" }
            ].map((prod, i) => (
              <div key={i} className="bg-background rounded-3xl p-8 border border-gray-100 hover:shadow-xl hover:border-primary/20 transition-all duration-300 flex flex-col items-center text-center group hover:-translate-y-1">
                <div className={`w-48 h-32 rounded-2xl ${prod.img} mb-8 shadow-inner flex items-center justify-center transform group-hover:scale-105 transition-transform duration-500 relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <Wifi className="w-12 h-12 opacity-80" />
                </div>
                <h3 className="text-2xl font-bold text-primary-dark mb-3">{prod.name}</h3>
                <p className="text-gray-600 font-medium mb-6 flex-1 px-4">{prod.desc}</p>
                <div className="text-3xl font-extrabold text-primary mb-8">{prod.price}</div>
                <Link href="/shop" className="w-full py-4 bg-white border-2 border-primary text-primary rounded-xl font-bold hover:bg-primary hover:text-white transition-colors">
                  Shop Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 bg-primary-dark text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold">SaaS Platform Pricing</h2>
            <p className="mt-4 text-lg text-primary-light/80 font-medium">Choose the software plan that powers your smart cards.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { name: "Basic", price: "Free", period: "forever", features: ["1 Smart Card Link", "Basic Digital Profile", "Contact Sharing", "Standard Support"] },
              { name: "Business", price: "₹99", period: "/month", popular: true, features: ["Everything in Basic", "Advanced Analytics", "Lead Capture Form", "Custom Branding", "Priority Support"] },
              { name: "Enterprise", price: "Custom", period: "", features: ["Everything in Business", "Bulk Card Management", "API Access", "Dedicated Account Manager", "Custom Integrations"] }
            ].map((plan, i) => (
              <div key={i} className={`rounded-3xl p-8 ${plan.popular ? 'bg-primary border-primary shadow-[0_20px_50px_rgba(1,135,144,0.4)] transform md:-translate-y-4' : 'bg-primary-dark border-white/10'} border-2 flex flex-col`}>
                {plan.popular && <div className="text-white bg-accent px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-6 w-max">Most Popular</div>}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-8 pb-8 border-b border-white/10">
                  <span className="text-5xl font-extrabold">{plan.price}</span>
                  <span className={plan.popular ? "text-primary-light" : "text-white/60 font-medium"}>{plan.period}</span>
                </div>
                <ul className="space-y-5 mb-10 flex-1">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3">
                      <Star className={`w-5 h-5 ${plan.popular ? 'text-accent fill-accent' : 'text-primary fill-primary'}`} />
                      <span className="text-white/90 font-medium">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/shop" className={`w-full py-4 rounded-xl font-bold text-center transition-all ${plan.popular ? 'bg-white text-primary hover:bg-background shadow-lg hover:shadow-xl hover:-translate-y-1' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-primary-dark">Trusted by Professionals</h2>
            <p className="mt-4 text-lg text-gray-500 font-medium">
              Real results from modern teams using SmartlyTap.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              { name: "Vishal M.", role: "Managing Director", text: "Just tap and done — clients save my contact instantly. The analytics dashboard is a game-changer for our sales team.", rating: 5 },
              { name: "Dr. Yogesh", role: "Medical Professional", text: "No more paper cards. Patients can WhatsApp me or leave a Google Review in exactly one click. Looks extremely premium.", rating: 5 },
              { name: "Rajat S.", role: "Startup Founder", text: "We track taps and measure outreach much better now. Every employee has a metal card and it leaves a lasting impression.", rating: 5 },
            ].map((t) => (
              <div key={t.name} className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 transition-all hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)]">
                <div className="flex items-center gap-1 mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed font-medium text-lg italic">"{t.text}"</p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary-light flex items-center justify-center text-primary font-bold text-lg">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-primary-dark">{t.name}</div>
                    <div className="text-sm text-gray-500 font-medium">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-extrabold text-primary-dark">Frequently Asked Questions</h2>
            <p className="mt-4 text-lg text-gray-500 font-medium">
              Everything you need to know before upgrading.
            </p>
          </div>

          <div className="grid gap-6">
            {[
              { q: "Which phones support NFC?", a: "Almost all modern Android phones and iPhones (XR and newer) natively support NFC. For older devices, every card includes a custom QR code as a fallback." },
              { q: "Can I update my profile details anytime?", a: "Absolutely. Our SaaS dashboard allows you to edit your contact info, social links, and bio in real-time. The card updates instantly without needing a replacement." },
              { q: "Do my clients need an app to read the card?", a: "No app is required! When tapped, the card uses native NFC technology to open your digital profile directly in their default web browser." },
              { q: "Is shipping available across India?", a: "Yes, we ship our premium NFC cards PAN India with fast and secure delivery." },
            ].map((f) => (
              <div key={f.q} className="rounded-2xl border border-gray-100 bg-background p-8 hover:border-primary/20 transition-colors">
                <div className="text-xl font-bold text-primary-dark">{f.q}</div>
                <div className="mt-3 text-gray-600 font-medium leading-relaxed">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2.5rem] bg-primary relative overflow-hidden shadow-[0_20px_50px_rgba(1,135,144,0.3)]">
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-accent rounded-full blur-3xl opacity-50 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-primary-dark rounded-full blur-3xl opacity-50 pointer-events-none"></div>
            
            <div className="relative z-10 px-10 py-16 md:py-20 md:px-20 text-center flex flex-col items-center">
              <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Ready to Network Smartly?</h3>
              <p className="text-xl text-primary-light mb-10 max-w-2xl font-medium">
                Join thousands of professionals converting every handshake into a digital lead. Create your profile and order your card today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/shop" className="rounded-xl bg-white px-8 py-4 text-lg font-bold text-primary hover:bg-background transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1">
                  Shop Premium Cards
                </Link>
                <Link href="/login" className="rounded-xl border-2 border-white/30 bg-white/10 px-8 py-4 text-lg font-bold text-white hover:bg-white/20 transition-all hover:-translate-y-1">
                  Create Free Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-primary-dark text-white py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                  <Wifi className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-extrabold tracking-tight">SmartlyTap</span>
              </div>
              <p className="text-white/60 font-medium max-w-sm leading-relaxed mb-6">
                The modern way to network, gather Google reviews, and grow your business digitally. World's No1 NFC Digital Business Card.
              </p>
              <div className="flex items-center gap-3 text-accent font-bold">
                <Phone className="w-5 h-5" />
                <span>9662643079</span>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6 text-white">Quick Links</h4>
              <ul className="space-y-4 text-white/60 font-medium">
                <li><Link href="/" className="hover:text-accent transition-colors">Home</Link></li>
                <li><Link href="/shop" className="hover:text-accent transition-colors">Shop Cards</Link></li>
                <li><Link href="/pricing" className="hover:text-accent transition-colors">Pricing Plans</Link></li>
                <li><Link href="/dashboard" className="hover:text-accent transition-colors">My Account</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6 text-white">Legal</h4>
              <ul className="space-y-4 text-white/60 font-medium">
                <li><Link href="#" className="hover:text-accent transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-accent transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-accent transition-colors">Refund Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 text-center text-white/40 font-medium">
            <p>&copy; {new Date().getFullYear()} SmartlyTap. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}