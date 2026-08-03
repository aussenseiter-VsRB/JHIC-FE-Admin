import { request, type ApiResult } from "../../../api/client";
import { getToken } from "../../login/services/loginService";

export async function listUsers(): Promise<ApiResult> {
  return request("/users", { token: getToken() });
}

export interface CreateUserInput {
  email: string;
  password: string;
  name: string;
}

export async function createUser(input: CreateUserInput): Promise<ApiResult> {
  return request("/users", {
    method: "POST",
    token: getToken(),
    body: { email: input.email, password: input.password, name: input.name, role: "user" },
  });
}

export interface UpdateUserInput {
  name: string;
  class?: string;
  jurusan?: string;
}

export async function updateUser(id: string, input: UpdateUserInput): Promise<ApiResult> {
  return request(`/users/${id}`, {
    method: "PUT",
    token: getToken(),
    body: { name: input.name, class: input.class ?? "", jurusan: input.jurusan ?? "" },
  });
}

export async function deleteUser(id: string): Promise<ApiResult> {
  return request(`/users/${id}`, { method: "DELETE", token: getToken() });
}
