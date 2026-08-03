const BASE_URL = "/api/v1";

interface LoginResponse {
  token: string;
}

async function login(username: string, password: string): Promise<LoginResponse> {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = errorData.message || "Gagal masuk. Periksa username dan password.";
    throw new Error(message);
  }

  return response.json();
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