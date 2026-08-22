import Link from "next/link";
import TerraceDivider from "./TerraceDivider";

export default function Footer({ profil }) {
  const nama = profil?.nama_desa || "Kampung Proklim RW 08 Bersinar";
  return (
    <footer className="relative bg-forest-dark text-paper/90">
      <TerraceDivider flip className="text-forest-dark" bgClass="text-paper" />
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-4">
        <div>
          <p className="font-display text-lg font-bold text-paper">{nama}</p>
          <p className="mt-3 text-sm leading-relaxed text-paper/70">
            {profil?.kecamatan}, {profil?.kabupaten}, {profil?.provinsi}
          </p>
          <p className="mt-4 font-mono text-xs uppercase tracking-widest text-gold/80">
            Situs Resmi Kampung Proklim RW 08
          </p>
        </div>

        <div>
          <p className="font-display text-sm font-bold uppercase tracking-wide text-gold">Jelajahi</p>
          <ul className="mt-4 space-y-2 text-sm text-paper/75">
            <li><Link href="/tentang" className="hover:text-gold">Tentang Kampung</Link></li>
            <li><Link href="/struktur" className="hover:text-gold">Struktur Organisasi</Link></li>
            <li><Link href="/umkm" className="hover:text-gold">UMKM Warga</Link></li>
            <li><Link href="/bank-sampah" className="hover:text-gold">Bank Sampah</Link></li>
            <li><Link href="/pencapaian" className="hover:text-gold">Pencapaian</Link></li>
            <li><Link href="/berita" className="hover:text-gold">Berita &amp; Info</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-display text-sm font-bold uppercase tracking-wide text-gold">Kontak</p>
          <ul className="mt-4 space-y-2 text-sm text-paper/75">
            <li>{profil?.alamat_kantor}</li>
            <li>{profil?.telepon}</li>
            <li>{profil?.email}</li>
          </ul>
        </div>

        <div>
          <p className="font-display text-sm font-bold uppercase tracking-wide text-gold">Jam Layanan</p>
          <p className="mt-4 text-sm text-paper/75">{profil?.jam_layanan}</p>
          <div className="mt-5 flex gap-3">
            {profil?.instagram && (
              <a href={profil.instagram} className="rounded-full border border-paper/20 px-3 py-1 text-xs hover:border-gold hover:text-gold">Instagram</a>
            )}
            {profil?.facebook && (
              <a href={profil.facebook} className="rounded-full border border-paper/20 px-3 py-1 text-xs hover:border-gold hover:text-gold">Facebook</a>
            )}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-paper/50">
        © {new Date().getFullYear()} {nama}. Seluruh hak cipta dilindungi by KKN UMT CIMAK 2026.
      </div>
    </footer>
  );
}
