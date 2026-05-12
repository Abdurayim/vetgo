import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateProfileAction } from "@/features/profile/api/profileApi";
import {
  profileSchema,
  type ProfileInput,
} from "@/features/profile/schemas/profile.schema";
import type { Profile } from "@/features/profile/types/profile.types";
import { useAuthStore } from "@/shared/stores/authStore";

interface ProfileFormProps {
  profile: Profile;
}

export function ProfileForm({ profile }: ProfileFormProps) {
  const [isPending, setPending] = useState(false);
  const { user, setUser } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: profile.full_name,
      phone: profile.phone ?? "",
      address: profile.address ?? "",
      city: profile.city ?? "",
      country: profile.country ?? "",
    },
  });

  async function onSubmit(data: ProfileInput) {
    setPending(true);
    try {
      const result = await updateProfileAction(profile.id, data);
      if (result.success) {
        // Sync the auth store so the Navbar reflects the new name immediately
        if (user && data.full_name !== user.full_name) {
          setUser({ ...user, full_name: data.full_name });
        }
        toast.success("Profile updated");
      } else {
        toast.error(result.error ?? "Update failed");
      }
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="full_name">Full name</Label>
        <Input
          id="full_name"
          {...register("full_name")}
          aria-invalid={!!errors.full_name}
        />
        {errors.full_name && (
          <p className="text-sm text-destructive">{errors.full_name.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" type="tel" {...register("phone")} />
        </div>
        <div className="space-y-1">
          <Label htmlFor="country">Country</Label>
          <Input id="country" {...register("country")} />
        </div>
      </div>

      <div className="space-y-1">
        <Label htmlFor="address">Address</Label>
        <Input id="address" {...register("address")} />
      </div>

      <div className="space-y-1">
        <Label htmlFor="city">City</Label>
        <Input id="city" {...register("city")} />
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? "Saving…" : "Save changes"}
      </Button>
    </form>
  );
}
