"use client";

import { useEffect, useState } from "react";

export default function AdminSingletonForm({ name }) {
  const [config, setConfig] = useState(null);
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState({ state: "idle", message: "" });

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/admin/singleton/${name}`);
      const json = await res.json();
      if (json.ok) {
        setConfig(json.config);
        const initial = {};
        json.config.fields.forEach((f) => {
          const raw = json.data[f.name];
          if (f.type === "list") {
            try {
              initial[f.name] = raw ? JSON.parse(raw).join("\n") : "";
            } catch {
              initial[f.name] = "";
            }
          } else {
            initial[f.name] = raw ?? "";
          }
        });
        setValues(initial);
      }
      setLoading(false);
    })();
  }, [name]);

  const simpan = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus({ state: "idle", message: "" });

    const res = await fetch(`/api/admin/singleton/${name}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const json = await res.json();
    setSaving(false);

    if (!json.ok) {
      setStatus({ state: "error", message: json.message || "Gagal menyimpan." });
      return;
    }
    setStatus({ state: "success", message: "Perubahan berhasil disimpan." });
  };

  if (loading || !config) {
    return <p className="text-sm text-mist">Memuat data...</p>;
  }

  return (
    <form onSubmit={simpan} className="space-y-5">
      {config.fields.map((f) => (
        <label key={f.name} className="block">
          <span className="mb-1.5 block text-sm font-semibold text-forest-dark">{f.label}</span>
          {f.type === "textarea" || f.type === "list" ? (
            <textarea
              value={values[f.name] ?? ""}
              onChange={(e) => setValues({ ...values, [f.name]: e.target.value })}
              rows={f.type === "list" ? 5 : 4}
              className="w-full rounded-xl border border-forest/15 px-4 py-2.5 text-sm"
            />
          ) : (
            <input
              type={f.type === "number" ? "number" : "text"}
              step="any"
              value={values[f.name] ?? ""}
              onChange={(e) => setValues({ ...values, [f.name]: e.target.value })}
              className="w-full rounded-xl border border-forest/15 px-4 py-2.5 text-sm"
            />
          )}
        </label>
      ))}

      <div className="sticky bottom-0 -mx-1 flex items-center gap-4 border-t border-forest/10 bg-paper2/95 px-1 py-4 backdrop-blur-sm">
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-forest px-8 py-3 font-display text-sm font-bold text-paper hover:bg-forest-dark disabled:opacity-60"
        >
          {saving ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
        {status.state === "success" && (
          <p className="text-sm font-medium text-emerald-700">{status.message}</p>
        )}
        {status.state === "error" && (
          <p className="text-sm font-medium text-rose-700">{status.message}</p>
        )}
      </div>
    </form>
  );
}
