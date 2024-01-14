import { create } from "zustand";

interface AuthStoreState {
  token: string;
  profile: null | any;
  isAuth: boolean;
  setToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStoreState>((set) => ({
  token: "",
  profile: null,
  isAuth: false,
  setToken: (token) =>
    set((state) => ({ ...state, token, isAuth: true })),
  logout: () =>
    set((state) => ({ ...state, token: "", isAuth: false, profile: null })),
}));
