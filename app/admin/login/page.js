"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState({ state: "idle", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: "loading", message: "" });
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setStatus({ state: "error", message: data.message || "Password salah." });
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setStatus({ state: "error", message: "Tidak dapat terhubung ke server." });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-forest px-5">
      <div className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-2xl">
        <p className="font-mono text-xs uppercase tracking-widest text-gold-dark">Area Terbatas</p>
        <h1 className="mt-2 font-display text-2xl font-extrabold text-forest-dark">Login Admin</h1>
        <p className="mt-2 text-sm text-mist">
          Masuk untuk melihat pesan kontak yang masuk dari warga.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-forest-dark">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
              placeholder="Masukkan password admin"
              className="w-full rounded-xl border border-forest/15 bg-white px-4 py-3 text-sm text-ink"
            />
          </label>

          <button
            type="submit"
            disabled={status.state === "loading"}
            className="w-full rounded-xl bg-forest px-6 py-3 font-display text-sm font-bold text-paper transition-colors hover:bg-forest-dark disabled:opacity-60"
          >
            {status.state === "loading" ? "Memeriksa..." : "Masuk"}
          </button>

          {status.state === "error" && (
            <p role="alert" className="rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
              {status.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
