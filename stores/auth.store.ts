import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PublicUser } from "@/types/auth.types";

// ─── Auth Store ───
// Holds ONLY client-side auth state: the current user and a convenience flag.
// Server data (login, register responses) flows through TanStack Query mutations;
// this store is updated as a *side-effect* of those mutations succeeding.

interface AuthState {
  user: PublicUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
}

interface AuthActions {
  setUser: (user: PublicUser) => void;
  setToken: (token: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,

      setUser: (user) => set({ user, isAuthenticated: true }),
      setToken: (accessToken) => set({ accessToken }),
      clearAuth: () =>
        set({ user: null, accessToken: null, isAuthenticated: false }),
    }),
    {
      name: "auth-storage", // localStorage key (matches your axios interceptor)
    },
  ),
);
