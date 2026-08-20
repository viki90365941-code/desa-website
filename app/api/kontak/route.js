import { NextResponse } from "next/server";
import { simpanPesanKontak } from "@/lib/queries";

export async function POST(request) {
  try {
    const body = await request.json();
    const nama = (body.nama || "").trim();
    const email = (body.email || "").trim();
    const pesan = (body.pesan || "").trim();
    const telepon = (body.telepon || "").trim();
    const subjek = (body.subjek || "Umum").trim();

    if (!nama || !email || !pesan) {
      return NextResponse.json(
        { ok: false, message: "Nama, email, dan pesan wajib diisi." },
        { status: 400 }
      );
    }

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailValid) {
      return NextResponse.json(
        { ok: false, message: "Format email tidak valid." },
        { status: 400 }
      );
    }

    await simpanPesanKontak({ nama, email, telepon, subjek, pesan });

    return NextResponse.json({ ok: true, message: "Pesan berhasil dikirim." });
  } catch (err) {
  console.error("ERROR API KONTAK:", err);

  return NextResponse.json(
    { 
      ok: false, 
      message: "Terjadi kesalahan pada server.",
      error: err?.message || "Unknown error"
    },
    { status: 500 }
  );
  }
}