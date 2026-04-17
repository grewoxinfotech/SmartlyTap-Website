"use client";

import { useEffect, useMemo, useState } from "react";
import { apiClient } from "@/lib/apiClient";
import { CreditCard, Eye, ToggleLeft } from "lucide-react";

export default function DashboardCardsPage() {
  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user_data");
    if (!storedUser) return;
    const user = JSON.parse(storedUser);

    apiClient
      .get(`/cards/${user.id}`)
      .then((res) => setCards(res.data.data || []))
      .finally(() => setLoading(false));
  }, []);

  const totalTaps = useMemo(
    () => cards.reduce((acc, c) => acc + (c.tap_count || 0), 0),
    [cards]
  );

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 animate-pulse">
        Loading cards...
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="h1-std mb-1">My NFC Cards</h1>
        <p className="p-std text-xs font-bold uppercase tracking-widest opacity-60">
          View your assigned cards and real-time tap performance.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        <div className="card-std p-5 flex items-center gap-4 transition-all hover:border-primary/20">
          <div className="w-10 h-10 bg-primary/5 text-primary rounded-xl flex items-center justify-center border border-primary/10">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[12px] font-black uppercase tracking-widest text-gray-400">Total Cards</div>
            <div className="text-xl font-black text-primary-dark">
              {cards.length}
            </div>
          </div>
        </div>
        <div className="card-std p-5 flex items-center gap-4 transition-all hover:border-accent/20">
          <div className="w-10 h-10 bg-accent/5 text-accent rounded-xl flex items-center justify-center border border-accent/10">
            <Eye className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[12px] font-black uppercase tracking-widest text-gray-400">Total Taps</div>
            <div className="text-xl font-black text-primary-dark">
              {totalTaps}
            </div>
          </div>
        </div>
        <div className="card-std p-5 flex items-center gap-4 transition-all hover:border-green-500/20">
          <div className="w-10 h-10 bg-green-500/5 text-green-600 rounded-xl flex items-center justify-center border border-green-500/10">
            <ToggleLeft className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[12px] font-black uppercase tracking-widest text-gray-400">Active Status</div>
            <div className="text-xl font-black text-green-600">
              {cards.filter((c) => c.is_active !== false).length}
            </div>
          </div>
        </div>
      </div>

      <div className="card-std overflow-hidden">
        <div className="p-5 border-b border-gray-100 bg-gray-50/50">
          <h2 className="font-black text-[12px] uppercase tracking-widest text-primary-dark">Inventory List</h2>
        </div>
 
        {cards.length === 0 ? (
          <div className="p-12 text-center text-gray-400 font-bold text-[12px] uppercase tracking-widest">
            No cards assigned to your account yet.
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {cards.map((c) => (
              <div key={c.id} className="p-5 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center border border-gray-100 text-primary scale-90">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-black text-primary-dark text-xs">{c.id}</div>
                    <div className="text-[11px] font-black uppercase tracking-tighter mt-0.5">
                      <span className="text-gray-400 mr-1.5">Status:</span>
                      <span
                        className={
                          c.is_active === false ? "text-red-500" : "text-green-500"
                        }
                      >
                        {c.is_active === false ? "Offline" : "Ready"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-0.5">Performance</div>
                  <div className="text-lg font-black text-primary-dark leading-none">
                    {c.tap_count || 0} <span className="text-[12px] text-gray-300 font-bold ml-0.5">TAPS</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

