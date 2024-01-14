import { create } from "zustand";

interface Movie {
  [key: string]: string | boolean | number | [];
}

interface MoviesData {
  movies: any;
  setMoviesStore: (movies: Movie) => void;
}

export const useMoviesStore = create<MoviesData>((set) => ({
  movies: [],
  setMoviesStore: (movies) => set((state) => ({ ...state, movies })),
}));
