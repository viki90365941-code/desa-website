import { NextResponse } from "next/server";
import { ADMIN_PASSWORD, createSessionToken, ADMIN_COOKIE_NAME } from "@/lib/auth";

export async function POST(request) {
  try {
    const { password } = await request.json();

    if (!password || password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { ok: false, message: "Password salah." },
        { status: 401 }
      );
    }

    const token = await createSessionToken();
    const response = NextResponse.json({ ok: true });
    response.cookies.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 12, // 12 jam
    });
    return response;
  } catch {
    return NextResponse.json(
      { ok: false, message: "Terjadi kesalahan pada server." },
      { status: 500 }
    );
  }
}
