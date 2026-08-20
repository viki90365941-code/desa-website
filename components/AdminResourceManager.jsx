"use client";

import { useEffect, useState } from "react";

export default function AdminResourceManager({ table }) {
  const [config, setConfig] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // null = tidak ada form, {} = form baru, {...row} = edit
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const muat = async () => {
    setLoading(true);
    const res = await fetch(`/api/admin/resource/${table}`);
    const json = await res.json();
    if (json.ok) {
      setConfig(json.config);
      setData(json.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    muat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table]);

  const bukaFormBaru = () => {
    const kosong = {};
    config.fields.forEach((f) => (kosong[f.name] = ""));
    setEditing(kosong);
    setErrorMsg("");
  };

  const bukaFormEdit = (row) => {
    setEditing({ ...row });
    setErrorMsg("");
  };

  const simpan = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg("");

    const isBaru = editing.id === undefined;
    const url = isBaru ? `/api/admin/resource/${table}` : `/api/admin/resource/${table}/${editing.id}`;
    const method = isBaru ? "POST" : "PATCH";

    const body = {};
    config.fields.forEach((f) => (body[f.name] = editing[f.name]));

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const json = await res.json();

    if (!json.ok) {
      setErrorMsg(json.message || "Gagal menyimpan.");
      setSaving(false);
      return;
    }

    setSaving(false);
    setEditing(null);
    muat();
  };

  const hapus = async (row) => {
    if (!confirm(`Hapus "${row[config.listColumns[0]] || row.id}" secara permanen?`)) return;
    await fetch(`/api/admin/resource/${table}/${row.id}`, { method: "DELETE" });
    muat();
  };

  if (loading || !config) {
    return <p className="text-sm text-mist">Memuat data...</p>;
  }

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm text-mist">{data.length} data tersimpan</p>
        <button
          onClick={bukaFormBaru}
          className="rounded-full bg-forest px-5 py-2 text-sm font-semibold text-paper hover:bg-forest-dark"
        >
          + Tambah Baru
        </button>
      </div>

      {data.length === 0 ? (
        <p className="rounded-2xl bg-white p-8 text-center text-sm text-mist">Belum ada data.</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl bg-white shadow-sm ring-1 ring-forest/5">
          <table className="w-full text-left text-sm">
            <thead className="bg-forest text-paper">
              <tr>
                <th className="px-4 py-3 font-display font-semibold">ID</th>
                {config.listColumns.map((col) => (
                  <th key={col} className="px-4 py-3 font-display font-semibold">
                    {config.fields.find((f) => f.name === col)?.label || col}
                  </th>
                ))}
                <th className="px-4 py-3 font-display font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-forest/5">
              {data.map((row) => (
                <tr key={row.id}>
                  <td className="px-4 py-3 font-mono text-xs text-mist">{row.id}</td>
                  {config.listColumns.map((col) => (
                    <td key={col} className="max-w-xs truncate px-4 py-3 text-ink">
                      {String(row[col] ?? "")}
                    </td>
                  ))}
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => bukaFormEdit(row)}
                        className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 hover:bg-sky-100"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => hapus(row)}
                        className="rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-100"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 sm:p-8">
            <h2 className="font-display text-xl font-bold text-forest-dark">
              {editing.id === undefined ? "Tambah" : "Edit"} {config.label}
            </h2>

            <form onSubmit={simpan} className="mt-6 space-y-4">
              {config.fields.map((f) => (
                <label key={f.name} className="block">
                  <span className="mb-1.5 block text-sm font-semibold text-forest-dark">
                    {f.label} {f.required && <span className="text-clay">*</span>}
                  </span>
                  {f.type === "textarea" ? (
                    <textarea
                      value={editing[f.name] ?? ""}
                      onChange={(e) => setEditing({ ...editing, [f.name]: e.target.value })}
                      rows={4}
                      required={f.required}
                      className="w-full rounded-xl border border-forest/15 px-4 py-2.5 text-sm"
                    />
                  ) : (
                    <input
                      type={f.type === "number" ? "number" : "text"}
                      value={editing[f.name] ?? ""}
                      onChange={(e) => setEditing({ ...editing, [f.name]: e.target.value })}
                      required={f.required}
                      className="w-full rounded-xl border border-forest/15 px-4 py-2.5 text-sm"
                    />
                  )}
                </label>
              ))}

              {errorMsg && (
                <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">{errorMsg}</p>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-full bg-forest px-6 py-2.5 text-sm font-semibold text-paper hover:bg-forest-dark disabled:opacity-60"
                >
                  {saving ? "Menyimpan..." : "Simpan"}
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(null)}
                  className="rounded-full border border-forest/15 px-6 py-2.5 text-sm font-semibold text-forest-dark"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
