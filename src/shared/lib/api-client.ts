const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api";
const TOKEN_KEY = "vetgo_auth_token";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setAuthToken(token: string | null): void {
  if (typeof window === "undefined") return;
  if (token === null) {
    window.localStorage.removeItem(TOKEN_KEY);
  } else {
    window.localStorage.setItem(TOKEN_KEY, token);
  }
}

async function request<T>(
  path: string,
  init?: RequestInit & { params?: Record<string, string | number | undefined> },
): Promise<T> {
  const token = getAuthToken();
  let url = `${BASE_URL}${path}`;
  if (init?.params) {
    const search = new URLSearchParams();
    for (const [k, v] of Object.entries(init.params)) {
      if (v !== undefined) search.set(k, String(v));
    }
    const qs = search.toString();
    if (qs) url += `?${qs}`;
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(init?.headers as Record<string, string> | undefined),
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(url, { ...init, headers });
  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new ApiError(res.status, text || res.statusText);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export const apiClient = {
  get: <T>(
    path: string,
    params?: Record<string, string | number | undefined>,
  ) => request<T>(path, { method: "GET", params }),
  post: <T>(path: string, body?: unknown) =>
    request<T>(path, {
      method: "POST",
      body: body !== undefined ? JSON.stringify(body) : undefined,
    }),
  patch: <T>(path: string, body?: unknown) =>
    request<T>(path, {
      method: "PATCH",
      body: body !== undefined ? JSON.stringify(body) : undefined,
    }),
  put: <T>(path: string, body?: unknown) =>
    request<T>(path, {
      method: "PUT",
      body: body !== undefined ? JSON.stringify(body) : undefined,
    }),
  delete: <T>(path: string) => request<T>(path, { method: "DELETE" }),
  /**
   * Multipart/form-data upload. Do NOT set Content-Type manually — the
   * browser must set it (with the correct boundary) when given a FormData body.
   */
  postForm: <T>(path: string, formData: FormData) => {
    const token = getAuthToken();
    const headers: Record<string, string> = {};
    if (token) headers.Authorization = `Bearer ${token}`;
    return fetch(`${BASE_URL}${path}`, {
      method: "POST",
      headers,
      body: formData,
    }).then(async (res) => {
      if (!res.ok) {
        const text = await res.text().catch(() => res.statusText);
        throw new ApiError(res.status, text || res.statusText);
      }
      if (res.status === 204) return undefined as T;
      return res.json() as Promise<T>;
    });
  },
};
