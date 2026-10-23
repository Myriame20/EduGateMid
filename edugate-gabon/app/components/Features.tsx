const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    title: "Recherche d'école",
    description: "Trouvez les écoles disponibles près de chez vous, consultez les places restantes en temps réel.",
    color: "bg-emerald-50 text-emerald-600",
    border: "border-emerald-100",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: "Inscription en ligne",
    description: "Soumettez le dossier de votre enfant en quelques clics, sans file d'attente ni déplacement.",
    color: "bg-blue-50 text-blue-600",
    border: "border-blue-100",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: "Paiement Mobile Money",
    description: "Payez les frais scolaires via Airtel Money, Moov Money ou carte bancaire en toute sécurité.",
    color: "bg-yellow-50 text-yellow-600",
    border: "border-yellow-100",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Suivi du dossier",
    description: "Suivez l'état d'avancement de l'inscription de votre enfant à chaque étape, avec notifications.",
    color: "bg-purple-50 text-purple-600",
    border: "border-purple-100",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: "Bulletins numériques",
    description: "Téléchargez les bulletins de votre enfant directement depuis votre tableau de bord parent.",
    color: "bg-teal-50 text-teal-600",
    border: "border-teal-100",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
    title: "Signalement corruption",
    description: "Signalez anonymement tout acte de corruption ou favoritisme dans les processus d'inscription.",
    color: "bg-red-50 text-red-600",
    border: "border-red-100",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-emerald-600 font-bold text-sm uppercase tracking-widest mb-4">
            Fonctionnalités
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-5">
            Tout ce dont vous avez
            <span className="text-emerald-600"> besoin</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Une plateforme complète pour moderniser et simplifier les inscriptions scolaires au Gabon.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className={`group border ${f.border} rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-default`}
            >
              <div className={`w-12 h-12 rounded-xl ${f.color} flex items-center justify-center mb-4`}>
                {f.icon}
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}