"use client";

import { useState } from "react";

const STATUS_LABEL = {
  baru: { label: "Baru", className: "bg-gold/20 text-gold-dark" },
  dibaca: { label: "Dibaca", className: "bg-sky-100 text-sky-700" },
  ditindaklanjuti: { label: "Ditindaklanjuti", className: "bg-emerald-100 text-emerald-700" },
};

function formatTanggal(t) {
  return new Date(t.replace(" ", "T")).toLocaleString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminPesanList({ pesanAwal }) {
  const [pesan, setPesan] = useState(pesanAwal);
  const [filter, setFilter] = useState("semua");

  const ubahStatus = async (id, status) => {
    setPesan((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
    await fetch(`/api/admin/pesan/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
  };

  const hapusPesan = async (id) => {
    if (!confirm("Hapus pesan ini secara permanen?")) return;
    setPesan((prev) => prev.filter((p) => p.id !== id));
    await fetch(`/api/admin/pesan/${id}`, { method: "DELETE" });
  };

  const daftar = filter === "semua" ? pesan : pesan.filter((p) => p.status === filter);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-2">
        {["semua", "baru", "dibaca", "ditindaklanjuti"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold capitalize transition-colors ${
              filter === f ? "bg-forest text-paper" : "bg-white text-forest-dark ring-1 ring-forest/10"
            }`}
          >
            {f} {f !== "semua" && `(${pesan.filter((p) => p.status === f).length})`}
          </button>
        ))}
      </div>

      {daftar.length === 0 ? (
        <p className="rounded-2xl bg-white p-8 text-center text-sm text-mist">
          Belum ada pesan pada kategori ini.
        </p>
      ) : (
        <div className="space-y-4">
          {daftar.map((p) => (
            <div key={p.id} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-forest/5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-display text-base font-bold text-forest-dark">{p.nama}</p>
                  <p className="text-xs text-mist">
                    {p.email} {p.telepon && `• ${p.telepon}`}
                  </p>
                  <p className="mt-1 font-mono text-[11px] text-mist">{formatTanggal(p.dibuat_pada)}</p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    STATUS_LABEL[p.status]?.className || "bg-gray-100 text-gray-700"
                  }`}
                >
                  {STATUS_LABEL[p.status]?.label || p.status}
                </span>
              </div>

              <p className="mt-3 inline-block rounded-full bg-paper2 px-3 py-1 text-xs font-semibold text-forest">
                {p.subjek}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink/90">{p.pesan}</p>

              <div className="mt-4 flex flex-wrap gap-2 border-t border-forest/5 pt-4">
                {p.status !== "dibaca" && (
                  <button
                    onClick={() => ubahStatus(p.id, "dibaca")}
                    className="rounded-full bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700 hover:bg-sky-100"
                  >
                    Tandai Dibaca
                  </button>
                )}
                {p.status !== "ditindaklanjuti" && (
                  <button
                    onClick={() => ubahStatus(p.id, "ditindaklanjuti")}
                    className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-100"
                  >
                    Tandai Ditindaklanjuti
                  </button>
                )}
                <button
                  onClick={() => hapusPesan(p.id)}
                  className="rounded-full bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-100"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
