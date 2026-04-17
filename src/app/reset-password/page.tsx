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
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
      <div className="card-std py-10 px-6 sm:px-12 bg-white border-white/40 shadow-2xl">
        {message.text && (
          <div className={`mb-8 p-4 rounded-xl text-[12px] font-black uppercase tracking-widest text-center border ${message.type === "success" ? "bg-green-50 text-green-600 border-green-100" : "bg-red-50 text-red-600 border-red-100"}`}>
            {message.text}
          </div>
        )}
 
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="password" className="label-std">
              Personal Access Key
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                <Lock className="h-4 w-4" />
              </div>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-std pl-12"
                placeholder="••••••••••••"
              />
            </div>
          </div>
 
          <button
            type="submit"
            disabled={loading || !token}
            className="w-full btn-primary-std !py-4 !text-[11px] !shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                OVERRIDING...
              </>
            ) : "COMMIT NEW PASSWORD"}
          </button>
        </form>
 
        <div className="mt-10 text-center">
          <Link href="/login" className="inline-flex items-center gap-2 text-[12px] font-black text-primary hover:text-primary-dark transition-all uppercase tracking-widest group">
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            Back to Login
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

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <Link href="/" className="flex flex-col items-center justify-center gap-4 mb-10 group">
          <div className="w-16 h-16 bg-primary-dark rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-105 transition-all duration-500 border border-primary/20">
            <Wifi className="w-8 h-8 text-white" />
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-black text-primary-dark tracking-tighter leading-none">SmartlyTap</span>
            <span className="text-[12px] font-black text-primary uppercase tracking-[0.2em] mt-2">Security Override</span>
          </div>
        </Link>
        <h2 className="h2-std text-center !text-3xl mb-2">
          New Credential
        </h2>
        <p className="p-std text-center text-[12px] font-black uppercase tracking-widest opacity-60">
          Establish your new encrypted access key below.
        </p>
      </div>

      <Suspense fallback={<div className="text-center mt-8">Loading...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}