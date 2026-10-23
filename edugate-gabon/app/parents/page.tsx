import Link from "next/link";

export default function ParentsPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 rounded-3xl border border-slate-200 bg-white p-12 shadow-xl">
          <div className="mb-6 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-600 font-bold">Espace Parents</p>
            <h1 className="mt-4 text-4xl font-black text-gray-900">Inscrivez votre enfant en quelques clics</h1>
            <p className="mt-3 text-sm text-slate-500 max-w-3xl mx-auto">
              Créez un compte parent, recherchez les écoles disponibles, téléversez les documents, payez en ligne et suivez le dossier à chaque étape.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Recherche d&apos;école</h2>
              <p className="text-slate-600 leading-relaxed">
                Filtrez par ville, niveau et places disponibles pour trouver la meilleure école pour votre enfant.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Inscription en ligne</h2>
              <p className="text-slate-600 leading-relaxed">
                Remplissez le dossier en ligne et suivez la progression du dossier dès sa soumission.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Paiement sécurisé</h2>
              <p className="text-slate-600 leading-relaxed">
                Payez les frais scolaires via Mobile Money et recevez une confirmation instantanée.
              </p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link href="/register" className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-8 py-4 text-base font-bold text-white shadow-lg hover:bg-emerald-700 transition-colors">
              Créer mon compte parent
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
