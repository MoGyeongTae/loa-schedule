const ACCESS_TOKEN_KEY = "access_token";
export const ACCESS_TOKEN_EVENT = "loa-access-token-change";

function notifyAccessTokenChange(): void {
  window.dispatchEvent(new Event(ACCESS_TOKEN_EVENT));
}

export function getAccessToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function setAccessToken(token: string): void {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
  notifyAccessTokenChange();
}

export function clearAccessToken(): void {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  notifyAccessTokenChange();
}
