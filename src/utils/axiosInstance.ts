import { useAuthStore } from "@/store/authStore";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000", 
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
