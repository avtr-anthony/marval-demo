export type ChatRole = "user" | "assistant";

export interface ChatApiRequest {
  idConversation: string;
  chatInput: string;
}

export interface ChatApiPayload {
  id_conversation: string;
  chat_input: string;
}

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: string;
}

export interface NormalizedChatResponse {
  text: string;
  raw: unknown;
}
