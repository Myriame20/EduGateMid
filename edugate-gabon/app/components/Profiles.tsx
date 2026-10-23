const stats = [
  {
    value: "0",
    unit: "FCFA",
    label: "de corruption",
    sublabel: "Processus 100% transparent",
    icon: "🛡️",
    color: "border-emerald-200 bg-emerald-50",
    valueColor: "text-emerald-700",
  },
  {
    value: "80",
    unit: "%",
    label: "de temps économisé",
    sublabel: "Plus de files d'attente",
    icon: "⚡",
    color: "border-yellow-200 bg-yellow-50",
    valueColor: "text-yellow-700",
  },
  {
    value: "24",
    unit: "h/7",
    label: "accessibilité",
    sublabel: "Depuis n'importe où au Gabon",
    icon: "🌍",
    color: "border-blue-200 bg-blue-50",
    valueColor: "text-blue-700",
  },
  {
    value: "100",
    unit: "%",
    label: "numérique",
    sublabel: "Zéro papier, zéro déplacement",
    icon: "📱",
    color: "border-purple-200 bg-purple-50",
    valueColor: "text-purple-700",
  },
];

const roleModules = [
  {
    title: "Parents",
    description: "Créez un compte, recherchez des écoles, inscrivez votre enfant et suivez le dossier en toute transparence.",
    icon: "👨‍👩‍👧",
    color: "from-emerald-500 to-teal-500",
  },
  {
    title: "Écoles",
    description: "Gérez les places, validez les inscriptions, publiez des bulletins et partagez des photos et vidéos.",
    icon: "🏫",
    color: "from-blue-500 to-sky-500",
  },
  {
    title: "Ministère",
    description: "Accédez aux statistiques, contrôlez les établissements et suivez les taxes et financements.",
    icon: "📊",
    color: "from-yellow-500 to-orange-500",
  },
  {
    title: "Administration",
    description: "Administrez les utilisateurs, vérifiez les paiements et gardez la plateforme sécurisée et transparente.",
    icon: "🛠️",
    color: "from-purple-500 to-fuchsia-500",
  },
];

export default function Profiles() {
  return (
    <section id="profiles" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-emerald-600 font-bold text-sm uppercase tracking-widest mb-4">
            Pour qui ?
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-5">
            Une plateforme pensée
            <br />
            pour tous les acteurs du système éducatif
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Parents, écoles, ministère et administration trouvent ici des outils clairs pour rendre les inscriptions scolaires plus justes et efficaces.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 mb-16">
          {roleModules.map((module, i) => (
            <div key={i} className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
              <div className={`inline-flex items-center justify-center rounded-3xl bg-gradient-to-r ${module.color} p-4 text-white mb-6 shadow-lg`}>
                <span className="text-3xl">{module.icon}</span>
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-3">{module.title}</h3>
              <p className="text-slate-600 leading-relaxed">{module.description}</p>
            </div>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s, i) => (
            <div key={i} className={`border ${s.color} rounded-2xl p-6 text-center`}>
              <div className="text-3xl mb-3">{s.icon}</div>
              <div className="flex items-end justify-center gap-1 mb-1">
                <span className={`text-5xl font-black ${s.valueColor}`}>{s.value}</span>
                <span className={`text-xl font-bold ${s.valueColor} mb-1`}>{s.unit}</span>
              </div>
              <div className="font-bold text-gray-800 text-sm mb-1">{s.label}</div>
              <div className="text-gray-500 text-xs">{s.sublabel}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
