
"use client";

import { useEffect, useMemo, useState } from "react";

type School = {
  id: number;
  name: string;
  city: string;
  type: string;
  address: string | null;
  email: string | null;
  phone: string | null;
  is_active: boolean | number;
};

const API_URL = "http://127.0.0.1:8000/api/schools";

const types = [
  { label: "Tous les types", value: "all" },
  { label: "Public", value: "public" },
  { label: "Privé", value: "private" },
];

const cities = [
  "Toutes les villes",
  "Libreville",
  "Port-Gentil",
  "Franceville",
];

export default function SchoolSearch() {
  const [schools, setSchools] = useState<School[]>([]);
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");
  const [city, setCity] = useState("Toutes les villes");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadSchools() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Impossible de récupérer les écoles.");
        }

        const data: School[] = await response.json();
        setSchools(data);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }

        setError(
          "Impossible de charger les écoles. Vérifiez que le serveur Laravel fonctionne."
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadSchools();

    return () => controller.abort();
  }, []);

  const filteredSchools = useMemo(() => {
    const search = query.trim().toLowerCase();

    return schools.filter((school) => {
      const matchesQuery =
        search === "" ||
        school.name.toLowerCase().includes(search) ||
        school.city.toLowerCase().includes(search);

      const matchesType = type === "all" || school.type === type;

      const matchesCity =
        city === "Toutes les villes" || school.city === city;

      return matchesQuery && matchesType && matchesCity;
    });
  }, [schools, query, type, city]);

  return (
    <section id="search" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span className="mb-4 inline-block text-sm font-bold uppercase tracking-widest text-emerald-600">
            Recherche d'école
          </span>

          <h2 className="mb-4 text-4xl font-black text-gray-900 md:text-5xl">
            Consultez les écoles disponibles
          </h2>

          <p className="mx-auto max-w-2xl text-lg text-gray-500">
            Trouvez une école au Gabon et filtrez les résultats selon la ville
            et le type d'établissement.
          </p>
        </div>

        <div className="mb-10 grid gap-4 md:grid-cols-[1.4fr_1fr]">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Recherche
              </label>

              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Nom de l'école ou ville"
                className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 shadow-sm focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Type
              </label>

              <select
                value={type}
                onChange={(event) => setType(event.target.value)}
                className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 shadow-sm focus:border-emerald-500 focus:outline-none"
              >
                {types.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Ville
              </label>

              <select
                value={city}
                onChange={(event) => setCity(event.target.value)}
                className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 shadow-sm focus:border-emerald-500 focus:outline-none"
              >
                {cities.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col justify-center rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-3 text-sm font-bold uppercase tracking-widest text-slate-500">
              Écoles trouvées
            </div>

            <div className="text-5xl font-black text-emerald-600">
              {loading ? "..." : filteredSchools.length}
            </div>

            <p className="mt-2 text-sm text-slate-500">
              Établissements correspondant à vos critères
            </p>
          </div>
        </div>

        {loading && (
          <p className="py-10 text-center text-slate-500">
            Chargement des écoles...
          </p>
        )}

        {!loading && error && (
          <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-center text-red-700">
            <p>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-3 font-semibold underline"
            >
              Réessayer
            </button>
          </div>
        )}

        {!loading && !error && filteredSchools.length === 0 && (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-500">
            Aucune école ne correspond à votre recherche.
          </div>
        )}

        {!loading && !error && filteredSchools.length > 0 && (
          <div className="grid gap-5 lg:grid-cols-2">
            {filteredSchools.map((school) => (
              <article
                key={school.id}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {school.name}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {school.city}
                    </p>
                  </div>

                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold capitalize text-emerald-700">
                    {school.type === "public" ? "Public" : "Privé"}
                  </span>
                </div>

                <div className="mt-6 rounded-3xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                    Adresse
                  </p>
                  <p className="mt-2 text-sm text-gray-800">
                    {school.address || "Adresse non renseignée"}
                  </p>
                </div>

                {(school.email || school.phone) && (
                  <div className="mt-4 space-y-2 text-sm text-slate-600">
                    {school.email && (
                      <p>
                        <span className="font-semibold">E-mail :</span>{" "}
                        {school.email}
                      </p>
                    )}

                    {school.phone && (
                      <p>
                        <span className="font-semibold">Téléphone :</span>{" "}
                        {school.phone}
                      </p>
                    )}
                  </div>
                )}

                <div className="mt-6 flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                    EduGate Gabon
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      window.alert(
                        "La consultation détaillée et les inscriptions seront ajoutées dans une prochaine étape."
                      )
                    }
                    className="rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
                  >
                    Voir l'école
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
