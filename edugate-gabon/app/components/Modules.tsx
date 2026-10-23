import Link from "next/link";

const modules = [
  {
    title: "Parents",
    description: "Créez un compte, recherchez une école, inscrivez votre enfant et suivez le dossier en ligne.",
    href: "/parents",
    accent: "bg-emerald-600",
  },
  {
    title: "Écoles",
    description: "Gérez les places disponibles, suivez les inscriptions et publiez bulletins, photos et vidéos.",
    href: "/ecoles",
    accent: "bg-blue-600",
  },
  {
    title: "Ministère",
    description: "Consultez les statistiques nationales, contrôlez les établissements et suivez la distribution des taxes.",
    href: "/ministere",
    accent: "bg-yellow-500",
  },
  {
    title: "Administration",
    description: "Administrez les utilisateurs, les écoles, les paiements et sécurisez la fraude sur la plateforme.",
    href: "/administration",
    accent: "bg-purple-600",
  },
];

export default function Modules() {
  return (
    <section id="modules" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-emerald-600 font-bold text-sm uppercase tracking-widest mb-4">
            Modules
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-5">
            Tous les espaces fonctionnels
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Chaque acteur trouve son espace dédié pour digitaliser les inscriptions scolaires avec transparence.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {modules.map((module) => (
            <Link
              key={module.title}
              href={module.href}
              className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className={`mb-6 inline-flex items-center justify-center rounded-3xl px-4 py-3 text-white ${module.accent}`}>
                {module.title}
              </div>
              <p className="text-gray-600 leading-relaxed">{module.description}</p>
              <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600">
                Voir l&apos;espace
                <span aria-hidden="true">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
