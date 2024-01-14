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
    longDescription: element.overview,
    status: "active",
    thumbnail: `https://image.tmdb.org/t/p/w500${element.poster_path}`,
    releaseDate: element.release_date,
    genre: "master",
    tag: "master",
    shortDescription: element.overview,
    title: element.title,
    contentDuration: 123,
    contentVideoType: "M3U8",
    contentVideoUrl: element.source,
    contentVideoQuality: element.quality,
    contentLanguage: "es",
    contentDateAdded: element.release_date,
    backdrop: `https://image.tmdb.org/t/p/w500${element.backdrop_path}`,
  };

  return await axios.post("/entry", { ...entry });
}

export async function pushLive(element: any) {
  const entry = {
    categoryId: element.categoryId,
    longDescription: element.overview,
    status: "active",
    thumbnail: element.poster_path,
    releaseDate: "2024-01-01",
    genre: "master",
    tag: "master",
    shortDescription: element.overview,
    title: element.title,
    contentDuration: 123,
    contentVideoType: "M3U8",
    contentVideoUrl: element.source,
    contentVideoQuality: "SD",
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
