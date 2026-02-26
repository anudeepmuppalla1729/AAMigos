import { create } from "zustand";

const useAuthStore = create((set) => ({
  // 'login' | 'signup'
  mode: "login",
  // 'agent' | 'customer'
  role: "agent",

  toggleMode: () =>
    set((state) => ({
      mode: state.mode === "login" ? "signup" : "login",
    })),

  toggleRole: () =>
    set((state) => ({
      role: state.role === "agent" ? "customer" : "agent",
    })),

  setMode: (mode) => set({ mode }),
  setRole: (role) => set({ role }),
}));

export default useAuthStore;
