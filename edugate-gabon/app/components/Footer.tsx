import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-emerald-950 text-slate-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-xl font-bold mb-3">EduGate Gabon</h3>
            <p className="text-slate-300 leading-relaxed">
              Digitalisation des inscriptions scolaires au Gabon avec plus de transparence,
              moins de corruption et un suivi simplifié pour tous.
            </p>
          </div>
          <div>
            <h4 className="text-sm uppercase tracking-[0.3em] text-emerald-400 mb-4">Liens rapides</h4>
            <ul className="space-y-3 text-slate-300 text-sm">
              <li>
                <Link href="/" className="hover:text-white">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white">
                  Connexion
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-white">
                  Inscription
                </Link>
              </li>
              <li>
                <Link href="/parents" className="hover:text-white">
                  Espace Parents
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm uppercase tracking-[0.3em] text-emerald-400 mb-4">Contact</h4>
            <p className="text-slate-300 text-sm leading-relaxed">
              support@edugategabion.gab
            </p>
            <p className="text-slate-300 text-sm leading-relaxed mt-4">
              © 2026 EduGate Gabon. Tous droits réservés.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
