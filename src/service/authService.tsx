import api, { refreshApi } from "./api";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

// ================== TOKEN STORAGE ==================
export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}
export function setAccessToken(token) {
  if (token) localStorage.setItem(ACCESS_TOKEN_KEY, token);
  else localStorage.removeItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}
export function setRefreshToken(token) {
  if (token) localStorage.setItem(REFRESH_TOKEN_KEY, token);
  else localStorage.removeItem(REFRESH_TOKEN_KEY);
}

export function logout() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

// ================== LOGIN ==================
export async function login({ username, password }) {
  try {
    const res = await api.post("/auth/login", { username, password });

    if (res.data.success) {
      setAccessToken(res.data.accessToken);
      setRefreshToken(res.data.refreshToken);
    } else {
      logout();
    }

    return res.data;
  } catch (err) {
    logout();
    throw new Error(err.response?.data?.message || "Login thất bại");
  }
}

// ================== REFRESH TOKEN ==================
export async function refreshAccessToken() {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;

  try {
    const res = await refreshApi.post("/auth/refresh-token", { refreshToken });

    if (res.data.success && res.data.accessToken) {
      setAccessToken(res.data.accessToken);
      if (res.data.refreshToken) setRefreshToken(res.data.refreshToken);
      return res.data.accessToken;
    } else {
      logout();
      return null;
    }
  } catch {
    logout();
    return null;
  }
}

// ================== GET CURRENT USER ==================
export async function getCurrentUser() {
  try {
    const res = await api.get("/auth/me");
    return res.data.data;
  } catch {
    return null; // nếu 401 → interceptor tự refresh hoặc logout
  }
}
