import {
  getStrukturOrganisasi,
  getBidangKerohanian,
  getPengurusRt,
  getProfilDesa,
} from "@/lib/queries";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import AvatarPlaceholder from "@/components/AvatarPlaceholder";

export const dynamic = "force-dynamic";

export const metadata = { title: "Struktur Organisasi" };

export default async function StrukturPage() {
  const semua = await getStrukturOrganisasi();
  const kerohanian = await getBidangKerohanian();
  const daftarRt = await getPengurusRt();
  const profil = await getProfilDesa();

  const penasihat = semua.find((p) => p.jabatan === "Penasihat RW 08");
  const ketuaRw = semua.find((p) => p.jabatan === "Ketua RW 08");
  const sekretarisBendahara = semua.filter(
    (p) => p.level === 3 && p.parent_id === ketuaRw?.id
  );
  const bidang = semua.filter((p) => p.level === 4 && p.parent_id === ketuaRw?.id);

  return (
    <>
      <PageHero
        eyebrow="Struktur Organisasi"
        title="Struktur Kepengurusan RT & RW 08"
        subtitle={`${profil?.nama_desa} — Kelurahan Cipondoh Makmur, Kecamatan Cipondoh — Masa Bhakti 2025-2028`}
      />

      <section className="bg-paper py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          {/* PELINDUNG / PEMBINA */}
          <Reveal className="mx-auto max-w-md">
            <div className="rounded-2xl bg-forest-dark p-5 text-center text-paper ring-1 ring-white/10">
              <p className="font-display text-xs font-bold uppercase tracking-widest text-gold">
                Pelindung / Pembina
              </p>
              <ul className="mt-2 space-y-1 text-sm text-paper/85">
                <li>Lurah Cipondoh Makmur</li>
                <li>Bhabinkamtipmas</li>
                <li>Bhabinsa</li>
              </ul>
            </div>
          </Reveal>

          <Connector />

          {/* PENASIHAT & KETUA RW */}
          <Reveal className="mx-auto grid max-w-2xl gap-5 sm:grid-cols-2">
            {penasihat && <PejabatCard data={penasihat} highlight />}
            {ketuaRw && <PejabatCard data={ketuaRw} highlight />}
          </Reveal>

          <Connector />

          {/* SEKRETARIS & BENDAHARA */}
          <Reveal>
            <p className="mb-5 text-center font-mono text-xs uppercase tracking-widest text-forest/60">
              Sekretaris &amp; Bendahara
            </p>
            <div className="mx-auto grid max-w-2xl gap-5 sm:grid-cols-2">
              {sekretarisBendahara.map((p, i) => (
                <Reveal key={p.id} delay={i * 60}>
                  <PejabatCard data={p} />
                </Reveal>
              ))}
            </div>
          </Reveal>

          <Connector />

          {/* BIDANG-BIDANG */}
          <Reveal>
            <p className="mb-5 text-center font-mono text-xs uppercase tracking-widest text-forest/60">
              Bidang-Bidang RW 08
            </p>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {bidang.map((p, i) => {
                if (p.jabatan === "Bidang Kerohaniawan RW 08") {
                  return (
                    <Reveal key={p.id} delay={i * 60}>
                      <div className="flex h-full flex-col rounded-2xl bg-white p-5 text-center shadow-sm ring-1 ring-forest/5">
                        <p className="font-display text-sm font-bold text-forest-dark">
                          Bidang Kerohaniawan
                        </p>
                        <ul className="mt-3 space-y-1.5 text-left text-xs text-mist">
                          {kerohanian.map((k) => (
                            <li key={k.id} className="flex justify-between gap-2 border-b border-forest/5 pb-1.5">
                              <span className="font-medium text-forest-dark">{k.agama}</span>
                              <span>{k.nama}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Reveal>
                  );
                }
                return (
                  <Reveal key={p.id} delay={i * 60}>
                    <PejabatCard data={p} compact />
                  </Reveal>
                );
              })}
            </div>
          </Reveal>

          <Connector />

          {/* KETUA RT */}
          <Reveal>
            <p className="mb-5 text-center font-mono text-xs uppercase tracking-widest text-forest/60">
              Pengurus RT 01 - RT 010
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {daftarRt.map((rt, i) => (
                <Reveal key={rt.id} delay={(i % 5) * 60}>
                  <div className="flex h-full flex-col items-center rounded-2xl bg-white p-4 text-center shadow-sm ring-1 ring-forest/5 transition-transform hover:-translate-y-1">
                    <span className="rounded-full bg-forest px-3 py-1 font-mono text-xs font-bold text-paper">
                      RT {rt.no_rt}
                    </span>
                    <p className="mt-3 font-display text-sm font-bold text-forest-dark">{rt.ketua}</p>
                    <p className="text-[11px] uppercase tracking-wide text-gold-dark">Ketua RT</p>
                    <div className="mt-3 w-full space-y-1 border-t border-forest/5 pt-3 text-left text-[11px] text-mist">
                      <p><span className="font-semibold text-forest-dark">Sekretaris:</span> {rt.sekretaris}</p>
                      <p><span className="font-semibold text-forest-dark">Bendahara:</span> {rt.bendahara}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* PRESTASI & PENGAKUAN */}
      <section className="bg-forest-dark py-16 text-paper sm:py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <Reveal className="text-center">
            <p className="font-mono text-xs uppercase tracking-widest text-gold/80">Prestasi &amp; Pengakuan</p>
            <h2 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl">
              Piagam Partisipasi ProKlim Kategori Madya
            </h2>
          </Reveal>

          <Reveal delay={100} className="mt-10 grid items-center gap-8 md:grid-cols-2">
            <div className="overflow-hidden rounded-2xl ring-1 ring-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/piagam-proklim-madya.jpeg"
                alt="Piagam Partisipasi ProKlim Kategori Madya untuk RW 008 Kelurahan Cipondoh Makmur"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm leading-relaxed text-paper/85">
                RW 008 Kelurahan Cipondoh Makmur, Kecamatan Cipondoh, Kota Tangerang, Provinsi Banten
                menerima <strong>Piagam Partisipasi ProKlim</strong> atas partisipasinya mengembangkan
                Program Kampung Iklim dengan <strong>Kategori Madya</strong>.
              </p>
              <dl className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <dt className="text-paper/60">Diterbitkan di</dt>
                  <dd className="font-semibold">Jakarta</dd>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <dt className="text-paper/60">Tanggal</dt>
                  <dd className="font-semibold">27 November 2025</dd>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <dt className="text-paper/60">Ditandatangani oleh</dt>
                  <dd className="text-right font-semibold">
                    Ir. Ary Sudjianto, M.Sc<br />
                    <span className="font-normal text-paper/60">
                      Deputi Pengendalian Perubahan Iklim &amp; Tata Kelola Nilai Ekonomi Karbon
                    </span>
                  </dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper2 py-14">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-sm leading-relaxed text-mist">
            Struktur kepengurusan di atas berlaku untuk Masa Bhakti 2025-2028 sesuai Surat Keputusan (SK)
            kepengurusan RT &amp; RW 08 Kelurahan Cipondoh Makmur, Kecamatan Cipondoh.
          </p>
        </div>
      </section>
    </>
  );
}

function PejabatCard({ data, highlight = false, compact = false }) {
  return (
    <div
      className={`flex flex-col items-center rounded-2xl p-5 text-center ring-1 transition-transform hover:-translate-y-1 ${
        highlight
          ? "bg-forest text-paper ring-forest/20 shadow-lg shadow-forest/10"
          : "bg-white text-ink ring-forest/5 shadow-sm"
      }`}
    >
      <AvatarPlaceholder
        name={data.nama}
        className={`${compact ? "h-14 w-14 text-base" : "h-16 w-16 text-lg"} ${
          highlight ? "ring-2 ring-gold" : ""
        }`}
      />
      <p className={`mt-3 font-display text-sm font-bold ${highlight ? "text-paper" : "text-forest-dark"}`}>
        {data.nama}
      </p>
      <p className={`mt-1 text-xs font-semibold uppercase tracking-wide ${highlight ? "text-gold" : "text-gold-dark"}`}>
        {data.jabatan}
      </p>
      {data.periode && (
        <p className={`mt-1.5 font-mono text-[11px] ${highlight ? "text-paper/60" : "text-mist"}`}>
          {data.periode}
        </p>
      )}
    </div>
  );
}

function Connector() {
  return (
    <div className="my-8 flex justify-center" aria-hidden="true">
      <div className="h-8 w-px bg-forest/20" />
    </div>
  );
}
