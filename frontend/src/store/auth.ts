import { create } from "zustand";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";


interface AuthState {
  token: string | null;
  role: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),
  role: (() => {
    const r = localStorage.getItem("role");
    if (!r || r === "undefined" || r === "null") return null;
    return r;
  })(),

  login: async (username: string, password: string) => {
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }


      localStorage.setItem("token", data.token);
      if (data.role) {
        localStorage.setItem("role", data.role);
      } else {
        localStorage.removeItem("role");
      }

      set({ token: data.token, role: data.role || null });
    } catch (err) {
      console.error("Login error:", err);
      throw err;
    }
  },


  register: async (username: string, password: string) => {
    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      console.log("Registered successfully:", data.message);
    } catch (err) {
      console.error("Registration error:", err);
      throw err;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    set({ token: null, role: null });
  },

  checkAuth: async () => {
    const { token } = useAuthStore.getState();
    if (!token) return;

    try {
      const res = await fetch(`${API_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (res.ok) {
        const newRole = data.role || null;
        localStorage.setItem("role", newRole);
        set({ role: newRole });
      } else if (res.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        set({ token: null, role: null });
      }
    } catch (err) {
      console.error("Check auth error:", err);
    }
  },
}));
