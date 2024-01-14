import axios from "./axios";
import { AxiosResponse } from "axios";

export async function createCategory(name: string): Promise<AxiosResponse> {
  return await axios.post(`/category`, { name });
}

export async function getAllCategory(): Promise<AxiosResponse> {
  return await axios.get(`/category`);
}

export async function deleteCategory(id: string): Promise<AxiosResponse> {
  return await axios.delete(`/category/${id}`);
}

export async function updateCategory(
  id: string,
  name: string
): Promise<AxiosResponse> {
  return await axios.put(`/category`, { id, name });
}
