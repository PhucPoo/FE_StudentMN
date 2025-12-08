import axios from "axios";
import { getAccessToken,  refreshAccessToken } from "./authService";

const api = axios.create({
  baseURL: "https://localhost:7264/api", 
});



api.interceptors.request.use(config => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Nếu token hết hạn → tự refresh token
api.interceptors.response.use(
  res => res,
  async error => {
    if (error.response?.status === 401) {
      const newToken = await refreshAccessToken();
      if (newToken) {
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return api(error.config); 
      }
    }
    return Promise.reject(error);
  }
);

export default api;
