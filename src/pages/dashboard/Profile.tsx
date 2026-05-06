import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/features/profile/api/profileApi";
import { ProfileForm } from "@/features/profile/components/ProfileForm";
import { AvatarUpload } from "@/features/profile/components/AvatarUpload";
import { Separator } from "@/components/ui/separator";
import { LoadingSpinner } from "@/shared/components/feedback/LoadingSpinner";
import { useAuthStore } from "@/shared/stores/authStore";

export function ProfilePage() {
  const user = useAuthStore((s) => s.user)!;

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile", user.id],
    queryFn: () => getProfile(user.id),
  });

  if (isLoading || !profile) {
    return (
      <div className="flex justify-center py-16">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <title>Profile — VetGo</title>
      <h1 className="text-2xl font-bold">Your Profile</h1>
      <p className="mt-1 text-muted-foreground">Update your personal information</p>

      <Separator className="my-6" />

      <div className="space-y-8">
        <AvatarUpload
          userId={user.id}
          currentUrl={profile.avatar_url}
          fullName={profile.full_name}
        />
        <ProfileForm profile={profile} />
      </div>
    </div>
  );
}
