"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Smartphone, Lock, ArrowLeft, Wifi } from "lucide-react";
import { apiClient } from "@/lib/apiClient";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setMessage({ type: "error", text: "Invalid or missing reset token." });
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      await apiClient.post("/auth/reset-password", { token, password });
      setMessage({ type: "success", text: "Password reset successfully. You can now log in." });
      setTimeout(() => router.push("/login"), 3000);
    } catch (err: any) {
      setMessage({ type: "error", text: err?.response?.data?.message || "Failed to reset password." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
      <div className="bg-white py-8 px-4 shadow-[0_20px_40px_rgba(0,0,0,0.04)] sm:rounded-3xl sm:px-10 border border-gray-100">
        {message.text && (
          <div className={`mb-6 p-4 rounded-xl text-sm font-medium ${message.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
            {message.text}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-primary focus:border-primary sm:text-sm transition-colors"
                placeholder="Enter new password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading || !token}
              className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-[0_8px_20px_rgba(1,135,144,0.3)] text-lg font-bold text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all hover:-translate-y-1 disabled:opacity-50 disabled:transform-none disabled:shadow-none"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <Link href="/login" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-dark transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary-light blur-3xl opacity-50" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent blur-3xl opacity-20" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <Link href="/" className="flex flex-col items-center justify-center gap-3 mb-6 group">
          <div className="w-14 h-14 bg-primary-dark rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <Wifi className="w-7 h-7 text-white" />
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-extrabold text-primary-dark tracking-tight leading-none">SmartlyTap</span>
            <span className="text-xs font-semibold text-primary uppercase tracking-widest mt-1.5">World's No1 NFC Digital Business Card</span>
          </div>
        </Link>
        <h2 className="mt-8 text-center text-2xl font-bold tracking-tight text-primary-dark">
          Create new password
        </h2>
        <p className="mt-2 text-center text-sm font-medium text-gray-500">
          Please enter your new password below.
        </p>
      </div>

      <Suspense fallback={<div className="text-center mt-8">Loading...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}