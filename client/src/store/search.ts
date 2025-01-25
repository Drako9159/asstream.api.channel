import { create } from "zustand";

interface Results {
  [key: string]: string | boolean | number | [];
}

interface SearchData {
  results: any;
  setResultsStore: (results: Results) => void;
}

export const useSearchStore = create<SearchData>((set) => ({
  results: [],
  setResultsStore: (results) => set((state) => ({ ...state, results })),
}));
