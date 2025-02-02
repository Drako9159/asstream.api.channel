import { create } from "zustand";

type CurrentView = "categoryList" | "categoryForm" | "contentList" | "contentForm";

interface RenderView {
    currentView: CurrentView;
    setCurrentView: (view: CurrentView) => void;
}

export const useCurrentView = create<RenderView>((set) => ({
    currentView: "categoryList",
    setCurrentView: (view) => set((state) => ({ ...state, currentView: view })),
}));

