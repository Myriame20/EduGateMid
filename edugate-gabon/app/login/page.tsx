
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setMessage("");
    setIsError(false);
    setIsLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            data.errors?.email?.[0] ||
            "Connexion impossible. Vérifiez vos identifiants."
        );
      }

      sessionStorage.setItem("edugate_token", data.token);
      sessionStorage.setItem("edugate_user", JSON.stringify(data.user));

      if (data.user.role === "school") {
        setMessage("Connexion réussie ! Redirection vers votre espace école...");
        router.push("/ecoles/dossiers");
        return;
      }

      setMessage(
        "Connexion réussie. Votre espace correspondant à ce rôle sera configuré ensuite."
      );
    } catch (error) {
      setIsError(true);

      if (error instanceof TypeError) {
        setMessage(
          "Impossible de contacter le serveur. Vérifiez que Laravel est démarré."
        );
      } else {
        setMessage(
          error instanceof Error
            ? error.message
            : "Une erreur inattendue est survenue."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-xl">
          <div className="mb-8 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-emerald-600">
              Connexion
            </p>

            <h1 className="mt-4 text-4xl font-black text-gray-900">
              Accédez à votre espace EduGate
            </h1>

            <p className="mt-3 text-sm text-slate-500">
              Parents, écoles et administrateurs se connectent ici pour gérer
              leurs inscriptions et suivis.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="text-sm font-semibold text-slate-700"
              >
                Adresse email
              </label>

              <input
                id="email"
                type="email"
                autoComplete="username"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-emerald-500 focus:outline-none"
                placeholder="exemple@domaine.gab"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-sm font-semibold text-slate-700"
              >
                Mot de passe
              </label>

              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-emerald-500 focus:outline-none"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-3xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-200 transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Connexion en cours..." : "Se connecter"}
            </button>
          </form>

          {message && (
            <div
              role="status"
              className={`mt-6 rounded-3xl border p-4 text-sm ${
                isError
                  ? "border-red-200 bg-red-50 text-red-800"
                  : "border-emerald-200 bg-emerald-50 text-emerald-800"
              }`}
            >
              {message}
            </div>
          )}

          <div className="mt-8 border-t border-slate-200 pt-6 text-center text-sm text-slate-600">
            <span>Pas encore de compte ? </span>

            <Link
              href="/register"
              className="font-semibold text-emerald-600 hover:text-emerald-700"
            >
              Créez-en un gratuitement
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
