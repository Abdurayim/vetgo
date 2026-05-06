import type { Profile, VetProfile } from "@/shared/types/domain.types";

export type { Profile, VetProfile };

export interface FullVetProfile {
  profile: Profile;
  vetProfile: VetProfile;
}
