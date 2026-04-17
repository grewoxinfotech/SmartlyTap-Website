"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Shield, User, Bell, Mail, Lock } from "lucide-react";
import { apiClient } from "@/lib/apiClient";

export default function DashboardSettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  
  const [emailForm, setEmailForm] = useState({ email: "" });
  const [passForm, setPassForm] = useState({ currentPassword: "", newPassword: "" });
  const [notifications, setNotifications] = useState({ email: true, sms: false, marketing: true });

  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    const storedUser = localStorage.getItem("user_data");
    if (storedUser) {
      const u = JSON.parse(storedUser);
      setUser(u);
      setEmailForm({ email: u.email });
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user_token");
    localStorage.removeItem("user_data");
    router.replace("/login");
  };

  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.post("/auth/update-email", { newEmail: emailForm.email, password: passForm.currentPassword || "123456" }); // needs password in real world, using placeholder for demo
      setMessage({ type: "success", text: "Email updated successfully" });
      const updatedUser = { ...user, email: emailForm.email };
      localStorage.setItem("user_data", JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (err: any) {
      setMessage({ type: "error", text: err?.response?.data?.message || "Failed to update email" });
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.post("/auth/change-password", passForm);
      setMessage({ type: "success", text: "Password changed successfully" });
      setPassForm({ currentPassword: "", newPassword: "" });
    } catch (err: any) {
      setMessage({ type: "error", text: err?.response?.data?.message || "Failed to change password" });
    }
  };

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    // Here you would typically also make an API call to save preferences
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="h1-std mb-1">Account Configuration</h1>
        <p className="p-std text-xs font-bold uppercase tracking-widest opacity-60">
          Manage your security credentials, email synchronization, and alerts.
        </p>
      </div>

      {message.text && (
        <div className={`p-4 rounded-xl text-[12px] font-black uppercase tracking-widest border shadow-inner ${message.type === "success" ? "bg-primary/5 text-primary border-primary/20" : "bg-red-50 text-red-600 border-red-200"}`}>
          {message.text}
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Profile Info */}
        <div className="card-std p-8 space-y-6">
          <div className="flex items-center gap-5 border-b border-gray-100 pb-8">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center text-xl font-black shadow-inner border border-primary/10">
              {user?.name?.charAt(0) || "U"}
            </div>
            <div>
              <div className="text-xl font-black text-primary-dark">
                {user?.name || "-"}
              </div>
              <div className="text-[12px] font-black uppercase tracking-widest text-gray-400 mt-1">{user?.role || "USER"} • {user?.plan || "BASIC"} SUBSCRIPTION</div>
            </div>
          </div>

          <form onSubmit={handleUpdateEmail} className="space-y-4">
            <h3 className="font-black text-[12px] uppercase tracking-widest text-primary-dark flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-400" />
              Correspondence Email
            </h3>
            <div className="space-y-1.5">
              <input
                type="email"
                value={emailForm.email}
                onChange={(e) => setEmailForm({ email: e.target.value })}
                className="input-std"
                required
              />
            </div>
            <button type="submit" className="btn-primary-std !px-6 !py-2.5 !text-[12px] !shadow-md active:scale-95">
              Sync Email
            </button>
          </form>
        </div>

        {/* Security */}
        <div className="card-std p-8 space-y-6">
          <div className="border-b border-gray-100 pb-8">
            <h3 className="font-black text-xs uppercase tracking-widest text-primary-dark flex items-center gap-2">
              <Lock className="w-5 h-5 text-gray-400" />
              Security Creds
            </h3>
            <p className="text-[12px] text-gray-400 font-bold uppercase tracking-widest mt-2">Maintain a robust password to ensure account integrity.</p>
          </div>
 
          <form onSubmit={handleUpdatePassword} className="space-y-5">
            <div className="space-y-1.5">
              <label className="label-std">Current Password</label>
              <input
                type="password"
                value={passForm.currentPassword}
                onChange={(e) => setPassForm(p => ({ ...p, currentPassword: e.target.value }))}
                className="input-std"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="label-std">New Secure Password</label>
              <input
                type="password"
                value={passForm.newPassword}
                onChange={(e) => setPassForm(p => ({ ...p, newPassword: e.target.value }))}
                className="input-std"
                required
              />
            </div>
            <button type="submit" className="btn-primary-std !px-6 !py-2.5 !text-[12px] !shadow-md active:scale-95">
              Update Access
            </button>
          </form>
        </div>

        {/* Notifications */}
        <div className="card-std p-8 space-y-8 lg:col-span-2">
          <div className="border-b border-gray-100 pb-8 flex justify-between items-center">
            <div>
              <h3 className="font-black text-xs uppercase tracking-widest text-primary-dark flex items-center gap-2">
                <Bell className="w-5 h-5 text-gray-400" />
                Alert Preferences
              </h3>
              <p className="text-[12px] text-gray-400 font-bold uppercase tracking-widest mt-2">Manage how you receive critical platform updates.</p>
            </div>
            <button
              onClick={logout}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-red-200 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white font-black text-[12px] uppercase tracking-widest transition-all active:scale-95 shadow-sm"
            >
              <LogOut className="w-4 h-4" />
              Kill Session
            </button>
          </div>

          <div className="space-y-6 max-w-3xl">
            <div className="flex items-center justify-between py-4 border-b border-gray-50">
              <div>
                <p className="font-black text-xs uppercase tracking-tight text-primary-dark">Email Correspondence</p>
                <p className="text-[12px] text-gray-400 font-bold uppercase tracking-tighter">Receive alerts about account activity and safety.</p>
              </div>
              <button 
                onClick={() => toggleNotification("email")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all shadow-inner ${notifications.email ? "bg-primary" : "bg-gray-200"}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${notifications.email ? "translate-x-6" : "translate-x-1"}`} />
              </button>
            </div>
            <div className="flex items-center justify-between py-4 border-b border-gray-50">
              <div>
                <p className="font-black text-xs uppercase tracking-tight text-primary-dark">SMS Broadcasting</p>
                <p className="text-[12px] text-gray-400 font-bold uppercase tracking-tighter">Receive text messages for real-time order updates.</p>
              </div>
              <button 
                onClick={() => toggleNotification("sms")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all shadow-inner ${notifications.sms ? "bg-primary" : "bg-gray-200"}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${notifications.sms ? "translate-x-6" : "translate-x-1"}`} />
              </button>
            </div>
            <div className="flex items-center justify-between py-4">
              <div>
                <p className="font-black text-xs uppercase tracking-tight text-primary-dark">Marketing & News</p>
                <p className="text-[12px] text-gray-400 font-bold uppercase tracking-tighter">Stay updated on new features and exclusive plans.</p>
              </div>
              <button 
                onClick={() => toggleNotification("marketing")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all shadow-inner ${notifications.marketing ? "bg-primary" : "bg-gray-200"}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${notifications.marketing ? "translate-x-6" : "translate-x-1"}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

