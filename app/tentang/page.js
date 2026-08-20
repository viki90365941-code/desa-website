import { getProfilDesa, getPotensiDesa, getStatistikPenduduk } from "@/lib/queries";
import Reveal from "@/components/Reveal";
import TerraceDivider from "@/components/TerraceDivider";
import PageHero from "@/components/PageHero";

export const dynamic = "force-dynamic";

export const metadata = { title: "Tentang Kampung" };

export default async function TentangPage() {
  const profil = await getProfilDesa();
  const potensi = await getPotensiDesa();
  const statistik = await getStatistikPenduduk();
  const misi = profil?.misi ? JSON.parse(profil.misi) : [];

  return (
    <>
      <PageHero
        eyebrow="Profil Kampung"
        title={`Mengenal Lebih Dekat ${profil?.nama_desa}`}
        subtitle={`${profil?.kecamatan}, ${profil?.kabupaten}, ${profil?.provinsi} — berdiri sejak ${profil?.tahun_berdiri}`}
      />

      {/* SEJARAH */}
      <section className="bg-paper py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 md:grid-cols-[1fr,1.3fr] md:items-start">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-forest/60">Asal Usul</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold text-forest-dark">Sejarah Kampung</h2>
            <div className="mt-4 h-1.5 w-16 rounded-full bg-gold" />
          </Reveal>
          <Reveal delay={100}>
            <div className="space-y-4 text-base leading-relaxed text-mist">
              {profil?.sejarah?.split("\n").map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* VISI MISI */}
      <section className="bg-forest-dark py-16 text-paper sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal className="text-center">
            <p className="font-mono text-xs uppercase tracking-widest text-gold/80">Arah Pembangunan</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">Visi &amp; Misi</h2>
          </Reveal>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr,1.4fr]">
            <Reveal>
              <div className="h-full rounded-3xl border border-gold/30 bg-white/5 p-8 backdrop-blur-sm">
                <p className="font-display text-sm font-bold uppercase tracking-widest text-gold">Visi</p>
                <p className="mt-4 text-lg font-medium leading-relaxed text-paper">{profil?.visi}</p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="h-full rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                <p className="font-display text-sm font-bold uppercase tracking-widest text-gold">Misi</p>
                <ol className="mt-4 space-y-3">
                  {misi.map((m, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-relaxed text-paper/85 sm:text-base">
                      <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-gold font-mono text-xs font-bold text-forest-dark">
                        {i + 1}
                      </span>
                      <span>{m}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>
        </div>
        <div className="mt-16"><TerraceDivider bgClass="text-paper" /></div>
      </section>

      {/* GEOGRAFIS */}
      <section className="bg-paper py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-forest/60">Letak &amp; Batas Wilayah</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold text-forest-dark">Kondisi Geografis</h2>
          </Reveal>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr,1fr]">
            <Reveal>
              <p className="text-base leading-relaxed text-mist">{profil?.geografis}</p>

              <div className="mt-8 grid grid-cols-2 gap-4">
                {statistik.map((s) => (
                  <div key={s.id} className="rounded-2xl bg-paper2 px-4 py-5 ring-1 ring-forest/5">
                    <p className="font-mono text-xl font-bold text-forest">{s.nilai}</p>
                    <p className="mt-1 text-xs text-mist">{s.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="rounded-3xl bg-forest p-6 text-paper sm:p-8">
                <p className="font-display text-sm font-bold uppercase tracking-widest text-gold">Batas Wilayah</p>
                <ul className="mt-5 space-y-4 text-sm">
                  <BatasItem arah="Utara" nilai={profil?.batas_utara} />
                  <BatasItem arah="Selatan" nilai={profil?.batas_selatan} />
                  <BatasItem arah="Timur" nilai={profil?.batas_timur} />
                  <BatasItem arah="Barat" nilai={profil?.batas_barat} />
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* POTENSI LENGKAP */}
      <section className="bg-paper2 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal className="text-center">
            <p className="font-mono text-xs uppercase tracking-widest text-forest/60">Sumber Daya</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold text-forest-dark">Program &amp; Potensi Unggulan</h2>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {potensi.map((p, i) => (
              <Reveal key={p.id} delay={(i % 2) * 100}>
                <div className="flex gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-forest/5">
                  <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-gold/20 font-display text-sm font-extrabold text-gold-dark">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-base font-bold text-forest-dark">{p.judul}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-mist">{p.deskripsi}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function BatasItem({ arah, nilai }) {
  return (
    <li className="flex items-center justify-between border-b border-white/10 pb-3">
      <span className="font-medium text-paper/70">{arah}</span>
      <span className="text-right font-semibold text-paper">{nilai}</span>
    </li>
  );
}

