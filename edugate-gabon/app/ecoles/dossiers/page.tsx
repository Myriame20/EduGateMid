
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Enrollment = {
  id: number;
  school_id: number;
  parent_name: string;
  parent_email: string;
  parent_phone: string;
  child_first_name: string;
  child_last_name: string;
  child_birth_date: string;
  requested_level: string;
  message: string | null;
  status: string;
  created_at?: string;
};

type SchoolUser = {
  id: number;
  name: string;
  email: string;
  role: string;
  school_id: number | null;
};

const API_URL = "http://127.0.0.1:8000/api";

const statusLabels: Record<string, string> = {
  pending: "En attente",
  accepted: "Accepté",
  rejected: "Refusé",
};

const statusStyles: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700 ring-amber-200",
  accepted: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  rejected: "bg-rose-50 text-rose-700 ring-rose-200",
};

export default function DossiersEcolePage() {
  const router = useRouter();

  const [dossiers, setDossiers] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [erreur, setErreur] = useState("");
  const [actionMessage, setActionMessage] = useState("");
  const [schoolUser, setSchoolUser] = useState<SchoolUser | null>(null);
  const [recherche, setRecherche] = useState("");
  const [filtreStatut, setFiltreStatut] = useState("all");
  const [selected, setSelected] = useState<Enrollment | null>(null);
  const [processingId, setProcessingId] = useState<number | null>(null);

  const chargerDossiers = useCallback(async (silencieux = false) => {
    if (silencieux) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    setErreur("");
    setActionMessage("");

    try {
      const token = sessionStorage.getItem("edugate_token");
      const userText = sessionStorage.getItem("edugate_user");

      if (!token || !userText) {
        router.replace("/login");
        return;
      }

      let user: SchoolUser;

      try {
        user = JSON.parse(userText) as SchoolUser;
      } catch {
        sessionStorage.removeItem("edugate_token");
        sessionStorage.removeItem("edugate_user");
        router.replace("/login");
        return;
      }

      if (user.role !== "school" || !user.school_id) {
        setErreur("Ce compte ne possède pas d'espace école.");
        return;
      }

      setSchoolUser(user);

      const response = await fetch(
        `${API_URL}/schools/${user.school_id}/enrollments`,
        {
          cache: "no-store",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 401) {
        sessionStorage.removeItem("edugate_token");
        sessionStorage.removeItem("edugate_user");
        router.replace("/login");
        return;
      }

      if (response.status === 403) {
        throw new Error("Accès interdit : vérifiez les autorisations du compte.");
      }

      if (!response.ok) {
        throw new Error(`Erreur du serveur : ${response.status}`);
      }

      const data: Enrollment[] = await response.json();
      setDossiers(data);

      setSelected((previous) =>
        previous
          ? data.find((dossier) => dossier.id === previous.id) ?? null
          : null
      );
    } catch (error) {
      setErreur(
        error instanceof TypeError
          ? "Impossible de contacter Laravel. Vérifie que le serveur fonctionne sur le port 8000."
          : error instanceof Error
            ? error.message
            : "Impossible de charger les dossiers."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [router]);

  useEffect(() => {
    void chargerDossiers();
  }, [chargerDossiers]);

  const changerStatut = async (
    dossier: Enrollment,
    statut: "accepted" | "rejected"
  ) => {
    const token = sessionStorage.getItem("edugate_token");

    if (!token) {
      router.replace("/login");
      return;
    }

    const confirmation =
      statut === "accepted"
        ? `Confirmer l'acceptation du dossier n° ${dossier.id} ?`
        : `Confirmer le refus du dossier n° ${dossier.id} ?`;

    if (!window.confirm(confirmation)) {
      return;
    }

    setProcessingId(dossier.id);
    setErreur("");
    setActionMessage("");

    try {
      const response = await fetch(
        `${API_URL}/enrollments/${dossier.id}/status`,
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: statut }),
        }
      );

      if (response.status === 401) {
        sessionStorage.removeItem("edugate_token");
        sessionStorage.removeItem("edugate_user");
        router.replace("/login");
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Impossible de modifier le statut du dossier."
        );
      }

      setDossiers((previous) =>
        previous.map((item) =>
          item.id === dossier.id
            ? { ...item, status: statut }
            : item
        )
      );

      setSelected((previous) =>
        previous?.id === dossier.id
          ? { ...previous, status: statut }
          : previous
      );

      setActionMessage(
        statut === "accepted"
          ? "Le dossier a été accepté avec succès."
          : "Le dossier a été refusé avec succès."
      );
    } catch (error) {
      setErreur(
        error instanceof TypeError
          ? "Impossible de contacter Laravel. Vérifie que le serveur fonctionne."
          : error instanceof Error
            ? error.message
            : "Une erreur est survenue."
      );
    } finally {
      setProcessingId(null);
    }
  };

  const total = dossiers.length;
  const enAttente = dossiers.filter((d) => d.status === "pending").length;
  const acceptes = dossiers.filter((d) => d.status === "accepted").length;
  const refuses = dossiers.filter((d) => d.status === "rejected").length;

  const dossiersFiltres = dossiers.filter((dossier) => {
    const nom =
      `${dossier.child_first_name} ${dossier.child_last_name}`.toLowerCase();

    const correspondRecherche = nom.includes(recherche.trim().toLowerCase());
    const correspondStatut =
      filtreStatut === "all" || dossier.status === filtreStatut;

    return correspondRecherche && correspondStatut;
  });

  function formatDate(date?: string) {
    if (!date) return "—";

    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) return date;

    return parsed.toLocaleDateString("fr-FR");
  }

  function labelStatut(status: string) {
    return statusLabels[status] ?? status;
  }

  function styleStatut(status: string) {
    return (
      statusStyles[status] ??
      "bg-slate-100 text-slate-700 ring-slate-200"
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-5">
          <Link
            href="/"
            className="text-2xl font-black tracking-tight text-blue-700"
          >
            EduGate <span className="text-slate-800">Gabon</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-slate-500 sm:inline">
              {schoolUser?.name ?? "Espace école"}
            </span>

            <Link
              href="/ecoles"
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold transition hover:bg-slate-50"
            >
              Catalogue
            </Link>

            <button
              onClick={() => {
                sessionStorage.removeItem("edugate_token");
                sessionStorage.removeItem("edugate_user");
                router.replace("/login");
              }}
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold transition hover:bg-slate-50"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-700">
              Espace école · Prototype
            </p>

            <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
              Gestion des dossiers
            </h1>

            <p className="mt-3 text-slate-600">
              Suivez les demandes d’inscription de votre établissement.
            </p>
          </div>

          <button
            onClick={() => void chargerDossiers(true)}
            disabled={loading || refreshing}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span aria-hidden="true">↻</span>
            {refreshing ? "Actualisation…" : "Actualiser"}
          </button>
        </div>

        {erreur && (
          <div
            role="alert"
            className="mt-6 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700"
          >
            {erreur}

            <button
              onClick={() => void chargerDossiers()}
              className="ml-2 font-bold underline"
            >
              Réessayer
            </button>
          </div>
        )}

        {actionMessage && (
          <div
            role="status"
            className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800"
          >
            {actionMessage}
          </div>
        )}

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              label: "Total des dossiers",
              value: total,
              symbol: "▤",
              color: "text-blue-700",
              bg: "bg-blue-50",
            },
            {
              label: "En attente",
              value: enAttente,
              symbol: "◷",
              color: "text-amber-700",
              bg: "bg-amber-50",
            },
            {
              label: "Acceptés",
              value: acceptes,
              symbol: "✓",
              color: "text-emerald-700",
              bg: "bg-emerald-50",
            },
            {
              label: "Refusés",
              value: refuses,
              symbol: "×",
              color: "text-rose-700",
              bg: "bg-rose-50",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-slate-500">
                  {item.label}
                </p>

                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-xl text-xl font-black ${item.bg} ${item.color}`}
                >
                  {item.symbol}
                </span>
              </div>

              <p className="mt-4 text-3xl font-black tracking-tight">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        <section className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-5 sm:p-6">
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
              <div>
                <h2 className="text-xl font-black">
                  Demandes d’inscription
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {dossiersFiltres.length} résultat(s) affiché(s)
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative">
                  <label htmlFor="recherche" className="sr-only">
                    Rechercher un enfant
                  </label>

                  <input
                    id="recherche"
                    type="search"
                    value={recherche}
                    onChange={(event) => setRecherche(event.target.value)}
                    placeholder="Rechercher un enfant…"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:w-64"
                  />
                </div>

                <div>
                  <label htmlFor="filtreStatut" className="sr-only">
                    Filtrer par statut
                  </label>

                  <select
                    id="filtreStatut"
                    value={filtreStatut}
                    onChange={(event) => setFiltreStatut(event.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:w-44"
                  >
                    <option value="all">Tous les statuts</option>
                    <option value="pending">En attente</option>
                    <option value="accepted">Acceptés</option>
                    <option value="rejected">Refusés</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="p-12 text-center text-slate-500">
              Chargement des dossiers…
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-5 py-4 font-bold">Enfant</th>
                    <th className="px-5 py-4 font-bold">Niveau demandé</th>
                    <th className="px-5 py-4 font-bold">Naissance</th>
                    <th className="px-5 py-4 font-bold">Statut</th>
                    <th className="px-5 py-4 font-bold">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {dossiersFiltres.map((dossier) => (
                    <tr
                      key={dossier.id}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="px-5 py-4">
                        <p className="font-bold">
                          {dossier.child_first_name}{" "}
                          {dossier.child_last_name}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Dossier n° {dossier.id}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        {dossier.requested_level}
                      </td>

                      <td className="px-5 py-4">
                        {formatDate(dossier.child_birth_date)}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex whitespace-nowrap rounded-full px-3 py-1 text-xs font-bold ring-1 ring-inset ${styleStatut(dossier.status)}`}
                        >
                          {labelStatut(dossier.status)}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            onClick={() => setSelected(dossier)}
                            className="rounded-lg px-3 py-2 font-bold text-blue-700 transition hover:bg-blue-50"
                          >
                            Consulter
                          </button>

                          {dossier.status === "pending" && (
                            <>
                              <button
                                onClick={() =>
                                  void changerStatut(dossier, "accepted")
                                }
                                disabled={processingId !== null}
                                className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-emerald-700 disabled:opacity-50"
                              >
                                {processingId === dossier.id
                                  ? "Traitement…"
                                  : "Accepter"}
                              </button>

                              <button
                                onClick={() =>
                                  void changerStatut(dossier, "rejected")
                                }
                                disabled={processingId !== null}
                                className="rounded-lg bg-rose-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-rose-700 disabled:opacity-50"
                              >
                                Refuser
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}

                  {!erreur && dossiersFiltres.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-5 py-12 text-center">
                        <p className="font-semibold text-slate-700">
                          Aucun dossier trouvé
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                          Essayez de modifier la recherche ou le filtre.
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {selected && (
          <section className="mt-8 rounded-2xl border border-blue-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-blue-700">
                  DOSSIER N° {selected.id}
                </p>

                <h2 className="mt-1 text-2xl font-black">
                  {selected.child_first_name} {selected.child_last_name}
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Demande pour le niveau {selected.requested_level}
                </p>
              </div>

              <button
                onClick={() => setSelected(null)}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold hover:bg-slate-50"
              >
                Fermer
              </button>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-slate-50 p-5">
                <h3 className="font-bold">Informations du parent</h3>
                <p className="mt-3">{selected.parent_name}</p>
                <p className="mt-1 break-all text-sm text-slate-600">
                  {selected.parent_email}
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  {selected.parent_phone}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-5">
                <h3 className="font-bold">Informations du dossier</h3>

                <p className="mt-3">
                  Date de naissance : {formatDate(selected.child_birth_date)}
                </p>

                <p className="mt-1">
                  Statut : {labelStatut(selected.status)}
                </p>

                {selected.created_at && (
                  <p className="mt-1 text-sm text-slate-600">
                    Demande créée le : {formatDate(selected.created_at)}
                  </p>
                )}
              </div>
            </div>

            {selected.message && (
              <div className="mt-4 rounded-xl bg-slate-50 p-5">
                <h3 className="font-bold">Message du parent</h3>

                <p className="mt-2 whitespace-pre-wrap text-slate-600">
                  {selected.message}
                </p>
              </div>
            )}

            {selected.status === "pending" && (
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() =>
                    void changerStatut(selected, "accepted")
                  }
                  disabled={processingId !== null}
                  className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-700 disabled:opacity-50"
                >
                  Accepter le dossier
                </button>

                <button
                  onClick={() =>
                    void changerStatut(selected, "rejected")
                  }
                  disabled={processingId !== null}
                  className="rounded-xl bg-rose-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-rose-700 disabled:opacity-50"
                >
                  Refuser le dossier
                </button>
              </div>
            )}
          </section>
        )}

        <p className="mt-6 text-xs leading-relaxed text-slate-500">
          Prototype local : utilisez uniquement des données fictives pour les
          tests. Une vérification complète des autorisations et une protection
          renforcée des sessions restent nécessaires avant la mise en production.
        </p>
      </section>
    </main>
  );
}
