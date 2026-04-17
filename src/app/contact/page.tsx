import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import { Phone, Wifi, MapPin, Mail } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <SiteHeader cartCount={0} />

      {/* Header Section */}
      <section className="header-std relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-primary-light rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="text-[12px] text-gray-400 font-bold uppercase tracking-widest mb-4">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link> <span className="mx-2">/</span>{" "}
            <span className="text-primary-dark">Contact Us</span>
          </div>
          <h1 className="h1-std">Get in Touch</h1>
          <p className="mt-2 text-base text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed">
            Have questions about SmartlyTap? Want to discuss a bulk enterprise order? We are here to help you network smarter.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-std flex-1 text-center lg:text-left">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Section Headers */}
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 items-end">
            <div>
              <h2 className="h2-std mb-2">Keep in touch with us</h2>
              <p className="p-std text-sm leading-relaxed text-gray-400">
                At <span className="text-primary font-black uppercase tracking-tighter">SmartlyTap</span> we believe in building better relationships. We know that people are so much more than what fits on a piece of paper, so we created a way to showcase the entirety of who they are. One of the most basic human instincts is to connect—and the more we know about each other, the easier it is to find those commonalities that strengthen our relationships.
              </p>
            </div>
            <div className="hidden lg:block">
              <h2 className="font-black text-xs uppercase tracking-widest text-primary-dark opacity-40">Direct Communication</h2>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 items-start">
            {/* Left Column: Info Cards */}
            <div className="grid gap-4">
              <div className="card-hover-std p-6">
                <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6 shadow-inner border border-primary/10 transition-colors duration-300">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="font-black text-xs uppercase tracking-widest text-primary-dark mb-4">Corporate Office</h3>
                <div className="flex items-start gap-3 p-std">
                  <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary shrink-0 transition-colors border border-primary/10">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <p className="text-[11px] font-bold uppercase tracking-tight leading-relaxed pt-0.5">
                    Shop No. 100, Atlanta shopping mall, near sudama chowk, Surat, Gujarat, India
                  </p>
                </div>
              </div>

              <div className="card-hover-std p-6">
                <div className="w-10 h-10 bg-accent/10 text-accent rounded-xl flex items-center justify-center mb-6 shadow-inner border border-accent/10 transition-colors duration-300">
                  <Phone className="w-5 h-5" />
                </div>
                <h3 className="font-black text-xs uppercase tracking-widest text-primary-dark mb-4">Contact Gateway</h3>
                <div className="space-y-4 p-std">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-accent/5 flex items-center justify-center text-accent shrink-0 border border-accent/10">
                      <Phone className="w-4 h-4" />
                    </div>
                    <p className="text-[11px] font-black tracking-widest">+91 9727509747</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-accent/5 flex items-center justify-center text-accent shrink-0 border border-accent/10">
                      <Mail className="w-4 h-4" />
                    </div>
                    <p className="text-[11px] font-black tracking-widest">support@smartlytap.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Form Card */}
            <div className="space-y-6">
              <div className="lg:hidden">
                <h2 className="h2-std mb-6">Dispatch Message</h2>
              </div>
              
              <div className="card-std p-8">
                <form className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="label-std">Legal First Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Sebastian"
                        className="input-std"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="label-std">Legal Last Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Vettel"
                        className="input-std"
                      />
                    </div>
                  </div>
 
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="label-std">Contact Terminal</label>
                      <input
                        type="tel"
                        placeholder="+91 00000 00000"
                        className="input-std"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="label-std">Subject Category</label>
                      <input
                        type="text"
                        placeholder="Inquiry Topic"
                        className="input-std"
                      />
                    </div>
                  </div>
 
                  <div className="space-y-1.5">
                    <label className="label-std">Message Content</label>
                    <textarea
                      rows={3}
                      placeholder="How can our agents assist you?"
                      className="input-std min-h-[100px]"
                    />
                  </div>
 
                  <button
                    type="button"
                    className="w-full btn-primary-std !py-3.5 !text-[12px] !shadow-lg active:scale-95"
                  >
                    SEND TRANSMISSION
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="card-std overflow-hidden p-0 mt-8">
            <iframe
              title="SmartlyTap Location"
              src="https://maps.google.com/maps?q=Surat%20Gujarat%20India&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="w-full h-[300px] md:h-[400px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
