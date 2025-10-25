import { create } from "zustand";
import { User } from "@/types/mockType";

interface AuthState {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  login: (user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ user });
  },

  logout: () => {
    localStorage.removeItem("user");
    set({ user: null });
  },
}));

// Optional: load user from localStorage on app start
if (typeof window !== "undefined") {
  const savedUser = localStorage.getItem("user");
  if (savedUser) {
    useAuthStore.setState({ user: JSON.parse(savedUser) });
  }
}
