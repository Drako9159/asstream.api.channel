import { create } from "zustand";

interface Iptv {
  [key: string]: string | boolean | number | [];
}

interface IptvData {
  iptvs: any;
  setIptvStore: (iptvs: Iptv) => void;
}

export const useIptvStore = create<IptvData>((set) => ({
  iptvs: [],
  setIptvStore: (iptvs) => set((state) => ({ ...state, iptvs })),
}));
