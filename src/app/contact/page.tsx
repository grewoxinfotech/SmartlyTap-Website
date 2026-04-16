import Link from "next/link";
import { Phone, Search, ShoppingCart, Wifi, MapPin, Mail } from "lucide-react";

export default function ContactPage() {
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
              <Link href="/shop" className="text-gray-600 font-semibold hover:text-accent transition-colors">Shop</Link>
              <Link href="/dashboard" className="text-gray-600 font-semibold hover:text-accent transition-colors">My Account</Link>
              <Link href="/contact" className="text-primary-dark font-bold hover:text-accent transition-colors">Contact Us</Link>
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

      {/* Header Section */}
      <section className="pt-36 pb-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-primary-light rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="text-sm text-gray-500 font-medium mb-6">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link> <span className="mx-2">/</span>{" "}
            <span className="text-primary-dark font-bold">Contact Us</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary-dark tracking-tight">
            Get in Touch
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed">
            Have questions about SmartlyTap? Want to discuss a bulk enterprise order? We are here to help you network smarter.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 flex-1">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.04)]">
            <iframe
              title="infyTap Location"
              src="https://maps.google.com/maps?q=Surat%20Gujarat%20India&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="w-full h-[320px] md:h-[420px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-primary-dark tracking-tight">Keep in touch with us</h2>
                <p className="mt-4 text-gray-600 font-medium leading-relaxed">
                  At infyTap we believe in building better relationships. We know that people are so much more than what
                  fits on a piece of paper, so we created a way to showcase the entirety of who they are. One of the most
                  basic human instincts is to connect-and the more we know about each other, the easier it is to find
                  those commonalities that strengthens our relationships.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.04)] space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-primary-dark mb-3">Address</h3>
                  <div className="flex items-start gap-3 text-gray-600 font-medium">
                    <MapPin className="w-5 h-5 text-primary mt-0.5" />
                    <p>339 Atlanta shopping mall , near sudama chowk Surat Gujarat India</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <h3 className="text-xl font-bold text-primary-dark mb-3">Contact</h3>
                  <div className="space-y-3 text-gray-600 font-medium">
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-primary" />
                      <p>Mobile: +91 9727509747</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-primary" />
                      <p>E-mail: support@infytap.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 md:p-10 border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.04)]">
              <h2 className="text-2xl font-bold text-primary-dark mb-8">Send a message</h2>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      className="w-full px-5 py-4 bg-background border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-medium transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      className="w-full px-5 py-4 bg-background border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-medium transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Contact Number</label>
                  <input
                    type="tel"
                    className="w-full px-5 py-4 bg-background border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-medium transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Subject</label>
                  <input
                    type="text"
                    className="w-full px-5 py-4 bg-background border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-medium transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                  <textarea
                    rows={5}
                    className="w-full px-5 py-4 bg-background border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-medium transition-all resize-none"
                  />
                </div>

                <button
                  type="button"
                  className="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-primary-dark transition-all shadow-[0_8px_20px_rgba(1,135,144,0.3)] hover:shadow-[0_12px_25px_rgba(1,135,144,0.4)] hover:-translate-y-1"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      </div>
    );
  }


