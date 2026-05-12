import { apiClient } from "@/shared/lib/api-client";
import type {
  Conversation,
  Message,
} from "@/features/messaging/types/messaging.types";

export async function getConversations(): Promise<Conversation[]> {
  return apiClient.get<Conversation[]>("/messages/conversations");
}

export async function getMessages(conversationId: string): Promise<Message[]> {
  return apiClient.get<Message[]>(`/messages/conversations/${conversationId}`);
}

export async function sendMessage(
  conversationId: string,
  content: string,
): Promise<Message> {
  return apiClient.post<Message>(
    `/messages/conversations/${conversationId}`,
    { content },
  );
}

export async function markConversationRead(
  conversationId: string,
): Promise<void> {
  await apiClient.patch(`/messages/conversations/${conversationId}/read`);
}

export async function startConversation(
  recipientId: string,
  bookingId?: number,
): Promise<Conversation> {
  return apiClient.post<Conversation>("/messages/conversations", {
    recipientId,
    bookingId,
  });
}
