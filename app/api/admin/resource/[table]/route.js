import { NextResponse } from "next/server";
import { verifySessionToken, ADMIN_COOKIE_NAME } from "@/lib/auth";
import { getResourceConfig } from "@/lib/adminResources";
import db, { ensureSchema } from "@/lib/db";

async function cekAuth(request) {
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  return verifySessionToken(token);
}

export async function GET(request, { params }) {
  if (!(await cekAuth(request))) {
    return NextResponse.json({ ok: false, message: "Tidak diizinkan." }, { status: 401 });
  }
  const config = getResourceConfig(params.table);
  if (!config) {
    return NextResponse.json({ ok: false, message: "Resource tidak dikenali." }, { status: 404 });
  }
  await ensureSchema();
  const res = await db.execute(`SELECT * FROM ${config.table} ORDER BY ${config.orderBy}`);
  return NextResponse.json({ ok: true, data: res.rows, config });
}

export async function POST(request, { params }) {
  if (!(await cekAuth(request))) {
    return NextResponse.json({ ok: false, message: "Tidak diizinkan." }, { status: 401 });
  }
  const config = getResourceConfig(params.table);
  if (!config) {
    return NextResponse.json({ ok: false, message: "Resource tidak dikenali." }, { status: 404 });
  }

  try {
    const body = await request.json();
    const allowedNames = config.fields.map((f) => f.name);

    for (const f of config.fields) {
      if (f.required && (body[f.name] === undefined || body[f.name] === "")) {
        return NextResponse.json(
          { ok: false, message: `Kolom "${f.label}" wajib diisi.` },
          { status: 400 }
        );
      }
    }

    const columns = allowedNames.filter((name) => body[name] !== undefined);
    const placeholders = columns.map(() => "?").join(", ");
    const values = columns.map((name) => {
      const fieldDef = config.fields.find((f) => f.name === name);
      const raw = body[name];
      if (fieldDef.type === "number") {
        return raw === "" || raw === null ? null : Number(raw);
      }
      return raw;
    });

    await ensureSchema();
    const sql = `INSERT INTO ${config.table} (${columns.join(", ")}) VALUES (${placeholders})`;
    await db.execute({ sql, args: values });

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { ok: false, message: "Gagal menyimpan data: " + err.message },
      { status: 500 }
    );
  }
}
