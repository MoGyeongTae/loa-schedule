import { getAccessToken } from "@/util/Auth/token";

export type ClientAuthUser = {
  id: number;
  user_id: string;
  user_role: number;
  display_name: string;
};

function decodeJwtPayload(token: string): Record<string, unknown> | null {
  const payload = token.split(".")[1];

  if (!payload) {
    return null;
  }

  try {
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
    const bytes = Uint8Array.from(atob(padded), (char) => char.charCodeAt(0));
    return JSON.parse(new TextDecoder().decode(bytes)) as Record<string, unknown>;
  } catch {
    return null;
  }
}

export function getAuthUser(): ClientAuthUser | null {
  const token = getAccessToken();

  if (!token) {
    return null;
  }

  const payload = decodeJwtPayload(token);

  if (!payload) {
    return null;
  }

  const id = Number(payload.sub);
  const user_id = payload.user_id;
  const user_role = payload.user_role;
  const display_name = payload.display_name;

  if (
    !Number.isFinite(id) ||
    typeof user_id !== "string" ||
    typeof user_role !== "number" ||
    typeof display_name !== "string"
  ) {
    return null;
  }

  return { id, user_id, user_role, display_name };
}

export function canManageSchedule(uid: number, user = getAuthUser()): boolean {
  if (!user) {
    return false;
  }

  return user.user_role === 1 || user.user_role === 2 || user.id === uid;
}
