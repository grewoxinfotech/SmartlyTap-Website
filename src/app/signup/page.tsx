"use client";

import Link from "next/link";
import { useState } from "react";
import { Smartphone, UserPlus, Wifi } from "lucide-react";
import { apiClient } from "@/lib/apiClient";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await apiClient.post("/auth/signup", { name, email, password });
      const { user, token } = res.data.data;
      localStorage.setItem("user_token", token);
      localStorage.setItem("user_data", JSON.stringify(user));
      router.replace(user?.role === "ADMIN" ? "/admin/dashboard" : "/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-[#F9FAFB] overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-primary-light blur-3xl opacity-50" />
        <div className="absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full bg-accent blur-3xl opacity-20" />
      </div>

      <nav className="w-full bg-white/80 backdrop-blur border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-16">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-primary-dark rounded-lg flex items-center justify-center shadow-md">
                <Wifi className="w-4 h-4 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-extrabold text-primary-dark tracking-tight leading-none">SmartlyTap</span>
                <span className="text-[12px] font-semibold text-primary uppercase tracking-widest mt-0.5">World's No1 NFC Digital Business Card</span>
              </div>
            </Link>
          </div>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
        <div className="card-std max-w-sm w-full space-y-6">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 shadow-inner border border-primary/10">
              <UserPlus className="h-6 w-6" />
            </div>
            <h2 className="h2-std mb-1">Create Account</h2>
            <p className="p-std text-[12px] font-black uppercase tracking-widest opacity-60">
              Join the future of professional networking.
            </p>
          </div>

          <form className="mt-6 space-y-5" onSubmit={submit}>
            {error ? (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2.5 rounded-xl text-[12px] font-black uppercase tracking-widest text-center shadow-sm">
                {error}
              </div>
            ) : null}

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="label-std">Full Legal Name</label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-std"
                  placeholder="e.g. John Doe"
                />
              </div>
              <div className="space-y-1.5">
                <label className="label-std">Business Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-std"
                  placeholder="name@company.com"
                />
              </div>
              <div className="space-y-1.5">
                <label className="label-std">Account Password</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-std"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary-std py-3.5 !text-[12px] !shadow-lg active:scale-95"
            >
              {loading ? "PROCESSING..." : "REGISTER ACCOUNT"}
            </button>

            <p className="text-[12px] text-gray-400 text-center font-bold uppercase tracking-widest pt-4 border-t border-gray-100">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:text-primary-dark transition-all ml-1 underline underline-offset-4 decoration-2">
                Authorize Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
