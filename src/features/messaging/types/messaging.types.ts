export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  createdAt: string;
}

export interface Conversation {
  id: string;
  counterpartName: string;
  counterpartRole: "vet" | "pet_owner" | "seller";
  counterpartAvatar: string | null;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
  isOnline: boolean;
  bookingContext?: string;
}
