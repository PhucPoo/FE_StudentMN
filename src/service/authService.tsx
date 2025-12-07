import api from "./api";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";



// ================== LOGIN ==================
export async function login({ username, password }) {
  try {
    const res = await api.post("/auth/login", { username, password });

    if (res.data.accessToken && res.data.refreshToken) {
      setAccessToken(res.data.accessToken);
      setRefreshToken(res.data.refreshToken);
    }

    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Login thất bại");
  }
}

// ================== LOGOUT ==================
export function logout() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

// ================== GET TOKEN ==================
export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}
export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

// ================== SET TOKEN ==================
export function setAccessToken(token) {
  token
    ? localStorage.setItem(ACCESS_TOKEN_KEY, token)
    : localStorage.removeItem(ACCESS_TOKEN_KEY);
}
export function setRefreshToken(token) {
  token
    ? localStorage.setItem(REFRESH_TOKEN_KEY, token)
    : localStorage.removeItem(REFRESH_TOKEN_KEY);
}

// ================== AUTO REFRESH TOKEN ==================
export async function refreshAccessToken() {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;

  try {
    const res = await api.post("/auth/refresh-token", {
      refreshToken: refreshToken,
    });

    if (res.data.accessToken) {
      setAccessToken(res.data.accessToken);
      if (res.data.refreshToken)
        setRefreshToken(res.data.refreshToken); // backend có thể trả refresh mới
      return res.data.accessToken;

    }
    return null;
  } catch {
    logout();
    return null;
  }
}
