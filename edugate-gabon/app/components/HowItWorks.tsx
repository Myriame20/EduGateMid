const steps = [
  {
    number: "01",
    title: "Créez votre compte parent",
    description: "Inscrivez-vous en quelques minutes avec votre numéro de téléphone ou email. Renseignez les informations de votre famille.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Recherchez une école",
    description: "Parcourez les écoles disponibles par quartier, niveau scolaire ou type d'établissement. Consultez les places en temps réel.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Soumettez le dossier",
    description: "Remplissez le formulaire d'inscription et téléversez les documents requis directement depuis votre téléphone.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Payez en ligne",
    description: "Réglez les frais d'inscription via Mobile Money ou carte bancaire. Un reçu officiel vous est envoyé automatiquement.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-emerald-600 font-bold text-sm uppercase tracking-widest mb-4">
            Comment ça marche
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-5">
            Inscrivez votre enfant
            <span className="text-emerald-600"> en 4 étapes</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Un processus simple, rapide et 100% transparent depuis votre smartphone.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-14 left-0 right-0 h-0.5 bg-emerald-100 z-0" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                {/* Icon circle */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
                    {step.icon}
                  </div>
                  <span className="absolute -top-2 -right-2 bg-yellow-400 text-emerald-950 text-xs font-black w-6 h-6 rounded-full flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>

                <div className="text-emerald-500 font-black text-xs tracking-widest mb-2">{step.number}</div>
                <h3 className="font-bold text-gray-900 text-lg mb-3">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-14">
          <a
            href="/register"
            className="inline-flex items-center gap-2 bg-emerald-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-100 text-base"
          >
            Commencer maintenant — c&apos;est gratuit
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}