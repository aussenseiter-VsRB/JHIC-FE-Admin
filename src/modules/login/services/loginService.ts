import { request } from "../../../api/client";
import type { AuthResponse, User } from "../../../api/types";

const TOKEN_KEY = "jhic_token";
const USER_KEY = "jhic_user";

async function login(email: string, password: string): Promise<AuthResponse> {
  const res = await request("/auth/login", {
    method: "POST",
    body: { email, password },
  });

  if (!res.ok) {
    const message = res.error || "Gagal masuk. Periksa email dan password.";
    throw new Error(message);
  }

  return res.data as AuthResponse;
}

function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

function getUser(): User | null {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

function setUser(user: User): void {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function removeUser(): void {
  localStorage.removeItem(USER_KEY);
}

function getRole(): string | null {
  return getUser()?.role ?? null;
}

function isAuthenticated(): boolean {
  return getToken() !== null;
}

export {
  login,
  getToken,
  setToken,
  removeToken,
  getUser,
  setUser,
  removeUser,
  getRole,
  isAuthenticated,
};
export type { AuthResponse };
