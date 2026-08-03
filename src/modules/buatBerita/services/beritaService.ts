import { request, type ApiResult } from "../../../api/client";
import { getToken } from "../../login/services/loginService";

export async function listBerita(): Promise<ApiResult> {
  return request("/berita", { token: getToken() });
}

export async function getBerita(id: string): Promise<ApiResult> {
  return request(`/berita/${id}`, { token: getToken() });
}

export async function createBerita(title: string, content: string): Promise<ApiResult> {
  return request("/berita", {
    method: "POST",
    token: getToken(),
    body: { title, content },
  });
}

export async function updateBerita(id: string, title: string, content: string): Promise<ApiResult> {
  return request(`/berita/${id}`, {
    method: "PUT",
    token: getToken(),
    body: { title, content },
  });
}

export async function deleteBerita(id: string): Promise<ApiResult> {
  return request(`/berita/${id}`, { method: "DELETE", token: getToken() });
}

export async function uploadCoverImage(id: string, file: File): Promise<ApiResult> {
  const fd = new FormData();
  fd.append("image", file);
  return request(`/berita/${id}/image`, { method: "POST", token: getToken(), formData: fd });
}

export async function uploadContentImage(id: string, file: File): Promise<ApiResult> {
  const fd = new FormData();
  fd.append("image", file);
  return request(`/berita/${id}/images`, { method: "POST", token: getToken(), formData: fd });
}

export async function deleteContentImage(id: string, key: string): Promise<ApiResult> {
  return request(`/berita/${id}/images?key=${encodeURIComponent(key)}`, {
    method: "DELETE",
    token: getToken(),
  });
}