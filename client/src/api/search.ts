import axios from "./axios";
import { AxiosResponse } from "axios";

export async function searchRequest(
  title: string,
  language: string,
  page: string
): Promise<AxiosResponse> {
  return await axios.post("/api_the_movie_db", { title, language, page });
}

export async function pushElementMovieRequest(element: object) {
  return await axios.post("/push-element-movie", { element });
}
export async function pushElementIpTvRequest(element: object) {
  return await axios.post("/push-element-iptv", { element });
}
