import { NextResponse } from "next/server";
import { verifySessionToken, ADMIN_COOKIE_NAME } from "@/lib/auth";
import { getResourceConfig } from "@/lib/adminResources";
import db, { ensureSchema } from "@/lib/db";

async function cekAuth(request) {
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  return verifySessionToken(token);
}

export async function PATCH(request, { params }) {
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
      return raw;
    });

    await ensureSchema();
    const sql = `UPDATE ${config.table} SET ${setClause} WHERE id = ?`;
    await db.execute({ sql, args: [...values, params.id] });

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { ok: false, message: "Gagal memperbarui data: " + err.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  if (!(await cekAuth(request))) {
    return NextResponse.json({ ok: false, message: "Tidak diizinkan." }, { status: 401 });
  }
  const config = getResourceConfig(params.table);
  if (!config) {
    return NextResponse.json({ ok: false, message: "Resource tidak dikenali." }, { status: 404 });
  }

  try {
    await ensureSchema();
    await db.execute({ sql: `DELETE FROM ${config.table} WHERE id = ?`, args: [params.id] });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { ok: false, message: "Gagal menghapus data: " + err.message },
      { status: 500 }
    );
  }
}
