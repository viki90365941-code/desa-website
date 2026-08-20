import { getBeritaBySlug, getBeritaList } from "@/lib/queries";
import Link from "next/link";
import { notFound } from "next/navigation";
import TerraceDivider from "@/components/TerraceDivider";
import Reveal from "@/components/Reveal";

export const dynamic = "force-dynamic";

function formatTanggal(t) {
  return new Date(t).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

export async function generateMetadata({ params }) {
  const berita = await getBeritaBySlug(params.slug);
  return { title: berita ? berita.judul : "Berita tidak ditemukan" };
}

export default async function DetailBeritaPage({ params }) {
  const berita = await getBeritaBySlug(params.slug);
  if (!berita) notFound();

  const lainnya = (await getBeritaList())
    .filter((b) => b.slug !== berita.slug)
    .slice(0, 3);

  return (
    <>
      <section className="bg-gradient-to-b from-forest to-forest-light">
        <div className="mx-auto max-w-3xl px-6 pb-14 pt-12 sm:pb-20 sm:pt-16">
          <Link href="/berita" className="text-sm font-semibold text-gold hover:underline">
            ← Kembali ke Berita
          </Link>
          <span className="mt-5 inline-block rounded-full bg-white/10 px-3 py-1 font-mono text-xs uppercase tracking-widest text-gold">
            {berita.kategori}
          </span>
          <h1 className="mt-4 font-display text-2xl font-extrabold leading-tight text-paper sm:text-3xl md:text-4xl">
            {berita.judul}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-paper/70">
            <span>{formatTanggal(berita.tanggal_terbit)}</span>
            <span aria-hidden="true">•</span>
            <span>{berita.penulis}</span>
            <span aria-hidden="true">•</span>
            <span>{berita.dilihat} kali dibaca</span>
          </div>
        </div>
        <TerraceDivider bgClass="text-paper" />
      </section>

      <article className="bg-paper py-14 sm:py-16">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal className="space-y-5 text-base leading-relaxed text-ink/90">
            {berita.konten.split("\n").map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Reveal>
        </div>
      </article>

      {lainnya.length > 0 && (
        <section className="bg-paper2 py-16">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <h2 className="font-display text-xl font-bold text-forest-dark">Berita Lainnya</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {lainnya.map((b) => (
                <Link
                  key={b.id}
                  href={`/berita/${b.slug}`}
                  className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-forest/5 transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <p className="font-mono text-xs text-mist">{formatTanggal(b.tanggal_terbit)}</p>
                  <h3 className="mt-2 font-display text-sm font-bold leading-snug text-forest-dark group-hover:text-forest">
                    {b.judul}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
