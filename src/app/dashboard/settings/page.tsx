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
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Account Settings
        </h1>
        <p className="text-gray-500 mt-1">
          Manage your account preferences, security, and notifications.
        </p>
      </div>

      {message.text && (
        <div className={`p-4 rounded-xl text-sm font-medium ${message.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
          {message.text}
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Profile Info */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
          <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
            <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xl font-bold">
              {user?.name?.charAt(0) || "U"}
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900">
                {user?.name || "-"}
              </div>
              <div className="text-sm text-gray-500">{user?.role || "USER"} • {user?.plan || "BASIC"} Plan</div>
            </div>
          </div>

          <form onSubmit={handleUpdateEmail} className="space-y-4">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-400" />
              Email Address
            </h3>
            <div>
              <input
                type="email"
                value={emailForm.email}
                onChange={(e) => setEmailForm({ email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
            <button type="submit" className="bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors">
              Update Email
            </button>
          </form>
        </div>

        {/* Security */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
          <div className="border-b border-gray-100 pb-6">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2 text-lg">
              <Lock className="w-5 h-5 text-gray-400" />
              Security & Password
            </h3>
            <p className="text-sm text-gray-500 mt-1">Ensure your account is using a long, random password to stay secure.</p>
          </div>

          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
              <input
                type="password"
                value={passForm.currentPassword}
                onChange={(e) => setPassForm(p => ({ ...p, currentPassword: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input
                type="password"
                value={passForm.newPassword}
                onChange={(e) => setPassForm(p => ({ ...p, newPassword: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
            <button type="submit" className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors">
              Change Password
            </button>
          </form>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6 lg:col-span-2">
          <div className="border-b border-gray-100 pb-6 flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-gray-900 flex items-center gap-2 text-lg">
                <Bell className="w-5 h-5 text-gray-400" />
                Notifications
              </h3>
              <p className="text-sm text-gray-500 mt-1">Manage how you receive communications from us.</p>
            </div>
            <button
              onClick={logout}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 font-bold transition-colors text-sm"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>

          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center justify-between py-3 border-b border-gray-50">
              <div>
                <p className="font-medium text-gray-900">Email Notifications</p>
                <p className="text-sm text-gray-500">Receive emails about your account activity and security.</p>
              </div>
              <button 
                onClick={() => toggleNotification("email")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifications.email ? "bg-blue-600" : "bg-gray-200"}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications.email ? "translate-x-6" : "translate-x-1"}`} />
              </button>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-50">
              <div>
                <p className="font-medium text-gray-900">SMS Notifications</p>
                <p className="text-sm text-gray-500">Receive text messages for important order updates.</p>
              </div>
              <button 
                onClick={() => toggleNotification("sms")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifications.sms ? "bg-blue-600" : "bg-gray-200"}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications.sms ? "translate-x-6" : "translate-x-1"}`} />
              </button>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-gray-900">Marketing Emails</p>
                <p className="text-sm text-gray-500">Receive emails about new features and special offers.</p>
              </div>
              <button 
                onClick={() => toggleNotification("marketing")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifications.marketing ? "bg-blue-600" : "bg-gray-200"}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications.marketing ? "translate-x-6" : "translate-x-1"}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

