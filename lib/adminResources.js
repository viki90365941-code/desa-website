// Konfigurasi resource yang bisa dikelola lewat panel admin.
// PENTING: nama tabel & kolom di sini adalah WHITELIST -- API route hanya
// akan pernah menyentuh tabel/kolom yang terdaftar persis di sini, supaya
// aman dari SQL injection lewat parameter URL.

export const RESOURCES = {
  berita: {
    table: "berita",
    label: "Berita & Info",
    orderBy: "tanggal_terbit DESC",
    fields: [
      { name: "judul", label: "Judul", type: "text", required: true },
      { name: "slug", label: "Slug (untuk URL, huruf kecil & tanda strip)", type: "text", required: true },
      { name: "ringkasan", label: "Ringkasan Singkat", type: "textarea" },
      { name: "konten", label: "Isi Lengkap Berita", type: "textarea", required: true },
      { name: "kategori", label: "Kategori", type: "text" },
      { name: "penulis", label: "Penulis", type: "text" },
      { name: "gambar_url", label: "Path/URL Gambar (contoh: /images/nama.jpg)", type: "text" },
      { name: "tanggal_terbit", label: "Tanggal Terbit (format: YYYY-MM-DD)", type: "text", required: true },
    ],
    listColumns: ["judul", "kategori", "tanggal_terbit"],
  },
  umkm: {
    table: "umkm",
    label: "UMKM Warga",
    orderBy: "urutan ASC",
    fields: [
      { name: "nama_usaha", label: "Nama Usaha", type: "text", required: true },
      { name: "pemilik", label: "Nama Pemilik", type: "text" },
      { name: "kategori", label: "Kategori", type: "text" },
      { name: "deskripsi", label: "Deskripsi", type: "textarea" },
      { name: "produk_unggulan", label: "Produk Unggulan", type: "text" },
      { name: "kontak", label: "Kontak (WA/Telepon)", type: "text" },
      { name: "alamat", label: "Alamat", type: "text" },
      { name: "foto_url", label: "Path/URL Foto", type: "text" },
      { name: "urutan", label: "Urutan Tampil", type: "number" },
    ],
    listColumns: ["nama_usaha", "kategori", "urutan"],
  },
  potensi_desa: {
    table: "potensi_desa",
    label: "Program & Potensi Unggulan",
    orderBy: "urutan ASC",
    fields: [
      { name: "judul", label: "Judul", type: "text", required: true },
      { name: "deskripsi", label: "Deskripsi", type: "textarea" },
      { name: "ikon", label: "Ikon (sprout / hand / mountain / sheep / wheat / building)", type: "text" },
      { name: "urutan", label: "Urutan Tampil", type: "number" },
    ],
    listColumns: ["judul", "urutan"],
  },
  pencapaian: {
    table: "pencapaian",
    label: "Pencapaian",
    orderBy: "tahun DESC, urutan ASC",
    fields: [
      { name: "tahun", label: "Tahun", type: "text", required: true },
      { name: "judul", label: "Judul", type: "text", required: true },
      { name: "deskripsi", label: "Deskripsi", type: "textarea" },
      { name: "kategori", label: "Kategori", type: "text" },
      { name: "tingkat", label: "Tingkat (RW/Kecamatan/Kota/Nasional)", type: "text" },
      { name: "foto_url", label: "Path/URL Foto", type: "text" },
      { name: "urutan", label: "Urutan Tampil", type: "number" },
    ],
    listColumns: ["tahun", "judul", "tingkat"],
  },
  struktur_organisasi: {
    table: "struktur_organisasi",
    label: "Struktur RW",
    orderBy: "level ASC, urutan ASC",
    fields: [
      { name: "nama", label: "Nama", type: "text", required: true },
      { name: "jabatan", label: "Jabatan", type: "text", required: true },
      { name: "level", label: "Level (1=paling atas, makin besar makin bawah)", type: "number", required: true },
      { name: "parent_id", label: "ID Atasan (lihat ID di daftar, kosongkan jika paling atas)", type: "number" },
      { name: "urutan", label: "Urutan Tampil", type: "number" },
      { name: "periode", label: "Periode Jabatan", type: "text" },
    ],
    listColumns: ["nama", "jabatan", "level", "parent_id"],
  },
  pengurus_rt: {
    table: "pengurus_rt",
    label: "Pengurus RT",
    orderBy: "urutan ASC",
    fields: [
      { name: "no_rt", label: "Nomor RT", type: "text", required: true },
      { name: "ketua", label: "Ketua RT", type: "text" },
      { name: "sekretaris", label: "Sekretaris", type: "text" },
      { name: "bendahara", label: "Bendahara", type: "text" },
      { name: "urutan", label: "Urutan Tampil", type: "number" },
    ],
    listColumns: ["no_rt", "ketua"],
  },
  bidang_kerohanian: {
    table: "bidang_kerohanian",
    label: "Bidang Kerohanian",
    orderBy: "urutan ASC",
    fields: [
      { name: "agama", label: "Agama", type: "text", required: true },
      { name: "nama", label: "Nama Penanggung Jawab", type: "text" },
      { name: "urutan", label: "Urutan Tampil", type: "number" },
    ],
    listColumns: ["agama", "nama"],
  },
  bank_sampah_harga: {
    table: "bank_sampah_harga",
    label: "Harga Bank Sampah",
    orderBy: "urutan ASC",
    fields: [
      { name: "jenis_sampah", label: "Jenis Sampah", type: "text", required: true },
      { name: "harga", label: "Harga", type: "text", required: true },
      { name: "urutan", label: "Urutan Tampil", type: "number" },
    ],
    listColumns: ["jenis_sampah", "harga"],
  },
  bank_sampah_bulanan: {
    table: "bank_sampah_bulanan",
    label: "Rekap Bulanan Bank Sampah",
    orderBy: "urutan ASC",
    fields: [
      { name: "bulan", label: "Bulan", type: "text", required: true },
      { name: "tahun", label: "Tahun", type: "text", required: true },
      { name: "total_kg", label: "Total Kg Terkumpul", type: "number" },
      { name: "total_pendapatan", label: "Total Pendapatan (Rp)", type: "number" },
      { name: "urutan", label: "Urutan Tampil", type: "number" },
    ],
    listColumns: ["bulan", "tahun", "total_kg", "total_pendapatan"],
  },
  statistik_penduduk: {
    table: "statistik_penduduk",
    label: "Statistik Cepat (Kartu di Beranda)",
    orderBy: "urutan ASC",
    fields: [
      { name: "label", label: "Label", type: "text", required: true },
      { name: "nilai", label: "Nilai", type: "text", required: true },
      { name: "urutan", label: "Urutan Tampil", type: "number" },
    ],
    listColumns: ["label", "nilai"],
  },
};

export function getResourceConfig(key) {
  return RESOURCES[key] || null;
}

// Resource "singleton": cuma ada 1 baris data (id selalu 1), jadi bukan
// daftar yang bisa ditambah/dihapus, hanya bisa diedit.
export const SINGLETONS = {
  profil: {
    table: "profil_desa",
    label: "Profil Kampung",
    fields: [
      { name: "nama_desa", label: "Nama Kampung/Desa", type: "text" },
      { name: "kecamatan", label: "Kecamatan", type: "text" },
      { name: "kabupaten", label: "Kabupaten/Kota", type: "text" },
      { name: "provinsi", label: "Provinsi", type: "text" },
      { name: "kode_pos", label: "Kode Pos", type: "text" },
      { name: "luas_wilayah", label: "Luas Wilayah", type: "text" },
      { name: "jumlah_penduduk", label: "Jumlah Penduduk", type: "text" },
      { name: "jumlah_kk", label: "Jumlah KK", type: "text" },
      { name: "jumlah_dusun", label: "Jumlah RT/Dusun", type: "text" },
      { name: "tahun_berdiri", label: "Tahun Berdiri/Dirintis", type: "text" },
      { name: "sejarah", label: "Sejarah", type: "textarea" },
      { name: "visi", label: "Visi", type: "textarea" },
      { name: "misi", label: "Misi (satu poin per baris)", type: "list" },
      { name: "geografis", label: "Kondisi Geografis", type: "textarea" },
      { name: "batas_utara", label: "Batas Utara", type: "text" },
      { name: "batas_selatan", label: "Batas Selatan", type: "text" },
      { name: "batas_timur", label: "Batas Timur", type: "text" },
      { name: "batas_barat", label: "Batas Barat", type: "text" },
      { name: "alamat_kantor", label: "Alamat", type: "textarea" },
      { name: "email", label: "Email", type: "text" },
      { name: "telepon", label: "Telepon/WhatsApp", type: "text" },
      { name: "jam_layanan", label: "Jam Layanan", type: "text" },
      { name: "instagram", label: "Link Instagram", type: "text" },
      { name: "facebook", label: "Link Facebook", type: "text" },
      { name: "youtube", label: "Link YouTube", type: "text" },
      { name: "latitude", label: "Latitude Peta", type: "number" },
      { name: "longitude", label: "Longitude Peta", type: "number" },
      { name: "sambutan_kades", label: "Teks Sambutan Ketua RW", type: "textarea" },
      { name: "nama_kades", label: "Nama Ketua RW", type: "text" },
      { name: "foto_kades_url", label: "Path/URL Foto Ketua RW", type: "text" },
    ],
  },
  "bank-sampah": {
    table: "bank_sampah",
    label: "Info Bank Sampah",
    fields: [
      { name: "status", label: "Status (contoh: Dalam Persiapan / Sudah Berjalan)", type: "text" },
      { name: "deskripsi", label: "Deskripsi", type: "textarea" },
      { name: "jadwal_setor", label: "Jadwal Setor", type: "text" },
      { name: "lokasi", label: "Lokasi", type: "text" },
      { name: "pengurus", label: "Pengurus", type: "text" },
      { name: "cara_gabung", label: "Cara Ikut Menabung (satu langkah per baris)", type: "list" },
    ],
  },
};

export function getSingletonConfig(key) {
  return SINGLETONS[key] || null;
}
