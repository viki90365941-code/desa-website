import Link from "next/link";
import { getSingletonConfig } from "@/lib/adminResources";
import { notFound } from "next/navigation";
import AdminSingletonForm from "@/components/AdminSingletonForm";

export const dynamic = "force-dynamic";

export default function AdminSingletonPage({ params }) {
  const config = getSingletonConfig(params.name);
  if (!config) notFound();

  return (
    <div className="min-h-screen bg-paper2">
      <header className="bg-forest text-paper">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-5 sm:px-8">
          <div>
            <Link href="/admin" className="text-xs font-semibold text-gold hover:underline">
              ← Kembali ke Panel Admin
            </Link>
            <h1 className="mt-1 font-display text-xl font-bold">Edit {config.label}</h1>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-5 py-10 sm:px-8">
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-forest/5 sm:p-8">
          <AdminSingletonForm name={params.name} />
        </div>
      </main>
    </div>
  );
}
