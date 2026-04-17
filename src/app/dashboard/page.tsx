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
        <h1 className="h1-std mb-1">Welcome, {user?.name}</h1>
        <p className="p-std text-xs font-bold uppercase tracking-widest opacity-60">Here is your SmartlyTap platform overview.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="card-std p-6 flex flex-col items-center justify-center text-center transition-all duration-300 hover:border-primary/20">
          <div className="w-12 h-12 bg-primary/5 text-primary rounded-xl flex items-center justify-center mb-4 border border-primary/10">
            <CreditCard className="w-6 h-6" />
          </div>
          <h3 className="text-3xl font-black text-primary-dark mb-1">{cards.length}</h3>
          <p className="text-[12px] font-black tracking-widest uppercase text-gray-400">Active Cards</p>
        </div>

        <div className="card-std p-6 flex flex-col items-center justify-center text-center transition-all duration-300 hover:border-accent/20">
          <div className="w-12 h-12 bg-accent/5 text-accent rounded-xl flex items-center justify-center mb-4 border border-accent/10">
            <Eye className="w-6 h-6" />
          </div>
          <h3 className="text-3xl font-black text-primary-dark mb-1">
            {cards.reduce((acc, card) => acc + card.tap_count, 0)}
          </h3>
          <p className="text-[12px] font-black tracking-widest uppercase text-gray-400">Total Taps</p>
        </div>

        <div className="bg-primary-dark p-6 rounded-2xl shadow-xl text-white flex flex-col justify-center relative overflow-hidden border border-white/5">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-accent rounded-full blur-2xl opacity-30 pointer-events-none"></div>
          <h3 className="text-lg font-bold mb-1 relative z-10">Need more cards?</h3>
          <p className="text-white/60 text-[12px] font-bold uppercase tracking-widest mb-6 relative z-10">Expand your tools today.</p>
          <Link href="/shop" className="bg-accent text-white px-4 py-2.5 rounded-lg font-black text-[12px] uppercase tracking-widest text-center hover:bg-accent/80 transition-colors relative z-10 shadow-lg active:scale-95">
            Shop Store
          </Link>
        </div>
      </div>

      <div className="card-std p-6">
        <h2 className="font-black text-xs uppercase tracking-widest text-primary-dark mb-6 flex items-center gap-2">
          <div className="w-1 h-4 bg-accent rounded-full"></div>
          Quick Actions
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Link href="/dashboard/profile" className="flex items-center p-4 border border-gray-100 rounded-xl hover:border-primary/30 hover:shadow-sm transition-all duration-300 group bg-gray-50/50">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-white text-gray-400 transition-colors mr-4 border border-gray-100 shadow-sm">
              <LinkIcon className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-primary-dark text-xs uppercase tracking-wider mb-0.5">Edit Links</h4>
              <p className="text-[12px] text-gray-400 font-bold uppercase tracking-tighter">Update social profiles</p>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-primary transition-colors" />
          </Link>
          
          <Link href="/dashboard/cards" className="flex items-center p-4 border border-gray-100 rounded-xl hover:border-accent/30 hover:shadow-sm transition-all duration-300 group bg-gray-50/50">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center group-hover:bg-accent group-hover:text-white text-gray-400 transition-colors mr-4 border border-gray-100 shadow-sm">
              <CreditCard className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-primary-dark text-xs uppercase tracking-wider mb-0.5">My Cards</h4>
              <p className="text-[12px] text-gray-400 font-bold uppercase tracking-tighter">Manage your NFC cards</p>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-accent transition-colors" />
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