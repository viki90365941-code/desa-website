import { createClient } from "@libsql/client";
import path from "path";
import fs from "fs";

// Mode ganda:
// - Kalau environment variable TURSO_DATABASE_URL diisi -> connect ke database
//   Turso (online), dipakai saat production/Vercel supaya data konsisten di semua server.
// - Kalau tidak diisi -> otomatis pakai file lokal data/desa.db, dipakai saat
//   development di komputer sendiri (npm run dev) tanpa perlu akun Turso.
const dataDir = path.join(process.cwd(), "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
const localDbPath = path.join(dataDir, "desa.db");

const isRemote = !!process.env.TURSO_DATABASE_URL;

const db = isRemote
  ? createClient({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    })
  : createClient({ url: `file:${localDbPath}` });

const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS profil_desa (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  nama_desa TEXT NOT NULL,
  kecamatan TEXT,
  kabupaten TEXT,
  provinsi TEXT,
  kode_pos TEXT,
  luas_wilayah TEXT,
  jumlah_penduduk TEXT,
  jumlah_kk TEXT,
  jumlah_dusun TEXT,
  tahun_berdiri TEXT,
  sejarah TEXT,
  visi TEXT,
  misi TEXT,
  geografis TEXT,
  batas_utara TEXT,
  batas_selatan TEXT,
  batas_timur TEXT,
  batas_barat TEXT,
  alamat_kantor TEXT,
  email TEXT,
  telepon TEXT,
  jam_layanan TEXT,
  instagram TEXT,
  facebook TEXT,
  youtube TEXT,
  latitude REAL,
  longitude REAL,
  sambutan_kades TEXT,
  nama_kades TEXT,
  foto_kades_url TEXT
);

CREATE TABLE IF NOT EXISTS potensi_desa (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  judul TEXT NOT NULL,
  deskripsi TEXT,
  ikon TEXT,
  urutan INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS struktur_organisasi (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nama TEXT NOT NULL,
  jabatan TEXT NOT NULL,
  level INTEGER NOT NULL,
  parent_id INTEGER,
  urutan INTEGER DEFAULT 0,
  foto_url TEXT,
  periode TEXT
);

CREATE TABLE IF NOT EXISTS pencapaian (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tahun TEXT NOT NULL,
  judul TEXT NOT NULL,
  deskripsi TEXT,
  kategori TEXT,
  tingkat TEXT,
  foto_url TEXT,
  urutan INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS berita (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  judul TEXT NOT NULL,
  ringkasan TEXT,
  konten TEXT NOT NULL,
  kategori TEXT DEFAULT 'Umum',
  penulis TEXT DEFAULT 'Admin Desa',
  gambar_url TEXT,
  tanggal_terbit TEXT NOT NULL,
  dilihat INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS statistik_penduduk (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  label TEXT NOT NULL,
  nilai TEXT NOT NULL,
  urutan INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS pesan_kontak (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nama TEXT NOT NULL,
  email TEXT NOT NULL,
  telepon TEXT,
  subjek TEXT,
  pesan TEXT NOT NULL,
  dibuat_pada TEXT NOT NULL DEFAULT (datetime('now', 'localtime')),
  status TEXT NOT NULL DEFAULT 'baru'
);

CREATE TABLE IF NOT EXISTS umkm (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nama_usaha TEXT NOT NULL,
  pemilik TEXT,
  kategori TEXT,
  deskripsi TEXT,
  produk_unggulan TEXT,
  kontak TEXT,
  alamat TEXT,
  foto_url TEXT,
  urutan INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS bank_sampah (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  status TEXT,
  deskripsi TEXT,
  jadwal_setor TEXT,
  lokasi TEXT,
  pengurus TEXT,
  cara_gabung TEXT
);

CREATE TABLE IF NOT EXISTS bank_sampah_harga (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  jenis_sampah TEXT NOT NULL,
  harga TEXT NOT NULL,
  urutan INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS bank_sampah_bulanan (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  bulan TEXT NOT NULL,
  tahun TEXT NOT NULL,
  total_kg REAL,
  total_pendapatan REAL,
  urutan INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS bidang_kerohanian (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  agama TEXT NOT NULL,
  nama TEXT NOT NULL,
  urutan INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS pengurus_rt (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  no_rt TEXT NOT NULL,
  ketua TEXT,
  sekretaris TEXT,
  bendahara TEXT,
  urutan INTEGER DEFAULT 0
);
`;

let schemaReady = null;

export async function ensureSchema() {
  if (!schemaReady) {
    schemaReady = db.executeMultiple(SCHEMA_SQL);
  }
  await schemaReady;
}

export default db;
export { isRemote };
