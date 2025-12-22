import api, { refreshApi } from "./api";
import Cookies from 'js-cookie';

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

export function getAccessToken() {
  return Cookies.get(ACCESS_TOKEN_KEY);
}
export function setAccessToken(token) {
  if (token) Cookies.set(ACCESS_TOKEN_KEY, token, { expires: 1 }); 
  else Cookies.remove(ACCESS_TOKEN_KEY);
}

export function getRefreshToken() {
  return Cookies.get(REFRESH_TOKEN_KEY);
}
export function setRefreshToken(token) {
  if (token) Cookies.set(REFRESH_TOKEN_KEY, token, { expires: 7 }); 
  else Cookies.remove(REFRESH_TOKEN_KEY);
}

export function logout() {
  Cookies.remove(ACCESS_TOKEN_KEY);
  Cookies.remove(REFRESH_TOKEN_KEY);
}

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

export async function getCurrentUser() {
  try {
    const res = await api.get("/auth/me");
    return res.data.data;
  } catch {
    return null; 
  }
}
