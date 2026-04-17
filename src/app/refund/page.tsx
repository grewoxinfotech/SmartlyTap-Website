"use client";

import Link from "next/link";
import { ArrowLeft, ShieldCheck, RefreshCcw, HelpCircle } from "lucide-react";

export default function RefundPolicy() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Policy Header */}
      <section className="bg-white border-b border-gray-100 pt-32 pb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl opacity-50"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/5 text-primary rounded-full text-[12px] font-black uppercase tracking-[0.2em] mb-6 border border-primary/10">
            <ShieldCheck className="w-3.5 h-3.5" />
            Consumer Protection
          </div>
          <h1 className="h1-std mb-4">Refund & Cancellation</h1>
          <p className="p-std text-[11px] font-black uppercase tracking-widest opacity-60">Last Updated: April 16, 2026</p>
        </div>
      </section>

      {/* Policy Content */}
      <section className="section-std py-20 flex-1">
        <div className="max-w-3xl mx-auto px-4">
          <Link href="/" className="inline-flex items-center text-[12px] font-black text-gray-400 hover:text-primary mb-12 transition-all group uppercase tracking-widest">
            <ArrowLeft className="w-3 h-3 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to SmartlyTap
          </Link>

          <div className="space-y-12">
            <div className="card-std p-8 sm:p-12 hover:border-primary/20 transition-all border-white/50 shadow-2xl">
              <h2 className="font-black text-xs uppercase tracking-widest text-primary-dark mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-primary/5 text-primary flex items-center justify-center border border-primary/10 shadow-sm">
                  <RefreshCcw className="w-4 h-4" />
                </div>
                Return Protocol
              </h2>
              <div className="p-std text-xs space-y-4 leading-relaxed font-bold uppercase tracking-tight opacity-70">
                <p>We want you to be completely satisfied with your SmartlyTap hardware. If you are not satisfied, you may initiate a return protocol within 7 days of receiving your item.</p>
                <p>To be eligible for a return, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging. You’ll also need the receipt or proof of purchase.</p>
              </div>
            </div>

            <div className="card-std p-8 sm:p-12 hover:border-accent/20 transition-all border-white/50 shadow-2xl">
              <h2 className="font-black text-xs uppercase tracking-widest text-primary-dark mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-accent/5 text-accent flex items-center justify-center border border-accent/10 shadow-sm">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                Refund Processing
              </h2>
              <div className="p-std text-xs space-y-4 leading-relaxed font-bold uppercase tracking-tight opacity-70">
                <p>Once we receive and inspect your return, we will notify you of the approval or rejection of your refund. If approved, the refund will be processed to your original payment method within 5-7 business days.</p>
                <p>Please note that shipping costs are non-refundable, and you will be responsible for paying for your own shipping costs for returning your item.</p>
              </div>
            </div>

            <div className="card-std p-8 sm:p-12 hover:border-gray-200 transition-all border-white/50 shadow-2xl bg-gray-50/30">
              <h2 className="font-black text-xs uppercase tracking-widest text-primary-dark mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-white text-gray-400 flex items-center justify-center border border-gray-100 shadow-sm">
                  <HelpCircle className="w-4 h-4" />
                </div>
                Support Terminal
              </h2>
              <div className="p-std text-xs space-y-4 leading-relaxed font-bold uppercase tracking-tight opacity-70">
                <p>For any questions regarding our return and refund policies, please contact our support terminal at <span className="text-primary underline">support@smartlytap.com</span>.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
