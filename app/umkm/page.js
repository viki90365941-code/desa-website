import { getUmkmList, getProfilDesa } from "@/lib/queries";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export const dynamic = "force-dynamic";

export const metadata = { title: "UMKM Warga" };

export default async function UmkmPage() {
  const profil = await getProfilDesa();
  const daftar = await getUmkmList();

  return (
    <>
      <PageHero
        eyebrow="Ekonomi Warga"
        title="UMKM Warga RW 08"
        subtitle={`Direktori usaha mikro, kecil, dan menengah milik warga ${profil?.nama_desa} — dukung produk lokal!`}
      />

      <section className="bg-paper py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          {daftar.length === 0 ? (
            <p className="mt-16 text-center text-mist">Belum ada data UMKM yang terdaftar.</p>
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {daftar.map((u, i) => (
                <Reveal key={u.id} delay={(i % 3) * 80}>
                  <div className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-forest/5 transition-all hover:-translate-y-1 hover:shadow-lg">
                    <span className="inline-block w-fit rounded-full bg-forest/10 px-3 py-1 text-xs font-semibold text-forest">
                      {u.kategori}
                    </span>
                    <h3 className="mt-3 font-display text-lg font-bold text-forest-dark">{u.nama_usaha}</h3>
                    {u.pemilik && (
                      <p className="mt-1 text-xs font-medium uppercase tracking-wide text-gold-dark">
                        Pemilik: {u.pemilik}
                      </p>
                    )}
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-mist">{u.deskripsi}</p>
                    <div className="mt-4 space-y-1 border-t border-forest/5 pt-4 text-sm">
                      <p>
                        <span className="font-semibold text-forest-dark">Produk unggulan: </span>
                        <span className="text-mist">{u.produk_unggulan}</span>
                      </p>
                      <p>
                        <span className="font-semibold text-forest-dark">Kontak: </span>
                        <span className="text-mist">{u.kontak}</span>
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}

          <Reveal className="mx-auto mt-14 max-w-2xl rounded-2xl bg-forest p-6 text-center text-paper sm:p-8">
            <p className="font-display text-lg font-bold">Punya usaha dan ingin didaftarkan?</p>
            <p className="mt-2 text-sm text-paper/80">
              Warga RW 08 yang memiliki usaha dapat menghubungi pengurus RW melalui halaman Kontak agar
              usahanya ditampilkan di direktori ini.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
