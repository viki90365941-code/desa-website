require("dotenv").config({ path: ".env.local" });

const { createClient } = require("@libsql/client");
const path = require("path");
const fs = require("fs");

const dataDir = path.join(process.cwd(), "data");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
const dbPath = path.join(dataDir, "desa.db");

const isRemote = !!process.env.TURSO_DATABASE_URL;
const db = isRemote
  ? createClient({ url: process.env.TURSO_DATABASE_URL, authToken: process.env.TURSO_AUTH_TOKEN })
  : createClient({ url: `file:${dbPath}` });

async function main() {
  await db.executeMultiple(`
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
`);

  // Kosongkan data lama supaya seed bisa dijalankan berulang tanpa duplikat
  await db.executeMultiple(`
  DELETE FROM profil_desa;
  DELETE FROM potensi_desa;
  DELETE FROM struktur_organisasi;
  DELETE FROM pencapaian;
  DELETE FROM berita;
  DELETE FROM statistik_penduduk;
  DELETE FROM umkm;
  DELETE FROM bank_sampah;
  DELETE FROM bank_sampah_harga;
  DELETE FROM bank_sampah_bulanan;
  DELETE FROM bidang_kerohanian;
  DELETE FROM pengurus_rt;
`);

  await db.execute(`
  INSERT INTO profil_desa (
    id, nama_desa, kecamatan, kabupaten, provinsi, kode_pos,
    luas_wilayah, jumlah_penduduk, jumlah_kk, jumlah_dusun, tahun_berdiri,
    sejarah, visi, misi, geografis,
    batas_utara, batas_selatan, batas_timur, batas_barat,
    alamat_kantor, email, telepon, jam_layanan,
    instagram, facebook, youtube, latitude, longitude,
    sambutan_kades, nama_kades, foto_kades_url
  ) VALUES (
    1, 'Kampung Proklim Bersinar', 'Kecamatan Cipondoh', 'Kota Tangerang', 'Banten', '15148',
    'Segera dilengkapi', '2.226 jiwa', 'Segera dilengkapi', 'Segera dilengkapi', '2024',
    'RW 08 Kelurahan Cipondoh Makmur, Kecamatan Cipondoh, Kota Tangerang mulai merintis Program Kampung Iklim (Proklim) sejak akhir tahun 2024 di bawah kepemimpinan Ketua RW, Henry Agus. Warga bersama pengurus mengusung konsep "Kampung Bersinar" — singkatan dari Bersih, Sinergi, Aman, dan Ramah — sebagai identitas kampung yang tangguh menghadapi perubahan iklim sekaligus guyub secara sosial.
Sejak 2023, RW 08 telah memiliki Gedung Community Center yang menjadi pusat kegiatan warga: pengajian bapak-bapak dan ibu-ibu, arisan PKK, hingga rapat rutin pengurus RT/RW setiap dua bulan sekali. Menjelang penilaian Proklim tingkat Kota Tangerang, warga bergotong royong membangun biopori, menanam Tanaman Obat Keluarga (TOGA), menggalakkan kerja bakti, serta menyiapkan tandon air sebagai bagian dari upaya adaptasi dan mitigasi perubahan iklim di lingkungan padat penduduk perkotaan.
Berkat konsistensi tersebut, RW 08 pernah dipercaya mewakili Kelurahan Cipondoh Makmur dalam ajang Program Kampung Iklim tingkat Kota Tangerang, dan terus mempersiapkan diri untuk tahun-tahun berikutnya.',
    'Mewujudkan RW 08 Kelurahan Cipondoh Makmur sebagai Kampung Iklim yang Bersih, Sinergi, Aman, dan Ramah lingkungan (Bersinar) — tangguh menghadapi perubahan iklim serta guyub dan sejahtera bagi seluruh warganya.',
    '["Menjaga kebersihan dan kerapian lingkungan melalui kerja bakti rutin dan pengelolaan sampah warga.","Membangun ketahanan terhadap perubahan iklim lewat biopori, sumur resapan, dan tandon air hujan.","Mendorong ketahanan pangan keluarga melalui penanaman Tanaman Obat Keluarga (TOGA) dan kegiatan Kelompok Wanita Tani (KWT).","Memperkuat sinergi dan silaturahmi warga lewat pengajian, arisan PKK, dan rapat rutin RT/RW di Gedung Community Center.","Mewakili dan mengharumkan nama Kelurahan Cipondoh Makmur dalam ajang Program Kampung Iklim (Proklim) tingkat Kota Tangerang."]',
    'RW 08 berada di wilayah Kelurahan Cipondoh Makmur, Kecamatan Cipondoh, Kota Tangerang, Provinsi Banten — kawasan permukiman padat penduduk perkotaan yang terus berbenah menghadapi tantangan perubahan iklim seperti genangan air dan minimnya ruang terbuka hijau, melalui pendekatan gotong royong warga.',
    'Berbatasan Dengan RW 09',
    'Berbatasan Dengan RW 10',
    'Berbatasan Dengan RW 10',
    'Berbatasan Dengan RW 07',
    'Gedung Community Center RW 08, Kelurahan Cipondoh Makmur, Kecamatan Cipondoh, Kota Tangerang, Banten 15148',
    'henrymakmur800@gmail.com',
    '0812‑8693‑9167',
    '08:00-16:00 WIB',
    'https://www.instagram.com/crewcimaknoid?igsh=bXg1emNxdjFia2Ew',
    '',
    '',
    -6.180400, 106.687900,
    'Sebagai Ketua RW 08, saya mengajak seluruh warga untuk terus menjaga kebersihan lingkungan, bergotong royong membangun biopori dan tandon air, serta merawat Tanaman Obat Keluarga demi kampung yang lebih sejuk dan tangguh menghadapi perubahan iklim. Mari bersama-sama kita jadikan RW 08 sebagai Kampung Bersinar — Bersih, Sinergi, Aman, dan Ramah — untuk kita semua.',
    'Henry Agus',
    '/images/foto-ketua-rw08.jpeg'
  )
`);

  const potensi = [
    ["Biopori & Tandon Air Hujan", "Warga membangun lubang biopori dan tandon penampung air hujan di berbagai titik untuk mengurangi genangan dan mendukung ketahanan air di musim kemarau.", "sprout", 1],
    ["Tanaman Obat Keluarga (TOGA)", "Penanaman TOGA di lahan dan pekarangan warga sebagai bagian dari persiapan Proklim sekaligus mendukung kemandirian kesehatan keluarga.", "wheat", 2],
    ["Gedung Community Center", "Dibangun sejak 2023, menjadi pusat kegiatan warga: pengajian, arisan PKK, dan rapat rutin pengurus RT/RW setiap dua bulan.", "building", 3],
    ["Kelompok Wanita Tani (KWT)", "Setelah pelaksanaan verifikasi tingkat pusat, kegiatan KWT tidak lagi dipusatkan di Posko. Kini, pelaksanaannya dilaksanakan di masing-masing wilayah, yaitu RT 02 dan RT 07.", "hand", 4],
    ["Kerja Bakti & Kebersihan Lingkungan", 'Kegiatan gotong royong rutin menjaga kebersihan dan kerapian lingkungan sebagai wujud nilai "Bersih" dalam konsep Kampung Bersinar.', "mountain", 5],
    ["Perwakilan Proklim Tingkat Kota", "RW 08 pernah mewakili Kelurahan Cipondoh Makmur dalam ajang Program Kampung Iklim (Proklim) tingkat Kota Tangerang.", "sheep", 6],
  ];
  for (const p of potensi) {
    await db.execute({ sql: "INSERT INTO potensi_desa (judul, deskripsi, ikon, urutan) VALUES (?, ?, ?, ?)", args: p });
  }

  const statistik = [
    ["Jumlah Penduduk", "2.226 Jiwa", 1],
    ["Community Center", "Sejak 2023", 2],
    ["Program Proklim", "Sejak 2024", 3],
    ["Proklim Madya Nasional", "Sejak 2025", 4],
  ];
  for (const s of statistik) {
    await db.execute({ sql: "INSERT INTO statistik_penduduk (label, nilai, urutan) VALUES (?, ?, ?)", args: s });
  }

  const pelindung = await db.execute({
    sql: "INSERT INTO struktur_organisasi (nama, jabatan, level, parent_id, urutan, foto_url, periode) VALUES (?, ?, ?, ?, ?, ?, ?)",
    args: ["Lurah Cipondoh Makmur, Bhabinkamtipmas, Bhabinsa", "Pelindung / Pembina", 1, null, 1, "", "2025 – 2028"],
  });
  const pelindungId = Number(pelindung.lastInsertRowid);

  const penasihat = await db.execute({
    sql: "INSERT INTO struktur_organisasi (nama, jabatan, level, parent_id, urutan, foto_url, periode) VALUES (?, ?, ?, ?, ?, ?, ?)",
    args: ["H. Suyanto", "Penasihat RW 08", 2, pelindungId, 1, "", "2025 – 2028"],
  });
  const ketuaRw = await db.execute({
    sql: "INSERT INTO struktur_organisasi (nama, jabatan, level, parent_id, urutan, foto_url, periode) VALUES (?, ?, ?, ?, ?, ?, ?)",
    args: ["Henry Agus", "Ketua RW 08", 2, pelindungId, 2, "", "2025 – 2028"],
  });
  const ketuaRwId = Number(ketuaRw.lastInsertRowid);

  const bawahanKetuaRw = [
    ["Agus Widiarso", "Sekretaris RW 08", 3, ketuaRwId, 1, "", "2025 – 2028"],
    ["Suwarno", "Bendahara RW 08", 3, ketuaRwId, 2, "", "2025 – 2028"],
    ["Ujun Djuanda", "Humas RW 08", 4, ketuaRwId, 2, "", "2025 – 2028"],
    ["Slamet", "Sosial & Kesejahteraan Lingkungan RW 08", 4, ketuaRwId, 3, "", "2025 – 2028"],
    ["Edi Suryanto", "Pembangunan & Pemeliharaan Aset RW 08", 4, ketuaRwId, 4, "", "2025 – 2028"],
    ["Lihat rincian di bawah", "Bidang Kerohaniawan RW 08", 4, ketuaRwId, 1, "", "2025 – 2028"],
  ];
  for (const s of bawahanKetuaRw) {
    await db.execute({
      sql: "INSERT INTO struktur_organisasi (nama, jabatan, level, parent_id, urutan, foto_url, periode) VALUES (?, ?, ?, ?, ?, ?, ?)",
      args: s,
    });
  }

  const kerohanian = [
    ["Islam", "H. Sobari", 1],
    ["Katolik", "A. Mujadi", 2],
    ["Protestan", "Samosir", 3],
    ["Budha", "Lugito - Achun", 4],
    ["Hindu", "Ketut", 5],
  ];
  for (const k of kerohanian) {
    await db.execute({ sql: "INSERT INTO bidang_kerohanian (agama, nama, urutan) VALUES (?, ?, ?)", args: k });
  }

  const daftarRt = [
    ["01", "Sumarno", "Febriyanto", "Waisah", 1],
    ["02", "Waryono", "Edi Suryanto", "Sofianti", 2],
    ["03", "Sugeng. R", "Heri A.P", "H. Yayat H", 3],
    ["04", "Kusdiarjo. A.K", "Slamet D", "Ratum", 4],
    ["05", "Joko Muhartono", "Agus Widiarso", "Mariam", 5],
    ["06", "Gono", "Ujun Djuanda", "Mariam", 6],
    ["07", "Teguh Waluyo", "Johan P.A", "Arip Rahman", 7],
    ["08", "Angga P.K", "Mirza Gofur", "Eko Prasetyo", 8],
    ["09", "Paidi", "Novi", "Mahyudin", 9],
    ["010", "Deni Firmansyah", "Indhira Astriani", "Sujarwo", 10],
  ];
  for (const rt of daftarRt) {
    await db.execute({ sql: "INSERT INTO pengurus_rt (no_rt, ketua, sekretaris, bendahara, urutan) VALUES (?, ?, ?, ?, ?)", args: rt });
  }

  const pencapaian = [
    ["2025", "Piagam Partisipasi ProKlim Kategori Madya Tingkat Nasional", "RW 008 Kelurahan Cipondoh Makmur, Kecamatan Cipondoh, Kota Tangerang, Provinsi Banten menerima Piagam Partisipasi ProKlim atas partisipasinya mengembangkan Program Kampung Iklim dengan Kategori Madya. Piagam diterbitkan di Jakarta pada 27 November 2025, ditandatangani oleh Deputi Pengendalian Perubahan Iklim dan Tata Kelola Nilai Ekonomi Karbon, Ir. Ary Sudjianto, M.Sc.", "Lingkungan", "Nasional", "/images/piagam-proklim-madya.jpeg", 1],
    ["2024", "Kategori Utama 2 - Pengelolaan Lingkungan Hidup Terbaik", "Penghargaan Kategori Utama 2 untuk Pengelolaan Lingkungan Hidup Terbaik Tingkat Kecamatan Marga Jaya, Kota Bekasi, Tahun 2024 dalam Program Kampung Iklim (ProKlim).", "Lingkungan", "Kecamatan", "/images/piala-kategori-utama-2.jpeg", 1],
    ["2024", "Juara 1 Lomba Pendampingan KIM 2024 - Kategori Desain Logo", "KIM (Kelompok Informasi Masyarakat) Cipondoh Makmur meraih Juara 1 pada Lomba Pendampingan KIM 2024 untuk kategori Desain Logo KIM.", "Sosial", "Kota", "/images/juara1-kim-2024.jpeg", 2],
    ["2024", "Juara 3 Lomba Pendampingan KIM 2024 - Konten Terkreatif & Terinovatif", "KIM (Kelompok Informasi Masyarakat) Cipondoh Makmur meraih Juara 3 pada Lomba Pendampingan KIM 2024 untuk kategori Konten Terkreatif dan Terinovatif.", "Sosial", "Kota", "/images/juara3-kim-2024.jpeg", 3],
    ["2023", "Pembangunan Gedung Community Center RW 08", "Gedung serbaguna warga selesai dibangun dan mulai aktif digunakan untuk pengajian, arisan PKK, serta rapat rutin pengurus RT/RW.", "Infrastruktur", "RW", "/images/community-center-proklim.jpeg", 1],
    ["2022", "Mewakili Kelurahan dalam Ajang Proklim Tingkat Kota", "RW 08 pernah dipercaya mewakili Kelurahan Cipondoh Makmur dalam ajang Program Kampung Iklim (Proklim) tingkat Kota Tangerang.", "Lingkungan", "Kota", "", 2],
  ];
  for (const p of pencapaian) {
    await db.execute({ sql: "INSERT INTO pencapaian (tahun, judul, deskripsi, kategori, tingkat, foto_url, urutan) VALUES (?, ?, ?, ?, ?, ?, ?)", args: p });
  }

  const berita = [
    {
      slug: "dlh-pantau-persiapan-proklim-2025",
      judul: "DLH Kota Tangerang Pantau Persiapan Lomba Proklim RW 08",
      ringkasan: "Dinas Lingkungan Hidup Kota Tangerang meninjau langsung kesiapan RW 08 menjelang penilaian Program Kampung Iklim.",
      konten: 'Dinas Lingkungan Hidup (DLH) Kota Tangerang melakukan kunjungan pemantauan ke RW 08 Kelurahan Cipondoh Makmur guna melihat kesiapan warga menjelang penilaian Program Kampung Iklim (Proklim) tingkat Kota Tangerang.\n\nKetua RW 08, Henry Agus, menyampaikan bahwa warga telah mempersiapkan berbagai hal sejak beberapa bulan sebelumnya, di antaranya pembangunan lubang biopori, ajakan menanam Tanaman Obat Keluarga (TOGA), serta menggalakkan kegiatan kerja bakti rutin. Rombongan DLH turut diajak meninjau tandon air yang dimiliki RW 08 sebagai bagian dari upaya mitigasi genangan air di musim hujan.\n\nPersiapan ini merupakan kelanjutan dari konsep besar yang diusung RW 08, yakni "Kampung Bersinar" — Bersih, Sinergi, Aman, dan Ramah — sebagai identitas kampung iklim yang tangguh sekaligus guyub secara sosial.',
      kategori: "Lingkungan",
      penulis: "Admin RW 08",
      gambar_url: "",
      tanggal_terbit: "2025-01-08",
    },
    {
      slug: "ragam-kegiatan-community-center",
      judul: "Ragam Kegiatan Warga di Gedung Community Center RW 08",
      ringkasan: "Gedung yang dibangun sejak 2023 ini kini aktif menjadi pusat pengajian, arisan PKK, hingga rapat rutin RT/RW.",
      konten: "Gedung Community Center RW 08 Kelurahan Cipondoh Makmur yang telah berdiri sejak tahun 2023 kini semakin aktif digunakan warga untuk berbagai kegiatan. Menurut pengurus RW, gedung ini rutin dipakai untuk pengajian bapak-bapak dan ibu-ibu, arisan PKK, serta rapat pengurus RT dan RW yang digelar setiap dua bulan sekali.\n\nTak hanya itu, warga bersama pengurus juga kompak menjaga fasilitas gedung dengan gotong royong mengecat tembok dan pagar, serta mengembangkan Kelompok Wanita Tani (KWT) di area sekitar bangunan agar suasana lingkungan tetap asri.\n\nBerkat konsistensi menjaga kebersihan dan kekompakan warga ini, RW 08 pernah dipercaya mewakili Kelurahan Cipondoh Makmur dalam ajang Program Kampung Iklim (Proklim) tingkat Kota Tangerang.",
      kategori: "Kegiatan Warga",
      penulis: "Admin RW 08",
      gambar_url: "",
      tanggal_terbit: "2025-07-09",
    },
  ];
  for (const b of berita) {
    await db.execute({
      sql: "INSERT INTO berita (slug, judul, ringkasan, konten, kategori, penulis, gambar_url, tanggal_terbit) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      args: [b.slug, b.judul, b.ringkasan, b.konten, b.kategori, b.penulis, b.gambar_url, b.tanggal_terbit],
    });
  }

  const umkm = [
    { nama_usaha: "Sabun Herbal Pak Sugeng", pemilik: "Kerajinan / Produksi", kategori: "Kerajinan / Produksi", deskripsi: "UMKM yang bergerak di bidang produksi sabun herbal, sabun cuci tangan, hand sanitizer, serta pelatihan pembuatan sabun bagi masyarakat. Mengusung prinsip kemandirian dengan membagikan ilmu secara terbuka agar masyarakat mampu membangun usaha secara mandiri.", produk_unggulan: "Sabun Herbal, Sabun Cuci Tangan, Hand Sanitizer", kontak: "087873760002", alamat: "RW 08, Kelurahan Cipondoh Makmur", urutan: 1 },
  ];
  for (const u of umkm) {
    await db.execute({
      sql: "INSERT INTO umkm (nama_usaha, pemilik, kategori, deskripsi, produk_unggulan, kontak, alamat, urutan) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      args: [u.nama_usaha, u.pemilik, u.kategori, u.deskripsi, u.produk_unggulan, u.kontak, u.alamat, u.urutan],
    });
  }

  await db.execute({
    sql: "INSERT INTO bank_sampah (id, status, deskripsi, jadwal_setor, lokasi, pengurus, cara_gabung) VALUES (1, ?, ?, ?, ?, ?, ?)",
    args: [
      "Dalam Persiapan",
      "",
      "Sehabis Penimbangan Langsung di Setor",
      "Gedung Community Center RW 08",
      "Pak Slamet",
      '["Kumpulkan sampah anorganik (plastik, kertas, kaleng, botol) dalam kondisi bersih dan kering.","Pilah sampah sesuai jenisnya di rumah masing-masing.","Bawa ke lokasi penimbangan sesuai jadwal yang akan diumumkan pengurus.","Sampah ditimbang dan dicatat sebagai saldo tabungan atas nama warga."]',
    ],
  });

  const bankSampahHarga = [
    ["Kertas / Kardus", "Rp. 2.100", 1],
    ["Botol Plastik (PET)", "Rp. 2.800", 2],
    ["Kaleng / Logam", "Rp. 4.300", 3],
    ["Botol & Gelas Kaca", "Rp. 300", 4],
  ];
  for (const h of bankSampahHarga) {
    await db.execute({ sql: "INSERT INTO bank_sampah_harga (jenis_sampah, harga, urutan) VALUES (?, ?, ?)", args: h });
  }

  // Format rekap kiloan & pendapatan bulanan bank sampah.
  // Belum ada penimbangan resmi karena unit masih tahap persiapan, jadi nilainya
  // sengaja dikosongkan (NULL) dulu -- tabel ini tinggal diisi angka aslinya
  // begitu bank sampah sudah mulai beroperasi dan melakukan penimbangan.
  const bankSampahBulanan = [
    ["Juni", "2026",  295.8, 671190, 1],
    ["Juli", "2026", 261.8, 535650, 2],
    ["Agustus", "2026", null, null, 3],
  ];
  for (const b of bankSampahBulanan) {
    await db.execute({ sql: "INSERT INTO bank_sampah_bulanan (bulan, tahun, total_kg, total_pendapatan, urutan) VALUES (?, ?, ?, ?, ?)", args: b });
  }

  console.log("Seed selesai. Database:", isRemote ? "Turso (online) — " + process.env.TURSO_DATABASE_URL : dbPath);
}

main().catch((err) => {
  console.error("Seed gagal:", err);
  process.exit(1);
});
