"use client";

import Link from "next/link";
import { useState } from "react";
import { Smartphone, UserPlus } from "lucide-react";
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
      router.replace("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-[#F9FAFB] overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-[#EEF2FF] blur-3xl" />
        <div className="absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full bg-[#EFF6FF] blur-3xl" />
        <div className="absolute left-1/2 top-[55%] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#F0FDF4] blur-3xl opacity-70" />
      </div>

      <nav className="w-full bg-white/80 backdrop-blur border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <Smartphone className="w-6 h-6 text-[#4F46E5]" />
              <span className="text-xl font-bold text-gray-900 tracking-tight">
                SmartlyTap
              </span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white/85 backdrop-blur p-10 rounded-3xl shadow-xl border border-gray-100">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 bg-gradient-to-br from-[#EEF2FF] to-white rounded-full flex items-center justify-center mb-4 border border-gray-100">
              <UserPlus className="h-6 w-6 text-[#4F46E5]" />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900">Create account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Start building your SmartlyTap profile.
            </p>
          </div>

          <form className="mt-8 space-y-5" onSubmit={submit}>
            {error ? (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            ) : null}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-xl focus:outline-none focus:ring-[#4F46E5] focus:border-[#4F46E5] sm:text-sm transition-all"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-xl focus:outline-none focus:ring-[#4F46E5] focus:border-[#4F46E5] sm:text-sm transition-all"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-xl focus:outline-none focus:ring-[#4F46E5] focus:border-[#4F46E5] sm:text-sm transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 text-sm font-bold rounded-xl text-white bg-gradient-to-r from-[#4F46E5] via-[#3B82F6] to-[#22C55E] hover:opacity-95 disabled:bg-gray-400 transition-all shadow-lg"
            >
              {loading ? "Creating..." : "Create account"}
            </button>

            <p className="text-sm text-gray-600 text-center">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-[#4F46E5] hover:text-[#4338CA]">
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

