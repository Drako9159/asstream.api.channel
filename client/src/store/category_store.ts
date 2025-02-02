import { create } from "zustand";

interface CategoryObject {
    _id: string;
    name: string;
    entries: string[];
}

interface CategoryData {
    categories: CategoryObject[];
    isUpdating: boolean;
    categoryUpdating: CategoryObject
    setCategoryStore: (category: CategoryObject[]) => void;
    setCategoryUpdating: (category: CategoryObject) => void;
    setIsUpdating: (isUpdating: boolean) => void;
}

export const useCategoryStore = create<CategoryData>((set) => ({
    categories: [],
    isUpdating: false,
    categoryUpdating: { _id: '', name: '', entries: [] },
    setCategoryStore: (categories) => set((state) => ({ ...state, categories })),
    /*setCategoryUpdating: (category) =>
        set((state) => {

            const updatedCategories = state.categories.map((c) => {
                if (c._id === category._id) {
                    return category;
                }
                return c;
            });
            return { ...state, categories: updatedCategories };
        }),*/
    setCategoryUpdating: (category) => set((state) => ({ ...state, categoryUpdating: category })),
    setIsUpdating: (isUpdating) => set((state) => ({ ...state, isUpdating })),

}));
