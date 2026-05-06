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

// TODO: replace with apiClient.post<AuthResponse>("/auth/login", input) when backend is ready
export async function login(input: LoginInput): Promise<AuthUser> {
  await new Promise((r) => setTimeout(r, 300));
  const mock: AuthResponse = {
    token: `mock-token-${input.email}`,
    user: {
      id: "u_mock_1",
      email: input.email,
      full_name: "Demo User",
      avatar_url: null,
      role: pickMockRole(input.email),
    },
  };
  setAuthToken(mock.token);
  return mock.user;
}

// TODO: replace with apiClient.post<AuthResponse>("/auth/register", input) when backend is ready
export async function register(input: RegisterInput): Promise<AuthUser> {
  await new Promise((r) => setTimeout(r, 300));
  const mock: AuthResponse = {
    token: `mock-token-${input.email}`,
    user: {
      id: "u_mock_new",
      email: input.email,
      full_name: input.full_name,
      avatar_url: null,
      role: input.role,
    },
  };
  setAuthToken(mock.token);
  return mock.user;
}

// TODO: replace with apiClient.post<void>("/auth/logout") when backend is ready
export async function logout(): Promise<void> {
  setAuthToken(null);
}

// TODO: replace with apiClient.get<AuthUser>("/auth/me") when backend is ready
export async function getCurrentUser(): Promise<AuthUser | null> {
  const token = getAuthToken();
  if (!token) return null;
  const email = token.replace(/^mock-token-/, "") || "demo@vetgo.test";
  return {
    id: "u_mock_1",
    email,
    full_name: "Demo User",
    avatar_url: null,
    role: pickMockRole(email),
  };
}

// TODO: replace with apiClient.post<void>("/auth/forgot-password", { email }) when backend is ready
export async function requestPasswordReset(email: string): Promise<void> {
  await new Promise((r) => setTimeout(r, 300));
  void email;
}

function pickMockRole(email: string): UserRole {
  if (email.startsWith("admin")) return "admin";
  if (email.startsWith("vet")) return "vet";
  if (email.startsWith("seller")) return "seller";
  return "pet_owner";
}

// Surface api client helpers used by callers that previously imported them indirectly.
export { apiClient };
