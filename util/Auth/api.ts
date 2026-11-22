import { clearAccessToken, getAccessToken } from "@/util/Auth/token";

export const API_BASE_URL = "http://localhost:3001";

function isLoginPath(path: string): boolean {
  return path.split("?")[0] === "/login";
}

function redirectToLogin(): void {
  if (typeof window !== "undefined" && window.location.pathname !== "/login") {
    window.location.assign("/login");
  }
}

export async function apiFetch(
  path: string,
  options: RequestInit = {},
): Promise<Response> {
  const { headers: initHeaders, ...init } = options;
  const headers = new Headers(initHeaders);
  const skipAuth = isLoginPath(path);

  if (!skipAuth) {
    const token = getAccessToken();

    if (!token) {
      clearAccessToken();
      redirectToLogin();
      throw new Error("로그인이 필요합니다.");
    }

    headers.set("Authorization", `Bearer ${token}`);
  }

  if (init.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers,
  });

  if (!skipAuth && response.status === 401) {
    clearAccessToken();
    redirectToLogin();
  }

  return response;
}
