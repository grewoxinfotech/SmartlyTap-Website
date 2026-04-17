"use client";

import Link from "next/link";
import { Wifi, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-primary-dark text-white py-10 border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg border border-white/10">
                <Wifi className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">SmartlyTap</span>
            </div>
            <p className="text-white/65 font-semibold max-w-md leading-relaxed mb-6 text-[17px] tracking-normal">
              The modern way to network, gather Google reviews, and grow your business digitally. World's No. 1 NFC Digital Business Card.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-accent font-bold text-[17px] tracking-normal hover:text-white transition-colors cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span>+91 9662643079</span>
              </div>
              <div className="flex items-center gap-3 text-white/75 font-bold text-[17px] tracking-normal hover:text-accent transition-colors cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                  <Mail className="w-3.5 h-3.5 text-accent" />
                </div>
                <span>support@smartlytap.com</span>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-black text-[18px] tracking-wide mb-6 text-white border-b border-accent/20 pb-2 w-max">Quick Links</h4>
            <ul className="space-y-3.5 text-white/70 font-semibold text-[17px] tracking-normal">
              <li><Link href="/" className="hover:text-accent transition-colors">Home</Link></li>
              <li><Link href="/shop" className="hover:text-accent transition-colors">Shop Cards</Link></li>
              <li><Link href="/pricing" className="hover:text-accent transition-colors">Pricing Plans</Link></li>
              <li><Link href="/dashboard" className="hover:text-accent transition-colors">My Account</Link></li>
            </ul>
          </div>
          
          {/* Legal Links */}
          <div>
            <h4 className="font-black text-[18px] tracking-wide mb-6 text-white border-b border-accent/20 pb-2 w-max">Legal</h4>
            <ul className="space-y-3.5 text-white/70 font-semibold text-[17px] tracking-normal">
              <li><Link href="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-accent transition-colors">Terms of Service</Link></li>
              <li><Link href="/refund" className="hover:text-accent transition-colors">Refund Policy</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="pt-6 border-t border-white/10 text-center text-white/50 font-medium text-[16px] tracking-normal">
          <p>&copy; {new Date().getFullYear()} SmartlyTap. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
