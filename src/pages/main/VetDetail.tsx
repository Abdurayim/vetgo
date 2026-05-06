import { useParams, Navigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { MapPin, Star, Clock, Stethoscope, Award } from "lucide-react";

import { getVetById } from "@/features/vets/api/vetsApi";
import { BookingForm } from "@/features/bookings/components/BookingForm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingSpinner } from "@/shared/components/feedback/LoadingSpinner";
import { useAuthStore } from "@/shared/stores/authStore";
import { formatCurrency, getInitials } from "@/shared/lib/utils";

export function VetDetailPage() {
  const { vetId } = useParams<{ vetId: string }>();
  const user = useAuthStore((s) => s.user);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["vet", vetId],
    queryFn: () => getVetById(vetId!),
    enabled: !!vetId,
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (isError || !data) {
    return <Navigate to="/vets" replace />;
  }

  const { vetProfile, profile } = data;
  const canBook = user?.role === "pet_owner";

  return (
    <>
      <title>{profile.full_name} — VetGo</title>
      <div className="mx-auto max-w-4xl space-y-8 px-4 py-8">
        {/* Hero */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <Avatar className="h-24 w-24 shrink-0">
            <AvatarImage src={profile.avatar_url ?? undefined} alt={profile.full_name} />
            <AvatarFallback className="text-2xl">
              {getInitials(profile.full_name)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold">{profile.full_name}</h1>

            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                {vetProfile.rating_average.toFixed(1)} ({vetProfile.review_count} reviews)
              </span>
              {(profile.city || profile.country) && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {[profile.city, profile.country].filter(Boolean).join(", ")}
                </span>
              )}
              {vetProfile.years_of_experience && (
                <span className="flex items-center gap-1">
                  <Award className="h-4 w-4" />
                  {vetProfile.years_of_experience} yrs experience
                </span>
              )}
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                From {formatCurrency(vetProfile.consultation_fee)}
              </span>
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {vetProfile.is_available ? (
                <Badge variant="secondary">Available</Badge>
              ) : (
                <Badge variant="outline">Not accepting new patients</Badge>
              )}
              {vetProfile.license_verified && (
                <Badge variant="outline" className="gap-1">
                  <Stethoscope className="h-3 w-3" />
                  Verified License
                </Badge>
              )}
            </div>

            {vetProfile.specialties.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1">
                {vetProfile.specialties.map((s) => (
                  <Badge key={s} variant="outline" className="text-xs capitalize">
                    {s}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left: Bio + Fees */}
          <div className="space-y-6 lg:col-span-2">
            {vetProfile.bio && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">About</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {vetProfile.bio}
                  </p>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Consultation Fees</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">In Clinic</span>
                  <span className="font-medium">
                    {formatCurrency(vetProfile.consultation_fee)}
                  </span>
                </div>
                {vetProfile.home_visit_fee != null && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Home Visit</span>
                    <span className="font-medium">
                      {formatCurrency(vetProfile.home_visit_fee)}
                    </span>
                  </div>
                )}
                {vetProfile.tele_fee != null && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Telemedicine</span>
                    <span className="font-medium">
                      {formatCurrency(vetProfile.tele_fee)}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right: Booking form */}
          <div>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Book Appointment</CardTitle>
              </CardHeader>
              <CardContent>
                {canBook && vetProfile.is_available ? (
                  <BookingForm
                    vetProfileId={vetProfile.id}
                    vetUserId={vetProfile.user_id}
                    consultationFee={vetProfile.consultation_fee}
                    homeVisitFee={vetProfile.home_visit_fee}
                    teleFee={vetProfile.tele_fee}
                    vetName={profile.full_name}
                  />
                ) : !vetProfile.is_available ? (
                  <p className="text-sm text-muted-foreground">
                    This vet is not currently accepting new appointments.
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Sign in as a pet owner to book this vet.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
