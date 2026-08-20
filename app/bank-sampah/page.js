import { getBankSampah, getBankSampahHarga, getBankSampahBulanan, getProfilDesa } from "@/lib/queries";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export const dynamic = "force-dynamic";

export const metadata = { title: "Bank Sampah" };

export default async function BankSampahPage() {
  const profil = await getProfilDesa();
  const info = await getBankSampah();
  const harga = await getBankSampahHarga();
  const bulanan = await getBankSampahBulanan();
  const langkah = info?.cara_gabung ? JSON.parse(info.cara_gabung) : [];

  const formatAngka = (n, satuan) =>
    n === null || n === undefined ? "Belum ada setoran" : `${n.toLocaleString("id-ID")} ${satuan}`;

  const totalKg = bulanan.reduce((sum, b) => sum + (b.total_kg || 0), 0);
  const totalPendapatan = bulanan.reduce((sum, b) => sum + (b.total_pendapatan || 0), 0);
  const kgTertinggi = Math.max(1, ...bulanan.map((b) => b.total_kg || 0));

  return (
    <>
      <PageHero
        eyebrow="Lingkungan"
        title="Bank Sampah RW 08"
        subtitle="Wujud nyata konsep Kampung Bersinar dalam mengelola sampah warga menjadi bernilai ekonomi."
      />

      <section className="bg-paper py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <Reveal className="flex flex-col items-start justify-between gap-4 rounded-3xl bg-forest p-7 text-paper sm:flex-row sm:items-center sm:p-9">
            <div>
              <p className="font-display text-sm font-bold uppercase tracking-widest text-gold">Status Saat Ini</p>
              <p className="mt-2 font-display text-2xl font-extrabold">{info?.status}</p>
            </div>
            <span className="rounded-full bg-gold/20 px-4 py-2 text-xs font-semibold text-gold">
              Target Kota Tangerang: Bank Sampah di Setiap RW pada 2026
            </span>
          </Reveal>

          <Reveal delay={100} className="mt-10">
            <p className="text-base leading-relaxed text-mist">{info?.deskripsi}</p>
          </Reveal>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-2xl bg-white p-7 shadow-sm ring-1 ring-forest/5">
                <h2 className="font-display text-lg font-bold text-forest-dark">Cara Ikut Menabung Sampah</h2>
                <ol className="mt-5 space-y-4">
                  {langkah.map((l, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-relaxed text-mist">
                      <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-gold font-mono text-xs font-bold text-forest-dark">
                        {i + 1}
                      </span>
                      <span>{l}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="h-full rounded-2xl bg-white p-7 shadow-sm ring-1 ring-forest/5">
                <h2 className="font-display text-lg font-bold text-forest-dark">Info Praktis</h2>
                <dl className="mt-5 space-y-4 text-sm">
                  <InfoRow label="Jadwal Setor" value={info?.jadwal_setor} />
                  <InfoRow label="Lokasi" value={info?.lokasi} />
                  <InfoRow label="Pengurus" value={info?.pengurus} />
                </dl>
              </div>
            </Reveal>
          </div>

          <Reveal className="mt-12">
            <h2 className="font-display text-lg font-bold text-forest-dark">Perkiraan Harga Jenis Sampah</h2>
            <p className="mt-1 text-sm text-mist">
              Harga berikut akan diperbarui begitu unit Bank Sampah RW 08 resmi beroperasi dan menetapkan
              daftar harga sesuai kesepakatan pengurus dan pengepul/bank sampah induk.
            </p>
            <div className="mt-5 overflow-hidden rounded-2xl ring-1 ring-forest/10">
              <table className="w-full text-left text-sm">
                <thead className="bg-forest text-paper">
                  <tr>
                    <th className="px-5 py-3 font-display font-semibold">Jenis Sampah</th>
                    <th className="px-5 py-3 font-display font-semibold">Perkiraan Harga</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-forest/5 bg-white">
                  {harga.map((h) => (
                    <tr key={h.id}>
                      <td className="px-5 py-3 font-medium text-forest-dark">{h.jenis_sampah}</td>
                      <td className="px-5 py-3 text-mist">{h.harga}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
          <Reveal className="mt-12">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="font-display text-lg font-bold text-forest-dark">
                  Rekap Kiloan &amp; Pendapatan Bulanan
                </h2>
                <p className="mt-1 text-sm text-mist">
                  Total sampah tertimbang dan hasil penjualan yang dibagikan/ditabungkan ke warga setiap
                  bulannya. Kolom masih kosong karena penimbangan resmi belum dimulai.
                </p>
              </div>
              <div className="flex gap-4 text-right">
                <div>
                  <p className="font-mono text-xl font-bold text-forest">{totalKg.toLocaleString("id-ID")} kg</p>
                  <p className="text-xs text-mist">Total terkumpul</p>
                </div>
                <div>
                  <p className="font-mono text-xl font-bold text-gold-dark">
                    Rp{totalPendapatan.toLocaleString("id-ID")}
                  </p>
                  <p className="text-xs text-mist">Total pendapatan</p>
                </div>
              </div>
            </div>

            {/* Grafik batang sederhana */}
            <div className="mt-6 grid grid-cols-3 gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-forest/5 sm:gap-6">
              {bulanan.map((b) => (
                <div key={b.id} className="flex flex-col items-center">
                  <div className="flex h-32 w-full items-end justify-center rounded-lg bg-paper2">
                    <div
                      className="w-8 rounded-t-md bg-gradient-to-t from-forest to-forest-light sm:w-10"
                      style={{
                        height: b.total_kg ? `${Math.max(6, (b.total_kg / kgTertinggi) * 100)}%` : "4px",
                      }}
                      title={formatAngka(b.total_kg, "kg")}
                    />
                  </div>
                  <p className="mt-3 text-sm font-semibold text-forest-dark">
                    {b.bulan} {b.tahun}
                  </p>
                </div>
              ))}
            </div>

            {/* Tabel detail */}
            <div className="mt-6 overflow-hidden rounded-2xl ring-1 ring-forest/10">
              <table className="w-full text-left text-sm">
                <thead className="bg-forest text-paper">
                  <tr>
                    <th className="px-5 py-3 font-display font-semibold">Bulan</th>
                    <th className="px-5 py-3 font-display font-semibold">Total Sampah Tertimbang</th>
                    <th className="px-5 py-3 font-display font-semibold">Total Pendapatan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-forest/5 bg-white">
                  {bulanan.map((b) => (
                    <tr key={b.id}>
                      <td className="px-5 py-3 font-medium text-forest-dark">{b.bulan} {b.tahun}</td>
                      <td className="px-5 py-3 text-mist">{formatAngka(b.total_kg, "kg")}</td>
                      <td className="px-5 py-3 text-mist">
                        {b.total_pendapatan === null ? "Belum ada setoran" : `Rp${b.total_pendapatan.toLocaleString("id-ID")}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-forest/5 pb-3">
      <dt className="font-semibold text-forest-dark">{label}</dt>
      <dd className="text-right text-mist">{value}</dd>
    </div>
  );
}
