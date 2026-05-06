import { Stethoscope } from "lucide-react";

export function VetDashboardPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 py-24 text-center">
      <title>Vet Dashboard — VetGo</title>
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
        <Stethoscope className="h-7 w-7 text-primary" />
      </div>
      <div>
        <h1 className="text-xl font-bold">Vet Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your vet profile, availability, and appointments.
        </p>
      </div>
    </div>
  );
}
