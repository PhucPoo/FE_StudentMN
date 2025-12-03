import api from "./api";

const TOKEN_KEY = "token";

export async function login({ username, password }) {
  try {
    const response = await api.post("/api/auth/login", { username, password });

    const { token } = response.data;
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
      // Set token mặc định cho các request sau
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    return response.data;
  } catch (err) {
    // Lấy thông báo lỗi từ API nếu có
    throw new Error(err.response?.data?.message || "Login failed");
  }
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  setAuthToken(null);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

// Optional: cấu hình token tự động cho các request
export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
}
