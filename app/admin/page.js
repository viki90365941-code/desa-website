import Link from "next/link";
import { getProfilDesa, getSemuaPesanKontak } from "@/lib/queries";
import LogoutButton from "@/components/LogoutButton";
import SeedButton from "@/components/SeedButton";

export const dynamic = "force-dynamic";

export const metadata = { title: "Panel Admin" };

const MENU = [
  {
    kelompok: "Kotak Masuk",
    items: [{ href: "/admin/pesan", label: "Pesan Kontak", desc: "Kritik, saran, dan pertanyaan dari warga" }],
  },
  {
    kelompok: "Profil & Info Umum",
    items: [
      { href: "/admin/singleton/profil", label: "Profil Kampung", desc: "Nama, sejarah, visi-misi, kontak, sambutan Ketua RW" },
      { href: "/admin/resource/statistik_penduduk", label: "Statistik Cepat", desc: "Kartu angka di Beranda (jumlah penduduk, dll)" },
      { href: "/admin/resource/potensi_desa", label: "Program & Potensi Unggulan", desc: "Daftar program/potensi di halaman Tentang" },
    ],
  },
  {
    kelompok: "Struktur Organisasi",
    items: [
      { href: "/admin/resource/struktur_organisasi", label: "Struktur RW", desc: "Ketua RW, Sekretaris, Bendahara, Bidang-bidang" },
      { href: "/admin/resource/pengurus_rt", label: "Pengurus RT", desc: "Ketua, Sekretaris, Bendahara tiap RT" },
      { href: "/admin/resource/bidang_kerohanian", label: "Bidang Kerohanian", desc: "Penanggung jawab per agama" },
    ],
  },
  {
    kelompok: "Konten",
    items: [
      { href: "/admin/resource/berita", label: "Berita & Info", desc: "Tambah, edit, hapus berita" },
      { href: "/admin/resource/umkm", label: "UMKM Warga", desc: "Direktori usaha warga" },
      { href: "/admin/resource/pencapaian", label: "Pencapaian", desc: "Piagam, penghargaan, prestasi" },
    ],
  },
  {
    kelompok: "Bank Sampah",
    items: [
      { href: "/admin/singleton/bank-sampah", label: "Info Bank Sampah", desc: "Status, jadwal, cara ikut menabung" },
      { href: "/admin/resource/bank_sampah_harga", label: "Daftar Harga Sampah", desc: "Harga per jenis sampah" },
      { href: "/admin/resource/bank_sampah_bulanan", label: "Rekap Bulanan", desc: "Kiloan & pendapatan per bulan" },
    ],
  },
];

export default async function AdminDashboard() {
  const profil = await getProfilDesa();
  const pesan = await getSemuaPesanKontak();
  const pesanBaru = pesan.filter((p) => p.status === "baru").length;

  return (
    <div className="min-h-screen bg-paper2">
      <header className="bg-forest text-paper">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-6 sm:px-8">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-gold/80">Panel Admin</p>
            <h1 className="font-display text-2xl font-bold">Kelola Website</h1>
            <p className="mt-0.5 text-xs text-paper/60">{profil?.nama_desa}</p>
          </div>
          <LogoutButton />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        {pesanBaru > 0 && (
          <Link
            href="/admin/pesan"
            className="mb-8 flex items-center justify-between rounded-2xl bg-gold/15 px-6 py-4 text-sm font-semibold text-gold-dark ring-1 ring-gold/30 hover:bg-gold/25"
          >
            <span>📬 Ada {pesanBaru} pesan baru dari warga yang belum dibaca</span>
            <span>Lihat →</span>
          </Link>
        )}

        {MENU.map((grup) => (
          <div key={grup.kelompok} className="mb-10">
            <h2 className="mb-4 font-display text-sm font-bold uppercase tracking-widest text-forest/60">
              {grup.kelompok}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {grup.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-forest/5 transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <p className="font-display text-base font-bold text-forest-dark">{item.label}</p>
                  <p className="mt-1.5 text-sm text-mist">{item.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-4 rounded-2xl border-2 border-dashed border-rose-300 bg-rose-50 p-6">
          <p className="font-display text-sm font-bold uppercase tracking-widest text-rose-700">
            ⚠️ Zona Setup Awal
          </p>
          <p className="mt-2 text-sm text-rose-900">
            Tombol ini mengisi database dengan data contoh awal. Berguna untuk setup pertama kali
            tanpa perlu buka laptop/terminal. <strong>Menekan tombol ini akan MENGHAPUS dan MENIMPA
            semua data yang sudah ada</strong> (kembali ke data contoh) — jangan dipakai lagi setelah
            website sudah diisi data asli, kecuali memang ingin mengembalikan ke kondisi awal.
          </p>
          <SeedButton />
        </div>
      </main>
    </div>
  );
}
