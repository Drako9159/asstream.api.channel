import axios from "./axios";
import { AxiosResponse } from "axios";

export async function getIptvRequest(): Promise<AxiosResponse> {
  return await axios.get("/iptvs");
}

export async function getOneIptvRequest(id: string): Promise<AxiosResponse> {
  return await axios.get(`/iptvs/${id}`);
}

export async function deleteIptvRequest(id: string): Promise<AxiosResponse> {
  return await axios.delete(`/iptvs/${id}`);
}

export async function updateIptvRequest(
  id: string,
  element: object
): Promise<AxiosResponse> {
  return await axios.put(`/iptvs/`, { id, element });
}

