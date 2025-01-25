import axios, { AxiosInstance } from "axios";

const authApi: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_URL_BACKEND,
  
  withCredentials: true,
});
export default authApi;
