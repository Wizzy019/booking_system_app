import { create } from "zustand";
import api from "../../../lib/api";
import { getErrorMessage } from "../../../utils/erroMessage";

export type User = {
  id: string;
  avater: string;
  email: string;
  first_name: string;
  last_name: string;
  role?: "user" | "admin";
};

type AuthState = {
  user: User | null;
  token: string | null;
  loading: boolean;
  hydrated: boolean;
  isAuthChecked: boolean;
  error: string | null;
  setError: (error: string | null) => void;
  setHydrated: (value: boolean) => void;

  isAuthenticated: boolean;

  hydrate: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  fetchUser: () => Promise<void>;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  loading: false,
  hydrated: false,
  isAuthChecked: false,
  error: null,
  setError: (error) => set({ error }),
  setHydrated: (value) => set({ hydrated: value }),
  get isAuthenticated() {
    return !!get().token;
  },

  // Restore session on app start
  hydrate: async () => {
    const token = localStorage.getItem("token");

    if (token) {
      set({ token });

      try {
        await get().fetchUser();
      } catch (err) {
        console.log("fetch user failed", err);
        get().logout();
      }
    } else {
      set({ user: null, token: null });
    }

    set({ hydrated: true, isAuthChecked: true });
  },

  //  REGISTER
  register: async (email, password) => {
    set({ loading: true });

    try {
      const res = await api.post("/auth/register", {
        email,
        password,
      });

      const token = res.data.access_token;

      console.log("token:", token);

      localStorage.setItem("token", token);
      set({ token });

      await get().fetchUser();
    } finally {
      set({ loading: false });
    }
  },

  //  LOGIN
  login: async (email, password) => {
    set({ loading: true, error: null });

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      const token = res.data.access_token;

      localStorage.setItem("token", token);
      set({ token });

      await get().fetchUser();
    } catch (error) {
      const message = getErrorMessage(error);
      set({ error: message, token: null });
      // throw error;
    } finally {
      set({ loading: false });
    }
  },

  //  FETCH CURRENT USER
  fetchUser: async () => {
    try {
      const res = await api.get("/auth/me");

      set({ user: res.data.user });
    } catch {
      get().logout();
    }
  },

  // LOGOUT
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },
}));
