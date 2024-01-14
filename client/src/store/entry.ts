import { create } from "zustand";

interface Entry {
  [key: string]: string | boolean | number | [];
}

interface EntryData {
  entries: any;
  setEntryStore: (entry: Entry) => void;
}

export const useEntryStore = create<EntryData>((set) => ({
  entries: [],
  setEntryStore: (entries) => set((state) => ({ ...state, entries })),
}));
