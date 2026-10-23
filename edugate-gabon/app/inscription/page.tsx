
"use client";

import { useEffect, useState, type FormEvent } from "react";

type School = {
  id: number;
  name: string;
  city: string;
  type: string;
};

const API_URL = "http://127.0.0.1:8000/api";

export default function InscriptionPage() {
  const [schools, setSchools] = useState<School[]>([]);
  const [loadingSchools, setLoadingSchools] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    school_id: "",
    parent_name: "",
    parent_email: "",
    parent_phone: "",
    child_first_name: "",
    child_last_name: "",
    child_birth_date: "",
    requested_level: "Primaire",
    message: "",
  });

  useEffect(() => {
    async function loadSchools() {
      try {
        const response = await fetch(`${API_URL}/schools`);

        if (!response.ok) {
          throw new Error("Chargement des écoles impossible.");
        }

        const data: School[] = await response.json();
        setSchools(data);
      } catch {
        setError(
          "Impossible de charger les écoles. Vérifiez que Laravel fonctionne."
        );
      } finally {
        setLoadingSchools(false);
      }
    }

    loadSchools();
  }, []);

  function updateField(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/enrollments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...form,
          school_id: Number(form.school_id),
          message: form.message || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 422 && data.errors) {
          const firstError = Object.values(data.errors)
            .flat()
            .find((value) => typeof value === "string");

          throw new Error(
            typeof firstError === "string"
              ? firstError
              : "Vérifiez les informations saisies."
          );
        }

        throw new Error(data.message || "L'inscription a échoué.");
      }

      setSuccess(
        `Demande enregistrée ! Votre numéro de dossier est ${data.enrollment.id}.`
      );

      setForm({
        school_id: "",
        parent_name: "",
        parent_email: "",
        parent_phone: "",
        child_first_name: "",
        child_last_name: "",
        child_birth_date: "",
        requested_level: "Primaire",
        message: "",
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Une erreur inattendue est survenue."
      );
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100";

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <a
          href="/"
          className="text-sm font-semibold text-emerald-700 hover:underline"
        >
          ← Retour à l’accueil
        </a>

        <header className="mb-8 mt-6">
          <p className="text-sm font-bold uppercase tracking-widest text-emerald-600">
            EduGate Gabon
          </p>
          <h1 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">
            Demande d’inscription
          </h1>
          <p className="mt-3 text-slate-600">
            Remplissez les informations du parent et de l’enfant pour soumettre
            votre demande à l’établissement choisi.
          </p>
        </header>

        {error && (
          <div
            role="alert"
            className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        {success && (
          <div
            role="status"
            className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800"
          >
            {success}
          </div>
        )}

        <form
          onSubmit={submitForm}
          className="space-y-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <section>
            <h2 className="text-xl font-bold text-slate-900">
              1. École souhaitée
            </h2>

            <label className="mt-4 block text-sm font-semibold text-slate-700">
              Choisir un établissement *
              <select
                className={inputClass}
                name="school_id"
                value={form.school_id}
                onChange={updateField}
                required
                disabled={loadingSchools || schools.length === 0}
              >
                <option value="">
                  {loadingSchools
                    ? "Chargement des écoles..."
                    : "Sélectionner une école"}
                </option>

                {schools.map((school) => (
                  <option key={school.id} value={school.id}>
                    {school.name} — {school.city} (
                    {school.type === "public" ? "Public" : "Privé"})
                  </option>
                ))}
              </select>
            </label>

            {!loadingSchools && schools.length === 0 && (
              <p className="mt-2 text-sm text-amber-700">
                Aucune école disponible. Vérifiez la connexion à Laravel.
              </p>
            )}
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              2. Informations du parent
            </h2>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-semibold text-slate-700">
                Nom complet *
                <input
                  className={inputClass}
                  name="parent_name"
                  value={form.parent_name}
                  onChange={updateField}
                  maxLength={150}
                  autoComplete="name"
                  required
                />
              </label>

              <label className="text-sm font-semibold text-slate-700">
                Téléphone *
                <input
                  className={inputClass}
                  name="parent_phone"
                  type="tel"
                  value={form.parent_phone}
                  onChange={updateField}
                  maxLength={30}
                  autoComplete="tel"
                  required
                />
              </label>

              <label className="text-sm font-semibold text-slate-700 sm:col-span-2">
                Adresse e-mail *
                <input
                  className={inputClass}
                  name="parent_email"
                  type="email"
                  value={form.parent_email}
                  onChange={updateField}
                  maxLength={255}
                  autoComplete="email"
                  required
                />
              </label>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              3. Informations de l’enfant
            </h2>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-semibold text-slate-700">
                Prénom *
                <input
                  className={inputClass}
                  name="child_first_name"
                  value={form.child_first_name}
                  onChange={updateField}
                  maxLength={100}
                  required
                />
              </label>

              <label className="text-sm font-semibold text-slate-700">
                Nom *
                <input
                  className={inputClass}
                  name="child_last_name"
                  value={form.child_last_name}
                  onChange={updateField}
                  maxLength={100}
                  required
                />
              </label>

              <label className="text-sm font-semibold text-slate-700">
                Date de naissance *
                <input
                  className={inputClass}
                  name="child_birth_date"
                  type="date"
                  value={form.child_birth_date}
                  onChange={updateField}
                  max={new Date().toISOString().split("T")[0]}
                  required
                />
              </label>

              <label className="text-sm font-semibold text-slate-700">
                Niveau souhaité *
                <select
                  className={inputClass}
                  name="requested_level"
                  value={form.requested_level}
                  onChange={updateField}
                  required
                >
                  <option value="Maternelle">Maternelle</option>
                  <option value="Primaire">Primaire</option>
                  <option value="Collège">Collège</option>
                  <option value="Lycée">Lycée</option>
                </select>
              </label>
            </div>

            <label className="mt-4 block text-sm font-semibold text-slate-700">
              Message complémentaire (facultatif)
              <textarea
                className={inputClass}
                name="message"
                value={form.message}
                onChange={updateField}
                maxLength={1000}
                rows={3}
                placeholder="Informations utiles concernant la demande..."
              />
            </label>
          </section>

          <p className="text-xs leading-5 text-slate-500">
            Les informations renseignées seront envoyées au serveur local
            EduGate pour enregistrer la demande. Utilisez des données fictives
            pendant les tests.
          </p>

          <button
            type="submit"
            disabled={submitting || loadingSchools || schools.length === 0}
            className="w-full rounded-full bg-emerald-600 px-6 py-4 font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? "Envoi en cours..." : "Envoyer la demande"}
          </button>
        </form>
      </div>
    </main>
  );
}
