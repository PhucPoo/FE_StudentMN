import axios from "axios";
import { getAccessToken, refreshAccessToken, logout } from "./authService";

// Axios chính
const api = axios.create({
  baseURL: "https://localhost:7264/api",
});

// Request interceptor: gắn access token
api.interceptors.request.use(config => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor: tự refresh token khi 401
api.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config;

    // Nếu 401 và chưa retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // đánh dấu đã retry
      const newToken = await refreshAccessToken();

      if (newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest); // retry request cũ
      } else {
        logout(); // refresh token thất bại → logout
      }
    }

    return Promise.reject(error);
  }
);

export default api;

// Axios riêng cho refresh token (không dùng interceptor)
export const refreshApi = axios.create({
  baseURL: "https://localhost:7264/api",
});
