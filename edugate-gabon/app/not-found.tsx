import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-16">
      <div className="max-w-xl rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-xl">
        <p className="text-sm uppercase tracking-[0.3em] text-emerald-600 font-bold mb-4">Page non trouvée</p>
        <h1 className="text-5xl font-black text-gray-900 mb-6">404</h1>
        <p className="text-slate-600 text-lg leading-relaxed mb-8">
          La page demandée n&apos;existe pas ou a été déplacée. Retournez à l&apos;accueil pour continuer.
        </p>
        <Link href="/" className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-8 py-3 text-sm font-bold text-white shadow-lg hover:bg-emerald-700 transition-colors">
          Retourner à l&apos;accueil
        </Link>
      </div>
    </main>
  );
}
