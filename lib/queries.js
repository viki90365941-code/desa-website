import db, { ensureSchema } from "./db";

export async function getProfilDesa() {
  await ensureSchema();
  const res = await db.execute("SELECT * FROM profil_desa WHERE id = 1");
  return res.rows[0] || null;
}

export async function getPotensiDesa() {
  await ensureSchema();
  const res = await db.execute("SELECT * FROM potensi_desa ORDER BY urutan ASC");
  return res.rows;
}

export async function getStatistikPenduduk() {
  await ensureSchema();
  const res = await db.execute("SELECT * FROM statistik_penduduk ORDER BY urutan ASC");
  return res.rows;
}

export async function getStrukturOrganisasi() {
  await ensureSchema();
  const res = await db.execute("SELECT * FROM struktur_organisasi ORDER BY level ASC, urutan ASC");
  return res.rows;
}

export async function getPencapaian() {
  await ensureSchema();
  const res = await db.execute("SELECT * FROM pencapaian ORDER BY tahun DESC, urutan ASC");
  return res.rows;
}

export async function getBeritaList(limit) {
  await ensureSchema();
  const res = limit
    ? await db.execute({ sql: "SELECT * FROM berita ORDER BY tanggal_terbit DESC LIMIT ?", args: [limit] })
    : await db.execute("SELECT * FROM berita ORDER BY tanggal_terbit DESC");
  return res.rows;
}

export async function getBeritaBySlug(slug) {
  await ensureSchema();
  const res = await db.execute({ sql: "SELECT * FROM berita WHERE slug = ?", args: [slug] });
  const item = res.rows[0] || null;
  if (item) {
    await db.execute({ sql: "UPDATE berita SET dilihat = dilihat + 1 WHERE slug = ?", args: [slug] });
  }
  return item;
}

export async function getBeritaKategori() {
  await ensureSchema();
  const res = await db.execute("SELECT DISTINCT kategori FROM berita ORDER BY kategori ASC");
  return res.rows;
}

export async function simpanPesanKontak({ nama, email, telepon, subjek, pesan }) {
  await ensureSchema();
  return db.execute({
    sql: "INSERT INTO pesan_kontak (nama, email, telepon, subjek, pesan) VALUES (?, ?, ?, ?, ?)",
    args: [nama, email, telepon || "", subjek || "Umum", pesan],
  });
}

export async function getSemuaPesanKontak() {
  await ensureSchema();
  const res = await db.execute("SELECT * FROM pesan_kontak ORDER BY id DESC");
  return res.rows;
}

export async function updateStatusPesanKontak(id, status) {
  await ensureSchema();
  return db.execute({ sql: "UPDATE pesan_kontak SET status = ? WHERE id = ?", args: [status, id] });
}

export async function hapusPesanKontak(id) {
  await ensureSchema();
  return db.execute({ sql: "DELETE FROM pesan_kontak WHERE id = ?", args: [id] });
}

export async function getUmkmList() {
  await ensureSchema();
  const res = await db.execute("SELECT * FROM umkm ORDER BY urutan ASC");
  return res.rows;
}

export async function getBankSampah() {
  await ensureSchema();
  const res = await db.execute("SELECT * FROM bank_sampah WHERE id = 1");
  return res.rows[0] || null;
}

export async function getBankSampahHarga() {
  await ensureSchema();
  const res = await db.execute("SELECT * FROM bank_sampah_harga ORDER BY urutan ASC");
  return res.rows;
}

export async function getBankSampahBulanan() {
  await ensureSchema();
  const res = await db.execute("SELECT * FROM bank_sampah_bulanan ORDER BY urutan ASC");
  return res.rows;
}

export async function getBidangKerohanian() {
  await ensureSchema();
  const res = await db.execute("SELECT * FROM bidang_kerohanian ORDER BY urutan ASC");
  return res.rows;
}

export async function getPengurusRt() {
  await ensureSchema();
  const res = await db.execute("SELECT * FROM pengurus_rt ORDER BY urutan ASC");
  return res.rows;
}
