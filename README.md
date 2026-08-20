# Website Profil Kampung Proklim RW 08 Bersinar

Website profil RW/Kampung Iklim modern, dibangun dengan **Next.js 15**, **Tailwind CSS**, dan database **SQLite** (via `better-sqlite3`) sehingga sepenuhnya siap deploy tanpa perlu mengatur database eksternal.

> ⚠️ **Penting sebelum publikasi**: Beberapa data (alamat lengkap, email, telepon resmi, nama Sekretaris/Bendahara/Ketua Pokja, batas wilayah, jumlah penduduk) masih ditandai **"Segera dilengkapi"** karena belum ada sumber publik yang bisa diverifikasi saat website ini dibuat. Kutipan sambutan Ketua RW juga masih berupa **draf** berdasarkan berita yang tersedia — mohon dikonfirmasi ulang ke Ketua RW (Henry Agus) sebelum dipublikasikan secara resmi. Semua data ini bisa diedit lewat `scripts/seed.js` (lihat panduan di bawah).

## ✨ Fitur

1. **Beranda** — hero, sambutan Kepala Desa, statistik cepat, potensi unggulan, pencapaian, berita terbaru.
2. **Tentang Desa** — sejarah, visi & misi, kondisi geografis & batas wilayah, potensi desa lengkap.
3. **Struktur Desa** — bagan organisasi (Kepala Desa, BPD, Sekdes, Kaur/Kasi, Kepala Dusun).
4. **Pencapaian Desa** — linimasa penghargaan & tonggak pembangunan per tahun.
5. **Berita & Info** — daftar berita dengan filter kategori + halaman detail per artikel.
6. **Kontak** — informasi kantor, peta lokasi, dan formulir kontak yang tersimpan ke database.

Semua data (profil desa, struktur organisasi, pencapaian, berita, pesan kontak) disimpan di **database Turso (cloud)** dan dapat diubah kapan saja lewat panel admin, tanpa mengubah kode.

---

## ⚡ Cara Tercepat: Online Tanpa Install Apa-apa di Laptop

Kalau tidak mau ribet install Node.js/npm di komputer, ikuti jalur ini — semuanya lewat browser saja:

1. **Buat database Turso** (gratis): daftar di [turso.tech](https://turso.tech), buat database baru, catat `Database URL` dan `Auth Token`-nya. (Lihat detail di bagian "🗄️ Database: Turso" di bawah.)
2. **Upload project ke GitHub lewat browser** (tanpa command line): buat repository baru di [github.com](https://github.com/new), lalu di halaman repo klik **"uploading an existing file"**, drag semua isi folder `desa-website` ke situ, klik Commit.
3. **Deploy ke Vercel**: buka [vercel.com/new](https://vercel.com/new), pilih repository GitHub yang baru dibuat, klik Deploy.
4. **Atur Environment Variables** di Vercel (Settings → Environment Variables): masukkan `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`, `ADMIN_PASSWORD`, dan `ADMIN_SESSION_SECRET`, lalu Redeploy.
5. **Isi data awal lewat tombol, bukan terminal**: buka `namadomain.vercel.app/admin`, login, scroll ke bawah ke bagian **"⚠️ Zona Setup Awal"**, klik tombol **"Isi Data Awal (Reset Database)"**.
6. Selesai! Website sudah online dan terisi data contoh. Semua perubahan selanjutnya (edit teks, tambah berita, dll) tinggal dilakukan lewat panel admin di browser — laptop tidak perlu install Node.js/npm sama sekali.

---

## 🚀 Menjalankan di Komputer Lokal

**Prasyarat:** Node.js versi 18 ke atas.

```bash
# 1. Masuk ke folder project
cd website-profil-desa

# 2. Install dependencies
npm install

# 3. Isi database dengan data contoh (jalankan sekali)
npm run seed

# 4. Jalankan mode pengembangan
npm run dev
```

Buka `http://localhost:3000` di browser.

---

## ✏️ Mengubah Konten (Tanpa Coding)

Seluruh konten diatur lewat `scripts/seed.js`. Untuk mengganti nama desa, sejarah, visi-misi, struktur pejabat, pencapaian, atau berita:

1. Buka `scripts/seed.js`.
2. Ubah teks/nilai yang diinginkan (nama desa, alamat, sejarah, dsb).
3. Jalankan ulang:
   ```bash
   npm run seed
   ```
   Perintah ini akan **menghapus data lama dan mengisi ulang** dengan data terbaru dari file tersebut.

> Ingin mengedit data langsung tanpa lewat kode? Anda bisa membuka `data/desa.db` dengan aplikasi seperti **DB Browser for SQLite** (gratis) dan mengedit data secara visual/tabel.

### Menambah berita baru lewat SQL
Contoh menambah satu berita baru tanpa reset seluruh data:
```js
// jalankan lewat: node -e "...require('./lib/db')..."
const db = require("./lib/db").default;
db.prepare(`
  INSERT INTO berita (slug, judul, ringkasan, konten, kategori, penulis, tanggal_terbit)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`).run(
  "judul-berita-baru", "Judul Berita Baru", "Ringkasan singkat...",
  "Isi lengkap berita...", "Umum", "Admin Desa", "2026-08-01"
);
```

### Melihat pesan kontak yang masuk
```bash
node -e "console.log(require('./lib/db').default.prepare('SELECT * FROM pesan_kontak ORDER BY id DESC').all())"
```

---

## 🎨 Kustomisasi Tampilan

- **Warna**: edit `tailwind.config.js` bagian `theme.extend.colors` (forest = hijau utama, gold = emas aksen, clay = terakota).
- **Font**: sudah menggunakan Plus Jakarta Sans & JetBrains Mono yang di-bundle secara lokal (`@fontsource`), tidak butuh koneksi internet saat build.
- **Logo**: ganti inisial "SS" di `components/Navbar.jsx` atau ganti dengan file gambar logo Anda sendiri.
- **Foto pejabat/kepala desa**: saat ini memakai avatar inisial otomatis (`components/AvatarPlaceholder.jsx`). Untuk memakai foto asli, tambahkan URL foto ke kolom `foto_url` (struktur organisasi) / `foto_kades_url` (profil desa) di database, lalu ganti komponen avatar dengan tag `<img>`.

---

## 📦 Struktur Folder

```
app/                   → seluruh halaman (App Router Next.js)
  page.js              → Beranda
  tentang/page.js      → Tentang Desa
  struktur/page.js     → Struktur Desa
  pencapaian/page.js   → Pencapaian Desa
  berita/page.js       → Daftar Berita & Info
  berita/[slug]/page.js→ Detail Berita
  kontak/page.js       → Kontak
  api/kontak/route.js  → API penyimpan pesan kontak ke database
components/            → komponen UI yang dipakai berulang
lib/db.js              → koneksi & skema database SQLite
lib/queries.js         → fungsi pengambilan data dari database
scripts/seed.js        → data awal/contoh yang mengisi database
data/desa.db           → file database SQLite (dibuat otomatis)
```

---

## ☁️ Deployment (Menjadikan Website Online)

Karena website ini memakai **SQLite berbasis file**, pilih platform hosting yang menyediakan **filesystem persisten** (bukan serverless murni), contohnya:

### Opsi 1 — Railway / Render / Fly.io / VPS (Direkomendasikan)
1. Push seluruh folder project ini ke repository GitHub.
2. Hubungkan repository ke Railway/Render/Fly.io, atau upload ke VPS Anda.
3. Atur perintah build: `npm install && npm run build && npm run seed`
   (jalankan `npm run seed` hanya di deployment pertama agar data tidak ter-reset)
4. Atur perintah start: `npm run start`
5. Pastikan folder `data/` memakai **persistent volume/disk** agar data tidak hilang setiap redeploy.

### Opsi 2 — VPS manual (Ubuntu, dsb.)
```bash
git clone <repo-anda>
cd website-profil-desa
npm install
npm run build
npm run seed        # cukup sekali
npm run start        # atau gunakan pm2 agar berjalan terus-menerus
```
Gunakan **Nginx** sebagai reverse proxy dan **PM2** agar aplikasi tetap berjalan di background.

### 🚀 Deploy ke Vercel

Project ini sudah disesuaikan agar bisa jalan di Vercel (`lib/db.js` otomatis mendeteksi lingkungan Vercel dan menyalin database ke folder `/tmp` yang bisa ditulis, plus `next.config.js` sudah diatur agar file `data/desa.db` dan modul `better-sqlite3` ikut ter-bundle).

**Langkah deploy:**
1. Push folder ini ke repository GitHub.
2. Buka [vercel.com](https://vercel.com) → **Add New Project** → pilih repository tersebut.
3. Framework otomatis terdeteksi "Next.js" — biarkan pengaturan default (Build Command: `next build`, Output: default).
4. Klik **Deploy**, tunggu proses build selesai.
5. Website bisa langsung diakses lewat domain `*.vercel.app` yang diberikan.

**⚠️ Batasan penting yang tetap berlaku di Vercel:**
- Semua halaman (Beranda, Tentang, Struktur, Pencapaian, Berita) akan tampil normal karena hanya membaca data.
- Form Kontak akan **tetap bisa dipakai tanpa error**, tapi pesan yang tersimpan **tidak permanen** — datanya hanya hidup di memori sementara (`/tmp`) milik server dan **bisa hilang kapan saja** saat Vercel me-restart fungsi atau melakukan deploy ulang.
- Begitu juga jika Anda menambah berita baru langsung lewat database di server, perubahan itu **tidak akan tersimpan permanen** di Vercel.

**Kesimpulan:** Vercel cocok untuk demo/tampilan atau situs yang datanya jarang berubah (cukup update lewat `scripts/seed.js` lalu redeploy). Jika form kontak dan berita perlu benar-benar tersimpan permanen secara online, gunakan Opsi 1 (Railway/Render/VPS) di atas, atau migrasikan database ke layanan terkelola seperti **Turso** (SQLite berbasis cloud, paling mirip dengan setup saat ini) atau Postgres.

---

## 🗄️ Database: Turso (supaya data tidak hilang di Vercel)

Sejak versi ini, database sudah dipindah dari file SQLite biasa ke **Turso** (SQLite berbasis cloud). Ini penting terutama kalau website di-deploy ke **Vercel**, karena Vercel menjalankan banyak "server sementara" yang masing-masing tidak berbagi file — kalau masih pakai SQLite file biasa, pesan kontak/data baru yang disimpan lewat 1 server bisa jadi tidak muncul saat dibuka lewat server lain. Turso menyelesaikan ini karena datanya tersimpan terpusat secara online.

**Yang perlu diketahui:**
- **Development di komputer sendiri** (`npm run dev`): otomatis pakai file lokal `data/desa.db`, TIDAK perlu akun Turso. Silakan coba-coba dengan bebas.
- **Production (online, misalnya di Vercel)**: WAJIB pakai Turso supaya data konsisten. Tanpa ini, fitur admin (tambah/edit/hapus data, pesan kontak) tidak akan berfungsi benar setelah deploy.

### Cara setup Turso (gratis, sekali saja):

1. Buka [turso.tech](https://turso.tech), daftar akun gratis (bisa pakai GitHub).
2. Install Turso CLI, atau langsung buat database lewat dashboard web mereka.
3. Buat database baru, beri nama misalnya `rw08-cipondoh-makmur`.
4. Setelah database dibuat, catat 2 hal ini dari dashboard Turso:
   - **Database URL** (formatnya seperti `libsql://nama-db-xxxxx.turso.io`)
   - **Auth Token** (klik "Create Token" kalau belum ada)
5. Di **Vercel**, buka project Anda → **Settings** → **Environment Variables**, tambahkan:
   ```
   TURSO_DATABASE_URL = libsql://nama-db-xxxxx.turso.io
   TURSO_AUTH_TOKEN = (token panjang dari Turso)
   ```
6. Redeploy project di Vercel.
7. Isi data awal ke Turso: di komputer Anda, buat file `.env.local` isinya sama seperti di atas (`TURSO_DATABASE_URL` dan `TURSO_AUTH_TOKEN`), lalu jalankan `npm run seed` — ini akan mengisi database Turso online dengan data awal.

Setelah ini, website online dan panel admin akan selalu membaca/menulis ke database Turso yang sama, jadi data tidak akan hilang atau tidak sinkron lagi.

---

## 🔑 Panel Admin (Kelola Seluruh Isi Website)

Panel admin sekarang bisa dipakai untuk **menambah, mengedit, dan menghapus** hampir semua konten website — tidak perlu edit kode lagi untuk keperluan sehari-hari.

- **URL:** `/admin` (contoh: `http://localhost:3000/admin`)
- **Password default:** `rw08admin123`

### Yang bisa dikelola lewat panel admin:
| Menu | Bisa apa saja |
|---|---|
| **Pesan Kontak** | Lihat, tandai dibaca/ditindaklanjuti, hapus pesan warga |
| **Profil Kampung** | Edit nama, sejarah, visi-misi, kontak, sambutan Ketua RW, dll (1 data, edit langsung) |
| **Statistik Cepat** | Tambah/edit/hapus kartu angka di Beranda |
| **Program & Potensi Unggulan** | Tambah/edit/hapus program di halaman Tentang |
| **Struktur RW** | Tambah/edit/hapus jajaran pengurus RW |
| **Pengurus RT** | Tambah/edit/hapus data tiap RT |
| **Bidang Kerohanian** | Tambah/edit/hapus penanggung jawab per agama |
| **Berita & Info** | Tambah/edit/hapus berita |
| **UMKM Warga** | Tambah/edit/hapus direktori usaha warga |
| **Pencapaian** | Tambah/edit/hapus piagam & prestasi |
| **Info Bank Sampah** | Edit status, jadwal, cara ikut menabung (1 data, edit langsung) |
| **Daftar Harga Sampah** | Tambah/edit/hapus harga per jenis sampah |
| **Rekap Bulanan** | Tambah/edit/hapus data kiloan & pendapatan per bulan |

Di bagian paling bawah dashboard admin ada tombol **"⚠️ Isi Data Awal (Reset Database)"** — berguna untuk pengisian pertama kali tanpa perlu buka terminal (lihat bagian "⚡ Cara Tercepat" di atas). Hati-hati: tombol ini menghapus dan menimpa SEMUA data yang ada, jadi jangan dipakai lagi setelah website sudah diisi data asli.

Semua perubahan lewat panel admin **langsung muncul di website** tanpa perlu `npm run seed` lagi — beda dengan cara edit manual lewat `scripts/seed.js` yang butuh dijalankan ulang.

> 💡 **Catatan untuk field "Struktur RW":** kolom "ID Atasan" diisi dengan ID milik orang yang jadi atasannya (lihat kolom ID di tabel daftar). Kosongkan kalau dia posisi paling atas (tidak punya atasan).

### ⚠️ WAJIB: Ganti password sebelum website online

Password default `rw08admin123` **hanya untuk uji coba di komputer sendiri**. Sebelum website ini diakses publik, ganti passwordnya:

1. Buat file baru bernama `.env.local` di folder utama project (sejajar dengan `package.json`).
2. Isi dengan:
   ```
   ADMIN_PASSWORD=password_rahasia_anda
   ADMIN_SESSION_SECRET=teks_acak_panjang_apa_saja_untuk_keamanan
   ```
3. Simpan, lalu restart `npm run dev` (atau redeploy kalau sudah online).

File `.env.local` ini otomatis tidak ikut ter-upload ke GitHub (sudah masuk `.gitignore`), jadi aman untuk menyimpan password di situ.

Kalau deploy ke Vercel/Railway/Render, tambahkan `ADMIN_PASSWORD` dan `ADMIN_SESSION_SECRET` lewat menu **Environment Variables** di dashboard platform tersebut (sama seperti langkah `TURSO_DATABASE_URL` di atas).

---

## 🔒 Keamanan

- Formulir kontak sudah melakukan validasi dasar (nama, email, pesan wajib diisi; format email diverifikasi) sebelum disimpan ke database.
- Disarankan menambahkan proteksi tambahan (rate-limiting, CAPTCHA) sebelum digunakan secara publik dalam skala besar.
- Selalu jalankan `npm audit` secara berkala dan perbarui dependency.

---

Dibuat dengan Next.js 15 · Tailwind CSS · better-sqlite3.
