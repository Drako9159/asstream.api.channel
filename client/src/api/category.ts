import axios from "./axios";
import { AxiosResponse } from "axios";

export async function createCategory(name: string): Promise<AxiosResponse> {
  return await axios.post(`/category`, { name });
}

export async function getAllCategory(): Promise<AxiosResponse> {
  return await axios.get(`/category`);
}
