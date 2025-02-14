import { create } from "zustand";

interface Videos {
    quality: string;
    url: string;
    videoType: string;
}

interface Content {
    dateAdded: string;
    duration: number;
    language: string;
    videos: Videos;
}

interface ContentObject {
    _id: string;
    title: string;
    categoryName: string;
    categoryId: string;
    backdrop: string;
    content: Content;
    description: string;
    updatedAt: string;
    thumbnail: string;
    tag: string;
    status: string;
    shortDescription: string;
    releaseDate: string;
    longDescription: string;
    genre: string;
    createdAt: string;
}

interface ContentData {
    contents: ContentObject[];
    isUpdating: boolean;
    contentUpdating: ContentObject;
    selectedCategory: string;
    setContentStore: (content: ContentObject[]) => void;
    setContentUpdating: (content: ContentObject) => void;
    setIsUpdating: (isUpdating: boolean) => void;
    setSelectedCategory: (contentSelected: string) => void;
}

export const useContentStore = create<ContentData>((set) => ({
    contents: [],
    isUpdating: false,
    contentUpdating: { _id: '', title: '', categoryName: '', description: '', updatedAt: '', thumbnail: '', tag: '', status: '', shortDescription: '', releaseDate: '', longDescription: '', genre: '', createdAt: '', backdrop: '', categoryId: '', content: { dateAdded: '', duration: 0, language: '', videos: { quality: '', url: '', videoType: '' } } },
    selectedCategory: "all",
    setContentStore: (contents) => set((state) => ({ ...state, contents })),
    setContentUpdating: (content) => set((state) => ({ ...state, contentUpdating: content })),
    setIsUpdating: (isUpdating) => set((state) => ({ ...state, isUpdating })),
    setSelectedCategory: (selectedCategory) => set((state) => ({ ...state, selectedCategory })),
}));
