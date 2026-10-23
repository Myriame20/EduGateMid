"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error }: { error: Error }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-16">
      <div className="max-w-xl rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-xl">
        <p className="text-sm uppercase tracking-[0.3em] text-red-600 font-bold mb-4">Erreur</p>
        <h1 className="text-5xl font-black text-gray-900 mb-6">Quelque chose s&apos;est mal passé</h1>
        <p className="text-slate-600 text-lg leading-relaxed mb-8">
          Nous avons rencontré un problème lors du chargement de cette page. Réessayez ou revenez à l&apos;accueil.
        </p>
        <Link href="/" className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-8 py-3 text-sm font-bold text-white shadow-lg hover:bg-emerald-700 transition-colors">
          Retourner à l&apos;accueil
        </Link>
      </div>
    </main>
  );
}
