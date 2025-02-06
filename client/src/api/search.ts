import axios from "./axios";
import { AxiosResponse } from "axios";

export async function searchRequest(
  title: string,
  language: string,
  page: string
): Promise<AxiosResponse> {
  return await axios.post("/api_the_movie_db", { title, language, page });
}

export async function pushEntry(element: any) {
  const entry = {
    categoryId: element.categoryId,
    description: element.description,
    status: "active",
    thumbnail: element.poster_path,
    releaseDate: element.release_date,
    genre: "Entretenimiento",
    tag: "Entretenimiento",
    title: element.title,
    contentDuration: 123,
    contentVideoType: "HLS",
    contentVideoUrl: element.source,
    contentVideoQuality: element.quality,
    contentLanguage: "es",
    contentDateAdded: element.release_date,
    backdrop: element.backdrop_path,
  };

  return await axios.post("/entry", { ...entry });
}

export async function pushLive(element: any) {
  const entry = {
    categoryId: element.categoryId,
    description: element.description,
    status: "active",
    thumbnail: element.poster_path,
    releaseDate: "2025-01-01",
    genre: "Entretenimiento",
    tag: "Entretenimiento",
    title: element.title,
    contentDuration: 123,
    contentVideoType: "HLS",
    contentVideoUrl: element.source,
    contentVideoQuality: element.quality,
    contentLanguage: "es",
    contentDateAdded: "2024-01-01",
    backdrop: element.backdrop_path,
  };

  return await axios.post("/entry", { ...entry });
}



export async function pushElementMovieRequest(element: object) {
  return await axios.post("/push-element-movie", { element });
}
export async function pushElementIpTvRequest(element: object) {
  return await axios.post("/push-element-iptv", { element });
}
