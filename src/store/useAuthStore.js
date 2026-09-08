import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      error: null,
      isLoading: false,

      login: (email, password) => {
        set({ isLoading: true, error: null });

        return new Promise((resolve) => {
          setTimeout(() => {
            const emailValid = email && email.includes("@");
            const passValid  = password && password.length >= 4;

            if (emailValid && passValid) {
              set({
                isAuthenticated: true,
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

      logout: () =>
        set({ isAuthenticated: false, user: null, error: null }),

      clearError: () => set({ error: null }),
    }),
    {
      name: "greenpulse-auth-store",
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user:            state.user,
      }),
    }
  )
);
