// src/components/ProtectedRoute.jsx
//
// ── COME FUNZIONA ────────────────────────────────────────────────────────────
//
// ProtectedRoute è un componente wrapper che sta tra App.jsx e la pagina
// protetta. React Router, quando naviga su /dashboard, esegue prima questo
// componente prima di renderizzare <Dashboard />.
//
// FLUSSO:
//   1. L'utente tenta di accedere a /dashboard
//   2. App.jsx ha:
//        <Route path="/dashboard" element={
//          <ProtectedRoute><Dashboard /></ProtectedRoute>
//        } />
//   3. ProtectedRoute legge isAuthenticated da useAuthStore
//   4a. Se true  → renderizza {children} = <Dashboard />
//   4b. Se false → <Navigate to="/login" state={{ from: location }} replace />
//       - state.from contiene la location corrente (/dashboard)
//       - LoginPage dopo il login legge state.from e ci reindirizza
//       - replace=true evita che /login finisca nella cronologia browser
//         (così il back button non riporta a /login dopo il login)

import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export default function ProtectedRoute({ children }) {
  // Leggiamo solo isAuthenticated — nessun re-render inutile se cambia user.name
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  // useLocation ci dà la pagina che l'utente stava cercando di raggiungere
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect a /login, passando la destinazione originale in state
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  // Autenticato → renderizza la pagina richiesta
  return children;
}
