"use client";

import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";

import type { ChatMessage, ChatRole } from "@/types/chat";

export const chatStorageKey = "nq-tributario-chat-v1";

interface ChatStoreState {
  conversationId: string;
  messages: ChatMessage[];
  isSending: boolean;
  lastError: string | null;
  lastFailedInput: string | null;
  ensureConversation: () => string;
  appendMessage: (role: ChatRole, content: string) => ChatMessage;
  setIsSending: (value: boolean) => void;
  setLastError: (error: string | null) => void;
  setLastFailedInput: (input: string | null) => void;
  resetConversation: () => void;
}

/**
 * Generates a stable conversation id for endpoint correlation.
 */
function buildConversationId() {
  return `nq-${uuidv4()}`;
}

/**
 * Creates a chat message with timestamp metadata.
 */
function buildMessage(role: ChatRole, content: string): ChatMessage {
  return {
    id: uuidv4(),
    role,
    content,
    createdAt: new Date().toISOString()
  };
}

/**
 * Zustand store for conversational state during the current chat view lifecycle.
 */
export const useChatStore = create<ChatStoreState>()((set, get) => ({
  conversationId: buildConversationId(),
  messages: [],
  isSending: false,
  lastError: null,
  lastFailedInput: null,
  /**
   * Ensures a conversation id exists before any API request.
   */
  ensureConversation: () => {
    const current = get().conversationId;
    if (current) {
      return current;
    }

    const created = buildConversationId();
    set({ conversationId: created });
    return created;
  },
  /**
   * Appends a user or assistant message to the in-memory history.
   */
  appendMessage: (role, content) => {
    const message = buildMessage(role, content);
    set((state) => ({ messages: [...state.messages, message] }));
    return message;
  },
  /**
   * Updates network sending status for input locking and typing indicator.
   */
  setIsSending: (value) => set({ isSending: value }),
  /**
   * Stores the latest network error for UI feedback.
   */
  setLastError: (error) => set({ lastError: error }),
  /**
   * Stores the latest failed input for one-click retry.
   */
  setLastFailedInput: (input) => set({ lastFailedInput: input }),
  /**
   * Clears full conversation and starts a new id.
   */
  resetConversation: () =>
    set({
      conversationId: buildConversationId(),
      messages: [],
      isSending: false,
      lastError: null,
      lastFailedInput: null
    })
}));
