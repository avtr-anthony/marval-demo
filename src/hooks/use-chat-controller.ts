"use client";

import { useCallback, useRef } from "react";

import { sendChatMessage } from "@/services/chat.service";
import { useChatStore } from "@/store/chat-store";

/**
 * Centralizes chat actions, endpoint calls and retry behavior for the fullscreen chat UI.
 */
export function useChatController() {
  const activeRequestRef = useRef<AbortController | null>(null);
  const {
    messages,
    isSending,
    lastError,
    lastFailedInput,
    ensureConversation,
    appendMessage,
    setIsSending,
    setLastError,
    setLastFailedInput,
    resetConversation
  } = useChatStore();

  /**
   * Sends one user message to the endpoint and appends normalized assistant output.
   */
  const submitMessage = useCallback(
    async (input: string) => {
      const normalizedInput = input.trim();
      if (!normalizedInput || isSending) {
        return;
      }

      const conversationId = ensureConversation();
      appendMessage("user", normalizedInput);
      setIsSending(true);
      setLastError(null);
      setLastFailedInput(null);
      const controller = new AbortController();
      activeRequestRef.current = controller;

      try {
        const response = await sendChatMessage({
          idConversation: conversationId,
          chatInput: normalizedInput
        }, { signal: controller.signal });

        appendMessage("assistant", response.text);
      } catch (error) {
        if (error instanceof Error && error.message === "Solicitud cancelada por navegación.") {
          return;
        }

        const errorMessage =
          error instanceof Error ? error.message : "No se pudo completar la consulta.";
        setLastError(errorMessage);
        setLastFailedInput(normalizedInput);
      } finally {
        if (activeRequestRef.current === controller) {
          activeRequestRef.current = null;
        }
        setIsSending(false);
      }
    },
    [
      appendMessage,
      ensureConversation,
      isSending,
      setIsSending,
      setLastError,
      setLastFailedInput
    ]
  );

  /**
   * Retries the latest failed user message without changing conversation id.
   */
  const retryLastMessage = useCallback(async () => {
    if (!lastFailedInput) {
      return;
    }

    await submitMessage(lastFailedInput);
  }, [lastFailedInput, submitMessage]);

  /**
   * Aborts the current pending request and clears transient sending/error states.
   */
  const cancelPendingRequest = useCallback(() => {
    activeRequestRef.current?.abort();
    activeRequestRef.current = null;
    setIsSending(false);
    setLastError(null);
    setLastFailedInput(null);
  }, [setIsSending, setLastError, setLastFailedInput]);

  return {
    messages,
    isSending,
    lastError,
    submitMessage,
    retryLastMessage,
    cancelPendingRequest,
    resetConversation
  };
}
