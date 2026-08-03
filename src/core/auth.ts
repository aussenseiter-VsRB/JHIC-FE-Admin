import { isAuthenticated as checkAuth, removeToken } from "../modules/login/services/loginService";

function isAuthenticated(): boolean {
  return checkAuth();
}

function logout(): void {
  removeToken();
}

export { isAuthenticated, logout };