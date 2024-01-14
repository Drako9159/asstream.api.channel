import { create } from "zustand";

interface Category {
  [key: string]: string | boolean | number | [];
}

interface CategoryData {
  categories: any;
  setCategoryStore: (category: Category) => void;
}

export const useCategoryStore = create<CategoryData>((set) => ({
  categories: [],
  setCategoryStore: (categories) => set((state) => ({ ...state, categories })),
}));
