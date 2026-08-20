import { getProfilDesa } from "@/lib/queries";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import FormKontak from "@/components/FormKontak";

export const dynamic = "force-dynamic";

export const metadata = { title: "Kontak" };

export default async function KontakPage() {
  const profil = await getProfilDesa();

  return (
    <>
      <PageHero
        eyebrow="Hubungi Kami"
        title="Kontak Pengurus RW"
        subtitle="Sampaikan pertanyaan, pengaduan, atau informasi seputar kegiatan Kampung Proklim RW 08 kepada kami."
      />

      <section className="bg-paper py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-[1fr,1.3fr]">
          <Reveal className="space-y-6">
            <InfoCard title="Alamat Kantor" value={profil?.alamat_kantor} />
            <InfoCard title="Telepon" value={profil?.telepon} />
            <InfoCard title="Email" value={profil?.email} />
            <InfoCard title="Jam Layanan" value={profil?.jam_layanan} />

            <div className="rounded-2xl bg-forest p-6 text-paper">
              <p className="font-display text-sm font-bold uppercase tracking-widest text-gold">
                Ikuti Media Sosial Kami
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {profil?.instagram && <SosmedLink href={profil.instagram} label="Instagram" />}
                {profil?.facebook && <SosmedLink href={profil.facebook} label="Facebook" />}
                {profil?.youtube && <SosmedLink href={profil.youtube} label="YouTube" />}
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl ring-1 ring-forest/10">
              <iframe
                title="Lokasi Community Center RW 08"
                className="h-64 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${profil?.latitude},${profil?.longitude}&z=14&output=embed`}
              />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="rounded-3xl bg-white p-6 shadow-xl shadow-forest/5 ring-1 ring-forest/5 sm:p-9">
              <h2 className="font-display text-xl font-bold text-forest-dark">Kirim Pesan</h2>
              <p className="mt-2 text-sm text-mist">
                Isi formulir di bawah ini, tim kami akan merespons secepatnya.
              </p>
              <div className="mt-6">
                <FormKontak />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function InfoCard({ title, value }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-forest/5">
      <p className="font-display text-xs font-bold uppercase tracking-widest text-gold-dark">{title}</p>
      <p className="mt-1.5 text-sm font-medium text-ink">{value}</p>
    </div>
  );
}

function SosmedLink({ href, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-full border border-paper/25 px-4 py-2 text-xs font-semibold hover:bg-white/10"
    >
      {label}
    </a>
  );
}
