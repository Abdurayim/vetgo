import type {
  Conversation,
  Message,
} from "@/features/messaging/types/messaging.types";

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: "conv-1",
    counterpartName: "Dr. Sarah Chen",
    counterpartRole: "vet",
    counterpartAvatar:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&auto=format",
    lastMessage:
      "Sounds great — I'll see Max at 3 pm tomorrow. Please bring his most recent bloodwork.",
    lastMessageAt: "2026-04-22T17:15:00.000Z",
    unreadCount: 0,
    isOnline: true,
    bookingContext: "Golden Retriever · In-clinic · Thu 3:00 pm",
  },
  {
    id: "conv-2",
    counterpartName: "Dr. James Okafor",
    counterpartRole: "vet",
    counterpartAvatar:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&auto=format",
    lastMessage:
      "I've uploaded Luna's discharge instructions to the booking. Let me know how she's sleeping tonight.",
    lastMessageAt: "2026-04-22T11:02:00.000Z",
    unreadCount: 2,
    isOnline: false,
    bookingContext: "Exotic bird · Telemedicine · Yesterday",
  },
  {
    id: "conv-3",
    counterpartName: "PawGear Support",
    counterpartRole: "seller",
    counterpartAvatar: null,
    lastMessage: "Your orthopedic bed shipped — arriving Friday, tracking inside.",
    lastMessageAt: "2026-04-21T09:44:00.000Z",
    unreadCount: 0,
    isOnline: false,
    bookingContext: "Order ord_4f9c · Shipped",
  },
  {
    id: "conv-4",
    counterpartName: "Dr. Lena Müller",
    counterpartRole: "vet",
    counterpartAvatar:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=200&fit=crop&auto=format",
    lastMessage:
      "The surgery went smoothly. Bailey is resting comfortably — I'll check in at 7 am.",
    lastMessageAt: "2026-04-20T18:20:00.000Z",
    unreadCount: 0,
    isOnline: true,
    bookingContext: "Post-op follow-up",
  },
];

export const MOCK_MESSAGES: Record<string, Message[]> = {
  "conv-1": [
    {
      id: "m-1",
      conversationId: "conv-1",
      senderId: "vet",
      content:
        "Hi! Thanks for booking. Before Max's visit, could you let me know if he's on any medications right now?",
      createdAt: "2026-04-22T16:40:00.000Z",
    },
    {
      id: "m-2",
      conversationId: "conv-1",
      senderId: "me",
      content:
        "He's on Apoquel 16mg once a day for itchy skin, and a fish-oil supplement.",
      createdAt: "2026-04-22T16:48:00.000Z",
    },
    {
      id: "m-3",
      conversationId: "conv-1",
      senderId: "vet",
      content: "Great. Any recent bloodwork?",
      createdAt: "2026-04-22T16:55:00.000Z",
    },
    {
      id: "m-4",
      conversationId: "conv-1",
      senderId: "me",
      content:
        "Yes — from February. I'll attach the PDF to the booking shortly.",
      createdAt: "2026-04-22T17:02:00.000Z",
    },
    {
      id: "m-5",
      conversationId: "conv-1",
      senderId: "vet",
      content:
        "Sounds great — I'll see Max at 3 pm tomorrow. Please bring his most recent bloodwork.",
      createdAt: "2026-04-22T17:15:00.000Z",
    },
  ],
  "conv-2": [
    {
      id: "m-10",
      conversationId: "conv-2",
      senderId: "me",
      content:
        "Luna's been a bit lethargic since the visit. Is that normal for the first night?",
      createdAt: "2026-04-22T10:12:00.000Z",
    },
    {
      id: "m-11",
      conversationId: "conv-2",
      senderId: "vet",
      content:
        "Mild lethargy for 12–24 hours after sedation is expected. Keep her in a warm quiet spot tonight.",
      createdAt: "2026-04-22T10:30:00.000Z",
    },
    {
      id: "m-12",
      conversationId: "conv-2",
      senderId: "vet",
      content:
        "I've uploaded Luna's discharge instructions to the booking. Let me know how she's sleeping tonight.",
      createdAt: "2026-04-22T11:02:00.000Z",
    },
  ],
  "conv-3": [
    {
      id: "m-20",
      conversationId: "conv-3",
      senderId: "me",
      content: "Hi — when can I expect my order?",
      createdAt: "2026-04-20T14:00:00.000Z",
    },
    {
      id: "m-21",
      conversationId: "conv-3",
      senderId: "seller",
      content:
        "Your orthopedic bed shipped — arriving Friday, tracking inside.",
      createdAt: "2026-04-21T09:44:00.000Z",
    },
  ],
  "conv-4": [
    {
      id: "m-30",
      conversationId: "conv-4",
      senderId: "vet",
      content:
        "The surgery went smoothly. Bailey is resting comfortably — I'll check in at 7 am.",
      createdAt: "2026-04-20T18:20:00.000Z",
    },
  ],
};
