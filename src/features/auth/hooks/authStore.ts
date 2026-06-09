import { create } from "zustand";
import api from "../../../lib/api";

export type User = {
  id: string;
  email: string;
  names: [];
  role?: "user" | "admin";
};

type AuthState = {
  user: User | null;
  token: string | null;
  loading: boolean;
  hydrated: boolean;

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
  setHydrated: (value) => set({ hydrated: value }),

  get isAuthenticated() {
    return !!get().token;
  },

  // Restore session on app start
  hydrate: async () => {
    // console.log("Hydrate Start");

    const token = localStorage.getItem("token");
    // console.log("token:", token);

    try {
      if (token) {
        set({ token });
        await get().fetchUser();
      }
    } catch (err) {
      console.log("hydrate error:", err);
    } finally {
      // console.log("setting hydrate true");
      set({ hydrated: true });
    }
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
    set({ loading: true });

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
      console.log(error);
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
