import Link from "next/link";
import {
  getProfilDesa,
  getStatistikPenduduk,
  getPotensiDesa,
  getPencapaian,
  getBeritaList,
} from "@/lib/queries";
import TerraceDivider from "@/components/TerraceDivider";
import Reveal from "@/components/Reveal";
import AvatarPlaceholder from "@/components/AvatarPlaceholder";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const profil = await getProfilDesa();
  const statistik = await getStatistikPenduduk();
  const potensi = (await getPotensiDesa()).slice(0, 3);
  const pencapaian = (await getPencapaian()).slice(0, 3);
  const berita = await getBeritaList(3);

  const formatTanggal = (t) =>
    new Date(t).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-forest to-forest-light">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 top-40 h-56 w-56 rounded-full bg-white/5 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-6 pb-20 pt-16 text-center sm:pb-28 sm:pt-24">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/5 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-gold">
            Situs Resmi Kampung Proklim RW 08
          </span>

          <h1 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-extrabold leading-tight tracking-tight text-paper sm:text-5xl md:text-6xl">
            Selamat Datang di Website Resmi{" "}
            <span className="text-gold">{profil?.nama_desa}</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-paper/80 sm:text-lg">
            {profil?.visi}
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/tentang"
              className="rounded-full bg-white px-7 py-3 font-display text-sm font-bold text-forest-dark shadow-lg shadow-black/10 transition-transform hover:-translate-y-0.5"
            >
              Jelajahi Kampung
            </Link>
            <Link
              href="/kontak"
              className="rounded-full border border-paper/30 px-7 py-3 font-display text-sm font-bold text-paper transition-colors hover:bg-white/10"
            >
              Hubungi Kami
            </Link>
          </div>

          {/* Quick stats */}
          <div className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
            {statistik.slice(0, 4).map((s) => (
              <div
                key={s.id}
                className="rounded-2xl border border-white/10 bg-white/5 px-3 py-4 backdrop-blur-sm"
              >
                <p className="font-mono text-xl font-bold text-gold sm:text-2xl">{s.nilai}</p>
                <p className="mt-1 text-xs text-paper/70 sm:text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <TerraceDivider bgClass="text-paper" />
      </section>

      {/* SAMBUTAN KEPALA DESA */}
      <section className="bg-paper">
        <div className="mx-auto -mt-4 max-w-5xl px-5 pb-20 sm:px-8">
          <Reveal>
            <div className="grid gap-8 rounded-3xl border border-forest/10 bg-white p-6 shadow-xl shadow-forest/5 sm:p-10 md:grid-cols-[auto,1fr] md:items-center">
              {profil?.foto_kades_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={profil.foto_kades_url}
                  alt={`Foto ${profil?.nama_kades}`}
                  className="mx-auto h-28 w-28 rounded-full object-cover ring-4 ring-gold/30 md:mx-0"
                />
              ) : (
                <AvatarPlaceholder
                  name={profil?.nama_kades}
                  className="mx-auto h-28 w-28 text-3xl md:mx-0"
                />
              )}
              <div>
                <p className="font-display text-xl font-bold text-forest-dark sm:text-2xl">
                  Sambutan Ketua RW 08
                </p>
                <p className="mt-4 text-base italic leading-relaxed text-mist sm:text-lg">
                  &ldquo;{profil?.sambutan_kades}&rdquo;
                </p>
                <p className="mt-4 font-display font-bold text-forest">— {profil?.nama_kades}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* POTENSI DESA */}
      <section className="bg-paper2 py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="font-mono text-xs uppercase tracking-widest text-forest/60">Unggulan Kampung</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold text-forest-dark sm:text-4xl">
              Program &amp; Potensi {profil?.nama_desa}
            </h2>
            <p className="mt-3 text-mist">
              Berbagai program lingkungan dan kegiatan warga yang menjadi identitas Kampung Bersinar.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {potensi.map((p, i) => (
              <Reveal key={p.id} delay={i * 100}>
                <div className="group h-full rounded-2xl bg-white p-7 shadow-sm ring-1 ring-forest/5 transition-all hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest/10 text-forest transition-colors group-hover:bg-gold group-hover:text-forest-dark">
                    <PotensiIcon name={p.ikon} />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold text-forest-dark">{p.judul}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-mist">{p.deskripsi}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/tentang"
              className="font-display text-sm font-bold text-forest underline decoration-gold decoration-2 underline-offset-4 hover:text-forest-dark"
            >
              Lihat profil lengkap kampung →
            </Link>
          </div>
        </div>
      </section>

      {/* PENCAPAIAN PREVIEW */}
      <section className="bg-forest-dark py-20 text-paper">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-gold/80">Rekam Jejak</p>
              <h2 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">Pencapaian</h2>
            </div>
            <Link
              href="/pencapaian"
              className="rounded-full border border-paper/25 px-5 py-2 text-sm font-semibold hover:bg-white/10"
            >
              Semua Pencapaian
            </Link>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {pencapaian.map((p, i) => (
              <Reveal key={p.id} delay={i * 100}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                  <span className="font-mono text-3xl font-extrabold text-gold">{p.tahun}</span>
                  <p className="mt-3 font-display text-base font-bold leading-snug">{p.judul}</p>
                  <span className="mt-4 inline-block rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold text-gold">
                    {p.tingkat}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BERITA TERBARU */}
      <section className="bg-paper py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-forest/60">Kabar Kampung</p>
              <h2 className="mt-2 font-display text-3xl font-extrabold text-forest-dark sm:text-4xl">
                Berita &amp; Info Terbaru
              </h2>
            </div>
            <Link
              href="/berita"
              className="rounded-full bg-forest px-5 py-2 text-sm font-semibold text-paper hover:bg-forest-dark"
            >
              Semua Berita
            </Link>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {berita.map((b, i) => (
              <Reveal key={b.id} delay={i * 100}>
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
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gold py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-display text-2xl font-extrabold text-forest-dark sm:text-3xl">
            Ada pertanyaan atau ingin mengajukan layanan?
          </h2>
          <p className="mt-3 text-forest-dark/80">
            Pengurus {profil?.nama_desa} siap membantu keperluan informasi dan partisipasi Anda dalam kegiatan kampung.
          </p>
          <Link
            href="/kontak"
            className="mt-7 inline-block rounded-full bg-forest-dark px-8 py-3 font-display text-sm font-bold text-paper hover:bg-forest"
          >
            Hubungi Pengurus RW
          </Link>
        </div>
      </section>
    </>
  );
}

function PotensiIcon({ name }) {
  const common = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "sprout":
      return (
        <svg {...common}><path d="M7 20h10" /><path d="M12 20v-8" /><path d="M12 12c-4 0-6-2.5-6-6 4 0 6 2 6 6Z" /><path d="M12 9c0-3 2-5 6-5 0 3.5-2 5-6 5Z" /></svg>
      );
    case "hand":
      return (
        <svg {...common}><path d="M6 12V6a2 2 0 1 1 4 0v5" /><path d="M10 5a2 2 0 1 1 4 0v6" /><path d="M14 6a2 2 0 1 1 4 0v6" /><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-1a8 8 0 0 1-7-4l-2.5-4.5a1.7 1.7 0 0 1 2.7-2L6 13" /></svg>
      );
    case "mountain":
      return (
        <svg {...common}><path d="m8 3 4 8 5-5 5 13H2L8 3Z" /></svg>
      );
    case "sheep":
      return (
        <svg {...common}><circle cx="12" cy="12" r="7" /><circle cx="7" cy="9" r="2" /><circle cx="17" cy="9" r="2" /><circle cx="12" cy="6" r="2" /></svg>
      );
    case "wheat":
      return (
        <svg {...common}><path d="M12 22V8" /><path d="M9 6c0-2 1.5-4 3-4s3 2 3 4-1.5 3-3 3-3-1-3-3Z" /><path d="M7 10c0-2 1-3 2-3M17 10c0-2-1-3-2-3M6 14c0-2 1-3 2-3M18 14c0-2-1-3-2-3" /></svg>
      );
    case "building":
      return (
        <svg {...common}><rect x="4" y="3" width="16" height="18" rx="1" /><path d="M9 8h1M14 8h1M9 12h1M14 12h1M9 16h1M14 16h1" /></svg>
      );
    default:
      return <svg {...common}><circle cx="12" cy="12" r="9" /></svg>;
  }
}
