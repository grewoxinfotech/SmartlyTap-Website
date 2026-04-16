"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/apiClient";
import { ShoppingCart, Star, ExternalLink, Camera, MessageCircle } from "lucide-react";
import { use } from "react";

export default function SmartProfile({ params }: { params: Promise<{ cardId: string }> }) {
  const resolvedParams = use(params);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await apiClient.get(`/cards/${resolvedParams.cardId}/redirect`);
        setData(response.data.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    }
    if (resolvedParams.cardId) {
      fetchProfile();
    }
  }, [resolvedParams.cardId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full mb-4"></div>
          <div className="w-48 h-6 bg-gray-200 rounded mb-2"></div>
          <div className="w-32 h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 text-center">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-red-100">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Card Not Found</h2>
          <p className="text-gray-500">{error || "This card is either inactive or doesn't exist."}</p>
        </div>
      </div>
    );
  }

  const { user, profile, links } = data;

  const handleLinkClick = async (link: any) => {
    // In background, log click
    try {
      await apiClient.post(`/analytics/click`, {
        cardUid: data.cardUid,
        linkType: link.type
      });
    } catch (e) {
      // Ignore analytics failure
    }
    window.location.href = link.url;
  };

  const getIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "whatsapp": return <MessageCircle className="w-6 h-6" />;
      case "instagram": return <Camera className="w-6 h-6" />;
      case "google_review": return <Star className="w-6 h-6" />;
      default: return <ExternalLink className="w-6 h-6" />;
    }
  };

  const getColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "whatsapp": return "bg-[#25D366] text-white border-transparent hover:bg-[#128C7E]";
      case "instagram": return "bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white border-transparent opacity-90 hover:opacity-100";
      case "google_review": return "bg-white text-gray-800 border-gray-200 hover:bg-gray-50";
      default: return "bg-gray-900 text-white border-transparent hover:bg-gray-800";
    }
  };

  // Determine branding color
  const primaryColor = profile?.branding?.primaryColor || "#000000";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        
        {/* Header Cover */}
        <div 
          className="h-32 w-full relative"
          style={{ backgroundColor: primaryColor, opacity: 0.1 }}
        ></div>
        
        <div className="px-6 py-8 relative">
          {/* Avatar */}
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
            {profile?.avatarUrl ? (
              <img 
                src={profile.avatarUrl} 
                alt={user?.name} 
                className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover bg-white"
              />
            ) : (
              <div 
                className="w-32 h-32 rounded-full border-4 border-white shadow-md flex items-center justify-center text-4xl font-bold text-white"
                style={{ backgroundColor: primaryColor }}
              >
                {user?.name?.charAt(0) || "U"}
              </div>
            )}
          </div>

          <div className="mt-16 text-center space-y-2">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              {user?.name || "Business Name"}
            </h1>
            <p className="text-md text-gray-500 font-medium">
              {profile?.title || "Professional / Business"}
            </p>
            {profile?.bio && (
              <p className="text-sm text-gray-600 mt-4 leading-relaxed max-w-sm mx-auto">
                {profile.bio}
              </p>
            )}
          </div>

          {/* Links Section */}
          <div className="mt-10 space-y-4">
            {links?.length > 0 ? (
              links.map((link: any, index: number) => (
                <button
                  key={index}
                  onClick={() => handleLinkClick(link)}
                  className={`w-full flex items-center p-4 rounded-xl border transition-all duration-200 transform hover:-translate-y-1 hover:shadow-md ${getColor(link.type)}`}
                >
                  <div className="flex-shrink-0">
                    {getIcon(link.type)}
                  </div>
                  <div className="flex-1 text-center pr-6 font-semibold">
                    {link.label || link.type.replace("_", " ").toUpperCase()}
                  </div>
                </button>
              ))
            ) : (
              <div className="text-center p-6 bg-gray-50 rounded-xl border border-gray-100 text-gray-500">
                No links configured yet.
              </div>
            )}
          </div>
          
          {/* Add to Contacts Button (Stub) */}
          <button 
            className="mt-8 w-full py-4 rounded-xl font-bold text-white shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0"
            style={{ backgroundColor: primaryColor }}
          >
            Save Contact
          </button>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-4 text-center border-t border-gray-100">
          <a href="/" className="text-xs text-gray-400 font-medium hover:text-gray-600 inline-flex items-center justify-center gap-1">
            Powered by 
            <span className="font-bold text-gray-900 ml-1">SmartlyTap</span>
            <ShoppingCart className="w-3 h-3 ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
}