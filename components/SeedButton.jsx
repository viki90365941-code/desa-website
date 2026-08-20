"use client";

import { useState } from "react";

export default function SeedButton() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ state: "idle", message: "" });

  const jalankan = async () => {
    const konfirmasi1 = confirm(
      "PERINGATAN: Ini akan MENGHAPUS semua data yang ada sekarang dan menggantinya dengan data contoh. Yakin ingin lanjut?"
    );
    if (!konfirmasi1) return;

    const konfirmasi2 = confirm(
      "Konfirmasi sekali lagi: semua berita, UMKM, pencapaian, dan data lain yang sudah diedit AKAN HILANG. Lanjutkan?"
    );
    if (!konfirmasi2) return;

    setLoading(true);
    setStatus({ state: "idle", message: "" });

    try {
      const res = await fetch("/api/admin/seed", { method: "POST" });
      const json = await res.json();
      if (!json.ok) {
        setStatus({ state: "error", message: json.message || "Gagal." });
      } else {
        setStatus({ state: "success", message: "Berhasil! Data awal sudah terisi. Silakan refresh halaman lain untuk melihat perubahan." });
      }
    } catch {
      setStatus({ state: "error", message: "Tidak dapat terhubung ke server." });
    }
    setLoading(false);
  };

  return (
    <div className="mt-4">
      <button
        onClick={jalankan}
        disabled={loading}
        className="rounded-full bg-rose-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-rose-700 disabled:opacity-60"
      >
        {loading ? "Memproses..." : "Isi Data Awal (Reset Database)"}
      </button>

      {status.state === "success" && (
        <p className="mt-3 rounded-xl bg-emerald-100 px-4 py-3 text-sm font-medium text-emerald-800">
          {status.message}
        </p>
      )}
      {status.state === "error" && (
        <p className="mt-3 rounded-xl bg-rose-100 px-4 py-3 text-sm font-medium text-rose-800">
          {status.message}
        </p>
      )}
    </div>
  );
}
