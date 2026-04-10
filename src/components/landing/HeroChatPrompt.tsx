"use client";

import type { FormEvent, KeyboardEvent } from "react";
import { SendHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { siteConfig } from "@/config/site";

import { ActionButton } from "../ui/ActionButton";

interface HeroChatPromptProps {
  placeholder: string;
}

/**
 * Captures an initial question in the hero and redirects to the fullscreen chat route.
 */
export function HeroChatPrompt({ placeholder }: HeroChatPromptProps) {
  const router = useRouter();
  const [value, setValue] = useState("");

  /**
   * Redirects to chat with the drafted question encoded in the URL for one-time consumption.
   */
  const goToChat = () => {
    const trimmedValue = value.trim();
    if (!trimmedValue) {
      return;
    }

    router.push(`${siteConfig.routes.chat}?q=${encodeURIComponent(trimmedValue)}`);
  };

  /**
   * Prevents full page reload and opens the fullscreen chat route.
   */
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    goToChat();
  };

  /**
   * Sends the hero question with Enter while preserving Shift+Enter for line breaks.
   */
  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    const isComposing = event.nativeEvent.isComposing;
    const shouldSubmit =
      event.key === "Enter" &&
      !event.shiftKey &&
      !event.ctrlKey &&
      !event.altKey &&
      !event.metaKey &&
      !isComposing;

    if (shouldSubmit) {
      event.preventDefault();
      goToChat();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-panel border border-stroke-soft/70 bg-panel/85 p-3 shadow-ambient-xl sm:p-4"
    >
      <p className="mb-3 text-left text-xs font-semibold uppercase tracking-[0.14em] text-ink-dim">
        Consulta guiada
      </p>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="min-w-0 flex-1">
          <textarea
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={handleKeyDown}
            rows={2}
            placeholder={placeholder}
            className="max-h-44 min-h-14 w-full resize-none overflow-y-auto rounded-card border border-stroke-soft/70 bg-white/[0.02] px-4 py-3 text-[13px] text-white outline-none placeholder:text-[#c3c8d2]/60 [overflow-wrap:anywhere] scrollbar-soft sm:text-sm"
          />
        </div>
        <ActionButton
          type="submit"
          disabled={!value.trim()}
          className="h-12 shrink-0 gap-2 bg-[#d5d5d8] px-5 text-xs text-[#111111] hover:bg-[#e2e2e4] sm:text-sm"
          aria-label="Enviar pregunta"
        >
          Enviar
          <SendHorizontal size={16} />
        </ActionButton>
      </div>
    </form>
  );
}
