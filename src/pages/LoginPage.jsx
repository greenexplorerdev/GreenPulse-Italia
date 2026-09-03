// src/pages/LoginPage.jsx — Tailwind CSS 4
//
// COLLEGAMENTO CON IL RESTO:
//   - useAuthStore → login(), error, isLoading, clearError
//   - useAppStore  → tema dark/light
//   - location.state.from → pagina protetta di provenienza (da ProtectedRoute)
//   - React Hook Form → validazione senza re-render per ogni keystroke
//   - Icone: Leaf, LogIn, Eye, EyeOff, Loader2, AlertCircle, Zap → tutte SVG inline

import { useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../store/useAuthStore";
import { useAppStore }  from "../store/useAppStore";

// ─── Icone SVG inline ─────────────────────────────────────────────────────────

// Foglia — analoga a lucide-react Leaf
const IconLeaf = ({ size = 32, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className={className}>
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
);

// Login / freccia entrata — analoga a lucide-react LogIn
const IconLogIn = ({ size = 16, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className={className}>
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
    <polyline points="10 17 15 12 10 7" />
    <line x1="15" y1="12" x2="3" y2="12" />
  </svg>
);

// Occhio aperto — analoga a lucide-react Eye
const IconEye = ({ size = 16, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className={className}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

// Occhio sbarrato (nascondi pwd) — analoga a lucide-react EyeOff
const IconEyeOff = ({ size = 16, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className={className}>
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

// Loader circolare animato — analoga a lucide-react Loader2
const IconLoader2 = ({ size = 16, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className={className}>
    <line x1="12" y1="2" x2="12" y2="6" />
    <line x1="12" y1="18" x2="12" y2="22" />
    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
    <line x1="2" y1="12" x2="6" y2="12" />
    <line x1="18" y1="12" x2="22" y2="12" />
    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
  </svg>
);

// Cerchio con punto esclamativo (errore) — analoga a lucide-react AlertCircle
const IconAlertCircle = ({ size = 14, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className={className}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

// Fulmine — analoga a lucide-react Zap
const IconZap = ({ size = 14, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className={className}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

// ─── Componente Login ──────────────────────────────────────────────────────────

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Pagina di provenienza (impostata da ProtectedRoute)
  const from = location.state?.from?.pathname || "/dashboard";

  // Stato auth e tema
  const { login, isAuthenticated, error, isLoading, clearError } = useAuthStore();
  const theme = useAppStore((s) => s.theme);
  const dk    = theme === "dark";

  // Hook Form: validazione email + password
  // Nota: TUTTI gli hook vanno chiamati prima di return anticipati
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPass, setShowPass] = useState(false);

  // Se già autenticato → redirect alla dashboard
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  // Submit form
  const onSubmit = async ({ email, password }) => {
    clearError();
    const ok = await login(email, password);
    if (ok) navigate(from, { replace: true });
  };

  return (
    // Sfondo a gradient o scuro
    <div className={`min-h-screen flex items-center justify-center p-4
      ${dk ? "bg-gray-950" : "bg-gradient-to-br from-emerald-50 to-green-100"}`}>

      <div className={`w-full max-w-md rounded-2xl shadow-2xl border p-5 sm:p-8 animate-fade-in
        ${dk
          ? "bg-gray-900 border-gray-800"
          : "bg-white border-gray-100"}`}>

        {/* ── Logo e titolo ── */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl mb-4
            bg-gradient-to-br from-emerald-500 to-green-400 shadow-lg shadow-emerald-200">
            <IconLeaf size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
            GreenPulse Italia
          </h1>
          <p className={`text-sm mt-1 ${dk ? "text-gray-400" : "text-gray-500"}`}>
            Accedi per visualizzare la dashboard energetica
          </p>
        </div>

        {/* ── Hint credenziali demo ── */}
        <div className={`flex items-start gap-3 rounded-xl p-3 mb-6 border
          ${dk
            ? "bg-emerald-950 border-emerald-900"
            : "bg-emerald-50 border-emerald-200"}`}>
          <IconZap size={14} className="text-emerald-500 mt-0.5 shrink-0" />
          <div>
            <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
              Demo — Credenziali di accesso
            </p>
            <p className={`text-xs mt-0.5 ${dk ? "text-gray-400" : "text-gray-500"}`}>
              Qualsiasi email valida + password ≥ 4 caratteri
            </p>
            <p className={`text-xs mt-0.5 ${dk ? "text-gray-400" : "text-gray-500"}`}>
              Es: <strong>demo@greenpulse.it</strong> / <strong>demo</strong>
            </p>
          </div>
        </div>

        {/* ── Banner errore (se presente nello store) ── */}
        {error && (
          <div className="flex items-center gap-2 bg-red-50 dark:bg-red-950
            border border-red-200 dark:border-red-900 rounded-xl px-3 py-2.5 mb-4">
            <IconAlertCircle size={14} className="text-red-500 shrink-0" />
            <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {/* ── Form di login ── */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

          {/* Campo Email */}
          <div>
            <label className={`block text-sm font-semibold mb-1.5
              ${dk ? "text-gray-200" : "text-gray-700"}`}>
              Email
            </label>
            <input
              type="email"
              placeholder="la.tua@email.it"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none
                transition-colors duration-200
                focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20
                ${errors.email
                  ? "border-red-400 dark:border-red-600"
                  : dk
                    ? "border-gray-700 bg-gray-800 text-gray-100 placeholder-gray-500"
                    : "border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400"
                }`}
              {...register("email", {
                required: "L'email è obbligatoria",
                pattern: { value: /\S+@\S+\.\S+/, message: "Email non valida" },
                onChange: clearError, // reset errore store quando l'utente digita
              })}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Campo Password con toggle visibilità */}
          <div>
            <label className={`block text-sm font-semibold mb-1.5
              ${dk ? "text-gray-200" : "text-gray-700"}`}>
              Password
            </label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Minimo 4 caratteri"
                className={`w-full pl-3.5 pr-10 py-2.5 rounded-xl border text-sm outline-none
                  transition-colors duration-200
                  focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20
                  ${errors.password
                    ? "border-red-400 dark:border-red-600"
                    : dk
                      ? "border-gray-700 bg-gray-800 text-gray-100 placeholder-gray-500"
                      : "border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400"
                  }`}
                {...register("password", {
                  required: "La password è obbligatoria",
                  minLength: { value: 4, message: "Minimo 4 caratteri" },
                  onChange: clearError,
                })}
              />
              {/* Bottone toggle show/hide password */}
              <button
                type="button"
                onClick={() => setShowPass(v => !v)}
                className={`absolute right-3 top-1/2 -translate-y-1/2
                  ${dk ? "text-gray-400 hover:text-gray-200" : "text-gray-400 hover:text-gray-600"}`}>
                {showPass ? <IconEyeOff size={16} /> : <IconEye size={16} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit: loader durante loading, icona login altrimenti */}
          <button
            type="submit"
            disabled={isLoading}
            className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl
              font-bold text-sm text-white transition-all duration-200
              ${isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-700 hover:to-green-600 shadow-lg shadow-emerald-200 dark:shadow-emerald-900/40 hover:scale-[1.01]"
              }`}>
            {isLoading
              ? <><IconLoader2 size={16} className="animate-spin" />Accesso in corso...</>
              : <><IconLogIn size={16} />Accedi</>
            }
          </button>
        </form>

        {/* Footer con link GitHub */}
        <p className={`text-center text-xs mt-6 ${dk ? "text-gray-500" : "text-gray-400"}`}>
          GreenPulse Italia ·{" "}
          <a href="https://github.com/greenexplorerdev" target="_blank"
            className="text-emerald-500 hover:text-emerald-400 transition-colors">
            github.com/greenexplorerdev
          </a>
        </p>
      </div>
    </div>
  );
}
