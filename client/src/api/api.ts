// client/src/api/api.ts
// Handles authenticated requests using Firebase ID Tokens.

const API = `${import.meta.env.VITE_API_URL}`;

let authToken: string | null = null;

// Save token in memory + localStorage
export function setAuthToken(token: string) {
  authToken = token;
  localStorage.setItem("firebase_id_token", token);
}

export function getAuthToken(): string | null {
  if (authToken) return authToken;

  const stored = localStorage.getItem("firebase_id_token");
  authToken = stored;
  return stored;
}

// Wrapper for protected API calls
export async function authedFetch(
  path: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = getAuthToken();

  // Force headers to be a plain object so TS is happy
  const baseHeaders: Record<string, string> = options.headers
    ? { ...(options.headers as Record<string, string>) }
    : {};

  const headers: Record<string, string> = {
    ...baseHeaders,
    "Content-Type": "application/json",
  };

  // Add Authorization safely
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return fetch(`${API}${path}`, {
    ...options,
    headers,
  });
}

export interface LoginResponse {
  ok: boolean;
  message: string;
  user?: any;
  firebaseUid?: string;
  phoneNumber?: string;
}

// Called AFTER Firebase OTP verification
export async function loginWithIdToken(
  idToken: string,
  username?: string
): Promise<LoginResponse> {
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken, username }),
  });

  if (res.status === 403) {
    return { ok: false, message: "Phone number not allowed" };
  }

  try {
    return await res.json();
  } catch (err) {
    return { ok: false, message: "Server error: Invalid response" };
  }
}

export interface Bhajan {
  _id: string;
  title: string;
  lyrics: string;
  category: string;
  createdAt: string;
}

export async function getBhajans(): Promise<{ ok: boolean; data: Bhajan[] }> {
  try {
    const res = await fetch(`${API}/bhajans`);
    return await res.json();
  } catch (err) {
    console.error("getBhajans error:", err);
    return { ok: false, data: [] };
  }
}
