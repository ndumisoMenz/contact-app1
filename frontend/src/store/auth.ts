import { create } from "zustand";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";


interface AuthState {
  token: string | null;
  role: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string, role: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),
  role: localStorage.getItem("role"),

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
      localStorage.setItem("role", data.role);

      set({ token: data.token, role: data.role });
    } catch (err) {
      console.error("Login error:", err);
      throw err;
    }
  },

  
  register: async (username: string, password: string, role: string) => {
    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, role }),
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
}));
