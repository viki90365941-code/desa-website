"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "Beranda" },
  { href: "/tentang", label: "Tentang Kampung" },
  { href: "/struktur", label: "Struktur Organisasi" },
  { href: "/umkm", label: "UMKM" },
  { href: "/bank-sampah", label: "Bank Sampah" },
  { href: "/pencapaian", label: "Pencapaian" },
  { href: "/berita", label: "Berita & Info" },
  { href: "/kontak", label: "Kontak" },
];

export default function Navbar({ namaDesa }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-forest shadow-lg shadow-forest-dark/20" : "bg-forest/95"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8">
        <Link href="/" className="group flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo-rw08.png"
            alt="Logo RW 08 Cipondoh Makmur"
            className="h-10 w-10 rounded-full object-cover transition-transform group-hover:rotate-6"
          />
          <span className="font-display text-base font-bold leading-tight text-paper sm:text-lg">
            {namaDesa || "Kampung Proklim RW 08 Bersinar"}
          </span>
        </Link>

        <div className="hidden items-center gap-0.5 xl:flex">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative rounded-full px-3 py-2 text-sm font-semibold transition-colors ${
                  active ? "text-forest-dark bg-gold" : "text-paper/90 hover:bg-white/10"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/30 text-paper xl:hidden"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
        >
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 top-0 h-0.5 w-5 bg-paper transition-transform ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 h-0.5 w-5 bg-paper transition-opacity ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 top-3 h-0.5 w-5 bg-paper transition-transform ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-forest-dark px-5 pb-4 pt-2 xl:hidden">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded-xl px-4 py-3 text-sm font-semibold ${
                  active ? "bg-gold text-forest-dark" : "text-paper/90"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
