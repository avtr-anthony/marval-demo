import type { FormEvent, KeyboardEvent } from "react";
import { useEffect, useRef } from "react";
import { SendHorizontal } from "lucide-react";

import { ActionButton } from "../ui/ActionButton";

interface ChatComposerProps {
  value: string;
  disabled: boolean;
  onChange: (nextValue: string) => void;
  onSubmit: () => Promise<void>;
}

/**
 * Bottom composer with enter-to-send behavior and multiline support.
 */
export function ChatComposer({
  value,
  disabled,
  onChange,
  onSubmit,
}: ChatComposerProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const MAX_TEXTAREA_HEIGHT_PX = 172;

  /**
   * Auto-grows the textarea up to a max height and then enables subtle internal scrolling.
   */
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) {
      return;
    }

    textarea.style.height = "auto";
    const nextHeight = Math.min(textarea.scrollHeight, MAX_TEXTAREA_HEIGHT_PX);
    textarea.style.height = `${nextHeight}px`;
    textarea.style.overflowY =
      textarea.scrollHeight > MAX_TEXTAREA_HEIGHT_PX ? "auto" : "hidden";
  }, [value]);

  /**
   * Sends the current message and prevents full page form navigation.
   */
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit();
  };

  /**
   * Handles Enter as submit and Shift+Enter as newline for comfortable drafting.
   */
  const handleKeyDown = async (event: KeyboardEvent<HTMLTextAreaElement>) => {
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
      await onSubmit();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-panel border border-stroke-soft/70 bg-panel/90 p-3 shadow-ambient-xl sm:p-4"
    >
      <div className="flex items-end gap-3">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          rows={2}
          placeholder="Escribe tu consulta..."
          className="min-h-14 w-full resize-none rounded-card border border-stroke-soft/70 bg-white/[0.02] px-4 py-3 text-[13px] text-white outline-none placeholder:text-[#c3c8d2]/60 [overflow-wrap:anywhere] scrollbar-soft sm:text-sm"
        />
        <ActionButton
          type="submit"
          disabled={disabled || !value.trim()}
          className="h-12 shrink-0 gap-2 bg-[#d5d5d8] px-5 text-xs text-[#111111] hover:bg-[#e2e2e4] sm:text-sm"
          aria-label="Enviar mensaje"
        >
          Enviar
          <SendHorizontal size={16} />
        </ActionButton>
      </div>
    </form>
  );
}
