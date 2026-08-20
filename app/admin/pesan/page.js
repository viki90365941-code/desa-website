import Link from "next/link";
import { getSemuaPesanKontak, getProfilDesa } from "@/lib/queries";
import AdminPesanList from "@/components/AdminPesanList";

export const dynamic = "force-dynamic";

export const metadata = { title: "Admin - Pesan Kontak" };

export default async function AdminPesanPage() {
  const profil = await getProfilDesa();
  const pesan = await getSemuaPesanKontak();

  return (
    <div className="min-h-screen bg-paper2">
      <header className="bg-forest text-paper">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5 sm:px-8">
          <div>
            <Link href="/admin" className="text-xs font-semibold text-gold hover:underline">
              ← Kembali ke Panel Admin
            </Link>
            <h1 className="mt-1 font-display text-xl font-bold">Pesan Kontak Masuk</h1>
            <p className="mt-0.5 text-xs text-paper/60">{profil?.nama_desa}</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-10 sm:px-8">
        <AdminPesanList pesanAwal={pesan} />
      </main>
    </div>
  );
}
