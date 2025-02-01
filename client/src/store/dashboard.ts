import { create } from "zustand";
import Cookies from "js-cookie";

interface DashboardStoreState {
  token: string;
  profile: null | any;
  isAuth: boolean;
  setToken: (token: string) => void;
  logout: () => void;
  checkAuth: () => void;
}

export const useDashboardStore = create<DashboardStoreState>((set) => ({
  token: "",
  profile: null,
  isAuth: false,
  setToken: (token) =>
    set((state) => ({ ...state, token, isAuth: true })),
  logout: () => {
    Cookies.remove("access_token");
    set((state) => ({ ...state, token: "", isAuth: false, profile: null }))
  },
  checkAuth: () => {
    const token = Cookies.get("access_token");
    if (token) {
      set((state) => ({ ...state, token, isAuth: true }));
    }
  }
}));
