import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PublicUser } from "@/types/auth.types";

// ─── Auth Store ───
// Holds ONLY client-side auth state: the current user and a convenience flag.
// Server data (login, register responses) flows through TanStack Query mutations;
// this store is updated as a *side-effect* of those mutations succeeding.

interface AuthState {
  user: PublicUser | null;
  isAuthenticated: boolean;
}

interface AuthActions {
  setUser: (user: PublicUser) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      setUser: (user) => set({ user, isAuthenticated: true }),
      clearUser: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: "auth-storage", // localStorage key (matches your axios interceptor)
    },
  ),
);
