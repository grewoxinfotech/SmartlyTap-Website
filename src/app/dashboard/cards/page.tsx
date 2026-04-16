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
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          My Cards
        </h1>
        <p className="text-gray-500 mt-1">
          View your assigned cards and performance.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-all hover:-translate-y-1 hover:shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#EEF2FF] to-white text-[#4F46E5] rounded-full flex items-center justify-center border border-gray-100">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Total cards</div>
              <div className="text-2xl font-extrabold text-gray-900">
                {cards.length}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-all hover:-translate-y-1 hover:shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#ECFDF5] to-white text-[#22C55E] rounded-full flex items-center justify-center border border-gray-100">
              <Eye className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Total taps</div>
              <div className="text-2xl font-extrabold text-gray-900">
                {totalTaps}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-all hover:-translate-y-1 hover:shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#EEF2FF] to-white text-[#3B82F6] rounded-full flex items-center justify-center border border-gray-100">
              <ToggleLeft className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Active cards</div>
              <div className="text-2xl font-extrabold text-gray-900">
                {cards.filter((c) => c.is_active !== false).length}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Cards</h2>
          <p className="text-sm text-gray-500 mt-1">
            Your card IDs and tap counts.
          </p>
        </div>

        {cards.length === 0 ? (
          <div className="p-10 text-center text-gray-500">
            No cards assigned yet.
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {cards.map((c) => (
              <div key={c.id} className="p-6 flex items-center justify-between">
                <div>
                  <div className="font-bold text-gray-900">{c.id}</div>
                  <div className="text-sm text-gray-500">
                    Status:{" "}
                    <span
                      className={
                        c.is_active === false ? "text-red-600" : "text-green-600"
                      }
                    >
                      {c.is_active === false ? "Inactive" : "Active"}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Taps</div>
                  <div className="text-xl font-extrabold text-gray-900">
                    {c.tap_count || 0}
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

