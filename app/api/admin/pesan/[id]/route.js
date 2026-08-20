import { NextResponse } from "next/server";
import { verifySessionToken, ADMIN_COOKIE_NAME } from "@/lib/auth";
import { updateStatusPesanKontak, hapusPesanKontak } from "@/lib/queries";

async function cekAuth(request) {
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  return verifySessionToken(token);
}

export async function PATCH(request, { params }) {
  if (!(await cekAuth(request))) {
    return NextResponse.json({ ok: false, message: "Tidak diizinkan." }, { status: 401 });
  }
  try {
    const { status } = await request.json();
    const allowed = ["baru", "dibaca", "ditindaklanjuti"];
    if (!allowed.includes(status)) {
      return NextResponse.json({ ok: false, message: "Status tidak valid." }, { status: 400 });
    }
    await updateStatusPesanKontak(params.id, status);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, message: "Gagal memperbarui status." }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  if (!(await cekAuth(request))) {
    return NextResponse.json({ ok: false, message: "Tidak diizinkan." }, { status: 401 });
  }
  try {
    await hapusPesanKontak(params.id);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, message: "Gagal menghapus pesan." }, { status: 500 });
  }
}
