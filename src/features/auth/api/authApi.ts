import {
  apiClient,
  setAuthToken,
  getAuthToken,
} from "@/shared/lib/api-client";
import type { AuthUser } from "@/features/auth/types/auth.types";
import type { UserRole } from "@/shared/types/domain.types";

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  email: string;
  password: string;
  full_name: string;
  role: UserRole;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

// ---------------------------------------------------------------------------
// Dev-mode mock auth
// ---------------------------------------------------------------------------
// When the SQLite backend isn't running yet, set VITE_MOCK_AUTH=true in
// .env.local to skip real API calls and use this local mock instead.
// Role is determined by the email prefix (matches AGENTS.md convention):
//   admin@*  → admin
//   vet@*    → vet
//   seller@* → seller
//   *        → pet_owner
// ---------------------------------------------------------------------------
const MOCK_AUTH = import.meta.env.VITE_MOCK_AUTH === "true";
const MOCK_TOKEN_KEY = "vetgo_mock_user";

function mockRoleFromEmail(email: string): UserRole {
  const prefix = email.split("@")[0].toLowerCase();
  if (prefix === "admin") return "admin";
  if (prefix === "vet") return "vet";
  if (prefix === "seller") return "seller";
  return "pet_owner";
}

function buildMockUser(email: string): AuthUser {
  const role = mockRoleFromEmail(email);
  const name = role === "pet_owner" ? "Demo User" : `Demo ${role.charAt(0).toUpperCase() + role.slice(1)}`;
  return {
    id: `mock-${role}-1`,
    email,
    full_name: name,
    avatar_url: null,
    role,
  };
}

export async function login(input: LoginInput): Promise<AuthUser> {
  if (MOCK_AUTH) {
    await new Promise((r) => setTimeout(r, 300));
    const user = buildMockUser(input.email);
    setAuthToken("mock-token");
    localStorage.setItem(MOCK_TOKEN_KEY, JSON.stringify(user));
    return user;
  }
  const res = await apiClient.post<AuthResponse>("/auth/login", input);
  setAuthToken(res.token);
  return res.user;
}

export async function register(input: RegisterInput): Promise<AuthUser> {
  if (MOCK_AUTH) {
    await new Promise((r) => setTimeout(r, 300));
    const user = buildMockUser(input.email);
    setAuthToken("mock-token");
    localStorage.setItem(MOCK_TOKEN_KEY, JSON.stringify(user));
    return user;
  }
  const res = await apiClient.post<AuthResponse>("/auth/register", {
    email: input.email,
    password: input.password,
    full_name: input.full_name,
    role: input.role,
  });
  setAuthToken(res.token);
  return res.user;
}

export async function logout(): Promise<void> {
  setAuthToken(null);
  if (MOCK_AUTH) {
    localStorage.removeItem(MOCK_TOKEN_KEY);
    return;
  }
  try {
    await apiClient.post("/auth/logout");
  } catch {
    // stateless — ignore network error on logout
  }
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const token = getAuthToken();
  if (!token) return null;

  if (MOCK_AUTH) {
    const raw = localStorage.getItem(MOCK_TOKEN_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as AuthUser;
    } catch {
      return null;
    }
  }

  // Defensive cleanup: a stale "mock-token" from a previous VITE_MOCK_AUTH=true
  // session would be rejected by the real backend. Clear it proactively so the
  // user isn't stuck in a half-mock state after we toggle off mock mode.
  if (token === "mock-token") {
    setAuthToken(null);
    localStorage.removeItem(MOCK_TOKEN_KEY);
    return null;
  }

  try {
    return await apiClient.get<AuthUser>("/auth/me");
  } catch {
    // token is invalid or expired — clear it
    setAuthToken(null);
    return null;
  }
}

export async function requestPasswordReset(email: string): Promise<void> {
  if (MOCK_AUTH) {
    await new Promise((r) => setTimeout(r, 300));
    return;
  }
  await apiClient.post("/auth/forgot-password", { email });
}

// Surface api client helpers used by callers that previously imported them indirectly.
export { apiClient };
