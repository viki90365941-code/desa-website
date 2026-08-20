import "@fontsource/plus-jakarta-sans/400.css";
import "@fontsource/plus-jakarta-sans/500.css";
import "@fontsource/plus-jakarta-sans/600.css";
import "@fontsource/plus-jakarta-sans/700.css";
import "@fontsource/plus-jakarta-sans/800.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/700.css";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getProfilDesa } from "@/lib/queries";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const profil = await getProfilDesa();
  const nama = profil?.nama_desa || "Website Kampung";
  return {
    title: {
      default: `${nama} — Situs Resmi Kampung`,
      template: `%s | ${nama}`,
    },
    description: `Situs resmi ${nama}, ${profil?.kecamatan || ""} — informasi profil, struktur organisasi, pencapaian, dan berita kampung.`,
  };
}

export default async function RootLayout({ children }) {
  const profil = await getProfilDesa();
  return (
    <html lang="id">
      <body className="font-body">
        <Navbar namaDesa={profil?.nama_desa} />
        <main>{children}</main>
        <Footer profil={profil} />
      </body>
    </html>
  );
}
