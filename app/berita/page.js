import { getBeritaList, getProfilDesa } from "@/lib/queries";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata = { title: "Berita & Info" };

function formatTanggal(t) {
  return new Date(t).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

export default async function BeritaPage({ searchParams }) {
  const profil = await getProfilDesa();
  const semua = await getBeritaList();
  const kategoriAktif = searchParams?.kategori || "Semua";
  const kategoriList = ["Semua", ...new Set(semua.map((b) => b.kategori))];

  const daftar =
    kategoriAktif === "Semua" ? semua : semua.filter((b) => b.kategori === kategoriAktif);

  return (
    <>
      <PageHero
        eyebrow="Kabar Kampung"
        title="Berita & Informasi Kampung"
        subtitle={`Kumpulan kabar terbaru seputar kegiatan dan program Kampung Iklim di ${profil?.nama_desa}.`}
      />

      <section className="bg-paper py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="flex flex-wrap justify-center gap-2">
            {kategoriList.map((k) => (
              <Link
                key={k}
                href={k === "Semua" ? "/berita" : `/berita?kategori=${encodeURIComponent(k)}`}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  kategoriAktif === k
                    ? "bg-forest text-paper"
                    : "bg-white text-forest-dark ring-1 ring-forest/10 hover:bg-paper2"
                }`}
              >
                {k}
              </Link>
            ))}
          </Reveal>

          {daftar.length === 0 ? (
            <p className="mt-16 text-center text-mist">Belum ada berita pada kategori ini.</p>
          ) : (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {daftar.map((b, i) => (
                <Reveal key={b.id} delay={(i % 3) * 80}>
                  <Link
                    href={`/berita/${b.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-forest/5 transition-all hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex h-36 items-center justify-center bg-gradient-to-br from-forest-light to-forest text-paper/60">
                      <span className="font-mono text-xs uppercase tracking-widest">{b.kategori}</span>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <p className="font-mono text-xs text-mist">{formatTanggal(b.tanggal_terbit)}</p>
                      <h3 className="mt-2 font-display text-base font-bold leading-snug text-forest-dark group-hover:text-forest">
                        {b.judul}
                      </h3>
                      <p className="mt-2 line-clamp-3 flex-1 text-sm text-mist">{b.ringkasan}</p>
                      <span className="mt-4 text-sm font-bold text-gold-dark">Baca selengkapnya →</span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
