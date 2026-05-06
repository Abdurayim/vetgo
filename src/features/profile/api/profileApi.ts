import type {
  ProfileInput,
  VetProfileInput,
} from "@/features/profile/schemas/profile.schema";
import type { Profile, VetProfile } from "@/shared/types/domain.types";
import type { ActionResult } from "@/shared/types/api.types";

const MOCK_PROFILE: Profile = {
  id: "u_mock_1",
  role: "pet_owner",
  full_name: "Demo User",
  avatar_url: null,
  phone: null,
  address: null,
  city: "Brooklyn",
  country: "US",
  latitude: null,
  longitude: null,
  is_active: true,
  is_banned: false,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

// TODO: replace with apiClient.get<Profile>(`/profiles/${userId}`) when backend is ready
export async function getProfile(userId: string): Promise<Profile> {
  await new Promise((r) => setTimeout(r, 100));
  return { ...MOCK_PROFILE, id: userId };
}

// TODO: replace with apiClient.get<VetProfile | null>(`/vet-profiles/${userId}`) when backend is ready
export async function getVetProfile(
  userId: string,
): Promise<VetProfile | null> {
  await new Promise((r) => setTimeout(r, 100));
  void userId;
  return null;
}

// TODO: replace with apiClient.patch<void>(`/profiles/${userId}`, input) when backend is ready
export async function updateProfileAction(
  userId: string,
  input: ProfileInput,
): Promise<ActionResult> {
  await new Promise((r) => setTimeout(r, 200));
  void userId;
  void input;
  return { success: true };
}

// TODO: replace with apiClient.put<void>(`/vet-profiles/${userId}`, input) when backend is ready
export async function updateVetProfileAction(
  userId: string,
  input: VetProfileInput,
): Promise<ActionResult> {
  await new Promise((r) => setTimeout(r, 200));
  void userId;
  void input;
  return { success: true };
}

// TODO: replace with apiClient.post<{ avatarUrl: string }>(`/profiles/${userId}/avatar`, formData) when backend is ready
export async function uploadAvatar(
  userId: string,
  file: File,
): Promise<{ avatarUrl: string }> {
  await new Promise((r) => setTimeout(r, 400));
  void userId;
  return { avatarUrl: URL.createObjectURL(file) };
}

// TODO: replace with apiClient.patch<void>(`/profiles/${userId}`, { avatar_url }) when backend is ready
export async function updateAvatarAction(
  userId: string,
  avatarUrl: string,
): Promise<ActionResult> {
  await new Promise((r) => setTimeout(r, 100));
  void userId;
  void avatarUrl;
  return { success: true };
}
