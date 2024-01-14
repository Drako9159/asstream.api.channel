import config from "../config";
import axios, { AxiosResponse } from "axios";

export async function apiSearch(title: string, language: string, page: string) {
  return await api(title, language, page);
}

async function api(
  title: string = "hulk",
  language: string = "es",
  page: string = "1"
) {
  const url = `https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=true&language=${language}&page=${page}`;
  const options = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${config.apiToken}`,
    },
  };
  try {
    const response = await axios.get(url, options);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
}
