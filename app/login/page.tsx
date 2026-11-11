// app/login/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError(res.error);
      } else {
        router.push("/");
        router.refresh();
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-mono-50 px-4">
      <div className="w-full max-w-sm bg-white p-8 rounded-xl border border-mono-200 shadow-sm">
        <div className="flex items-center space-x-2 mb-6">
          <div className="w-8 h-8 rounded-lg bg-mono-950 text-white flex items-center justify-center font-bold text-base tracking-tighter">
            C
          </div>
          <span className="font-semibold text-lg tracking-tight text-mono-950">Chronos</span>
        </div>

        <h2 className="text-xl font-bold text-mono-950 mb-1">Welcome back</h2>
        <p className="text-xs text-mono-500 mb-6">Enter your credentials to access your planner.</p>

        {error && (
          <div className="mb-4 p-2.5 rounded bg-mono-100 border border-mono-950 text-mono-950 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-mono-600 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full px-3 py-2 text-sm border border-mono-300 rounded-md focus:outline-none focus:border-mono-950 bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-mono-600 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 text-sm border border-mono-300 rounded-md focus:outline-none focus:border-mono-950 bg-white"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-mono-950 text-white text-xs font-medium rounded-md hover:bg-mono-800 transition disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-mono-500">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-semibold text-mono-950 underline underline-offset-2">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}