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

  if (loading) return <div className="p-8 text-center text-gray-500 animate-pulse">Loading dashboard...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Welcome, {user?.name}</h1>
        <p className="text-gray-500 mt-1">Here is the overview of your SmartlyTap account.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
            <CreditCard className="w-6 h-6" />
          </div>
          <h3 className="text-3xl font-extrabold text-gray-900 mb-1">{cards.length}</h3>
          <p className="text-gray-500 font-medium">Active Cards</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
            <Eye className="w-6 h-6" />
          </div>
          <h3 className="text-3xl font-extrabold text-gray-900 mb-1">
            {cards.reduce((acc, card) => acc + card.tap_count, 0)}
          </h3>
          <p className="text-gray-500 font-medium">Total Profile Views</p>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-2xl shadow-md text-white flex flex-col justify-center">
          <h3 className="text-xl font-bold mb-2">Need more cards?</h3>
          <p className="text-blue-100 text-sm mb-6">Expand your networking tools.</p>
          <Link href="/shop" className="bg-white text-blue-600 px-4 py-2 rounded-lg font-bold text-center hover:bg-gray-50 transition-colors">
            Shop Now
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Link href="/dashboard/profile" className="flex items-center p-4 border border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-sm transition-all group">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors mr-4">
              <LinkIcon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-900">Update Profile Links</h4>
              <p className="text-sm text-gray-500">Edit WhatsApp, Instagram, etc.</p>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
          </Link>

          <Link href="/dashboard/cards" className="flex items-center p-4 border border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-sm transition-all group">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors mr-4">
              <CreditCard className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-900">Manage Cards</h4>
              <p className="text-sm text-gray-500">View stats and active status.</p>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
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