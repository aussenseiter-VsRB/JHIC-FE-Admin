import { request } from "../../../api/client";

interface LoginResponse {
  token: string;
}

async function login(username: string, password: string): Promise<LoginResponse> {
  const res = await request("/auth/login", {
    method: "POST",
    body: { username, password },
  });

  if (!res.ok) {
    const message = res.error || "Gagal masuk. Periksa username dan password.";
    throw new Error(message);
  }

  return res.data as LoginResponse;
}

function getToken(): string | null {
  return localStorage.getItem("jhic_token");
}

function setToken(token: string): void {
  localStorage.setItem("jhic_token", token);
}

function removeToken(): void {
  localStorage.removeItem("jhic_token");
}

function isAuthenticated(): boolean {
  return getToken() !== null;
}

export { login, getToken, setToken, removeToken, isAuthenticated };
export type { LoginResponse };