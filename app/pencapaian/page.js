import { getPencapaian, getProfilDesa } from "@/lib/queries";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export const dynamic = "force-dynamic";

export const metadata = { title: "Pencapaian" };

const KATEGORI_WARNA = {
  Lingkungan: "bg-emerald-100 text-emerald-700",
  Infrastruktur: "bg-amber-100 text-amber-700",
  Sosial: "bg-indigo-100 text-indigo-700",
};

export default async function PencapaianPage() {
  const profil = await getProfilDesa();
  const pencapaian = await getPencapaian();

  return (
    <>
      <PageHero
        eyebrow="Rekam Jejak"
        title={`Pencapaian ${profil?.nama_desa}`}
        subtitle="Perjalanan panjang berbagai penghargaan dan tonggak pembangunan dari tahun ke tahun."
      />

      <section className="bg-paper py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <ol className="relative border-l-2 border-forest/15 pl-8">
            {pencapaian.map((p, i) => (
              <Reveal key={p.id} delay={i * 80} className="relative mb-12 last:mb-0">
                <span className="absolute -left-[41px] flex h-7 w-7 items-center justify-center rounded-full bg-forest ring-4 ring-paper">
                  <span className="h-2.5 w-2.5 rounded-full bg-gold" />
                </span>

                <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-forest/5">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-2xl font-extrabold text-forest">{p.tahun}</span>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        KATEGORI_WARNA[p.kategori] || "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {p.kategori}
                    </span>
                    <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold text-gold-dark">
                      Tingkat {p.tingkat}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-lg font-bold text-forest-dark">{p.judul}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-mist">{p.deskripsi}</p>
                  {p.foto_url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.foto_url}
                      alt={p.judul}
                      className="mt-4 max-h-80 w-full rounded-xl object-cover ring-1 ring-forest/10"
                    />
                  )}
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
