import axios from "./axios";
import { AxiosResponse } from "axios";

const user = import.meta.env.VITE_USER_KEY;
const password = import.meta.env.VITE_USER_PASSWORD;

export async function loginRequest(): Promise<AxiosResponse> {
  
  const response = await axios.post("/login", { user, password });
  console.log(response.headers.authorization)
  return response
}

export async function dashboardLoginRequest(
  email: string,
  password: string
): Promise<AxiosResponse> {
  return await axios.post("/auth/login", { email, password });
}
