// Modul autentikasi admin sederhana berbasis token bertanda-tangan (HMAC).
// Memakai Web Crypto API (bukan modul 'crypto' Node.js) supaya kompatibel
// dengan Edge Runtime yang dipakai oleh middleware.js.

const SECRET = process.env.ADMIN_SESSION_SECRET || "ganti-secret-ini-saat-produksi";

// Password login admin. WAJIB diganti lewat environment variable ADMIN_PASSWORD
// sebelum website ini benar-benar dipakai publik.
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "rw08admin123";

const SESSION_MAX_AGE_MS = 12 * 60 * 60 * 1000; // 12 jam
export const ADMIN_COOKIE_NAME = "rw08_admin_session";

function toHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function sign(payload) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signatureBuffer = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return toHex(signatureBuffer);
}

export async function createSessionToken() {
  const expires = Date.now() + SESSION_MAX_AGE_MS;
  const payload = `admin:${expires}`;
  const signature = await sign(payload);
  return `${payload}:${signature}`;
}

export async function verifySessionToken(token) {
  if (!token) return false;
  const parts = token.split(":");
  if (parts.length !== 3) return false;
  const [role, expiresStr, signature] = parts;
  const payload = `${role}:${expiresStr}`;
  const expectedSignature = await sign(payload);

  if (signature.length !== expectedSignature.length) return false;
  let mismatch = 0;
  for (let i = 0; i < signature.length; i++) {
    mismatch |= signature.charCodeAt(i) ^ expectedSignature.charCodeAt(i);
  }
  if (mismatch !== 0) return false;

  const expires = Number(expiresStr);
  if (Number.isNaN(expires) || Date.now() > expires) return false;

  return true;
}
