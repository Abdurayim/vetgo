import { Link } from "react-router";
import { MapPin, Star, Clock } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatCurrency, getInitials } from "@/shared/lib/utils";
import { ROUTES } from "@/shared/constants/routes";
import type { VetSearchResult } from "@/features/vets/types/vet.types";

interface VetCardProps {
  vet: VetSearchResult;
}

export function VetCard({ vet }: VetCardProps) {
  return (
    <Link to={ROUTES.vet(vet.vet_profile_id)} className="group block">
      <Card className="transition-shadow group-hover:shadow-md">
        <CardContent className="p-4">
          <div className="flex gap-4">
            <Avatar className="h-16 w-16 shrink-0">
              <AvatarImage src={vet.avatar_url ?? undefined} alt={vet.full_name} />
              <AvatarFallback>{getInitials(vet.full_name)}</AvatarFallback>
            </Avatar>

            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold truncate">{vet.full_name}</h3>
                {vet.is_available && (
                  <Badge variant="secondary" className="shrink-0 text-xs">
                    Available
                  </Badge>
                )}
              </div>

              <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                <span>{vet.rating_average.toFixed(1)}</span>
                <span>({vet.review_count} reviews)</span>
              </div>

              {(vet.city || vet.country) && (
                <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  <span className="truncate">
                    {[vet.city, vet.country].filter(Boolean).join(", ")}
                  </span>
                  {vet.distance_km != null && (
                    <span className="ml-1">· {vet.distance_km} km</span>
                  )}
                </div>
              )}

              <div className="mt-2 flex flex-wrap gap-1">
                {vet.specialties.slice(0, 3).map((s) => (
                  <Badge key={s} variant="outline" className="text-xs capitalize">
                    {s}
                  </Badge>
                ))}
                {vet.specialties.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{vet.specialties.length - 3}
                  </Badge>
                )}
              </div>

              <div className="mt-2 flex items-center gap-1 text-sm font-medium">
                <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                <span>From {formatCurrency(vet.consultation_fee)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
