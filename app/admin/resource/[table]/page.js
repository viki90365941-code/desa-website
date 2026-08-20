import Link from "next/link";
import { getResourceConfig } from "@/lib/adminResources";
import { notFound } from "next/navigation";
import AdminResourceManager from "@/components/AdminResourceManager";

export const dynamic = "force-dynamic";

export default function AdminResourcePage({ params }) {
  const config = getResourceConfig(params.table);
  if (!config) notFound();

  return (
    <div className="min-h-screen bg-paper2">
      <header className="bg-forest text-paper">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
          <div>
            <Link href="/admin" className="text-xs font-semibold text-gold hover:underline">
              ← Kembali ke Panel Admin
            </Link>
            <h1 className="mt-1 font-display text-xl font-bold">Kelola {config.label}</h1>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <AdminResourceManager table={params.table} />
      </main>
    </div>
  );
}
