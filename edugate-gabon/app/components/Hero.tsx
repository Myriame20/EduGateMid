import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-800 flex items-center overflow-hidden pt-16">
      {/* Background decorative pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-400 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-400 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500 rounded-full blur-3xl" />
      </div>

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div className="text-white">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-emerald-200 text-xs font-semibold px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
              Gabon · Digitalisation Scolaire
            </div>

            <h1 className="text-5xl md:text-6xl font-black leading-tight mb-6">
              Inscriptions
              <br />
              <span className="text-yellow-400">scolaires</span>
              <br />
              sans corruption.
            </h1>

            <p className="text-emerald-200 text-lg leading-relaxed mb-8 max-w-lg">
              EduGate Gabon digitalise les inscriptions scolaires — consultez les places disponibles,
              inscrivez vos enfants en ligne et payez en toute transparence.
            </p>

            {/* Stats row */}
            <div className="flex gap-8 mb-10">
              <div>
                <div className="text-3xl font-black text-yellow-400">100%</div>
                <div className="text-xs text-emerald-300 font-medium">Transparent</div>
              </div>
              <div className="w-px bg-white/20" />
              <div>
                <div className="text-3xl font-black text-yellow-400">0</div>
                <div className="text-xs text-emerald-300 font-medium">File d&apos;attente</div>
              </div>
              <div className="w-px bg-white/20" />
              <div>
                <div className="text-3xl font-black text-yellow-400">24/7</div>
                <div className="text-xs text-emerald-300 font-medium">En ligne</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 bg-yellow-400 text-emerald-950 font-bold px-8 py-4 rounded-xl hover:bg-yellow-300 transition-colors shadow-lg text-base"
              >
                Commencer gratuitement
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 border border-white/30 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-colors text-base"
              >
                Voir comment ça marche
              </Link>
            </div>
          </div>

          {/* Right: Visual Card */}
          <div className="hidden lg:block">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl">
              {/* Card header */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-white font-bold text-sm">Inscription confirmée</div>
                  <div className="text-emerald-300 text-xs">Lycée Leon Mba · Libreville</div>
                </div>
                <div className="ml-auto bg-emerald-500/30 text-emerald-300 text-xs font-bold px-2.5 py-1 rounded-full">✓ Validée</div>
              </div>

              {/* School list */}
              <div className="space-y-3 mb-5">
                {[
                  { name: "École Nationale de Libreville", places: 12, status: "Disponible" },
                  { name: "Lycée Technique Omar Bongo", places: 4, status: "Presque complet" },
                  { name: "Collège Bessieux", places: 0, status: "Complet" },
                ].map((school, i) => (
                  <div key={i} className="flex items-center justify-between bg-white/5 rounded-lg px-4 py-3">
                    <div>
                      <div className="text-white text-sm font-semibold">{school.name}</div>
                      <div className="text-emerald-300 text-xs">{school.places > 0 ? `${school.places} places restantes` : "Aucune place"}</div>
                    </div>
                    <span
                      className={`text-xs font-bold px-2 py-1 rounded-full ${
                        school.places === 0
                          ? "bg-red-500/20 text-red-300"
                          : school.places < 6
                          ? "bg-yellow-400/20 text-yellow-300"
                          : "bg-emerald-500/20 text-emerald-300"
                      }`}
                    >
                      {school.status}
                    </span>
                  </div>
                ))}
              </div>

              {/* Payment bar */}
              <div className="bg-white/5 rounded-xl px-4 py-3">
                <div className="flex justify-between text-xs text-emerald-300 mb-2">
                  <span>Paiement Mobile Money</span>
                  <span className="text-white font-bold">75 000 FCFA</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-full bg-gradient-to-r from-emerald-400 to-yellow-400 rounded-full" />
                </div>
                <div className="text-xs text-emerald-300 mt-1">Paiement sécurisé ✓</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}