"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/apiClient";
import { Star, Link as LinkIcon, Eye, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function UserDashboardOverview() {
  const [user, setUser] = useState<any>(null);
  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user_data");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      
      apiClient.get(`/cards/${parsedUser.id}`).then(res => {
        setCards(res.data.data);
      }).finally(() => setLoading(false));
    }
  }, []);

  if (loading) return <div className="p-8 text-center text-gray-500 animate-pulse font-medium">Loading dashboard...</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary-dark">Welcome, {user?.name}</h1>
        <p className="text-gray-500 mt-1 font-medium">Here is the overview of your SmartlyTap account.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:border-primary/20">
          <div className="w-14 h-14 bg-primary-light text-primary rounded-2xl flex items-center justify-center mb-6">
            <CreditCard className="w-7 h-7" />
          </div>
          <h3 className="text-4xl font-extrabold text-primary-dark mb-2">{cards.length}</h3>
          <p className="text-gray-500 font-bold tracking-wide uppercase text-xs">Active Cards</p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:border-primary/20">
          <div className="w-14 h-14 bg-[#E6F8F8] text-accent rounded-2xl flex items-center justify-center mb-6">
            <Eye className="w-7 h-7" />
          </div>
          <h3 className="text-4xl font-extrabold text-primary-dark mb-2">
            {cards.reduce((acc, card) => acc + card.tap_count, 0)}
          </h3>
          <p className="text-gray-500 font-bold tracking-wide uppercase text-xs">Total Profile Views</p>
        </div>

        <div className="bg-primary-dark p-8 rounded-3xl shadow-[0_20px_40px_rgba(0,84,97,0.3)] text-white flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-accent rounded-full blur-2xl opacity-40 pointer-events-none"></div>
          <h3 className="text-2xl font-bold mb-3 relative z-10">Need more cards?</h3>
          <p className="text-primary-light/80 text-sm mb-8 font-medium relative z-10">Expand your networking tools and reach more clients.</p>
          <Link href="/shop" className="bg-white text-primary-dark px-5 py-3.5 rounded-xl font-bold text-center hover:bg-background transition-colors relative z-10 shadow-lg">
            Shop Now
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-gray-100 p-8">
        <h2 className="text-xl font-bold text-primary-dark mb-6">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          <Link href="/dashboard/profile" className="flex items-center p-5 border border-gray-100 rounded-2xl hover:border-primary/30 hover:shadow-md transition-all duration-300 group bg-background hover:bg-white">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center group-hover:bg-primary-light group-hover:text-primary text-gray-400 transition-colors mr-5 border border-gray-100 group-hover:border-transparent">
              <LinkIcon className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-primary-dark mb-1">Update Profile Links</h4>
              <p className="text-sm text-gray-500 font-medium">Edit WhatsApp, Instagram, etc.</p>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-primary transition-colors" />
          </Link>

          <Link href="/dashboard/cards" className="flex items-center p-5 border border-gray-100 rounded-2xl hover:border-primary/30 hover:shadow-md transition-all duration-300 group bg-background hover:bg-white">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center group-hover:bg-[#E6F8F8] group-hover:text-accent text-gray-400 transition-colors mr-5 border border-gray-100 group-hover:border-transparent">
              <CreditCard className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-primary-dark mb-1">Manage Cards</h4>
              <p className="text-sm text-gray-500 font-medium">View stats and active status.</p>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-accent transition-colors" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function CreditCard(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  );
}