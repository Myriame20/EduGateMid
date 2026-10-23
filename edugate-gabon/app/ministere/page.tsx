import Link from "next/link";

export default function MinisterePage() {
  return (
    <main className="min-h-screen bg-slate-50 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 rounded-3xl border border-slate-200 bg-white p-12 shadow-xl">
          <div className="mb-6 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-amber-600 font-bold">Espace Ministère</p>
            <h1 className="mt-4 text-4xl font-black text-gray-900">Pilotage national des inscriptions</h1>
            <p className="mt-3 text-sm text-slate-500 max-w-3xl mx-auto">
              Accédez aux statistiques, contrôlez les établissements et suivez les flux de taxes pour une éducation transparente et équitable.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Statistiques</h2>
              <p className="text-slate-600 leading-relaxed">
                Analysez les tendances des inscriptions, les taux de remplissage et la trajectoire des établissements.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Contrôle</h2>
              <p className="text-slate-600 leading-relaxed">
                Vérifiez la conformité des écoles et renforcez la lutte contre la corruption dans les inscriptions.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Taxes</h2>
              <p className="text-slate-600 leading-relaxed">
                Suivez la collecte des frais scolaires et assurez une distribution transparente des ressources.
              </p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link href="/login" className="inline-flex items-center justify-center rounded-full bg-amber-500 px-8 py-4 text-base font-bold text-white shadow-lg hover:bg-amber-600 transition-colors">
              Accéder à l&apos;espace ministère
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
