import axios from "./axios";
import { AxiosResponse } from "axios";

export async function getMoviesRequest(): Promise<AxiosResponse> {
  return await axios.get("/movies");
}

export async function getMovieRequest(id: string): Promise<AxiosResponse> {
  return await axios.get(`/movies/${id}`);
}

export async function deleteMovieRequest(id: string): Promise<AxiosResponse> {
  return await axios.delete(`/movies/${id}`);
}

export async function updateMovieRequest(
  id: string,
  element: object
): Promise<AxiosResponse> {
  return await axios.put(`/movies/`, { id, element });
}

