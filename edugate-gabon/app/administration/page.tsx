import Link from "next/link";

export default function AdministrationPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 rounded-3xl border border-slate-200 bg-white p-12 shadow-xl">
          <div className="mb-6 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-purple-600 font-bold">Espace Administration</p>
            <h1 className="mt-4 text-4xl font-black text-gray-900">Administrez la plateforme EduGate</h1>
            <p className="mt-3 text-sm text-slate-500 max-w-3xl mx-auto">
              Gérez les utilisateurs, les écoles, les paiements et maintenez la transparence de l’ensemble du système.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Gestion utilisateurs</h2>
              <p className="text-slate-600 leading-relaxed">
                Créez, modifiez et suivez les comptes Parent, École, Ministère et Admin.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Gestion écoles</h2>
              <p className="text-slate-600 leading-relaxed">
                Validez les établissements, mettez à jour leurs informations et gérez les places disponibles.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Gestion paiements</h2>
              <p className="text-slate-600 leading-relaxed">
                Suivez les paiements, vérifiez les transactions et assurez la bonne comptabilité de la plateforme.
              </p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link href="/login" className="inline-flex items-center justify-center rounded-full bg-purple-600 px-8 py-4 text-base font-bold text-white shadow-lg hover:bg-purple-700 transition-colors">
              Accéder à l&apos;espace admin
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
