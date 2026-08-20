"use client";

import { useState } from "react";

const SUBJEK_OPTIONS = [
  "Umum",
  "Layanan Administrasi",
  "Pengaduan",
  "Saran & Masukan",
  "Kerja Sama",
];

export default function FormKontak() {
  const [form, setForm] = useState({ nama: "", email: "", telepon: "", subjek: "Umum", pesan: "" });
  const [status, setStatus] = useState({ state: "idle", message: "" });

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: "loading", message: "" });
    try {
      const res = await fetch("/api/kontak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setStatus({ state: "error", message: data.message || "Gagal mengirim pesan." });
        return;
      }
      setStatus({ state: "success", message: "Pesan Anda berhasil terkirim. Terima kasih!" });
      setForm({ nama: "", email: "", telepon: "", subjek: "Umum", pesan: "" });
    } catch {
      setStatus({ state: "error", message: "Tidak dapat terhubung ke server. Coba lagi nanti." });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nama Lengkap" required>
          <input
            type="text"
            name="nama"
            value={form.nama}
            onChange={handleChange}
            required
            placeholder="Nama Anda"
            className="input-style"
          />
        </Field>
        <Field label="Email" required>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="nama@email.com"
            className="input-style"
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nomor Telepon (opsional)">
          <input
            type="tel"
            name="telepon"
            value={form.telepon}
            onChange={handleChange}
            placeholder="08xxxxxxxxxx"
            className="input-style"
          />
        </Field>
        <Field label="Subjek">
          <select name="subjek" value={form.subjek} onChange={handleChange} className="input-style">
            {SUBJEK_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Pesan" required>
        <textarea
          name="pesan"
          value={form.pesan}
          onChange={handleChange}
          required
          rows={5}
          placeholder="Tuliskan pesan, pertanyaan, atau pengaduan Anda di sini..."
          className="input-style resize-none"
        />
      </Field>

      <button
        type="submit"
        disabled={status.state === "loading"}
        className="w-full rounded-xl bg-forest px-6 py-3.5 font-display text-sm font-bold text-paper transition-colors hover:bg-forest-dark disabled:opacity-60 sm:w-auto"
      >
        {status.state === "loading" ? "Mengirim..." : "Kirim Pesan"}
      </button>

      {status.state === "success" && (
        <p role="status" className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          {status.message}
        </p>
      )}
      {status.state === "error" && (
        <p role="alert" className="rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
          {status.message}
        </p>
      )}

      <style jsx>{`
        .input-style {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid rgba(11, 79, 63, 0.15);
          background: white;
          padding: 0.75rem 1rem;
          font-size: 0.9rem;
          color: #1c2321;
        }
        .input-style::placeholder {
          color: #9aa39c;
        }
      `}</style>
    </form>
  );
}

function Field({ label, required, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-forest-dark">
        {label} {required && <span className="text-clay">*</span>}
      </span>
      {children}
    </label>
  );
}
