import { apiClient } from "@/shared/lib/api-client";
import type {
  ProfileInput,
  VetProfileInput,
} from "@/features/profile/schemas/profile.schema";
import type { Profile, VetProfile } from "@/shared/types/domain.types";
import type { ActionResult } from "@/shared/types/api.types";

export async function getProfile(userId: string): Promise<Profile> {
  return apiClient.get<Profile>(`/profiles/${userId}`);
}

export async function getVetProfile(
  userId: string,
): Promise<VetProfile | null> {
  return apiClient.get<VetProfile | null>(`/vet-profiles/${userId}`);
}

export async function updateProfileAction(
  userId: string,
  input: ProfileInput,
): Promise<ActionResult> {
  try {
    await apiClient.patch(`/profiles/${userId}`, input);
    return { success: true };
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : "Error" };
  }
}

export async function updateVetProfileAction(
  userId: string,
  input: VetProfileInput,
): Promise<ActionResult> {
  try {
    await apiClient.put(`/vet-profiles/${userId}`, input);
    return { success: true };
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : "Error" };
  }
}

/**
 * Uploads avatar as a base64 data-URL or object-URL string.
 * Reads the file locally for an instant preview, then sends the data-URL to the backend.
 */
export async function uploadAvatar(
  userId: string,
  file: File,
): Promise<{ avatarUrl: string }> {
  // Convert file to base64 data-URL so the backend can store it
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  const res = await apiClient.post<{ avatar_url: string }>(
    `/profiles/${userId}/avatar`,
    { avatar_url: dataUrl },
  );
  return { avatarUrl: res.avatar_url };
}

export async function updateAvatarAction(
  userId: string,
  avatarUrl: string,
): Promise<ActionResult> {
  try {
    await apiClient.patch(`/profiles/${userId}`, { avatar_url: avatarUrl });
    return { success: true };
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : "Error" };
  }
}
