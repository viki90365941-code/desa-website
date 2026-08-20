import { NextResponse } from "next/server";
import { verifySessionToken, ADMIN_COOKIE_NAME } from "@/lib/auth";
import { seedDatabase } from "@/lib/seedDatabase";

export async function POST(request) {
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!(await verifySessionToken(token))) {
    return NextResponse.json({ ok: false, message: "Tidak diizinkan." }, { status: 401 });
  }

  try {
    await seedDatabase();
    return NextResponse.json({ ok: true, message: "Data awal berhasil diisi ulang." });
  } catch (err) {
    return NextResponse.json(
      { ok: false, message: "Gagal mengisi data: " + err.message },
      { status: 500 }
    );
  }
}
