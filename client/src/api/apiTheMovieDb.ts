import axios from "./axios";
import { AxiosResponse } from "axios";

export async function searchRequest(
  title: string,
  language: string,
  page: string
): Promise<AxiosResponse> {
  return await axios.post("/api_the_movie_db", { title, language, page });
}


