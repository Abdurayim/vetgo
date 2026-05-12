import { useRef, useState } from "react";
import { toast } from "sonner";
import { Camera } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  uploadAvatar,
  updateAvatarAction,
} from "@/features/profile/api/profileApi";
import { getInitials } from "@/shared/lib/utils";
import { useAuthStore } from "@/shared/stores/authStore";

interface AvatarUploadProps {
  userId: string;
  currentUrl: string | null;
  fullName: string;
  onUpload?: (url: string) => void;
}

export function AvatarUpload({
  userId,
  currentUrl,
  fullName,
  onUpload,
}: AvatarUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isPending, setPending] = useState(false);
  const { user, setUser } = useAuthStore();

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB");
      return;
    }

    setPending(true);
    try {
      const { avatarUrl } = await uploadAvatar(userId, file);
      const result = await updateAvatarAction(userId, avatarUrl);
      if (result.success) {
        // Sync the auth store so the Navbar avatar updates immediately
        if (user) setUser({ ...user, avatar_url: avatarUrl });
        toast.success("Avatar updated");
        onUpload?.(avatarUrl);
      } else {
        toast.error(result.error ?? "Failed to save avatar");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        <Avatar className="h-24 w-24">
          <AvatarImage src={currentUrl ?? undefined} alt={fullName} />
          <AvatarFallback className="text-lg">
            {getInitials(fullName)}
          </AvatarFallback>
        </Avatar>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={isPending}
          className="absolute bottom-0 right-0 rounded-full bg-primary p-1.5 text-primary-foreground shadow-sm hover:bg-primary/90 disabled:opacity-50"
          aria-label="Change avatar"
        >
          <Camera className="h-3.5 w-3.5" />
        </button>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleFileChange}
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => inputRef.current?.click()}
        disabled={isPending}
      >
        {isPending ? "Uploading…" : "Change photo"}
      </Button>
    </div>
  );
}
