import { MessagingLayout } from "@/features/messaging/components/MessagingLayout";

export function MessagesPage() {
  return (
    <div className="space-y-5">
      <title>Messages — VetGo</title>
      <div>
        <h1 className="text-2xl font-bold">Messages</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Chat with your vets and sellers in one place.
        </p>
      </div>
      <MessagingLayout />
    </div>
  );
}
