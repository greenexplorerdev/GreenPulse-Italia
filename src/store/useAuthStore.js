// src/store/useAuthStore.js
//
// ── GESTIONE AUTENTICAZIONE CON ZUSTAND ─────────────────────────────────────
//
// FLUSSO COMPLETO:
//   1. Utente apre /dashboard → ProtectedRoute legge isAuthenticated
//   2. Se false → redirect a /login (con location.state.from = percorso originale)
//   3. Utente compila form → chiama login(email, password)
//   4. login() verifica credenziali → se ok, setta isAuthenticated: true + user
//   5. LoginPage legge state.from e naviga al percorso originale
//   6. Navbar mostra "Logout" → chiama logout() → isAuthenticated: false
//   7. ProtectedRoute rileva il cambio → redirect a /login
//
// PERSISTENZA: isAuthenticated e user sopravvivono al reload della pagina.
// Questo simula un token JWT salvato in localStorage (in produzione useresti
// httpOnly cookie o token cifrato, mai password in chiaro).
//
// IN PRODUZIONE: sostituisci il corpo di login() con:
//   const res = await fetch('/api/auth/login', {
//     method: 'POST',
//     body: JSON.stringify({ email, password })
//   })
//   const { token, user } = await res.json()
//   localStorage.setItem('token', token)
//   set({ isAuthenticated: true, user })

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      // ── STATO ───────────────────────────────────────────────────────────────
      isAuthenticated: false,
      user: null,          // { email, name } — in prod sarebbe { id, email, role, ... }
      error: null,         // messaggio di errore da mostrare nel form
      isLoading: false,    // true durante la verifica credenziali (simula latenza API)

      // ── AZIONI ──────────────────────────────────────────────────────────────

      // login(email, password) → true se riuscito, false se fallito
      // Demo: accetta qualsiasi email valida con password ≥ 4 caratteri
      login: (email, password) => {
        set({ isLoading: true, error: null });

        // Simuliamo latenza di rete (500ms) come farebbe una vera API
        return new Promise((resolve) => {
          setTimeout(() => {
            const emailValid = email && email.includes("@");
            const passValid  = password && password.length >= 4;

            if (emailValid && passValid) {
              set({
                isAuthenticated: true,
                // Ricaviamo il nome dall'email (es. "cosimo@gmail.com" → "cosimo")
                user: { email, name: email.split("@")[0] },
                error: null,
                isLoading: false,
              });
              resolve(true);
            } else {
              set({
                error: !emailValid
                  ? "Inserisci un'email valida"
                  : "La password deve avere almeno 4 caratteri",
                isLoading: false,
              });
              resolve(false);
            }
          }, 500);
        });
      },

      // logout(): pulisce tutto lo stato di autenticazione
      logout: () =>
        set({ isAuthenticated: false, user: null, error: null }),

      // clearError(): usato quando l'utente inizia a riscrivere nel form
      clearError: () => set({ error: null }),
    }),
    {
      name: "greenpulse-auth-store",
      // Persiste solo autenticazione e user, non loading/error
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user:            state.user,
      }),
    }
  )
);
