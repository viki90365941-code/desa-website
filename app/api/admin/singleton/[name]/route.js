import { NextResponse } from "next/server";
import { verifySessionToken, ADMIN_COOKIE_NAME } from "@/lib/auth";
import { getSingletonConfig } from "@/lib/adminResources";
import db, { ensureSchema } from "@/lib/db";

async function cekAuth(request) {
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  return verifySessionToken(token);
}

export async function GET(request, { params }) {
  if (!(await cekAuth(request))) {
    return NextResponse.json({ ok: false, message: "Tidak diizinkan." }, { status: 401 });
  }
  const config = getSingletonConfig(params.name);
  if (!config) {
    return NextResponse.json({ ok: false, message: "Resource tidak dikenali." }, { status: 404 });
  }
  await ensureSchema();
  const res = await db.execute(`SELECT * FROM ${config.table} WHERE id = 1`);
  return NextResponse.json({ ok: true, data: res.rows[0] || {}, config });
}

export async function PATCH(request, { params }) {
  if (!(await cekAuth(request))) {
    return NextResponse.json({ ok: false, message: "Tidak diizinkan." }, { status: 401 });
  }
  const config = getSingletonConfig(params.name);
  if (!config) {
    return NextResponse.json({ ok: false, message: "Resource tidak dikenali." }, { status: 404 });
  }

  try {
    const body = await request.json();
    const allowedNames = config.fields.map((f) => f.name);
    const columns = allowedNames.filter((name) => body[name] !== undefined);

    if (columns.length === 0) {
      return NextResponse.json({ ok: false, message: "Tidak ada data yang diubah." }, { status: 400 });
    }

    const setClause = columns.map((name) => `${name} = ?`).join(", ");
    const values = columns.map((name) => {
      const fieldDef = config.fields.find((f) => f.name === name);
      const raw = body[name];
      if (fieldDef.type === "number") {
        return raw === "" || raw === null ? null : Number(raw);
      }
      if (fieldDef.type === "list") {
        const arr = String(raw || "")
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean);
        return JSON.stringify(arr);
      }
      return raw;
    });

    await ensureSchema();

    // Pastikan baris id=1 ada dulu (INSERT OR IGNORE), baru update.
    await db.execute(`INSERT OR IGNORE INTO ${config.table} (id) VALUES (1)`);
    const sql = `UPDATE ${config.table} SET ${setClause} WHERE id = 1`;
    await db.execute({ sql, args: values });

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { ok: false, message: "Gagal menyimpan data: " + err.message },
      { status: 500 }
    );
  }
}
